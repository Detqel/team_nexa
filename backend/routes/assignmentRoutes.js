const express = require("express");
const {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getSubmissions,
  submitAssignment,
  gradeSubmission,
} = require("../controllers/assignmentController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.get("/", getAssignments);
router.post("/", createAssignment);
router.get("/:id", getAssignmentById);
router.put("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

router.get("/:id/submissions", getSubmissions);
router.post("/:id/submit", submitAssignment);
router.put("/:assignmentId/submissions/:submissionId/grade", gradeSubmission);

module.exports = router;