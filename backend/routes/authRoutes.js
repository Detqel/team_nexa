const express = require("express");
const path = require("path");
const {
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
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { uploadAvatarMiddleware } = require("../middleware/uploadAvatar");

const router = express.Router();

const optionalUpload = (req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("multipart/form-data")) {
    return uploadAvatarMiddleware(req, res, next);
  }
  next();
};

router.post("/register", registerValidators, validate, register);
router.post("/login", loginValidators, validate, login);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfileValidators, validate, updateProfile);
router.post("/me/avatar", protect, optionalUpload, uploadAvatar);
router.delete("/me/avatar", protect, deleteAvatar);

module.exports = router;
