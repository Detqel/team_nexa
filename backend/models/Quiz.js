const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor reference is required"],
    },
    timeLimit: {
      type: Number,
      min: [1, "Time limit must be at least 1 minute"],
      default: 30,
      comment: "Time limit in minutes",
    },
    passingScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 60,
      comment: "Percentage required to pass",
    },
    maxAttempts: {
      type: Number,
      min: 1,
      default: 3,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    dueDate: {
      type: Date,
    },
    shuffleQuestions: {
      type: Boolean,
      default: false,
    },
    showResults: {
      type: Boolean,
      default: true,
      comment: "Show results immediately after submission",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
