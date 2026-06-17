import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  PlayCircle,
  Trophy,
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
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { getUser } from "../lib/auth";
import { coursesApi } from "../lib/api";

export function StudentDashboard() {
  const user = getUser();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesApi
      .getEnrolled()
      .then((data) => setEnrolledCourses(data.courses || []))
      .catch(() => setEnrolledCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      icon: BookOpen,
      label: "Enrolled Courses",
      value: String(enrolledCourses.length),
      change: enrolledCourses.length > 0 ? "Active" : "—",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: CheckCircle2,
      label: "Completed",
      value: String(enrolledCourses.filter((c) => c.progress >= 100).length),
      change: "—",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      label: "Hours Learned",
      value: String(enrolledCourses.reduce((sum, c) => sum + (c.durationHours || 0), 0)),
      change: "—",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      label: "Certificates",
      value: String(enrolledCourses.filter((c) => c.progress >= 100).length),
      change: "—",
      color: "from-orange-500 to-red-500",
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

  const displayCourses = enrolledCourses.slice(0, 3);

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title={`Welcome back, ${user?.name || "Student"}! 👋`}
        description="Here's what's happening with your learning today"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
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
                  <Badge variant="secondary" className="font-semibold">{stat.change}</Badge>
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
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <Calendar
                  className={`h-5 w-5 mt-0.5 shrink-0 ${deadline.priority === "high"
                      ? "text-red-500"
                      : deadline.priority === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                />
                <div className="flex-1 min-w-0">
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

        {loading ? (
          <p className="text-muted-foreground text-sm">Loading your courses...</p>
        ) : displayCourses.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
              <Button asChild>
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses.map((course) => (
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
                      <span className="font-semibold">{course.progress || 0}%</span>
                    </div>
                    <Progress value={course.progress || 0} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{course.duration}</span>
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
                <div
                  className={`p-2 rounded-lg shrink-0 ${activity.type === "completed"
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
                <div className="flex-1 min-w-0">
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
    </StudentDashboardLayout>
  );
}