const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      default: "student",
    },
    avatar: {
      type: String,
      trim: true,
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    courseProgress: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
