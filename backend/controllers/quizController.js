const Quiz = require("../models/Quiz");
const QuizQuestion = require("../models/QuizQuestion");
const QuizOption = require("../models/QuizOption");
const QuizAttempt = require("../models/QuizAttempt");
const QuizAnswer = require("../models/QuizAnswer");
const Course = require("../models/Course");

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatQuiz = (q, questionCount = 0, attemptCount = 0, avgScore = 0, passRate = 0) => ({
  id: q._id.toString(),
  title: q.title,
  description: q.description,
  course: q.course,
  instructor: q.instructor,
  timeLimit: q.timeLimit,
  passingScore: q.passingScore,
  maxAttempts: q.maxAttempts,
  status: q.status,
  dueDate: q.dueDate,
  shuffleQuestions: q.shuffleQuestions,
  showResults: q.showResults,
  questions: questionCount,
  attempts: attemptCount,
  avgScore: Math.round(avgScore * 10) / 10,
  passRate: Math.round(passRate * 10) / 10,
  createdAt: q.createdAt,
  updatedAt: q.updatedAt,
});

const formatQuestion = (q, options = []) => ({
  id: q._id.toString(),
  quiz: q.quiz,
  text: q.text,
  type: q.type,
  points: q.points,
  order: q.order,
  explanation: q.explanation,
  options: options.map((o) => ({
    id: o._id.toString(),
    text: o.text,
    isCorrect: o.isCorrect,
    order: o.order,
  })),
});

const formatAttempt = (a) => ({
  id: a._id.toString(),
  quiz: a.quiz,
  student: a.student,
  startedAt: a.startedAt,
  submittedAt: a.submittedAt,
  score: a.score,
  totalPoints: a.totalPoints,
  percentageScore: a.percentageScore,
  passed: a.passed,
  timeTakenMinutes: a.timeTakenMinutes,
  status: a.status,
  attemptNumber: a.attemptNumber,
});

// ─── Quiz CRUD ────────────────────────────────────────────────────────────────

/**
 * GET /api/quizzes
 */
const getQuizzes = async (req, res, next) => {
  try {
    const { courseId, status } = req.query;
    const filter = {};

    if (req.user.role === "instructor") {
      filter.instructor = req.user._id;
    } else {
      const enrolledIds = req.user.enrolledCourses || [];
      filter.course = { $in: enrolledIds };
      filter.status = "published";
    }

    if (courseId) filter.course = courseId;
    if (status && req.user.role === "instructor") filter.status = status;

    const quizzes = await Quiz.find(filter)
      .populate("course", "title")
      .sort({ createdAt: -1 });

    const results = await Promise.all(
      quizzes.map(async (q) => {
        const questionCount = await QuizQuestion.countDocuments({ quiz: q._id });
        const attempts = await QuizAttempt.find({
          quiz: q._id,
          status: "submitted",
        });
        const attemptCount = attempts.length;
        const avgScore =
          attemptCount > 0
            ? attempts.reduce((sum, a) => sum + a.percentageScore, 0) / attemptCount
            : 0;
        const passedCount = attempts.filter((a) => a.passed).length;
        const passRate = attemptCount > 0 ? (passedCount / attemptCount) * 100 : 0;
        return formatQuiz(q, questionCount, attemptCount, avgScore, passRate);
      })
    );

    res.json({ count: results.length, quizzes: results });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/quizzes/:id
 */
const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("course", "title");
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    const questionCount = await QuizQuestion.countDocuments({ quiz: quiz._id });
    const attempts = await QuizAttempt.find({ quiz: quiz._id, status: "submitted" });
    const attemptCount = attempts.length;
    const avgScore =
      attemptCount > 0
        ? attempts.reduce((s, a) => s + a.percentageScore, 0) / attemptCount
        : 0;
    const passRate =
      attemptCount > 0
        ? (attempts.filter((a) => a.passed).length / attemptCount) * 100
        : 0;

    res.json({ quiz: formatQuiz(quiz, questionCount, attemptCount, avgScore, passRate) });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/quizzes
 * Instructor only
 */
const createQuiz = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can create quizzes." });
    }

    const {
      title,
      description,
      courseId,
      timeLimit,
      passingScore,
      maxAttempts,
      status,
      dueDate,
      shuffleQuestions,
      showResults,
    } = req.body;

    if (!title || !courseId) {
      return res.status(400).json({ message: "title and courseId are required." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const quiz = await Quiz.create({
      title,
      description,
      course: courseId,
      instructor: req.user._id,
      timeLimit: timeLimit || 30,
      passingScore: passingScore !== undefined ? passingScore : 60,
      maxAttempts: maxAttempts || 3,
      status: status || "draft",
      dueDate,
      shuffleQuestions: shuffleQuestions || false,
      showResults: showResults !== undefined ? showResults : true,
    });

    res.status(201).json({ message: "Quiz created successfully.", quiz: formatQuiz(quiz) });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/quizzes/:id
 * Instructor only
 */
const updateQuiz = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can update quizzes." });
    }

    const quiz = await Quiz.findOne({ _id: req.params.id, instructor: req.user._id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found or access denied." });
    }

    const allowedFields = [
      "title",
      "description",
      "timeLimit",
      "passingScore",
      "maxAttempts",
      "status",
      "dueDate",
      "shuffleQuestions",
      "showResults",
    ];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) quiz[field] = req.body[field];
    });

    await quiz.save();
    res.json({ message: "Quiz updated successfully.", quiz: formatQuiz(quiz) });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/quizzes/:id
 * Instructor only
 */
const deleteQuiz = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can delete quizzes." });
    }

    const quiz = await Quiz.findOneAndDelete({ _id: req.params.id, instructor: req.user._id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found or access denied." });
    }

    // Cascade: delete questions, options, attempts, answers
    const questions = await QuizQuestion.find({ quiz: req.params.id });
    const questionIds = questions.map((q) => q._id);
    await QuizOption.deleteMany({ question: { $in: questionIds } });
    await QuizQuestion.deleteMany({ quiz: req.params.id });

    const attempts = await QuizAttempt.find({ quiz: req.params.id });
    const attemptIds = attempts.map((a) => a._id);
    await QuizAnswer.deleteMany({ attempt: { $in: attemptIds } });
    await QuizAttempt.deleteMany({ quiz: req.params.id });

    res.json({ message: "Quiz and all related data deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// ─── Questions & Options ──────────────────────────────────────────────────────

/**
 * GET /api/quizzes/:id/questions
 * Returns questions (with options). Students only see correct answers AFTER submission.
 */
const getQuestions = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    const questions = await QuizQuestion.find({ quiz: req.params.id }).sort({ order: 1 });

    const questionsWithOptions = await Promise.all(
      questions.map(async (q) => {
        const options = await QuizOption.find({ question: q._id }).sort({ order: 1 });

        // Students should not see which option is correct before submitting
        const sanitizedOptions =
          req.user.role === "instructor"
            ? options
            : options.map((o) => ({
                ...o.toObject(),
                isCorrect: undefined,
              }));

        return formatQuestion(q, sanitizedOptions);
      })
    );

    // Shuffle if setting is on and user is a student
    if (quiz.shuffleQuestions && req.user.role === "student") {
      questionsWithOptions.sort(() => Math.random() - 0.5);
    }

    res.json({ count: questionsWithOptions.length, questions: questionsWithOptions });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/quizzes/:id/questions
 * Instructor only – add a question with its options in one call.
 * Body: { text, type, points, order, explanation, options: [{ text, isCorrect, order }] }
 */
const addQuestion = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can add questions." });
    }

    const quiz = await Quiz.findOne({ _id: req.params.id, instructor: req.user._id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found or access denied." });
    }

    const { text, type, points, order, explanation, options } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Question text is required." });
    }
    if (!options || options.length < 2) {
      return res.status(400).json({ message: "At least 2 options are required." });
    }
    const hasCorrect = options.some((o) => o.isCorrect);
    if (!hasCorrect) {
      return res.status(400).json({ message: "At least one option must be marked as correct." });
    }

    const question = await QuizQuestion.create({
      quiz: req.params.id,
      text,
      type: type || "multiple_choice",
      points: points || 1,
      order: order || 0,
      explanation,
    });

    const createdOptions = await QuizOption.insertMany(
      options.map((o, idx) => ({
        question: question._id,
        text: o.text,
        isCorrect: !!o.isCorrect,
        order: o.order !== undefined ? o.order : idx,
      }))
    );

    res.status(201).json({
      message: "Question added successfully.",
      question: formatQuestion(question, createdOptions),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/quizzes/:quizId/questions/:questionId
 * Instructor only – update question text/meta and replace options.
 */
const updateQuestion = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can update questions." });
    }

    const quiz = await Quiz.findOne({ _id: req.params.quizId, instructor: req.user._id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found or access denied." });
    }

    const question = await QuizQuestion.findOne({
      _id: req.params.questionId,
      quiz: req.params.quizId,
    });
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    const { text, type, points, order, explanation, options } = req.body;
    if (text !== undefined) question.text = text;
    if (type !== undefined) question.type = type;
    if (points !== undefined) question.points = points;
    if (order !== undefined) question.order = order;
    if (explanation !== undefined) question.explanation = explanation;
    await question.save();

    let updatedOptions;
    if (options && options.length >= 2) {
      await QuizOption.deleteMany({ question: question._id });
      updatedOptions = await QuizOption.insertMany(
        options.map((o, idx) => ({
          question: question._id,
          text: o.text,
          isCorrect: !!o.isCorrect,
          order: o.order !== undefined ? o.order : idx,
        }))
      );
    } else {
      updatedOptions = await QuizOption.find({ question: question._id }).sort({ order: 1 });
    }

    res.json({
      message: "Question updated successfully.",
      question: formatQuestion(question, updatedOptions),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/quizzes/:quizId/questions/:questionId
 * Instructor only
 */
const deleteQuestion = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can delete questions." });
    }

    const quiz = await Quiz.findOne({ _id: req.params.quizId, instructor: req.user._id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found or access denied." });
    }

    const question = await QuizQuestion.findOneAndDelete({
      _id: req.params.questionId,
      quiz: req.params.quizId,
    });
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }

    await QuizOption.deleteMany({ question: req.params.questionId });

    res.json({ message: "Question deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// ─── Attempts ─────────────────────────────────────────────────────────────────

/**
 * POST /api/quizzes/:id/start
 * Student only – starts a new attempt
 */
const startAttempt = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can take quizzes." });
    }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }
    if (quiz.status !== "published") {
      return res.status(400).json({ message: "This quiz is not available yet." });
    }

    const isEnrolled = req.user.enrolledCourses.some(
      (id) => id.toString() === quiz.course.toString()
    );
    if (!isEnrolled) {
      return res.status(403).json({ message: "You must be enrolled in the course to take this quiz." });
    }

    // Count previous attempts
    const previousAttempts = await QuizAttempt.countDocuments({
      quiz: req.params.id,
      student: req.user._id,
      status: { $in: ["submitted", "timed_out"] },
    });

    if (previousAttempts >= quiz.maxAttempts) {
      return res.status(400).json({
        message: `You have used all ${quiz.maxAttempts} attempt(s) for this quiz.`,
      });
    }

    // Check for an in-progress attempt
    const inProgress = await QuizAttempt.findOne({
      quiz: req.params.id,
      student: req.user._id,
      status: "in_progress",
    });
    if (inProgress) {
      return res.json({
        message: "Resuming existing attempt.",
        attempt: formatAttempt(inProgress),
      });
    }

    const attempt = await QuizAttempt.create({
      quiz: req.params.id,
      student: req.user._id,
      attemptNumber: previousAttempts + 1,
    });

    res.status(201).json({ message: "Quiz attempt started.", attempt: formatAttempt(attempt) });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/quizzes/:id/submit
 * Student only – submit answers for an attempt
 * Body: { attemptId, answers: [{ questionId, selectedOptionId }] }
 */
const submitAttempt = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can submit quizzes." });
    }

    const { attemptId, answers } = req.body;
    if (!attemptId || !answers) {
      return res.status(400).json({ message: "attemptId and answers are required." });
    }

    const attempt = await QuizAttempt.findOne({
      _id: attemptId,
      quiz: req.params.id,
      student: req.user._id,
      status: "in_progress",
    });
    if (!attempt) {
      return res.status(404).json({ message: "Active attempt not found." });
    }

    const quiz = await Quiz.findById(req.params.id);
    const questions = await QuizQuestion.find({ quiz: req.params.id });

    let totalPoints = 0;
    let earnedPoints = 0;
    const answerDocs = [];

    for (const q of questions) {
      totalPoints += q.points;
      const submitted = answers.find((a) => a.questionId === q._id.toString());
      let isCorrect = false;
      let pointsEarned = 0;
      let selectedOptionId = null;

      if (submitted && submitted.selectedOptionId) {
        selectedOptionId = submitted.selectedOptionId;
        const option = await QuizOption.findById(selectedOptionId);
        if (option && option.question.toString() === q._id.toString()) {
          isCorrect = option.isCorrect;
          if (isCorrect) {
            pointsEarned = q.points;
            earnedPoints += pointsEarned;
          }
        }
      }

      answerDocs.push({
        attempt: attempt._id,
        question: q._id,
        selectedOption: selectedOptionId,
        isCorrect,
        pointsEarned,
      });
    }

    // Bulk insert answers (upsert in case of re-submission race conditions)
    if (answerDocs.length > 0) {
      await QuizAnswer.insertMany(answerDocs, { ordered: false }).catch(() => {});
    }

    const percentageScore = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = percentageScore >= quiz.passingScore;
    const now = new Date();
    const timeTaken = Math.round((now - attempt.startedAt) / 60000);

    attempt.score = earnedPoints;
    attempt.totalPoints = totalPoints;
    attempt.percentageScore = Math.round(percentageScore * 10) / 10;
    attempt.passed = passed;
    attempt.submittedAt = now;
    attempt.timeTakenMinutes = timeTaken;
    attempt.status = "submitted";
    await attempt.save();

    const response = {
      message: "Quiz submitted successfully.",
      attempt: formatAttempt(attempt),
    };

    // Include answer breakdown if the quiz shows results
    if (quiz.showResults) {
      const savedAnswers = await QuizAnswer.find({ attempt: attempt._id })
        .populate("question", "text explanation points")
        .populate("selectedOption", "text isCorrect");

      response.answers = savedAnswers.map((a) => ({
        question: {
          id: a.question._id,
          text: a.question.text,
          explanation: a.question.explanation,
          points: a.question.points,
        },
        selectedOption: a.selectedOption
          ? { id: a.selectedOption._id, text: a.selectedOption.text, isCorrect: a.selectedOption.isCorrect }
          : null,
        isCorrect: a.isCorrect,
        pointsEarned: a.pointsEarned,
      }));
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/quizzes/:id/attempts
 * Instructor: all student attempts; Student: only their own
 */
const getAttempts = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    const filter = { quiz: req.params.id };
    if (req.user.role === "student") {
      filter.student = req.user._id;
    }

    const attempts = await QuizAttempt.find(filter)
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json({ count: attempts.length, attempts: attempts.map(formatAttempt) });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/quizzes/:id/analytics
 * Instructor only – aggregated stats
 */
const getQuizAnalytics = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Access denied." });
    }

    const quiz = await Quiz.findOne({ _id: req.params.id, instructor: req.user._id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found or access denied." });
    }

    const attempts = await QuizAttempt.find({ quiz: quiz._id, status: "submitted" });
    const totalAttempts = attempts.length;
    const avgScore =
      totalAttempts > 0
        ? attempts.reduce((s, a) => s + a.percentageScore, 0) / totalAttempts
        : 0;
    const passedCount = attempts.filter((a) => a.passed).length;
    const passRate = totalAttempts > 0 ? (passedCount / totalAttempts) * 100 : 0;
    const avgTime =
      totalAttempts > 0
        ? attempts.reduce((s, a) => s + (a.timeTakenMinutes || 0), 0) / totalAttempts
        : 0;

    // Score distribution
    const buckets = [
      { range: "90-100%", min: 90, max: 100, count: 0 },
      { range: "80-89%", min: 80, max: 89, count: 0 },
      { range: "70-79%", min: 70, max: 79, count: 0 },
      { range: "60-69%", min: 60, max: 69, count: 0 },
      { range: "Below 60%", min: 0, max: 59, count: 0 },
    ];
    attempts.forEach((a) => {
      const bucket = buckets.find(
        (b) => a.percentageScore >= b.min && a.percentageScore <= b.max
      );
      if (bucket) bucket.count++;
    });

    // Per-question stats
    const questions = await QuizQuestion.find({ quiz: quiz._id }).sort({ order: 1 });
    const questionStats = await Promise.all(
      questions.map(async (q) => {
        const answers = await QuizAnswer.find({ question: q._id });
        const correct = answers.filter((a) => a.isCorrect).length;
        const total = answers.length;
        return {
          questionId: q._id,
          text: q.text,
          correctPct: total > 0 ? Math.round((correct / total) * 100) : 0,
          totalAnswers: total,
        };
      })
    );

    res.json({
      analytics: {
        totalAttempts,
        avgScore: Math.round(avgScore * 10) / 10,
        passRate: Math.round(passRate * 10) / 10,
        avgTimeTakenMinutes: Math.round(avgTime * 10) / 10,
        completionRate:
          totalAttempts > 0
            ? Math.round(
                (attempts.filter((a) => a.status === "submitted").length / totalAttempts) * 100
              )
            : 0,
        scoreDistribution: buckets,
        questionStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
