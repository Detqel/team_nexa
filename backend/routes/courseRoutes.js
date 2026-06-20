const express = require("express");
const {
  getCourses,
  getCourseById,
  getCategories,
  createCourse,
  enrollCourse,
  addToWishlist,
  removeFromWishlist,
  getEnrolledCourses,
  getWishlistCourses,
} = require("../controllers/courseController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getCourses);
router.post("/", protect, createCourse);
router.get("/categories/list", getCategories);
router.get("/enrolled/me", protect, getEnrolledCourses);
router.get("/wishlist/me", protect, getWishlistCourses);
router.get("/:id", getCourseById);
router.post("/:id/enroll", protect, enrollCourse);
router.post("/:id/wishlist", protect, addToWishlist);
router.delete("/:id/wishlist", protect, removeFromWishlist);

module.exports = router;
