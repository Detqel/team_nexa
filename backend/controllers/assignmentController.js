const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const Course = require("../models/Course");
const User = require("../models/User");

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatAssignment = (a, submissionCount = 0, totalEnrolled = 0, mySubmission = null) => ({
  id: a._id.toString(),
  title: a.title,
  description: a.description,
  course: a.course?._id ? a.course._id.toString() : a.course,
  courseTitle: a.course?.title || null,
  instructor: a.instructor,
  dueDate: a.dueDate,
  maxScore: a.maxScore,
  status: a.status,
  allowLateSubmissions: a.allowLateSubmissions,
  latePenaltyPercent: a.latePenaltyPercent,
  attachments: a.attachments || [],
  submissions: submissionCount,
  total: totalEnrolled,
  mySubmission,
  createdAt: a.createdAt,
  updatedAt: a.updatedAt,
});

const formatStudent = (student) => {
  if (!student) return null;
  if (student._id) {
    return {
      id: student._id.toString(),
      name: student.name,
      email: student.email,
      avatar: student.avatar || null,
    };
  }
  return student;
};

const formatSubmission = (s, maxScore = null) => ({
  id: s._id.toString(),
  assignment: s.assignment?._id ? s.assignment._id.toString() : s.assignment,
  student: formatStudent(s.student),
  submittedAt: s.submittedAt,
  content: s.content,
  fileUrl: s.fileUrl,
  fileName: s.fileName,
  score: s.score,
  feedback: s.feedback,
  status: s.status,
  isLate: s.isLate,
  gradedAt: s.gradedAt,
  gradedBy: s.gradedBy,
  maxScore,
});

// ─── Assignment CRUD ─────────────────────────────────────────────────────────

/**
 * GET /api/assignments
 * List all assignments (instructor sees all theirs; student sees assignments for enrolled courses)
 */
const getAssignments = async (req, res, next) => {
  try {
    const { courseId, status } = req.query;
    const filter = {};

    if (req.user.role === "instructor") {
      filter.instructor = req.user._id;
    } else {
      // Students: only show assignments for courses they are enrolled in
      const enrolledIds = req.user.enrolledCourses || [];
      filter.course = { $in: enrolledIds };
      filter.status = { $in: ["active", "completed"] };
    }

    if (courseId) {
      if (req.user.role === "instructor") {
        filter.course = courseId;
      } else {
        const enrolledIds = (req.user.enrolledCourses || []).map((id) => id.toString());
        if (!enrolledIds.includes(courseId)) {
          return res.json({ count: 0, assignments: [] });
        }
        filter.course = courseId;
      }
    }
    if (status && req.user.role === "instructor") filter.status = status;

    const assignments = await Assignment.find(filter)
      .populate("course", "title")
      .sort({ createdAt: -1 });

    const results = await Promise.all(
      assignments.map(async (a) => {
        if (req.user.role === "instructor") {
          const submissionCount = await AssignmentSubmission.countDocuments({
            assignment: a._id,
          });
          const courseId = a.course?._id || a.course;
          const totalEnrolled = await User.countDocuments({
            enrolledCourses: courseId,
            role: "student",
          });
          return formatAssignment(a, submissionCount, totalEnrolled);
        }

        const mySubmission = await AssignmentSubmission.findOne({
          assignment: a._id,
          student: req.user._id,
        });
        return formatAssignment(
          a,
          0,
          0,
          mySubmission ? formatSubmission(mySubmission) : null,
        );
      })
    );

    res.json({ count: results.length, assignments: results });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/assignments/:id
 */
const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id).populate(
      "course",
      "title"
    );
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (req.user.role === "student") {
      const courseId = assignment.course._id?.toString() || assignment.course.toString();
      const isEnrolled = (req.user.enrolledCourses || []).some(
        (id) => id.toString() === courseId,
      );
      if (!isEnrolled) {
        return res.status(403).json({ message: "You are not enrolled in this course." });
      }
      if (!["active", "completed"].includes(assignment.status)) {
        return res.status(403).json({ message: "This assignment is not available." });
      }
    } else if (
      req.user.role === "instructor" &&
      assignment.instructor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied." });
    }

    const submissionCount = await AssignmentSubmission.countDocuments({
      assignment: assignment._id,
    });

    let mySubmission = null;
    if (req.user.role === "student") {
      const submission = await AssignmentSubmission.findOne({
        assignment: assignment._id,
        student: req.user._id,
      });
      mySubmission = submission ? formatSubmission(submission) : null;
    }

    res.json({
      assignment: formatAssignment(assignment, submissionCount, 0, mySubmission),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/assignments
 * Instructor only
 */
const createAssignment = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can create assignments." });
    }

    const {
      title,
      description,
      courseId,
      dueDate,
      maxScore,
      status,
      allowLateSubmissions,
      latePenaltyPercent,
      attachments,
    } = req.body;

    if (!title || !description || !courseId || !dueDate) {
      return res.status(400).json({
        message: "title, description, courseId, and dueDate are required.",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const assignment = await Assignment.create({
      title,
      description,
      course: courseId,
      instructor: req.user._id,
      dueDate,
      maxScore: maxScore || 100,
      status: status || "draft",
      allowLateSubmissions: allowLateSubmissions || false,
      latePenaltyPercent: latePenaltyPercent || 0,
      attachments: attachments || [],
    });

    res.status(201).json({
      message: "Assignment created successfully.",
      assignment: formatAssignment(assignment),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/assignments/:id
 * Instructor only
 */
const updateAssignment = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can update assignments." });
    }

    const assignment = await Assignment.findOne({
      _id: req.params.id,
      instructor: req.user._id,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found or access denied." });
    }

    const allowedFields = [
      "title",
      "description",
      "dueDate",
      "maxScore",
      "status",
      "allowLateSubmissions",
      "latePenaltyPercent",
      "attachments",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        assignment[field] = req.body[field];
      }
    });

    await assignment.save();

    res.json({
      message: "Assignment updated successfully.",
      assignment: formatAssignment(assignment),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/assignments/:id
 * Instructor only
 */
const deleteAssignment = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can delete assignments." });
    }

    const assignment = await Assignment.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user._id,
    });

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found or access denied." });
    }

    // Cascade-delete all submissions for this assignment
    await AssignmentSubmission.deleteMany({ assignment: req.params.id });

    res.json({ message: "Assignment deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// ─── Submissions ─────────────────────────────────────────────────────────────

/**
 * GET /api/assignments/:id/submissions
 * Instructor: all submissions; Student: only their own
 */
const getSubmissions = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (req.user.role === "instructor") {
      if (assignment.instructor.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied." });
      }
    }

    const filter = { assignment: req.params.id };
    if (req.user.role === "student") {
      filter.student = req.user._id;
    }

    const submissions = await AssignmentSubmission.find(filter)
      .populate("student", "name email avatar")
      .sort({ submittedAt: -1 });

    res.json({
      count: submissions.length,
      submissions: submissions.map((s) =>
        formatSubmission(s, assignment.maxScore),
      ),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/assignments/:id/submit
 * Student only
 */
const submitAssignment = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can submit assignments." });
    }

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    if (assignment.status !== "active") {
      return res.status(400).json({ message: "This assignment is not accepting submissions." });
    }

    // Check if student is enrolled in the course
    const isEnrolled = req.user.enrolledCourses.some(
      (id) => id.toString() === assignment.course.toString()
    );
    if (!isEnrolled) {
      return res
        .status(403)
        .json({ message: "You must be enrolled in the course to submit." });
    }

    // Check for existing submission
    const existing = await AssignmentSubmission.findOne({
      assignment: req.params.id,
      student: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: "You have already submitted this assignment." });
    }

    const { content, fileUrl, fileName } = req.body;
    if (!content && !fileUrl) {
      return res
        .status(400)
        .json({ message: "Please provide either content or a file URL for your submission." });
    }

    const now = new Date();
    const isLate = now > new Date(assignment.dueDate);

    if (isLate && !assignment.allowLateSubmissions) {
      return res.status(400).json({ message: "The due date has passed and late submissions are not allowed." });
    }

    const submission = await AssignmentSubmission.create({
      assignment: req.params.id,
      student: req.user._id,
      content,
      fileUrl,
      fileName,
      isLate,
    });

    res.status(201).json({
      message: "Assignment submitted successfully.",
      submission: formatSubmission(submission, assignment.maxScore),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/assignments/:assignmentId/submissions/:submissionId/grade
 * Instructor only
 */
const gradeSubmission = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ message: "Only instructors can grade submissions." });
    }

    const { score, feedback } = req.body;

    const assignment = await Assignment.findOne({
      _id: req.params.assignmentId,
      instructor: req.user._id,
    });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found or access denied." });
    }

    if (score === undefined || score === null) {
      return res.status(400).json({ message: "Score is required." });
    }

    if (score < 0 || score > assignment.maxScore) {
      return res.status(400).json({
        message: `Score must be between 0 and ${assignment.maxScore}.`,
      });
    }

    const submission = await AssignmentSubmission.findById(req.params.submissionId);
    if (!submission || submission.assignment.toString() !== req.params.assignmentId) {
      return res.status(404).json({ message: "Submission not found." });
    }

    // Apply late penalty if applicable
    let finalScore = score;
    if (submission.isLate && assignment.latePenaltyPercent > 0) {
      const penalty = (assignment.latePenaltyPercent / 100) * score;
      finalScore = Math.max(0, score - penalty);
    }

    submission.score = finalScore;
    submission.feedback = feedback || "";
    submission.status = "graded";
    submission.gradedAt = new Date();
    submission.gradedBy = req.user._id;
    await submission.save();

    res.json({
      message: "Submission graded successfully.",
      submission: formatSubmission(submission, assignment.maxScore),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getSubmissions,
  submitAssignment,
  gradeSubmission,
};
