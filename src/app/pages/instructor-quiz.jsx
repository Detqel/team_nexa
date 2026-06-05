import { useState } from "react";
import { motion } from "motion/react";
import {
  Trophy, Plus, Edit, Trash2, Eye, MoreVertical, Search,
  CheckCircle2, XCircle, Clock, Users, BarChart3, HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "../components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { InstructorLayout } from "../components/instructor-sidebar";

const quizzes = [
  { id: 1, title: "HTML & CSS Fundamentals Quiz", course: "Complete Web Development Bootcamp", questions: 20, timeLimit: 30, attempts: 312, avgScore: 78, passRate: 85, status: "published", dueDate: "Jun 15, 2026" },
  { id: 2, title: "React Hooks Deep Dive", course: "Advanced React & TypeScript", questions: 15, timeLimit: 20, attempts: 145, avgScore: 72, passRate: 79, status: "published", dueDate: "Jun 12, 2026" },
  { id: 3, title: "JavaScript ES6+ Features", course: "JavaScript Essentials", questions: 25, timeLimit: 45, attempts: 89, avgScore: 81, passRate: 90, status: "published", dueDate: "Jun 5, 2026" },
  { id: 4, title: "Node.js Async Patterns", course: "Node.js & Express Backend", questions: 12, timeLimit: 15, attempts: 0, avgScore: 0, passRate: 0, status: "draft", dueDate: "Jun 30, 2026" },
];

const recentAttempts = [
  { student: "Alice Johnson", quiz: "HTML & CSS Fundamentals Quiz", score: 92, passed: true, time: "18 min", date: "2 hours ago" },
  { student: "Bob Smith", quiz: "React Hooks Deep Dive", score: 65, passed: false, time: "22 min", date: "3 hours ago" },
  { student: "Emma Davis", quiz: "JavaScript ES6+ Features", score: 88, passed: true, time: "35 min", date: "5 hours ago" },
  { student: "Frank Miller", quiz: "HTML & CSS Fundamentals Quiz", score: 74, passed: true, time: "28 min", date: "1 day ago" },
];

const sampleQuestions = [
  {
    id: 1, text: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"],
    correct: 0,
  },
  {
    id: 2, text: "Which HTML tag is used to define an internal style sheet?",
    options: ["<css>", "<script>", "<style>", "<link>"],
    correct: 2,
  },
];

export function QuizManagementPage() {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([{ id: 1, text: "", options: ["", "", "", ""], correct: 0 }]);

  const addQuestion = () => setQuestions(q => [...q, { id: Date.now(), text: "", options: ["", "", "", ""], correct: 0 }]);
  const removeQuestion = (id) => setQuestions(q => q.filter(x => x.id !== id));

  const filtered = quizzes.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Quiz Management 🏆</h1>
            <p className="text-muted-foreground">Create and manage quizzes to test student knowledge</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />Create Quiz
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Create New Quiz</DialogTitle></DialogHeader>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quiz Title</Label>
                    <Input placeholder="e.g., React Hooks Quiz" />
                  </div>
                  <div className="space-y-2">
                    <Label>Course</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                      <SelectContent>
                        {["Complete Web Development Bootcamp","Advanced React & TypeScript","JavaScript Essentials"].map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Limit (minutes)</Label>
                    <Input type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Passing Score (%)</Label>
                    <Input type="number" placeholder="70" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Questions ({questions.length})</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addQuestion}>
                      <Plus className="h-3.5 w-3.5 mr-1" />Add Question
                    </Button>
                  </div>
                  {questions.map((q, qi) => (
                    <Card key={q.id} className="border-dashed">
                      <CardContent className="pt-4 pb-3 space-y-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="flex-shrink-0">Q{qi + 1}</Badge>
                          <Input value={q.text} placeholder="Enter question text..." onChange={(e) =>
                            setQuestions(qs => qs.map(x => x.id === q.id ? { ...x, text: e.target.value } : x))
                          } />
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive flex-shrink-0" onClick={() => removeQuestion(q.id)}>
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <RadioGroup value={String(q.correct)} onValueChange={(v) =>
                          setQuestions(qs => qs.map(x => x.id === q.id ? { ...x, correct: parseInt(v) } : x))
                        }>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                            {q.options.map((opt, oi) => (
                              <div key={oi} className="flex items-center gap-2">
                                <RadioGroupItem value={String(oi)} id={`q${q.id}-o${oi}`} />
                                <Input value={opt} placeholder={`Option ${oi + 1}`} className="h-8 text-sm"
                                  onChange={(e) => setQuestions(qs => qs.map(x => x.id === q.id ? { ...x, options: x.options.map((o, i) => i === oi ? e.target.value : o) } : x))} />
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                        <p className="text-xs text-muted-foreground pl-4">Click the radio button next to the correct answer</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Save as Draft</Button>
                <Button onClick={() => setOpen(false)}>Publish Quiz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Quizzes", value: quizzes.length, icon: HelpCircle, color: "from-blue-500 to-cyan-500" },
            { label: "Total Attempts", value: quizzes.reduce((a, q) => a + q.attempts, 0), icon: Users, color: "from-green-500 to-emerald-500" },
            { label: "Avg Score", value: `${Math.round(quizzes.filter(q => q.attempts > 0).reduce((a, q) => a + q.avgScore, 0) / quizzes.filter(q => q.attempts > 0).length)}%`, icon: BarChart3, color: "from-purple-500 to-pink-500" },
            { label: "Avg Pass Rate", value: `${Math.round(quizzes.filter(q => q.attempts > 0).reduce((a, q) => a + q.passRate, 0) / quizzes.filter(q => q.attempts > 0).length)}%`, icon: Trophy, color: "from-orange-500 to-red-500" },
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
          <Input placeholder="Search quizzes..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <Tabs defaultValue="quizzes">
          <TabsList>
            <TabsTrigger value="quizzes">All Quizzes</TabsTrigger>
            <TabsTrigger value="attempts">Recent Attempts</TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((q, i) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={q.status === "published" ? "bg-green-500 text-white" : ""} variant={q.status === "published" ? "default" : "secondary"}>
                              {q.status}
                            </Badge>
                          </div>
                          <p className="font-semibold">{q.title}</p>
                          <p className="text-xs text-muted-foreground">{q.course}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setPreviewOpen(true)}><Eye className="h-4 w-4 mr-2" />Preview</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-muted/40 rounded-lg p-2">
                          <p className="text-lg font-bold">{q.questions}</p>
                          <p className="text-xs text-muted-foreground">Questions</p>
                        </div>
                        <div className="bg-muted/40 rounded-lg p-2">
                          <p className="text-lg font-bold">{q.timeLimit}m</p>
                          <p className="text-xs text-muted-foreground">Time Limit</p>
                        </div>
                        <div className="bg-muted/40 rounded-lg p-2">
                          <p className="text-lg font-bold">{q.attempts}</p>
                          <p className="text-xs text-muted-foreground">Attempts</p>
                        </div>
                      </div>

                      {q.attempts > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Avg Score</span>
                            <span className="font-semibold">{q.avgScore}%</span>
                          </div>
                          <Progress value={q.avgScore} className="h-1.5" />
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Pass Rate</span>
                            <span className={`font-semibold ${q.passRate >= 70 ? "text-green-600" : "text-red-500"}`}>{q.passRate}%</span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setPreviewOpen(true)}>
                          <Eye className="h-3.5 w-3.5 mr-1" />Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BarChart3 className="h-3.5 w-3.5 mr-1" />Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attempts" className="mt-4">
            <Card>
              <CardHeader><CardTitle>Recent Quiz Attempts</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {recentAttempts.map((a, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border rounded-xl hover:bg-muted/40 transition-colors">
                    <div className={`p-2 rounded-full ${a.passed ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
                      {a.passed ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{a.student}</p>
                      <p className="text-xs text-muted-foreground">{a.quiz}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${a.passed ? "text-green-600" : "text-red-500"}`}>{a.score}%</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />{a.time}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">{a.date}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Modal */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Quiz Preview: HTML & CSS Fundamentals</DialogTitle></DialogHeader>
            <div className="space-y-5">
              {sampleQuestions.map((q, i) => (
                <div key={q.id} className="space-y-3">
                  <p className="font-medium">Q{i + 1}. {q.text}</p>
                  <RadioGroup defaultValue={String(q.correct)}>
                    {q.options.map((opt, oi) => (
                      <div key={oi} className={`flex items-center gap-2 p-2 rounded-lg ${oi === q.correct ? "bg-green-50 dark:bg-green-950/30 border border-green-200" : "hover:bg-muted/40"}`}>
                        <RadioGroupItem value={String(oi)} id={`prev-q${q.id}-o${oi}`} />
                        <Label htmlFor={`prev-q${q.id}-o${oi}`} className="cursor-pointer">{opt}</Label>
                        {oi === q.correct && <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />}
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </InstructorLayout>
  );
}
