const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: [255, "Title cannot exceed 255 characters"],
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    students: {
      type: Number,
      default: 0,
    },
    durationHours: {
      type: Number,
      default: 0,
    },
    lessons: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    originalPrice: {
      type: Number,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);