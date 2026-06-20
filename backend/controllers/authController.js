const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

const formatCourseProgress = (courseProgress) => {
  if (!courseProgress) return {};
  try {
    if (courseProgress instanceof Map) {
      return Object.fromEntries(courseProgress.entries());
    }
    if (typeof courseProgress === "object") {
      return Object.fromEntries(Object.entries(courseProgress));
    }
  } catch {
    return {};
  }
  return {};
};

const formatUser = (user) => ({
  id: user._id?.toString?.() || String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar || null,
  enrolledCourses: user.enrolledCourses?.map((id) => id.toString()) || [],
  wishlist: user.wishlist?.map((id) => id.toString()) || [],
  courseProgress: formatCourseProgress(user.courseProgress),
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const removeAvatarFile = (avatarPath) => {
  if (!avatarPath) return;
  try {
    const filePath = path.join(__dirname, "..", avatarPath.replace(/^\//, ""));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.warn("Could not remove old avatar:", err.message);
  }
};

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const registerValidators = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").trim().isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),
  body("role").optional().isIn(["student", "instructor"]).withMessage("Invalid role"),
];

const loginValidators = [
  body("email").trim().isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const register = async (req, res, next) => {
  try {
    const { name, email, password, role = "student" } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.json({ user: formatUser(req.user) });
};

const updateProfileValidators = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty").isLength({ max: 100 }),
  body("avatar")
    .optional({ nullable: true })
    .custom((value) => {
      if (value === null || value === "") return true;
      if (typeof value !== "string") throw new Error("Avatar must be a string.");
      if (value.startsWith("data:image/")) {
        if (value.length > 3_000_000) throw new Error("Image is too large. Please use a smaller photo.");
        return true;
      }
      if (value.startsWith("/uploads/") || value.startsWith("http://") || value.startsWith("https://")) {
        return true;
      }
      throw new Error("Invalid image format.");
    }),
];

const applyAvatarUpdate = (user, avatar) => {
  if (avatar === undefined) return;

  if (avatar === null || avatar === "") {
    if (user.avatar?.startsWith("/uploads/")) {
      removeAvatarFile(user.avatar);
    }
    user.avatar = undefined;
    return;
  }

  if (user.avatar?.startsWith("/uploads/") && avatar !== user.avatar) {
    removeAvatarFile(user.avatar);
  }

  user.avatar = avatar;
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, avatar } = req.body;

    if (name !== undefined) {
      req.user.name = name.trim();
    }

    applyAvatarUpdate(req.user, avatar);

    await req.user.save();

    const freshUser = await User.findById(req.user._id);
    if (!freshUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: avatar !== undefined
        ? "Profile photo updated successfully."
        : "Profile updated successfully.",
      user: formatUser(freshUser),
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    if (req.body?.avatar?.startsWith("data:image/")) {
      applyAvatarUpdate(req.user, req.body.avatar);
      await req.user.save();
      const freshUser = await User.findById(req.user._id);
      return res.status(200).json({
        message: "Profile photo updated successfully.",
        user: formatUser(freshUser),
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image file." });
    }

    removeAvatarFile(req.user.avatar);

    req.user.avatar = `/uploads/avatars/${req.file.filename}`;
    await req.user.save();

    const freshUser = await User.findById(req.user._id);
    if (!freshUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "Profile photo updated successfully.",
      user: formatUser(freshUser),
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch {
        // ignore cleanup errors
      }
    }
    next(error);
  }
};

const deleteAvatar = async (req, res, next) => {
  try {
    applyAvatarUpdate(req.user, null);
    await req.user.save();

    res.json({
      message: "Profile photo removed.",
      user: formatUser(req.user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerValidators,
  loginValidators,
  updateProfileValidators,
  validate,
  register,
  login,
  getMe,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  formatUser,
};
