import { useState } from "react";
import { motion } from "motion/react";
import {
  Trophy, Plus, Edit, Trash2, Eye, MoreVertical, Search,
  CheckCircle2, XCircle, Clock, Users, BarChart3, HelpCircle,
  TrendingUp, TrendingDown, Award, Target, AlertTriangle,
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

// Per-question breakdown used in the Analytics preview modal.
// Keyed loosely by quiz id so each quiz can show a distinct analytics story.
const quizAnalytics = {
  1: {
    scoreDistribution: [
      { range: "90-100%", count: 78, color: "bg-emerald-500" },
      { range: "80-89%", count: 96, color: "bg-green-500" },
      { range: "70-79%", count: 74, color: "bg-yellow-500" },
      { range: "60-69%", count: 41, color: "bg-orange-500" },
      { range: "Below 60%", count: 23, color: "bg-red-500" },
    ],
    questionStats: [
      { q: "What does CSS stand for?", correctPct: 94 },
      { q: "Which tag defines an internal style sheet?", correctPct: 88 },
      { q: "What is the default position value?", correctPct: 61 },
      { q: "Which property controls text size?", correctPct: 90 },
      { q: "How do you select an element by class?", correctPct: 70 },
    ],
    avgTime: "19 min",
    medianScore: 80,
    completionRate: 96,
  },
  2: {
    scoreDistribution: [
      { range: "90-100%", count: 22, color: "bg-emerald-500" },
      { range: "80-89%", count: 31, color: "bg-green-500" },
      { range: "70-79%", count: 38, color: "bg-yellow-500" },
      { range: "60-69%", count: 34, color: "bg-orange-500" },
      { range: "Below 60%", count: 20, color: "bg-red-500" },
    ],
    questionStats: [
      { q: "What does useEffect's cleanup function do?", correctPct: 58 },
      { q: "When does useMemo recompute its value?", correctPct: 66 },
      { q: "What problem does useCallback solve?", correctPct: 71 },
      { q: "Can you call hooks conditionally?", correctPct: 91 },
      { q: "What triggers a re-render with useState?", correctPct: 84 },
    ],
    avgTime: "21 min",
    medianScore: 73,
    completionRate: 91,
  },
  3: {
    scoreDistribution: [
      { range: "90-100%", count: 29, color: "bg-emerald-500" },
      { range: "80-89%", count: 27, color: "bg-green-500" },
      { range: "70-79%", count: 18, color: "bg-yellow-500" },
      { range: "60-69%", count: 11, color: "bg-orange-500" },
      { range: "Below 60%", count: 4, color: "bg-red-500" },
    ],
    questionStats: [
      { q: "What does the spread operator do?", correctPct: 92 },
      { q: "How does destructuring work on objects?", correctPct: 87 },
      { q: "What is a template literal?", correctPct: 95 },
      { q: "How do arrow functions handle `this`?", correctPct: 68 },
      { q: "What does Promise.all() return?", correctPct: 74 },
    ],
    avgTime: "38 min",
    medianScore: 83,
    completionRate: 97,
  },
  4: {
    scoreDistribution: [
      { range: "90-100%", count: 0, color: "bg-emerald-500" },
      { range: "80-89%", count: 0, color: "bg-green-500" },
      { range: "70-79%", count: 0, color: "bg-yellow-500" },
      { range: "60-69%", count: 0, color: "bg-orange-500" },
      { range: "Below 60%", count: 0, color: "bg-red-500" },
    ],
    questionStats: [],
    avgTime: "—",
    medianScore: 0,
    completionRate: 0,
  },
};

export function QuizManagementPage() {
  const [open, setOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([{ id: 1, text: "", options: ["", "", "", ""], correct: 0 }]);

  const addQuestion = () => setQuestions(q => [...q, { id: Date.now(), text: "", options: ["", "", "", ""], correct: 0 }]);
  const removeQuestion = (id) => setQuestions(q => q.filter(x => x.id !== id));

  const openAnalytics = (quiz) => {
    setActiveQuiz(quiz);
    setAnalyticsOpen(true);
  };

  const filtered = quizzes.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.course.toLowerCase().includes(search.toLowerCase())
  );

  const activeAnalytics = activeQuiz ? quizAnalytics[activeQuiz.id] : null;
  const maxDistCount = activeAnalytics ? Math.max(...activeAnalytics.scoreDistribution.map(d => d.count), 1) : 1;

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
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => openAnalytics(q)}>
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

        {/* Quiz Preview Modal */}
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

        {/* Analytics Preview Modal */}
        <Dialog open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-500" />
                Analytics: {activeQuiz?.title}
              </DialogTitle>
              <CardDescription>{activeQuiz?.course}</CardDescription>
            </DialogHeader>

            {activeQuiz && activeAnalytics && (
              <div className="space-y-6">
                {activeQuiz.attempts === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <BarChart3 className="h-10 w-10 mx-auto mb-3 opacity-40" />
                    <p className="font-medium">No attempts yet</p>
                    <p className="text-sm">Publish this quiz to start collecting analytics.</p>
                  </div>
                ) : (
                  <>
                    {/* Top summary metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Attempts", value: activeQuiz.attempts, icon: Users, color: "from-blue-500 to-cyan-500" },
                        { label: "Avg Score", value: `${activeQuiz.avgScore}%`, icon: Target, color: "from-purple-500 to-pink-500" },
                        { label: "Median Score", value: `${activeAnalytics.medianScore}%`, icon: Award, color: "from-orange-500 to-amber-500" },
                        { label: "Pass Rate", value: `${activeQuiz.passRate}%`, icon: Trophy, color: "from-green-500 to-emerald-500" },
                      ].map((m, i) => (
                        <Card key={i}>
                          <CardContent className="p-3.5">
                            <div className={`p-1.5 rounded-md bg-gradient-to-br ${m.color} w-fit mb-2`}>
                              <m.icon className="h-3.5 w-3.5 text-white" />
                            </div>
                            <p className="text-lg font-bold leading-tight">{m.value}</p>
                            <p className="text-xs text-muted-foreground">{m.label}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />Avg completion time: <span className="font-medium text-foreground">{activeAnalytics.avgTime}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />Completion rate: <span className="font-medium text-foreground">{activeAnalytics.completionRate}%</span>
                      </span>
                    </div>

                    {/* Score distribution */}
                    <div className="space-y-2.5">
                      <p className="text-sm font-semibold flex items-center gap-1.5">
                        <BarChart3 className="h-4 w-4 text-indigo-500" />Score Distribution
                      </p>
                      <div className="space-y-2">
                        {activeAnalytics.scoreDistribution.map((d, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs w-20 text-muted-foreground flex-shrink-0">{d.range}</span>
                            <div className="flex-1 h-5 bg-muted/40 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${d.color} rounded-full transition-all`}
                                style={{ width: `${(d.count / maxDistCount) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold w-8 text-right flex-shrink-0">{d.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Per-question breakdown */}
                    <div className="space-y-2.5">
                      <p className="text-sm font-semibold flex items-center gap-1.5">
                        <HelpCircle className="h-4 w-4 text-indigo-500" />Question Performance
                      </p>
                      <div className="space-y-2">
                        {activeAnalytics.questionStats.map((qs, i) => (
                          <div key={i} className="flex items-center gap-3 p-2.5 border rounded-lg">
                            <Badge variant="outline" className="flex-shrink-0">Q{i + 1}</Badge>
                            <p className="text-sm flex-1 truncate">{qs.q}</p>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              {qs.correctPct >= 75 ? (
                                <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                              ) : qs.correctPct < 65 ? (
                                <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                              ) : (
                                <TrendingDown className="h-3.5 w-3.5 text-orange-500" />
                              )}
                              <span className={`text-sm font-bold ${qs.correctPct >= 75 ? "text-green-600" : qs.correctPct < 65 ? "text-red-500" : "text-orange-500"}`}>
                                {qs.correctPct}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {activeAnalytics.questionStats.some(qs => qs.correctPct < 65) && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                          <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
                          Questions below 65% may need a clearer explanation or rewording.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setAnalyticsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </InstructorLayout>
  );
}