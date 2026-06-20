const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Quiz reference is required"],
    },
    text: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["multiple_choice", "true_false"],
      default: "multiple_choice",
    },
    points: {
      type: Number,
      min: 1,
      default: 1,
    },
    order: {
      type: Number,
      default: 0,
    },
    explanation: {
      type: String,
      trim: true,
      comment: "Explanation shown after answering",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
