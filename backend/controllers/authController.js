const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
<<<<<<< HEAD
  AVATAR_UPLOADS_PATH,
  AVATAR_TOO_LARGE_MESSAGE,
  INVALID_IMAGE_FORMAT_MESSAGE,
  MAX_BASE64_AVATAR_LENGTH,
  isDataImageUrl,
  isRemoteOrUploadUrl,
  isStoredUploadAvatar,
} = require("../constants/avatarConstants");
=======
  STATUS,
  VALIDATION_MESSAGES,
  AUTH_MESSAGES,
  USER_ROLES,
  FIELD_CONSTRAINTS,
  DEFAULTS,
} = require("../constants/appConstants");
>>>>>>> 3c0b5f4a2aa236cbffd9623b6ed80bebba37436f

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ message: errors.array()[0].msg, errors: errors.array() });
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
    expiresIn: process.env.JWT_EXPIRES_IN || DEFAULTS.JWT_EXPIRES_IN,
  });

const registerValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(VALIDATION_MESSAGES.NAME_REQUIRED)
    .isLength({ max: FIELD_CONSTRAINTS.NAME_MAX_LENGTH }),
  body("email").trim().isEmail().withMessage(VALIDATION_MESSAGES.EMAIL_INVALID),
  body("password")
    .isLength({ min: FIELD_CONSTRAINTS.PASSWORD_MIN_LENGTH })
    .withMessage(VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .matches(/[a-z]/)
    .withMessage(VALIDATION_MESSAGES.PASSWORD_LOWERCASE)
    .matches(/[A-Z]/)
    .withMessage(VALIDATION_MESSAGES.PASSWORD_UPPERCASE)
    .matches(/[0-9]/)
    .withMessage(VALIDATION_MESSAGES.PASSWORD_NUMBER),
  body("role")
    .optional()
    .isIn([USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR])
    .withMessage(VALIDATION_MESSAGES.ROLE_INVALID),
];

const loginValidators = [
  body("email").trim().isEmail().withMessage(VALIDATION_MESSAGES.EMAIL_INVALID),
  body("password").notEmpty().withMessage(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
];

const register = async (req, res, next) => {
  try {
    const { name, email, password, role = DEFAULTS.ROLE } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(STATUS.CONFLICT).json({ message: AUTH_MESSAGES.EMAIL_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, FIELD_CONSTRAINTS.BCRYPT_SALT_ROUNDS);
    const user = await User.create({ name, email, password: hashedPassword, role });

    const token = generateToken(user._id);

    res.status(STATUS.CREATED).json({
      message: AUTH_MESSAGES.REGISTRATION_SUCCESS,
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
      return res.status(STATUS.UNAUTHORIZED).json({ message: AUTH_MESSAGES.LOGIN_INVALID });
    }

    const token = generateToken(user._id);

    res.status(STATUS.OK).json({
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      token,
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.status(STATUS.OK).json({ user: formatUser(req.user) });
};

const updateProfileValidators = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty").isLength({ max: 100 }),
];

const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (name !== undefined) {
      req.user.name = name.trim();
    }

    await req.user.save();

    res.json({
      message: "Profile updated successfully.",
      user: formatUser(req.user),
    });
  } catch (error) {
    next(error);
  }
};

const updateProfileValidators = [
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty").isLength({ max: 100 }),
  body("avatar")
    .optional({ nullable: true })
    .custom((value) => {
      if (value === null || value === "") return true;
      if (typeof value !== "string") throw new Error("Avatar must be a string.");
      if (isDataImageUrl(value)) {
        if (value.length > MAX_BASE64_AVATAR_LENGTH) {
          throw new Error(AVATAR_TOO_LARGE_MESSAGE);
        }
        return true;
      }
      if (isRemoteOrUploadUrl(value)) {
        return true;
      }
      throw new Error(INVALID_IMAGE_FORMAT_MESSAGE);
    }),
];

const applyAvatarUpdate = (user, avatar) => {
  if (avatar === undefined) return;

  if (avatar === null || avatar === "") {
    if (isStoredUploadAvatar(user.avatar)) {
      removeAvatarFile(user.avatar);
    }
    user.avatar = undefined;
    return;
  }

  if (isStoredUploadAvatar(user.avatar) && avatar !== user.avatar) {
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
    if (isDataImageUrl(req.body?.avatar)) {
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

    req.user.avatar = `${AVATAR_UPLOADS_PATH}${req.file.filename}`;
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