import { motion } from "motion/react";
import { Link } from "react-router";
import {
  BookOpen, Award, Clock, TrendingUp, Calendar, MessageSquare,
  Bell, Settings, LogOut, Heart, FileText, BarChart3, CheckCircle2,
  PlayCircle, GraduationCap, Trophy, Target
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export function StudentDashboard() {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: true },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/my-courses" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
    { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
    { icon: Trophy, label: "Quiz", href: "/dashboard/quiz" },
    { icon: Target, label: "Progress Tracking", href: "/dashboard/progress" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const stats = [
    { icon: BookOpen, label: "Enrolled Courses", value: "12", change: "+2", color: "from-blue-500 to-cyan-500" },
    { icon: CheckCircle2, label: "Completed", value: "8", change: "+3", color: "from-green-500 to-emerald-500" },
    { icon: Clock, label: "Hours Learned", value: "245", change: "+15", color: "from-purple-500 to-pink-500" },
    { icon: Award, label: "Certificates", value: "5", change: "+1", color: "from-orange-500 to-red-500" },
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React & TypeScript",
      instructor: "Michael Chen",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      nextLesson: "State Management with Redux",
      duration: "2h 30m left",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Davis",
      progress: 45,
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
      nextLesson: "Prototyping in Figma",
      duration: "3h 15m left",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "David Martinez",
      progress: 80,
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&h=200&fit=crop",
      nextLesson: "Machine Learning Basics",
      duration: "1h 45m left",
    },
  ];

  const upcomingDeadlines = [
    { course: "Advanced React", task: "Final Project Submission", date: "May 25, 2026", priority: "high" },
    { course: "UI/UX Design", task: "Design Challenge", date: "May 27, 2026", priority: "medium" },
    { course: "Python Data Science", task: "Quiz 3", date: "May 30, 2026", priority: "low" },
  ];

  const recentActivity = [
    { type: "completed", course: "JavaScript Basics", lesson: "Async/Await", time: "2 hours ago" },
    { type: "started", course: "React Advanced", lesson: "Custom Hooks", time: "5 hours ago" },
    { type: "certificate", course: "HTML & CSS", lesson: "Certificate Earned", time: "1 day ago" },
    { type: "quiz", course: "Python Basics", lesson: "Quiz Score: 95%", time: "2 days ago" },
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
                      <SidebarMenuButton asChild isActive={item.active}>
                        <Link to={item.href} className="flex items-center gap-3">
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
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
                <p className="text-muted-foreground">Here's what's happening with your learning today</p>
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="success" className="font-semibold">
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
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

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Don't miss these important dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <Calendar className={`h-5 w-5 mt-0.5 ${
                        deadline.priority === "high" ? "text-red-500" :
                        deadline.priority === "medium" ? "text-yellow-500" : "text-green-500"
                      }`} />
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
                  <Card key={course.id} className="group hover:shadow-xl transition-all overflow-hidden">
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
                      <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
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

            {/* Recent Activity & Course Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                      <div className={`p-2 rounded-lg ${
                        activity.type === "completed" ? "bg-green-100 dark:bg-green-900/20" :
                        activity.type === "started" ? "bg-blue-100 dark:bg-blue-900/20" :
                        activity.type === "certificate" ? "bg-purple-100 dark:bg-purple-900/20" :
                        "bg-yellow-100 dark:bg-yellow-900/20"
                      }`}>
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

              {/* Course Progress Chart */}
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
        </div>
      </div>
    </SidebarProvider>
  );
}
