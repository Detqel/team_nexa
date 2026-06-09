import { motion } from "motion/react";
import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  BookOpen,
  Award,
  Clock,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Heart,
  FileText,
  BarChart3,
  CheckCircle2,
  PlayCircle,
  GraduationCap,
  Trophy,
  Target,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "../components/ui/sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export function StudentDashboard() {
  const location = useLocation();
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/my-courses" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
    { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
    { icon: Trophy, label: "Quiz", href: "/dashboard/quiz" },
    { icon: Target, label: "Progress Tracking", href: "/dashboard/progress" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: location.pathname === "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/my-courses", active: location.pathname === "/dashboard/my-courses" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist", active: location.pathname === "/dashboard/wishlist" },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates", active: location.pathname === "/dashboard/certificates" },
    { icon: FileText, label: "Assignments", href: "/dashboard/assignments", active: location.pathname === "/dashboard/assignments" },
    { icon: Trophy, label: "Quiz", href: "/dashboard/quiz", active: location.pathname === "/dashboard/quiz" },
    { icon: Target, label: "Progress Tracking", href: "/dashboard/progress", active: location.pathname === "/dashboard/progress" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", active: location.pathname === "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications", active: location.pathname === "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/settings", active: location.pathname === "/settings" },
  ];

  const stats = [
    {
      icon: BookOpen,
      label: "Enrolled Courses",
      value: "12",
      change: "+2",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: "8",
      change: "+3",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      label: "Hours Learned",
      value: "245",
      change: "+15",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      label: "Certificates",
      value: "5",
      change: "+1",
      color: "from-orange-500 to-red-500",
    },
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React & TypeScript",
      instructor: "Michael Chen",
      progress: 65,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      nextLesson: "State Management with Redux",
      duration: "2h 30m left",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Davis",
      progress: 45,
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      nextLesson: "Prototyping in Figma",
      duration: "3h 15m left",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "David Martinez",
      progress: 80,
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
      nextLesson: "Machine Learning Basics",
      duration: "1h 45m left",
    },
  ];

  const upcomingDeadlines = [
    {
      course: "Advanced React",
      task: "Final Project Submission",
      date: "May 25, 2026",
      priority: "high",
    },
    {
      course: "UI/UX Design",
      task: "Design Challenge",
      date: "May 27, 2026",
      priority: "medium",
    },
    {
      course: "Python Data Science",
      task: "Quiz 3",
      date: "May 30, 2026",
      priority: "low",
    },
  ];

  const recentActivity = [
    {
      type: "completed",
      course: "JavaScript Basics",
      lesson: "Async/Await",
      time: "2 hours ago",
    },
    {
      type: "started",
      course: "React Advanced",
      lesson: "Custom Hooks",
      time: "5 hours ago",
    },
    {
      type: "certificate",
      course: "HTML & CSS",
      lesson: "Certificate Earned",
      time: "1 day ago",
    },
    {
      type: "quiz",
      course: "Python Basics",
      lesson: "Quiz Score: 95%",
      time: "2 days ago",
    },
  ];

  const learningData = [
    { month: "Jan", hours: 20 },
    { month: "Feb", hours: 35 },
    { month: "Mar", hours: 45 },
    { month: "Apr", hours: 55 },
    { month: "May", hours: 65 },
  ];

  const courseProgressData = [
    { name: "Week 1", completed: 100 },
    { name: "Week 2", completed: 100 },
    { name: "Week 3", completed: 85 },
    { name: "Week 4", completed: 60 },
    { name: "Week 5", completed: 30 },
  ];

  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  const [allCourses, setAllCourses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("allCourses")) || [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      setAllCourses(JSON.parse(localStorage.getItem("allCourses")) || []);
      setUser(JSON.parse(localStorage.getItem("user")) || null);
    } catch (e) {}
  }, []);

  function updateUserStorage(next) {
    try {
      localStorage.setItem("user", JSON.stringify(next));
      setUser(next);
    } catch (e) {}
  }

  const enrolledDisplay = user && allCourses.length
    ? allCourses.filter((c) => user.enrolledCourses?.includes(c.id))
    : enrolledCourses;

  const sampleAssignments = {
    1: [
      { id: 101, title: "Build a Portfolio Website", due: "June 10, 2026" },
    ],
    2: [
      { id: 201, title: "Type-safe React Components", due: "June 12, 2026" },
    ],
    3: [
      { id: 301, title: "Design a Landing Page", due: "June 15, 2026" },
    ],
    4: [
      { id: 401, title: "Exploratory Data Analysis", due: "June 18, 2026" },
    ],
  };

  const sampleQuestions = {
    1: [
      { q: "React is...", options: ["Library", "Framework"], a: 0 },
    ],
    2: [
      { q: "TypeScript adds...", options: ["Types", "Styles"], a: 0 },
    ],
    3: [
      { q: "Figma is used for...", options: ["Design", "Backend"], a: 0 },
    ],
    4: [
      { q: "Pandas is a...", options: ["Library", "Language"], a: 0 },
    ],
  };

  const location = useLocation();
  const activeSub = location.pathname.split("/")[2] || "";

  function DashboardMain() {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || "Guest"}! 👋</h1>
            <p className="text-muted-foreground">Here's what's happening with your learning today</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={user ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=guest`} />
              <AvatarFallback>{(user && user.name?.[0]) || "G"}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="success" className="font-semibold">{stat.change}</Badge>
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Your learning hours over the past 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={learningData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Don't miss these important dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Calendar className={`h-5 w-5 mt-0.5 ${deadline.priority === "high" ? "text-red-500" : deadline.priority === "medium" ? "text-yellow-500" : "text-green-500"}`} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{deadline.task}</p>
                    <p className="text-xs text-muted-foreground">{deadline.course}</p>
                    <p className="text-xs text-muted-foreground mt-1">{deadline.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Continue Learning</h2>
            <Button variant="ghost" asChild>
              <Link to="/dashboard/my-courses">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledDisplay.map((course) => (
              <Card key={course.id} className="group hover:shadow-xl transition-all overflow-hidden">
                <div className="relative">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Button size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all">
                    <PlayCircle className="h-6 w-6 text-primary" />
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">{(user?.courseProgress?.[course.id] ?? course.progress ?? 0)}%</span>
                    </div>
                    <Progress value={user?.courseProgress?.[course.id] ?? course.progress ?? 0} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{course.nextLesson}</span>
                    <Badge variant="secondary">{course.duration}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className={`p-2 rounded-lg ${activity.type === "completed" ? "bg-green-100 dark:bg-green-900/20" : activity.type === "started" ? "bg-blue-100 dark:bg-blue-900/20" : activity.type === "certificate" ? "bg-purple-100 dark:bg-purple-900/20" : "bg-yellow-100 dark:bg-yellow-900/20"}`}>
                    {activity.type === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                    {activity.type === "started" && <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    {activity.type === "certificate" && <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                    {activity.type === "quiz" && <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.lesson}</p>
                    <p className="text-xs text-muted-foreground">{activity.course}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Completion rate by week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={courseProgressData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function MyCourses() {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledDisplay.length ? (
            enrolledDisplay.map((c) => (
              <Card key={c.id} className="group">
                <CardHeader>
                  <CardTitle>{c.title}</CardTitle>
                  <CardDescription>{c.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{c.duration} • {c.lessons || "-"} lessons</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent>
                <p className="text-sm">You have no enrolled courses. Visit the <Link to="/courses" className="text-primary">catalog</Link> to enroll.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  function Assignments() {
    const [selected, setSelected] = useState(enrolledDisplay[0]?.id || null);
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Assignments</h2>
        {!user || !user.enrolledCourses?.length ? (
          <Card>
            <CardContent>
              <p className="text-sm">No assignments yet. Enroll in a course to view assignments.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-3">
              <select value={selected || ""} onChange={(e) => setSelected(Number(e.target.value))} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {enrolledDisplay.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(sampleAssignments[selected] || []).map((a) => (
                <Card key={a.id}>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{a.title}</p>
                        <p className="text-xs text-muted-foreground">Due: {a.due}</p>
                      </div>
                      <Button>View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function QuizPage() {
    const [courseId, setCourseId] = useState(enrolledDisplay[0]?.id || null);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [started, setStarted] = useState(false);
    const qs = sampleQuestions[courseId] || [];

    function submitAnswer(choice) {
      if (!started) return;
      const correct = qs[index]?.a === choice;
      if (correct) setScore((s) => s + 1);
      const next = index + 1;
      if (next < qs.length) setIndex(next);
      else {
        // finished
        const percent = Math.round(((score + (correct ? 1 : 0)) / qs.length) * 100);
        const u = user || { enrolledCourses: [], courseProgress: {} };
        u.courseProgress = u.courseProgress || {};
        u.courseProgress[courseId] = Math.max(u.courseProgress[courseId] || 0, percent);
        updateUserStorage(u);
        setStarted(false);
        setIndex(0);
        setScore(0);
        alert(`Quiz finished. Score: ${percent}%`);
      }
    }

    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Quiz</h2>
        {!user || !user.enrolledCourses?.length ? (
          <Card>
            <CardContent>
              <p className="text-sm">No enrolled courses — enroll to take quizzes.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <select value={courseId || ""} onChange={(e) => setCourseId(Number(e.target.value))} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {enrolledDisplay.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            {qs.length === 0 ? (
              <Card>
                <CardContent>No quiz available for this course yet.</CardContent>
              </Card>
            ) : (
              <div>
                {!started ? (
                  <Button onClick={() => setStarted(true)}>Start Quiz ({qs.length} questions)</Button>
                ) : (
                  <Card>
                    <CardContent>
                      <p className="font-semibold">Question {index + 1}/{qs.length}</p>
                      <p className="mt-2">{qs[index].q}</p>
                      <div className="mt-4 space-y-2">
                        {qs[index].options.map((opt, i) => (
                          <Button key={i} variant="outline" onClick={() => submitAnswer(i)}>{opt}</Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  function ProgressPage() {
    const data = enrolledDisplay.map((c) => ({ name: c.title, progress: user?.courseProgress?.[c.id] ?? 0 }));
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Progress Tracking</h2>
        {!user || !user.enrolledCourses?.length ? (
          <Card>
            <CardContent>
              <p className="text-sm">No progress yet. Enroll and start courses to see progress here.</p>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {data.map((d) => (
                <Card key={d.name}>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">{d.name}</div>
                      <div className="font-semibold">{d.progress}%</div>
                    </div>
                    <Progress value={d.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">NexaLearn</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                        <Link
                          to={item.href}
                          className="flex items-center gap-3"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          {!activeSub ? (
            <DashboardMain />
          ) : activeSub === 'my-courses' ? (
            <MyCourses />
          ) : activeSub === 'assignments' ? (
            <Assignments />
          ) : activeSub === 'quiz' ? (
            <QuizPage />
          ) : activeSub === 'progress' ? (
            <ProgressPage />
          ) : null}
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, John! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your learning today
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden group hover:shadow-xl transition-all">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                        >
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="success" className="font-semibold">
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Learning Activity Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Learning Activity</CardTitle>
                  <CardDescription>
                    Your learning hours over the past 5 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={learningData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#6366f1"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>
                    Don't miss these important dates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <Calendar
                        className={`h-5 w-5 mt-0.5 ${
                          deadline.priority === "high"
                            ? "text-red-500"
                            : deadline.priority === "medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{deadline.task}</p>
                        <p className="text-xs text-muted-foreground">
                          {deadline.course}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {deadline.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/40">
                <Link to="/dashboard/my-courses">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">My Courses</p>
                      <p className="text-xs text-muted-foreground">12 enrolled courses</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
              <Card className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/40">
                <Link to="/dashboard/wishlist">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-500">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">Wishlist</p>
                      <p className="text-xs text-muted-foreground">5 saved courses</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
              <Card className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/40">
                <Link to="/dashboard/certificates">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold group-hover:text-primary transition-colors">Certificates</p>
                      <p className="text-xs text-muted-foreground">5 certificates earned</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </div>

            {/* Enrolled Courses */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
                <Button variant="ghost" asChild>
                  <Link to="/dashboard/my-courses">View All</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="group hover:shadow-xl transition-all overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Button
                        size="icon"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all"
                      >
                        <PlayCircle className="h-6 w-6 text-primary" />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">
                        {course.title}
                      </CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-semibold">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {course.nextLesson}
                        </span>
                        <Badge variant="secondary">{course.duration}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity & Course Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest learning milestones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-4 border-b last:border-0"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "completed"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : activity.type === "started"
                              ? "bg-blue-100 dark:bg-blue-900/20"
                              : activity.type === "certificate"
                                ? "bg-purple-100 dark:bg-purple-900/20"
                                : "bg-yellow-100 dark:bg-yellow-900/20"
                        }`}
                      >
                        {activity.type === "completed" && (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        )}
                        {activity.type === "started" && (
                          <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        )}
                        {activity.type === "certificate" && (
                          <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        )}
                        {activity.type === "quiz" && (
                          <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.lesson}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.course}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Course Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Completion rate by week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={courseProgressData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar
                        dataKey="completed"
                        fill="#6366f1"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
