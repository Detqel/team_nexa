import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  FileText, Clock, CheckCircle2, Search, Calendar, BookOpen, Upload,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "../components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { assignmentsApi, coursesApi } from "../lib/api";
import { toast } from "sonner";

function formatDueDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(dueDate) {
  return dueDate && new Date(dueDate) < new Date();
}

function submissionStatus(assignment) {
  const submission = assignment.mySubmission;
  if (!submission) {
    if (assignment.status === "completed") return { label: "Closed", variant: "secondary" };
    if (isOverdue(assignment.dueDate) && !assignment.allowLateSubmissions) {
      return { label: "Overdue", variant: "destructive" };
    }
    return { label: "Not submitted", variant: "outline" };
  }
  if (submission.status === "graded") {
    return { label: `Graded: ${submission.score}/${assignment.maxScore}`, variant: "default" };
  }
  return { label: "Submitted", variant: "secondary" };
}

export function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [submitOpen, setSubmitOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitContent, setSubmitContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadAssignments = useCallback(async (courseId) => {
    const params = courseId && courseId !== "all" ? { courseId } : {};
    const data = await assignmentsApi.getAll(params);
    return data.assignments || [];
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [assignmentList, coursesData] = await Promise.all([
          loadAssignments(courseFilter),
          coursesApi.getEnrolled(),
        ]);
        if (!cancelled) {
          setAssignments(assignmentList);
          setCourses(coursesData.courses || []);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "Failed to load assignments.");
          setAssignments([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [courseFilter, loadAssignments]);

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    (a.courseTitle || "").toLowerCase().includes(search.toLowerCase()),
  );

  const openSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmitContent(assignment.mySubmission?.content || "");
    setSubmitOpen(true);
  };

  const handleSubmit = async () => {
    if (!submitContent.trim()) {
      toast.error("Please enter your submission content.");
      return;
    }

    setSubmitting(true);
    try {
      await assignmentsApi.submit(selectedAssignment.id, { content: submitContent.trim() });
      toast.success("Assignment submitted successfully!");
      setSubmitOpen(false);
      setSubmitContent("");
      const updated = await loadAssignments(courseFilter);
      setAssignments(updated);
    } catch (error) {
      toast.error(error.message || "Failed to submit assignment.");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = (assignment) => {
    if (assignment.mySubmission) return false;
    if (assignment.status !== "active") return false;
    if (isOverdue(assignment.dueDate) && !assignment.allowLateSubmissions) return false;
    return true;
  };

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="Assignments"
        description="View and submit assignments for your enrolled courses"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total", value: assignments.length, icon: FileText, color: "from-blue-500 to-cyan-500" },
          { label: "Pending", value: assignments.filter((a) => !a.mySubmission && a.status === "active").length, icon: Clock, color: "from-yellow-500 to-orange-500" },
          { label: "Submitted", value: assignments.filter((a) => a.mySubmission).length, icon: CheckCircle2, color: "from-green-500 to-emerald-500" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card>
              <CardContent className="p-5">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${s.color} w-fit mb-3`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All enrolled courses</SelectItem>
            {courses.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-12">Loading assignments...</p>
      ) : courses.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-3">
            <BookOpen className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="font-medium">No enrolled courses yet</p>
            <p className="text-sm text-muted-foreground">
              Enroll in a course to see assignments from your instructors.
            </p>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-3">
            <FileText className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="font-medium">No assignments found</p>
            <p className="text-sm text-muted-foreground">
              {courseFilter !== "all"
                ? "No assignments for this course yet."
                : "Your instructors haven't posted any assignments yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a, i) => {
            const status = submissionStatus(a);
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="hover:shadow-lg transition-all h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg line-clamp-1">{a.title}</CardTitle>
                        <CardDescription className="mt-1">{a.courseTitle || "Course"}</CardDescription>
                      </div>
                      <Badge variant={status.variant === "destructive" ? "destructive" : "secondary"}>
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">{a.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Due {formatDueDate(a.dueDate)}</span>
                      </div>
                      <span>Max score: {a.maxScore}</span>
                    </div>
                    {a.mySubmission?.feedback && (
                      <p className="text-sm bg-muted/50 rounded-lg p-3">
                        <span className="font-medium">Feedback: </span>
                        {a.mySubmission.feedback}
                      </p>
                    )}
                    {canSubmit(a) && (
                      <Button className="w-full" onClick={() => openSubmit(a)}>
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Assignment
                      </Button>
                    )}
                    {a.mySubmission && a.mySubmission.status !== "graded" && (
                      <p className="text-xs text-muted-foreground text-center">
                        Submitted — awaiting grading
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit: {selectedAssignment?.title}</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.courseTitle} · Due {formatDueDate(selectedAssignment?.dueDate)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>Your answer / submission</Label>
            <Textarea
              rows={6}
              placeholder="Write your submission here..."
              value={submitContent}
              onChange={(e) => setSubmitContent(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubmitOpen(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudentDashboardLayout>
  );
}
