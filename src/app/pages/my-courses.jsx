import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  PlayCircle,
  Search,
  Filter,
  CheckCircle2,
  Star,
  Heart,
  Trash2,
  ShoppingCart,
  Users,
  Play,
  GraduationCap,
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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { coursesApi } from "../lib/api";
import { getUser, updateStoredUser } from "../lib/auth";
import { toast } from "sonner";

// ── shared localStorage keys — must match CoursesPage & WishlistPage ─────────
const WISHLIST_KEY          = "nexa_wishlist_ids";
const WISHLIST_COURSES_KEY  = "nexa_wishlist_courses";
const PUBLISHED_COURSES_KEY = "nexa_published_courses";

// ── localStorage helpers ─────────────────────────────────────────────────────
function getStoredWishlistIds() {
  try { return new Set(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]")); }
  catch { return new Set(); }
}
function saveWishlistIds(ids) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify([...ids]));
}
function getStoredWishlistCourses() {
  try { return JSON.parse(localStorage.getItem(WISHLIST_COURSES_KEY) || "[]"); }
  catch { return []; }
}
function saveWishlistCourses(courses) {
  localStorage.setItem(WISHLIST_COURSES_KEY, JSON.stringify(courses));
}
function getPublishedCourses() {
  try { return JSON.parse(localStorage.getItem(PUBLISHED_COURSES_KEY) || "[]"); }
  catch { return []; }
}
function normalizePublished(course) {
  return {
    reviews: 0, students: 0, rating: 0, bestseller: false,
    duration: course.duration || (course.totalLessons ? `${Math.ceil(course.totalLessons * 0.5)}h total` : "N/A"),
    lessons: course.totalLessons || course.lessons || 0,
    ...course,
  };
}

function formatPrice(price) {
  if (price === 0) return "Free";
  return `$${Number(price).toFixed(2)}`;
}

export function MyCoursesPage() {
  // ── enrolled ──────────────────────────────────────────────────────────────
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingEnrolled, setLoadingEnrolled] = useState(true);
  const [searchTerm,      setSearchTerm]      = useState("");
  const [filter,          setFilter]          = useState("all");

  // ── wishlist (localStorage) ───────────────────────────────────────────────
  const [wishlistedIds,         setWishlistedIds]         = useState(() => getStoredWishlistIds());
  const [storedWishlistCourses, setStoredWishlistCourses] = useState(() => getStoredWishlistCourses());
  const [savedSearchTerm,       setSavedSearchTerm]       = useState("");

  // ── all courses tab ───────────────────────────────────────────────────────
  const [allCourses,    setAllCourses]    = useState([]);
  const [loadingAll,    setLoadingAll]    = useState(true);
  const [allSearch,     setAllSearch]     = useState("");
  const [debouncedAll,  setDebouncedAll]  = useState("");
  const [allSort,       setAllSort]       = useState("title-asc");
  const [userState,     setUserState]     = useState(() => getUser());

  // Derive wishlist
  const wishlistCourses = storedWishlistCourses.filter((c) => wishlistedIds.has(c.id));

  // ── debounce all-courses search ───────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setDebouncedAll(allSearch), 300);
    return () => clearTimeout(t);
  }, [allSearch]);

  // ── load enrolled ─────────────────────────────────────────────────────────
  useEffect(() => {
    coursesApi
      .getEnrolled()
      .then((data) => setEnrolledCourses(data.courses || data.enrolledCourses || []))
      .catch(() => setEnrolledCourses([]))
      .finally(() => setLoadingEnrolled(false));
  }, []);

  // ── fetch all courses ─────────────────────────────────────────────────────
  const fetchAllCourses = useCallback(async () => {
    setLoadingAll(true);
    try {
      const params = { sort: allSort };
      if (debouncedAll.trim()) params.search = debouncedAll.trim();

      const data       = await coursesApi.getAll(params);
      const apiCourses = data.courses || [];
      const apiIds     = new Set(apiCourses.map((c) => c.id));

      const localPublished = getPublishedCourses()
        .map(normalizePublished)
        .filter((c) => !apiIds.has(c.id));

      // simple client-side text filter for local courses
      const filteredLocal = debouncedAll.trim()
        ? localPublished.filter((c) => {
            const q = debouncedAll.toLowerCase();
            return c.title?.toLowerCase().includes(q) || c.instructor?.toLowerCase().includes(q);
          })
        : localPublished;

      setAllCourses([...filteredLocal, ...apiCourses]);
    } catch {
      toast.error("Failed to load courses.");
      setAllCourses([]);
    } finally {
      setLoadingAll(false);
    }
  }, [debouncedAll, allSort]);

  useEffect(() => { fetchAllCourses(); }, [fetchAllCourses]);

  // ── sync localStorage from other tabs ────────────────────────────────────
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === WISHLIST_KEY)          setWishlistedIds(getStoredWishlistIds());
      if (e.key === WISHLIST_COURSES_KEY)  setStoredWishlistCourses(getStoredWishlistCourses());
      if (e.key === PUBLISHED_COURSES_KEY) fetchAllCourses();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── shared wishlist toggle (works across all three tabs) ──────────────────
  const toggleWishlist = (courseId) => {
    const course =
      allCourses.find((c) => c.id === courseId) ||
      enrolledCourses.find((c) => c.id === courseId) ||
      storedWishlistCourses.find((c) => c.id === courseId);

    setWishlistedIds((prev) => {
      const next     = new Set(prev);
      const removing = next.has(courseId);

      if (removing) {
        next.delete(courseId);
        toast.success(`Removed "${course?.title}" from wishlist`, { icon: "🤍", duration: 2000 });
      } else {
        next.add(courseId);
        toast.success(`Added "${course?.title}" to wishlist`, { icon: "❤️", duration: 2000 });
      }

      saveWishlistIds(next);

      if (course) {
        const stored = getStoredWishlistCourses();
        if (!removing) {
          if (!stored.find((c) => c.id === courseId)) {
            const updated = [...stored, course];
            saveWishlistCourses(updated);
            setStoredWishlistCourses(updated);
          }
        } else {
          const updated = stored.filter((c) => c.id !== courseId);
          saveWishlistCourses(updated);
          setStoredWishlistCourses(updated);
        }
      }

      return next;
    });
  };

  // ── enroll (used in All Courses tab) ─────────────────────────────────────
  const handleEnroll = async (courseId) => {
    const user = getUser();
    if (!user) { toast.error("Please log in to enroll."); return; }
    if (user.enrolledCourses?.includes(courseId)) {
      toast.info("You are already enrolled in this course.");
      return;
    }
    try {
      const data = await coursesApi.enroll(courseId);
      const updatedUser = { ...user, enrolledCourses: data.enrolledCourses, courseProgress: data.courseProgress };
      updateStoredUser(updatedUser);
      setUserState(updatedUser);

      const justEnrolled = allCourses.find((c) => c.id === courseId);
      if (justEnrolled) setEnrolledCourses((prev) => [...prev, { ...justEnrolled, progress: 0 }]);

      toast.success("Successfully enrolled!");
    } catch (error) {
      toast.error(error.message || "Enrollment failed.");
    }
  };

  // ── enroll from saved tab ─────────────────────────────────────────────────
  const handleEnrollFromSaved = async (courseId) => {
    try {
      const data = await coursesApi.enroll(courseId);
      const user = getUser();
      if (user) updateStoredUser({ ...user, enrolledCourses: data.enrolledCourses, courseProgress: data.courseProgress });
      setUserState(getUser());

      const justEnrolled = wishlistCourses.find((c) => c.id === courseId);
      if (justEnrolled) setEnrolledCourses((prev) => [...prev, { ...justEnrolled, progress: 0 }]);

      toast.success("Successfully enrolled!");
    } catch (error) {
      toast.error(error.message || "Enrollment failed");
    }
  };

  // ── remove from saved ─────────────────────────────────────────────────────
  const removeFromSaved = (id) => {
    const course = storedWishlistCourses.find((c) => c.id === id);
    setWishlistedIds((prev) => { const next = new Set(prev); next.delete(id); saveWishlistIds(next); return next; });
    setStoredWishlistCourses((prev) => { const next = prev.filter((c) => c.id !== id); saveWishlistCourses(next); return next; });
    toast.success(`Removed "${course?.title}" from wishlist`, { icon: "🤍", duration: 2000 });
  };

  // ── status helper ─────────────────────────────────────────────────────────
  const getStatus = (course) => {
    if (course.status) return course.status;
    const p = course.progress ?? 0;
    if (p >= 100) return "completed";
    if (p > 0)    return "in-progress";
    return "not-started";
  };

  // ── filtered lists ────────────────────────────────────────────────────────
  const filteredEnrolled = enrolledCourses.filter((c) => {
    const match = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return filter === "all" ? match : match && getStatus(c) === filter;
  });

  const filteredSaved = wishlistCourses.filter(
    (c) => c.title?.toLowerCase().includes(savedSearchTerm.toLowerCase()) ||
            c.instructor?.toLowerCase().includes(savedSearchTerm.toLowerCase())
  );

  const enrolledIds = new Set(
    [...enrolledCourses.map((c) => c.id), ...(userState?.enrolledCourses || [])]
  );

  const stats = [
    { label: "Total Enrolled", value: enrolledCourses.length,                                               color: "from-blue-500 to-cyan-500"    },
    { label: "In Progress",    value: enrolledCourses.filter((c) => getStatus(c) === "in-progress").length, color: "from-yellow-500 to-orange-500" },
    { label: "Completed",      value: enrolledCourses.filter((c) => getStatus(c) === "completed").length,   color: "from-green-500 to-emerald-500" },
    { label: "Saved",          value: wishlistCourses.length,                                               color: "from-pink-500 to-rose-500"     },
  ];

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="My Courses 📚"
        description="Track your learning journey and discover new courses"
        action={
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            <Link to="/courses">Browse All Courses</Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="text-center">
              <CardContent className="pt-6 pb-4">
                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="enrolled">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="enrolled">
            Enrolled ({enrolledCourses.length})
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Heart className="h-3.5 w-3.5 mr-1.5" />
            Saved ({wishlistCourses.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            <GraduationCap className="h-3.5 w-3.5 mr-1.5" />
            All Courses ({allCourses.length})
          </TabsTrigger>
        </TabsList>

        {/* ══ ENROLLED TAB ══ */}
        <TabsContent value="enrolled" className="space-y-6 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search your courses..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loadingEnrolled ? (
            <p className="text-muted-foreground text-sm py-8 text-center">Loading your courses...</p>
          ) : filteredEnrolled.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search or browse the All Courses tab.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEnrolled.map((course, index) => {
                const status      = getStatus(course);
                const isWishlisted = wishlistedIds.has(course.id);
                return (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                    <Card className="group hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                      <div className="relative">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* ❤️ Heart */}
                        <button
                          onClick={() => toggleWishlist(course.id)}
                          className={["absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-white/60 transition-all duration-200 hover:scale-110 active:scale-95",
                            isWishlisted ? "bg-rose-500" : "bg-white/90 backdrop-blur-sm hover:bg-white"].join(" ")}
                          title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                        >
                          <Heart className={["h-4 w-4 transition-all duration-200", isWishlisted ? "fill-white text-white" : "text-rose-400"].join(" ")} />
                        </button>

                        {status === "completed" ? (
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-green-500 text-white"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>
                          </div>
                        ) : status === "not-started" ? (
                          <div className="absolute top-3 right-3"><Badge variant="secondary">Not Started</Badge></div>
                        ) : null}

                        <Button size="icon" className="absolute bottom-3 right-3 rounded-full bg-white/90 hover:bg-white hover:scale-110 transition-all" asChild>
                          <Link to={`/learn/${course.id}`}><PlayCircle className="h-5 w-5 text-primary" /></Link>
                        </Button>
                      </div>

                      <CardHeader className="pb-2">
                        <Badge variant="outline" className="w-fit text-xs mb-1">{course.category}</Badge>
                        <CardTitle className="text-base line-clamp-2">{course.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Avatar className="h-5 w-5"><AvatarFallback className="text-xs">{course.instructor[0]}</AvatarFallback></Avatar>
                          {course.instructor}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="flex-1 space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{course.progress ?? 0}%</span>
                          </div>
                          <Progress value={course.progress ?? 0} className="h-2" />
                          {course.completedLessons != null && course.totalLessons != null && (
                            <p className="text-xs text-muted-foreground mt-1">{course.completedLessons}/{course.totalLessons} lessons</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-foreground font-medium">{course.rating}</span>
                          </div>
                          {course.duration && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" /><span className="text-xs">{course.duration}</span>
                            </div>
                          )}
                        </div>
                        <Button asChild className="w-full" variant={status === "completed" ? "outline" : "default"} size="sm">
                          <Link to={`/learn/${course.id}`}>
                            {status === "completed" ? "Review Course" : status === "not-started" ? "Start Learning" : "Continue Learning"}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ══ SAVED TAB ══ */}
        <TabsContent value="saved" className="space-y-6 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search saved courses..." className="pl-9" value={savedSearchTerm} onChange={(e) => setSavedSearchTerm(e.target.value)} />
          </div>

          {filteredSaved.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No saved courses yet</h3>
              <p className="text-muted-foreground mb-6">
                Tap the <Heart className="inline h-4 w-4 fill-rose-400 text-rose-400" /> heart on any course to save it here.
              </p>
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600"><Link to="/courses">Browse Courses</Link></Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {filteredSaved.map((course, index) => (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ delay: index * 0.06 }} layout>
                    <Card className="group hover:shadow-lg transition-all overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative sm:w-64 shrink-0">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-44 sm:h-full min-h-[176px] object-cover" />
                            {course.bestseller && <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold">Bestseller</Badge>}
                          </div>
                          <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                            <div>
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                  <Badge variant="outline" className="text-xs mb-2">{course.category}</Badge>
                                  <h3 className="font-semibold text-lg leading-tight mb-1">{course.title}</h3>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Avatar className="h-4 w-4"><AvatarFallback className="text-xs">{course.instructor?.[0]}</AvatarFallback></Avatar>
                                    {course.instructor}
                                  </p>
                                </div>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive shrink-0"><Trash2 className="h-4 w-4" /></Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remove from Saved?</AlertDialogTitle>
                                      <AlertDialogDescription>Remove "{course.title}" from your saved courses?</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => removeFromSaved(course.id)} className="bg-destructive text-destructive-foreground">Remove</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium text-foreground">{course.rating}</span>
                                </div>
                                {course.duration && <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{course.duration}</span></div>}
                                {course.level && <Badge variant="secondary" className="text-xs">{course.level}</Badge>}
                              </div>
                            </div>
                            <div className="flex items-center justify-end">
                              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600" onClick={() => handleEnrollFromSaved(course.id)}>
                                <ShoppingCart className="h-4 w-4 mr-2" />Enroll Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </TabsContent>

        {/* ══ ALL COURSES TAB ══ */}
        <TabsContent value="all" className="space-y-6 mt-4">
          {/* Search + Sort bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search all courses..."
                className="pl-9"
                value={allSearch}
                onChange={(e) => setAllSearch(e.target.value)}
              />
            </div>
            <Select value={allSort} onValueChange={setAllSort}>
              <SelectTrigger className="w-full sm:w-[210px]">
                <Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title-asc">Title A → Z</SelectItem>
                <SelectItem value="title-desc">Title Z → A</SelectItem>
                <SelectItem value="rating-high">Highest Rating</SelectItem>
                <SelectItem value="rating-low">Lowest Rating</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{allCourses.length}</span> courses
          </p>

          {loadingAll ? (
            <div className="text-center py-16 text-muted-foreground">Loading courses...</div>
          ) : allCourses.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try a different search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {allCourses.map((course, index) => {
                const isWishlisted  = wishlistedIds.has(course.id);
                const isEnrolled    = enrolledIds.has(course.id);
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.04, 0.5) }}
                  >
                    <Card className="group hover:shadow-xl transition-all h-full flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {/* ❤️ Heart — top-left */}
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(course.id); }}
                          className={["absolute top-3 left-3 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-white/60 transition-all duration-200 hover:scale-110 active:scale-95",
                            isWishlisted ? "bg-rose-500" : "bg-white/90 backdrop-blur-sm hover:bg-white"].join(" ")}
                          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <Heart className={["h-4 w-4 transition-all duration-200", isWishlisted ? "fill-white text-white" : "text-rose-400"].join(" ")} />
                        </button>

                        {/* Badges — top-right */}
                        {course.bestseller && <Badge className="absolute top-3 right-3 bg-yellow-500 text-white z-10">Bestseller</Badge>}
                        {!course.bestseller && course.publishedAt && <Badge className="absolute top-3 right-3 bg-indigo-500 text-white z-10">New</Badge>}
                        {!course.bestseller && !course.publishedAt && <Badge variant="secondary" className="absolute top-3 right-3 z-10">{course.level}</Badge>}

                        {/* Enrolled ribbon */}
                        {isEnrolled && (
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/90 text-white text-xs font-semibold py-1 text-center flex items-center justify-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Enrolled
                          </div>
                        )}

                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Play className="h-14 w-14 text-white" />
                        </div>
                      </div>

                      {/* Card body */}
                      <CardHeader className="flex-1 pb-2">
                        <CardTitle className="line-clamp-2 text-base group-hover:text-primary transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={course.avatar} />
                            <AvatarFallback className="text-xs">{course.instructor?.[0]}</AvatarFallback>
                          </Avatar>
                          <span className="truncate">{course.instructor}</span>
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-2 pb-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{course.rating}</span>
                            <span className="text-muted-foreground">({(course.reviews || 0).toLocaleString()})</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{course.students >= 1000 ? `${(course.students / 1000).toFixed(1)}k` : course.students || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{course.duration}</span></div>
                          <div className="flex items-center gap-1"><BookOpen className="h-4 w-4" /><span>{course.lessons} lessons</span></div>
                        </div>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter className="flex justify-between items-center border-t pt-3 gap-2">
                        <span className="text-xl font-bold text-primary">{formatPrice(course.price)}</span>
                        <div className="flex gap-2 items-center">
                          {/* Heart button in footer */}
                          <Button
                            size="icon"
                            variant="outline"
                            className={["h-8 w-8 transition-colors",
                              isWishlisted
                                ? "border-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800"
                                : "hover:border-rose-300 hover:bg-rose-50"].join(" ")}
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(course.id); }}
                          >
                            <Heart className={["h-4 w-4 transition-all", isWishlisted ? "fill-rose-500 text-rose-500" : "text-gray-400"].join(" ")} />
                          </Button>

                          {isEnrolled ? (
                            <Button size="sm" variant="secondary" asChild>
                              <Link to={`/learn/${course.id}`}>Go to Course</Link>
                            </Button>
                          ) : (
                            <Button size="sm" onClick={() => handleEnroll(course.id)}>
                              Enroll Now
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </StudentDashboardLayout>
  );
}
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

