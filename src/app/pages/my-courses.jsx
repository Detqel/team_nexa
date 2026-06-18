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
  Heart,
  FileText,
  BarChart3,
  PlayCircle,
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
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "sonner";

const WISHLIST_KEY = "nexa_wishlist_ids";

function getStoredWishlistIds() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveWishlistIds(ids) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}

function WishlistHeartButton({ courseId, wishlisted, onToggle }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(courseId);
      }}
      className={[
        "absolute top-3 left-3 z-10",
        "w-8 h-8 rounded-full flex items-center justify-center",
        "bg-white/90 backdrop-blur-sm shadow-md",
        "border border-white/50",
        "transition-all duration-200 hover:scale-110 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1",
      ].join(" ")}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={[
          "h-4 w-4 transition-all duration-200",
          wishlisted
            ? "fill-rose-500 text-rose-500 scale-110"
            : "text-gray-400 hover:text-rose-400",
        ].join(" ")}
      />
    </button>
  );
}

export function MyCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [wishlistedIds, setWishlistedIds] = useState(() => new Set(getStoredWishlistIds()));

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
      price: 29.99,
      originalPrice: 99.99,
      level: "Advanced",
      students: 18420,
      bestseller: true,
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
      price: 24.99,
      originalPrice: 84.99,
      level: "Intermediate",
      students: 11230,
      bestseller: false,
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
      price: 34.99,
      originalPrice: 109.99,
      level: "Intermediate",
      students: 22100,
      bestseller: true,
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
      price: 19.99,
      originalPrice: 59.99,
      level: "Beginner",
      students: 34500,
      bestseller: false,
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
      price: 22.99,
      originalPrice: 79.99,
      level: "Beginner",
      students: 41200,
      bestseller: true,
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
      price: 27.99,
      originalPrice: 89.99,
      level: "Intermediate",
      students: 9870,
      bestseller: false,
    },
  ];

  const toggleWishlist = (courseId) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      const course = allCourses.find((c) => c.id === courseId);
      if (next.has(courseId)) {
        next.delete(courseId);
        toast.success(`Removed "${course?.title}" from wishlist`, { icon: "🤍", duration: 2000 });
      } else {
        next.add(courseId);
        toast.success(`Added "${course?.title}" to wishlist`, { icon: "❤️", duration: 2000 });
      }
      saveWishlistIds([...next]);
      return next;
    });
  };

  const filtered = allCourses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "wishlisted") return matchesSearch && wishlistedIds.has(c.id);
    return matchesSearch && c.status === filter;
  });

  const stats = [
    { label: "Total Enrolled", value: allCourses.length,                                         color: "from-blue-500 to-cyan-500"     },
    { label: "In Progress",    value: allCourses.filter(c => c.status === "in-progress").length,  color: "from-yellow-500 to-orange-500" },
    { label: "Completed",      value: allCourses.filter(c => c.status === "completed").length,    color: "from-green-500 to-emerald-500" },
    { label: "Wishlisted",     value: wishlistedIds.size,                                         color: "from-rose-500 to-pink-500"     },
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
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
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
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="not-started">Not Started</SelectItem>
              <SelectItem value="wishlisted">
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                  Wishlisted
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Courses */}
        <Tabs defaultValue="grid">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">{filtered.length} courses found</p>
            <TabsList>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </div>

          {/* Grid View */}
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((course, index) => (
                <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                  <Card className="group hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                    <div className="relative">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* ❤️ Heart — top-left */}
                      <WishlistHeartButton
                        courseId={course.id}
                        wishlisted={wishlistedIds.has(course.id)}
                        onToggle={toggleWishlist}
                      />

                      {/* Status badge — top-right */}
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

                      <Button size="icon" className="absolute bottom-3 right-3 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all">
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

                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          variant={course.status === "completed" ? "outline" : "default"}
                          size="sm"
                        >
                          {course.status === "completed" ? "Review Course" : course.status === "not-started" ? "Start Learning" : "Continue Learning"}
                        </Button>
                        {/* ❤️ heart button in card footer */}
                        <Button
                          variant="outline"
                          size="sm"
                          className={[
                            "px-2.5 transition-colors",
                            wishlistedIds.has(course.id)
                              ? "border-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800"
                              : "hover:border-rose-300 hover:bg-rose-50",
                          ].join(" ")}
                          onClick={() => toggleWishlist(course.id)}
                          title={wishlistedIds.has(course.id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <Heart
                            className={[
                              "h-4 w-4 transition-all",
                              wishlistedIds.has(course.id) ? "fill-rose-500 text-rose-500" : "text-gray-400",
                            ].join(" ")}
                          />
                        </Button>
                      </div>
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

          {/* List View */}
          <TabsContent value="list">
            <div className="space-y-4">
              {filtered.map((course, index) => (
                <motion.div key={course.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
                  <Card className="group hover:shadow-lg transition-all">
                    <CardContent className="p-4">
                      <div className="flex gap-4 items-center">
                        <div className="relative w-24 h-16 flex-shrink-0">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-full rounded-lg object-cover"
                          />
                          {/* ❤️ heart on list thumbnail */}
                          <button
                            onClick={() => toggleWishlist(course.id)}
                            className={[
                              "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-white",
                              wishlistedIds.has(course.id) ? "bg-rose-500" : "bg-white hover:bg-rose-50",
                            ].join(" ")}
                            title={wishlistedIds.has(course.id) ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart
                              className={[
                                "h-3 w-3 transition-all",
                                wishlistedIds.has(course.id) ? "fill-white text-white" : "text-gray-400",
                              ].join(" ")}
                            />
                          </button>
                        </div>

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
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {course.progress}% • {course.completedLessons}/{course.totalLessons} lessons
                            </span>
                          </div>
                        </div>

                        <div className="flex-shrink-0 hidden sm:flex gap-2">
                          <Button size="sm" variant={course.status === "completed" ? "outline" : "default"}>
                            {course.status === "completed" ? "Review" : course.status === "not-started" ? "Start" : "Continue"}
                          </Button>
                        </div>
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