import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Award,
  Clock,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Heart,
  FileText,
  BarChart3,
  PlayCircle,
  GraduationCap,
  Trophy,
  Target,
  Search,
  Filter,
  CheckCircle2,
  Star,
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
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export function MyCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/my-courses", active: true },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
    { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
    { icon: Trophy, label: "Quiz", href: "/dashboard/quiz" },
    { icon: Target, label: "Progress Tracking", href: "/dashboard/progress" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const allCourses = [
    {
      id: 1,
      title: "Advanced React & TypeScript",
      instructor: "Michael Chen",
      progress: 65,
      status: "in-progress",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop",
      nextLesson: "State Management with Redux",
      duration: "2h 30m left",
      totalLessons: 48,
      completedLessons: 31,
      rating: 4.9,
      category: "Web Development",
      enrolledDate: "March 15, 2026",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Davis",
      progress: 45,
      status: "in-progress",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=220&fit=crop",
      nextLesson: "Prototyping in Figma",
      duration: "3h 15m left",
      totalLessons: 36,
      completedLessons: 16,
      rating: 4.8,
      category: "Design",
      enrolledDate: "April 2, 2026",
    },
    {
      id: 3,
      title: "Python for Data Science",
      instructor: "David Martinez",
      progress: 80,
      status: "in-progress",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=220&fit=crop",
      nextLesson: "Machine Learning Basics",
      duration: "1h 45m left",
      totalLessons: 52,
      completedLessons: 42,
      rating: 4.7,
      category: "Data Science",
      enrolledDate: "February 20, 2026",
    },
    {
      id: 4,
      title: "HTML & CSS Fundamentals",
      instructor: "Sarah Johnson",
      progress: 100,
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop",
      nextLesson: "Course Completed",
      duration: "Completed",
      totalLessons: 30,
      completedLessons: 30,
      rating: 4.6,
      category: "Web Development",
      enrolledDate: "January 10, 2026",
    },
    {
      id: 5,
      title: "JavaScript Basics",
      instructor: "Chris Williams",
      progress: 100,
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=220&fit=crop",
      nextLesson: "Course Completed",
      duration: "Completed",
      totalLessons: 40,
      completedLessons: 40,
      rating: 4.8,
      category: "Web Development",
      enrolledDate: "December 5, 2025",
    },
    {
      id: 6,
      title: "Node.js & Express Backend",
      instructor: "Alex Turner",
      progress: 0,
      status: "not-started",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop",
      nextLesson: "Introduction to Node.js",
      duration: "8h 20m total",
      totalLessons: 44,
      completedLessons: 0,
      rating: 4.9,
      category: "Backend",
      enrolledDate: "May 28, 2026",
    },
  ];

  const filtered = allCourses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "all") return matchesSearch;
    return matchesSearch && c.status === filter;
  });

  const stats = [
    { label: "Total Enrolled", value: allCourses.length, color: "from-blue-500 to-cyan-500" },
    { label: "In Progress", value: allCourses.filter(c => c.status === "in-progress").length, color: "from-yellow-500 to-orange-500" },
    { label: "Completed", value: allCourses.filter(c => c.status === "completed").length, color: "from-green-500 to-emerald-500" },
    { label: "Not Started", value: allCourses.filter(c => c.status === "not-started").length, color: "from-gray-400 to-gray-600" },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Courses 📚</h1>
            <p className="text-muted-foreground">Track and continue your learning journey</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            <Link to="/courses">Browse More Courses</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6 pb-4">
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your courses..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Courses Grid */}
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">{filtered.length} courses found</p>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="group hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {course.status === "completed" ? (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Completed
                          </Badge>
                        </div>
                      ) : course.status === "not-started" ? (
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary">Not Started</Badge>
                        </div>
                      ) : null}
                      <Button
                        size="icon"
                        className="absolute bottom-3 right-3 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all"
                      >
                        <PlayCircle className="h-5 w-5 text-primary" />
                      </Button>
                    </div>
                    <CardHeader className="pb-2">
                      <Badge variant="outline" className="w-fit text-xs mb-1">{course.category}</Badge>
                      <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">{course.instructor[0]}</AvatarFallback>
                        </Avatar>
                        {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-foreground font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{course.duration}</span>
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        variant={course.status === "completed" ? "outline" : "default"}
                        size="sm"
                      >
                        {course.status === "completed" ? "Review Course" : course.status === "not-started" ? "Start Learning" : "Continue Learning"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filtered.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Card className="group hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex gap-4 items-center">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-24 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <p className="font-semibold line-clamp-1">{course.title}</p>
                              <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </div>
                            <Badge
                              variant={course.status === "completed" ? "default" : course.status === "not-started" ? "secondary" : "outline"}
                              className={course.status === "completed" ? "bg-green-500" : ""}
                            >
                              {course.status === "in-progress" ? "In Progress" : course.status === "completed" ? "Completed" : "Not Started"}
                            </Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-4">
                            <div className="flex-1">
                              <Progress value={course.progress} className="h-1.5" />
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{course.progress}% • {course.completedLessons}/{course.totalLessons} lessons</span>
                          </div>
                        </div>
                        <Button size="sm" variant={course.status === "completed" ? "outline" : "default"} className="flex-shrink-0 hidden sm:flex">
                          {course.status === "completed" ? "Review" : course.status === "not-started" ? "Start" : "Continue"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

