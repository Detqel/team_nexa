const express = require("express");
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  startAttempt,
  submitAttempt,
  getAttempts,
  getQuizAnalytics,
} = require("../controllers/quizController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getQuizzes);
router.post("/", createQuiz);
router.get("/:id", getQuizById);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

router.get("/:id/questions", getQuestions);
router.post("/:id/questions", addQuestion);
router.put("/:quizId/questions/:questionId", updateQuestion);
router.delete("/:quizId/questions/:questionId", deleteQuestion);

router.post("/:id/start", startAttempt);
router.post("/:id/submit", submitAttempt);
router.get("/:id/attempts", getAttempts);

router.get("/:id/analytics", getQuizAnalytics);

module.exports = router;