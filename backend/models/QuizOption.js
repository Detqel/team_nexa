const mongoose = require("mongoose");

const quizOptionSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizQuestion",
      required: [true, "Question reference is required"],
    },
    text: {
      type: String,
      required: [true, "Option text is required"],
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizOption", quizOptionSchema);
