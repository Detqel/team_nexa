import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

export function CoursesPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
  const navigate = useNavigate();
  const [userState, setUserState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  });

  const categories = [
    "All Categories",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Design",
    "Marketing",
    "AI & Machine Learning",
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 4.8,
      reviews: 15420,
      students: 52300,
      duration: "40 hours",
      lessons: 285,
      price: "$99.99",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      level: "Beginner",
      category: "Web Development",
      bestseller: true,
    },
    {
      id: 2,
      title: "Advanced React & TypeScript",
      instructor: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4.9,
      reviews: 12350,
      students: 38900,
      duration: "35 hours",
      lessons: 220,
      price: "$129.99",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      level: "Advanced",
      category: "Web Development",
      bestseller: false,
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 4.7,
      reviews: 9870,
      students: 28500,
      duration: "28 hours",
      lessons: 185,
      price: "$89.99",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      level: "Intermediate",
      category: "Design",
      bestseller: false,
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "David Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 4.9,
      reviews: 18200,
      students: 62100,
      duration: "45 hours",
      lessons: 310,
      price: "$119.99",
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
      level: "Intermediate",
      category: "Data Science",
      bestseller: true,
    },
    {
      id: 5,
      title: "Mobile App Development with React Native",
      instructor: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      rating: 4.6,
      reviews: 8450,
      students: 25300,
      duration: "32 hours",
      lessons: 195,
      price: "$109.99",
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop",
      level: "Intermediate",
      category: "Mobile Development",
      bestseller: false,
    },
    {
      id: 6,
      title: "Machine Learning A-Z",
      instructor: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      rating: 4.8,
      reviews: 14700,
      students: 48200,
      duration: "42 hours",
      lessons: 275,
      price: "$134.99",
      thumbnail:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
      level: "Advanced",
      category: "AI & Machine Learning",
      bestseller: true,
    },
  ];

  useEffect(() => {
    // persist the full course catalog client-side for dashboard lookups
    try {
      localStorage.setItem("allCourses", JSON.stringify(courses));
    } catch (e) {
      // ignore
    }
  }, []);

  const visibleCourses = useMemo(() => {
    let out = courses.slice();

    if (selectedCategories && selectedCategories.length > 0 && !selectedCategories.includes("All Categories")) {
      out = out.filter((c) => selectedCategories.includes(c.category));
    }

    if (selectedLevel && selectedLevel !== "all" && selectedLevel !== "All Levels") {
      out = out.filter((c) => c.level === selectedLevel);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      out = out.filter((c) => c.title.toLowerCase().includes(q));
    }

    const levelOrder = { Beginner: 1, Intermediate: 2, Advanced: 3, "All Levels": 2 };
    switch (sortOption) {
      case "title-asc":
        out.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        out.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        out.sort((a, b) => b.id - a.id);
        break;
      case "oldest":
        out.sort((a, b) => a.id - b.id);
        break;
      case "level-asc":
        out.sort((a, b) => (levelOrder[a.level] || 99) - (levelOrder[b.level] || 99));
        break;
      case "level-desc":
        out.sort((a, b) => (levelOrder[b.level] || 99) - (levelOrder[a.level] || 99));
        break;
      default:
        break;
    }

    return out;
  }, [courses, selectedCategories, selectedLevel, searchQuery, sortOption]);

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (e) {
      return null;
    }
  }

  function handleEnroll(courseId) {
    const u = getUser();
    if (!u) {
      navigate("/login");
      return;
    }
    u.enrolledCourses = u.enrolledCourses || [];
    u.courseProgress = u.courseProgress || {};
    if (!u.enrolledCourses.includes(courseId)) {
      u.enrolledCourses.push(courseId);
      u.courseProgress[courseId] = u.courseProgress[courseId] || 0;
      localStorage.setItem("user", JSON.stringify(u));
      setUserState({ ...u });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-muted/5 to-black py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Your Next{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Learning Adventure
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore 1,247 courses across all categories and skill levels
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for courses..."
                  className="pl-12 pr-4 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Category</Label>
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const isAll = category === "All Categories";
                        const checked = isAll ? selectedCategories.length === 0 : selectedCategories.includes(category);
                        return (
                          <div
                            key={category}
                            className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${checked ? "bg-muted/30" : ""}`}
                            onClick={() => {
                              if (isAll) {
                                setSelectedCategories([]);
                              } else {
                                setSelectedCategories((prev) => {
                                  if (prev.includes(category)) return prev.filter((c) => c !== category);
                                  return [...prev, category];
                                });
                              }
                            }}
                          >
                            <Checkbox id={category} checked={checked} onCheckedChange={() => {
                              if (isAll) {
                                setSelectedCategories([]);
                              } else {
                                setSelectedCategories((prev) => {
                                  if (prev.includes(category)) return prev.filter((c) => c !== category);
                                  return [...prev, category];
                                });
                              }
                            }} />
                            <label
                              htmlFor={category}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Level Filter */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Level</Label>
                    <div className="space-y-2">
                      {[
                        "All Levels",
                        "Beginner",
                        "Intermediate",
                        "Advanced",
                      ].map((level) => (
                        <div
                          key={level}
                          className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${selectedLevel === (level === "All Levels" ? "all" : level) ? "bg-muted/30" : ""}`}
                          onClick={() => setSelectedLevel(level === "All Levels" ? "all" : level)}
                        >
                          <Checkbox id={level} checked={selectedLevel === (level === "All Levels" ? "all" : level)} onCheckedChange={() => setSelectedLevel(level === "All Levels" ? "all" : level)} />
                          <label
                            htmlFor={level}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Price</Label>
                    <div className="space-y-2">
                      {[
                        "All Prices",
                        "Free",
                        "Paid",
                        "Under $50",
                        "$50 - $100",
                        "Over $100",
                      ].map((price) => (
                        <div
                          key={price}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={price} />
                          <label
                            htmlFor={price}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {price}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Rating</Label>
                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                        <div
                          key={rating}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`rating-${rating}`} />
                          <label
                            htmlFor={`rating-${rating}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {rating} & up
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Courses Grid */}
            <div className="lg:col-span-3 space-y-6">
              {/* Sort Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {visibleCourses.length}
                  </span>{" "}
                  courses
                </p>
                <Select value={sortOption} onValueChange={(v) => setSortOption(v)}>
                  <SelectTrigger className="w-full md:w-[220px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title-asc">Title A → Z</SelectItem>
                    <SelectItem value="title-desc">Title Z → A</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="level-asc">Level: Beginner → Advanced</SelectItem>
                    <SelectItem value="level-desc">Level: Advanced → Beginner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group cursor-pointer hover:shadow-xl transition-all h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {course.bestseller && (
                          <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                            Bestseller
                          </Badge>
                        )}
                        <Badge
                          variant="secondary"
                          className="absolute top-4 right-4"
                        >
                          {course.level}
                        </Badge>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="h-16 w-16 text-white" />
                        </div>
                      </div>
                      <CardHeader className="flex-1">
                        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={course.avatar} />
                            <AvatarFallback>
                              {course.instructor[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>{course.instructor}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {course.rating}
                            </span>
                            <span className="text-muted-foreground">
                              ({course.reviews.toLocaleString()})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{(course.students / 1000).toFixed(1)}k</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.lessons} lessons</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t pt-4">
                        <span className="text-2xl font-bold text-primary">
                          {course.price}
                        </span>
                        <Button
                          size="sm"
                          variant={userState?.enrolledCourses?.includes(course.id) ? "secondary" : "default"}
                          onClick={() => handleEnroll(course.id)}
                        >
                          {userState?.enrolledCourses?.includes(course.id) ? "Enrolled" : "Enroll Now"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 pt-8">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
