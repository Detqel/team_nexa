const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: String,
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
      required: true,
    },
    lessons: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: Number,
    thumbnail: String,
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    category: {
      type: String,
      required: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    description: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
