const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Quiz reference is required"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    submittedAt: {
      type: Date,
    },
    score: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalPoints: {
      type: Number,
      min: 0,
      default: 0,
    },
    percentageScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    passed: {
      type: Boolean,
      default: false,
    },
    timeTakenMinutes: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ["in_progress", "submitted", "timed_out"],
      default: "in_progress",
    },
    attemptNumber: {
      type: Number,
      min: 1,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
