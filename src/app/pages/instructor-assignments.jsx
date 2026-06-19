import { useState } from "react";
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

const assignments = [
  { id: 1, title: "Build a Responsive Landing Page", course: "Complete Web Development Bootcamp", dueDate: "Jun 10, 2026", submissions: 34, total: 42, status: "active", maxScore: 100, description: "Create a fully responsive landing page using HTML and CSS." },
  { id: 2, title: "React Todo App with Hooks", course: "Advanced React & TypeScript", dueDate: "Jun 8, 2026", submissions: 18, total: 28, status: "active", maxScore: 100, description: "Build a functional Todo application using React hooks." },
  { id: 3, title: "JavaScript Array Methods Quiz", course: "JavaScript Essentials", dueDate: "May 30, 2026", submissions: 30, total: 30, status: "completed", maxScore: 50, description: "Demonstrate understanding of map, filter, reduce, and other array methods." },
  { id: 4, title: "Final Project: Full-Stack App", course: "Complete Web Development Bootcamp", dueDate: "Jun 25, 2026", submissions: 5, total: 42, status: "upcoming", maxScore: 200, description: "Build a full-stack application demonstrating all skills learned." },
];

const submissions = [
  { id: 1, assignmentId: 1, student: "Alice Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice", submittedAt: "2 hours ago", score: null, status: "pending", preview: "index.html" },
  { id: 2, assignmentId: 1, student: "Bob Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob", submittedAt: "5 hours ago", score: 88, status: "graded", preview: "landing-page.zip" },
  { id: 3, assignmentId: 1, student: "Emma Davis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", submittedAt: "1 day ago", score: 95, status: "graded", preview: "project.zip" },
  { id: 4, assignmentId: 1, student: "Frank Miller", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank", submittedAt: "Just now", score: null, status: "pending", preview: "homework.zip" },
  { id: 5, assignmentId: 2, student: "Grace Lee", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace", submittedAt: "1 hour ago", score: null, status: "pending", preview: "todo-app.zip" },
  { id: 6, assignmentId: 2, student: "Henry Park", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry", submittedAt: "3 hours ago", score: 91, status: "graded", preview: "react-todo.zip" },
  { id: 7, assignmentId: 2, student: "Isla Wright", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=isla", submittedAt: "Yesterday", score: 76, status: "graded", preview: "submission.zip" },
  { id: 8, assignmentId: 3, student: "Jack Nguyen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jack", submittedAt: "2 days ago", score: 45, status: "graded", preview: "quiz-answers.pdf" },
  { id: 9, assignmentId: 3, student: "Karen Diaz", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karen", submittedAt: "2 days ago", score: 48, status: "graded", preview: "quiz-answers.pdf" },
  { id: 10, assignmentId: 4, student: "Liam Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liam", submittedAt: "6 hours ago", score: null, status: "pending", preview: "final-project.zip" },
];

export function AssignmentsPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [gradesOpen, setGradesOpen] = useState(false);
  // New state for preview modal of submissions
  const [previewOpen, setPreviewOpen] = useState(false);

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.course.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = (s) =>
    s === "active" ? "bg-green-500 text-white" :
      s === "completed" ? "bg-blue-500 text-white" :
        "bg-yellow-500 text-white";

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Assignments 📝</h1>
            <p className="text-muted-foreground">Create, manage and grade student assignments</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
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
                  <Input placeholder="e.g., Build a React Dashboard" />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                    <SelectContent>
                      {["Complete Web Development Bootcamp", "Advanced React & TypeScript", "JavaScript Essentials"].map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description / Instructions</Label>
                  <Textarea placeholder="Describe the assignment requirements..." rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Score</Label>
                    <Input type="number" placeholder="100" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Create Assignment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Preview Submissions Modal */}
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Submissions for {selectedAssignment?.title}</DialogTitle>
                <DialogDescription>Review submissions for this assignment</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                {selectedAssignment && submissions.filter((s) => s.assignmentId === selectedAssignment.id).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">No submissions yet for this assignment.</p>
                )}
                {selectedAssignment && submissions
                  .filter((s) => s.assignmentId === selectedAssignment.id)
                  .slice(0, 5)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center gap-2 p-2 border rounded hover:bg-muted/20"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={s.avatar} />
                        <AvatarFallback>{s.student[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{s.student}</p>
                        <p className="text-sm text-muted-foreground">{s.submittedAt}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Assignments", value: assignments.length, icon: FileText, color: "from-blue-500 to-cyan-500" },
            { label: "Active", value: assignments.filter(a => a.status === "active").length, icon: Clock, color: "from-green-500 to-emerald-500" },
            { label: "Pending Grading", value: submissions.filter(s => s.status === "pending").length, icon: AlertCircle, color: "from-yellow-500 to-orange-500" },
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-semibold line-clamp-1">{a.title}</p>
                          <p className="text-xs text-muted-foreground">{a.course}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge className={`text-xs ${statusColor(a.status)}`}>{a.status}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="h-3.5 w-3.5" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{a.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{a.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          <span>{a.submissions}/{a.total} submitted</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all" style={{ width: `${(a.submissions / a.total) * 100}%` }} />
                      </div>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedAssignment(a); setPreviewOpen(true); }}>
                        <Eye className="h-3.5 w-3.5 mr-2" />View Submissions
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="mt-4">
            <Card>
              <CardHeader><CardTitle>Recent Submissions</CardTitle><CardDescription>Grade and review student work</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                {submissions.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                    <div className="flex items-center gap-4 p-3 border rounded-xl hover:bg-muted/40 transition-colors">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={s.avatar} />
                        <AvatarFallback>{s.student[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{s.student}</p>
                        <p className="text-xs text-muted-foreground">{assignments.find(a => a.id === s.assignmentId)?.title}</p>
                        <p className="text-xs text-muted-foreground">Submitted {s.submittedAt}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {s.score !== null ? (
                          <Badge className="bg-green-500 text-white">{s.score}/100</Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                        <Button size="sm" variant={s.status === "pending" ? "default" : "outline"}>
                          {s.status === "pending" ? "Grade" : "View"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InstructorLayout>
  );
}