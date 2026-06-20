import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  FileText, Plus, Clock, CheckCircle2, AlertCircle, Users,
  Edit, Trash2, Eye, MoreVertical, Search, Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter,
} from "../components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { InstructorLayout } from "../components/instructor-sidebar";
import { assignmentsApi, coursesApi } from "../lib/api";
import { getUserAvatarUrl, getUserInitials } from "../lib/avatar";
import { toast } from "sonner";

function getCourseName(course, courseTitle) {
  if (courseTitle) return courseTitle;
  if (!course) return "Unknown course";
  if (typeof course === "string") return course;
  return course.title || "Unknown course";
}

function formatDueDate(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatSubmittedAt(date) {
  if (!date) return "—";
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const emptyForm = {
  title: "",
  courseId: "",
  description: "",
  dueDate: "",
  maxScore: "100",
};

export function AssignmentsPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [previewSubmissions, setPreviewSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [gradeOpen, setGradeOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [gradeForm, setGradeForm] = useState({ score: "", feedback: "" });
  const [grading, setGrading] = useState(false);

  const fetchAllSubmissions = useCallback(async (assignmentList) => {
    if (!assignmentList.length) {
      setSubmissions([]);
      return;
    }

    const results = await Promise.allSettled(
      assignmentList.map(async (assignment) => {
        const data = await assignmentsApi.getSubmissions(assignment.id);
        return (data.submissions || []).map((s) => ({
          ...s,
          assignmentId: assignment.id,
          assignmentTitle: assignment.title,
          maxScore: s.maxScore ?? assignment.maxScore,
        }));
      }),
    );

    const flat = results
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    setSubmissions(flat);
  }, []);

  const reloadData = useCallback(async () => {
    const data = await assignmentsApi.getAll();
    const assignmentList = data.assignments || [];
    setAssignments(assignmentList);
    await fetchAllSubmissions(assignmentList);
    return assignmentList;
  }, [fetchAllSubmissions]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const [assignmentsData, coursesData] = await Promise.all([
          assignmentsApi.getAll(),
          coursesApi.getAll(),
        ]);
        if (cancelled) return;

        const assignmentList = assignmentsData.assignments || [];
        setAssignments(assignmentList);
        setCourses(coursesData.courses || []);
        await fetchAllSubmissions(assignmentList);
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
  }, [fetchAllSubmissions]);

  useEffect(() => {
    const handleFocus = () => {
      reloadData().catch(() => {});
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [reloadData]);

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    getCourseName(a.course, a.courseTitle).toLowerCase().includes(search.toLowerCase()),
  );

  const statusColor = (s) =>
    s === "active" ? "bg-green-500 text-white" :
      s === "completed" ? "bg-blue-500 text-white" :
        "bg-yellow-500 text-white";

  const resetForm = () => setForm(emptyForm);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.courseId || !form.dueDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setCreating(true);
    try {
      await assignmentsApi.create({
        title: form.title.trim(),
        description: form.description.trim(),
        courseId: form.courseId,
        dueDate: form.dueDate,
        maxScore: Number(form.maxScore) || 100,
        status: "active",
      });
      toast.success("Assignment created successfully!");
      setOpen(false);
      resetForm();
      await reloadData();
    } catch (error) {
      toast.error(error.message || "Failed to create assignment.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await assignmentsApi.delete(id);
      toast.success("Assignment deleted.");
      const nextAssignments = assignments.filter((a) => a.id !== id);
      setAssignments(nextAssignments);
      setSubmissions((prev) => prev.filter((s) => s.assignmentId !== id));
    } catch (error) {
      toast.error(error.message || "Failed to delete assignment.");
    }
  };

  const openPreview = async (assignment) => {
    setSelectedAssignment(assignment);
    setPreviewOpen(true);
    setLoadingPreview(true);
    setPreviewSubmissions([]);
    try {
      const data = await assignmentsApi.getSubmissions(assignment.id);
      setPreviewSubmissions(
        (data.submissions || []).map((s) => ({
          ...s,
          maxScore: s.maxScore ?? assignment.maxScore,
        })),
      );
    } catch (error) {
      toast.error(error.message || "Failed to load submissions.");
    } finally {
      setLoadingPreview(false);
    }
  };

  const openGrade = (submission) => {
    setSelectedSubmission(submission);
    setGradeForm({
      score: submission.score != null ? String(submission.score) : "",
      feedback: submission.feedback || "",
    });
    setGradeOpen(true);
  };

  const handleGrade = async () => {
    const score = Number(gradeForm.score);
    if (Number.isNaN(score)) {
      toast.error("Please enter a valid score.");
      return;
    }

    setGrading(true);
    try {
      await assignmentsApi.gradeSubmission(
        selectedSubmission.assignmentId,
        selectedSubmission.id,
        { score, feedback: gradeForm.feedback.trim() },
      );
      toast.success("Submission graded successfully!");
      setGradeOpen(false);
      await reloadData();
      if (selectedAssignment && previewOpen) {
        const updated = await assignmentsApi.getSubmissions(selectedAssignment.id);
        setPreviewSubmissions(
          (updated.submissions || []).map((s) => ({
            ...s,
            maxScore: s.maxScore ?? selectedAssignment.maxScore,
          })),
        );
      }
    } catch (error) {
      toast.error(error.message || "Failed to grade submission.");
    } finally {
      setGrading(false);
    }
  };

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Assignments 📝</h1>
            <p className="text-muted-foreground">Create, manage and grade student assignments</p>
          </div>
          <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Create New Assignment</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Assignment Title</Label>
                  <Input
                    placeholder="e.g., Build a React Dashboard"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select
                    value={form.courseId}
                    onValueChange={(value) => setForm((p) => ({ ...p, courseId: value }))}
                  >
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description / Instructions</Label>
                  <Textarea
                    placeholder="Describe the assignment requirements..."
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Score</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={form.maxScore}
                      onChange={(e) => setForm((p) => ({ ...p, maxScore: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)} disabled={creating}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={creating}>
                  {creating ? "Creating..." : "Create Assignment"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Submissions for {selectedAssignment?.title}</DialogTitle>
                <DialogDescription>Review and grade student work</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                {loadingPreview && (
                  <p className="text-sm text-muted-foreground text-center py-6">Loading submissions...</p>
                )}
                {!loadingPreview && previewSubmissions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">No submissions yet for this assignment.</p>
                )}
                {!loadingPreview && previewSubmissions.map((s) => (
                  <div key={s.id} className="p-4 border rounded-xl space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={getUserAvatarUrl(s.student)} />
                          <AvatarFallback>{getUserInitials(s.student)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{s.student?.name || "Unknown student"}</p>
                          <p className="text-sm text-muted-foreground">{formatSubmittedAt(s.submittedAt)}</p>
                        </div>
                      </div>
                      {s.status === "graded" ? (
                        <Badge className="bg-green-500 text-white">{s.score}/{s.maxScore}</Badge>
                      ) : (
                        <Badge variant="secondary">Awaiting grade</Badge>
                      )}
                    </div>
                    {s.content && (
                      <div className="rounded-lg bg-muted/40 p-3 text-sm whitespace-pre-wrap">
                        {s.content}
                      </div>
                    )}
                    {s.fileUrl && (
                      <p className="text-sm text-muted-foreground">
                        File: {s.fileName || s.fileUrl}
                      </p>
                    )}
                    {s.feedback && (
                      <p className="text-sm">
                        <span className="font-medium">Feedback: </span>{s.feedback}
                      </p>
                    )}
                    <Button
                      size="sm"
                      variant={s.status === "submitted" ? "default" : "outline"}
                      onClick={() => openGrade({
                        ...s,
                        assignmentId: selectedAssignment.id,
                        assignmentTitle: selectedAssignment.title,
                      })}
                    >
                      {s.status === "submitted" ? "Grade Submission" : "Update Grade"}
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={gradeOpen} onOpenChange={setGradeOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Grade Submission</DialogTitle>
                <DialogDescription>
                  {selectedSubmission?.student?.name} · {selectedSubmission?.assignmentTitle || selectedAssignment?.title}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Score (out of {selectedSubmission?.maxScore || 100})</Label>
                  <Input
                    type="number"
                    min="0"
                    max={selectedSubmission?.maxScore || 100}
                    value={gradeForm.score}
                    onChange={(e) => setGradeForm((p) => ({ ...p, score: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Feedback (optional)</Label>
                  <Textarea
                    rows={4}
                    placeholder="Add feedback for the student..."
                    value={gradeForm.feedback}
                    onChange={(e) => setGradeForm((p) => ({ ...p, feedback: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setGradeOpen(false)} disabled={grading}>
                  Cancel
                </Button>
                <Button onClick={handleGrade} disabled={grading}>
                  {grading ? "Saving..." : "Save Grade"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Assignments", value: assignments.length, icon: FileText, color: "from-blue-500 to-cyan-500" },
            { label: "Active", value: assignments.filter(a => a.status === "active").length, icon: Clock, color: "from-green-500 to-emerald-500" },
            { label: "Pending Grading", value: submissions.filter(s => s.status === "submitted").length, icon: AlertCircle, color: "from-yellow-500 to-orange-500" },
            { label: "Graded", value: submissions.filter(s => s.status === "graded").length, icon: CheckCircle2, color: "from-purple-500 to-pink-500" },
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

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search assignments..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <Tabs defaultValue="assignments">
          <TabsList>
            <TabsTrigger value="assignments">All Assignments</TabsTrigger>
            <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="mt-4">
            {loading ? (
              <p className="text-sm text-muted-foreground text-center py-12">Loading assignments...</p>
            ) : filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-12">
                No assignments yet. Create your first assignment to get started.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((a, i) => (
                  <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <Card className="hover:shadow-lg transition-all">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-semibold line-clamp-1">{a.title}</p>
                            <p className="text-xs text-muted-foreground">{getCourseName(a.course, a.courseTitle)}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge className={`text-xs ${statusColor(a.status)}`}>{a.status}</Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="h-3.5 w-3.5" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(a.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{a.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDueDate(a.dueDate)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>{a.submissions || 0}/{a.total || 0} submitted</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                            style={{ width: `${a.total ? ((a.submissions || 0) / a.total) * 100 : 0}%` }}
                          />
                        </div>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => openPreview(a)}>
                          <Eye className="h-3.5 w-3.5 mr-2" />View Submissions
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="submissions" className="mt-4">
            <Card>
              <CardHeader><CardTitle>Recent Submissions</CardTitle><CardDescription>Grade and review student work</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                {submissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">No submissions yet.</p>
                ) : (
                  submissions.map((s, i) => (
                    <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                      <div className="flex items-center gap-4 p-3 border rounded-xl hover:bg-muted/40 transition-colors">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={getUserAvatarUrl(s.student)} />
                          <AvatarFallback>{getUserInitials(s.student)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{s.student?.name || "Unknown student"}</p>
                          <p className="text-xs text-muted-foreground">{s.assignmentTitle}</p>
                          <p className="text-xs text-muted-foreground">Submitted {formatSubmittedAt(s.submittedAt)}</p>
                          {s.content && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.content}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {s.score !== null && s.score !== undefined ? (
                            <Badge className="bg-green-500 text-white">{s.score}/{s.maxScore || 100}</Badge>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                          <Button
                            size="sm"
                            variant={s.status === "submitted" ? "default" : "outline"}
                            onClick={() => openGrade(s)}
                          >
                            {s.status === "submitted" ? "Grade" : "View"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InstructorLayout>
  );
}
