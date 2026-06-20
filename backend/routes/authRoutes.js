const express = require("express");
const {
  registerValidators,
  loginValidators,
  updateProfileValidators,
  validate,
  register,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerValidators, validate, register);
router.post("/login", loginValidators, validate, login);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfileValidators, validate, updateProfile);

module.exports = router;