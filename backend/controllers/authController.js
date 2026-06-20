const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  STATUS,
  VALIDATION_MESSAGES,
  AUTH_MESSAGES,
  USER_ROLES,
  FIELD_CONSTRAINTS,
  DEFAULTS,
} = require("../constants/appConstants");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(STATUS.BAD_REQUEST)
      .json({ message: errors.array()[0].msg, errors: errors.array() });
  }
  next();
};

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  enrolledCourses: user.enrolledCourses?.map((id) => id.toString()) || [],
  wishlist: user.wishlist?.map((id) => id.toString()) || [],
  courseProgress: Object.fromEntries(user.courseProgress || new Map()),
  createdAt: user.createdAt,
});

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

module.exports = {
  registerValidators,
  loginValidators,
  updateProfileValidators,
  validate,
  register,
  login,
  getMe,
  updateProfile,
  formatUser,
};