const mongoose = require("mongoose");

const quizAnswerSchema = new mongoose.Schema(
  {
    attempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizAttempt",
      required: [true, "Attempt reference is required"],
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizQuestion",
      required: [true, "Question reference is required"],
    },
    selectedOption: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizOption",
      default: null,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    pointsEarned: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

// One answer per question per attempt
quizAnswerSchema.index({ attempt: 1, question: 1 }, { unique: true });

module.exports = mongoose.model("QuizAnswer", quizAnswerSchema);
