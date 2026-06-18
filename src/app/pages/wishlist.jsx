import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Heart,
  Star,
  Clock,
  Users,
  ShoppingCart,
  Trash2,
  Search,
  Filter,
  Share2,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
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
import { toast } from "sonner";

// ── shared keys — must match CoursesPage ─────────────────────────────────────
const WISHLIST_KEY         = "nexa_wishlist_ids";
const WISHLIST_COURSES_KEY = "nexa_wishlist_courses";

function getStoredWishlistIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveWishlistIds(ids) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify([...ids]));
}

function getStoredWishlistCourses() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_COURSES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveWishlistCourses(courses) {
  localStorage.setItem(WISHLIST_COURSES_KEY, JSON.stringify(courses));
}

export function WishlistPage() {
  const [searchTerm,      setSearchTerm]      = useState("");
  const [sortBy,          setSortBy]          = useState("recent");
  const [wishlistedIds,   setWishlistedIds]   = useState(() => getStoredWishlistIds());
  const [storedCourses,   setStoredCourses]   = useState(() => getStoredWishlistCourses());

  // ── sync when CoursesPage (or another tab) updates localStorage ─────────────
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === WISHLIST_KEY)         setWishlistedIds(getStoredWishlistIds());
      if (e.key === WISHLIST_COURSES_KEY) setStoredCourses(getStoredWishlistCourses());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // derive the visible wishlist — only courses whose id is still in the id-set
  const wishlist = storedCourses.filter((c) => wishlistedIds.has(c.id));

  // ── remove (with confirm dialog) ────────────────────────────────────────────
  const removeFromWishlist = (id) => {
    const course = storedCourses.find((c) => c.id === id);

    setWishlistedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      saveWishlistIds(next);
      return next;
    });

    setStoredCourses((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveWishlistCourses(next);
      return next;
    });

    toast.success(`Removed "${course?.title}" from wishlist`, { icon: "🤍", duration: 2000 });
  };

  // ── heart toggle (add back or remove) ───────────────────────────────────────
  const toggleWishlist = (id) => {
    const course = storedCourses.find((c) => c.id === id);

    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success(`Removed "${course?.title}" from wishlist`, { icon: "🤍", duration: 2000 });
      } else {
        next.add(id);
        toast.success(`Added "${course?.title}" to wishlist`, { icon: "❤️", duration: 2000 });
      }
      saveWishlistIds(next);
      return next;
    });
  };

  const handleEnroll = (courseId) => {
    const course = storedCourses.find((c) => c.id === courseId);
    toast.success(`Enrolled in "${course?.title}"! 🎉`);
  };

  // ── filter + sort ────────────────────────────────────────────────────────────
  let filtered = wishlist.filter(
    (c) =>
      c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (sortBy === "price-low")  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "rating")     filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  // ── totals ───────────────────────────────────────────────────────────────────
  const totalSavings    = wishlist.reduce((acc, c) => acc + ((c.originalPrice || c.price) - c.price), 0);
  const totalOriginal   = wishlist.reduce((acc, c) => acc + (c.originalPrice || c.price), 0);
  const totalDiscounted = wishlist.reduce((acc, c) => acc + c.price, 0);

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="My Wishlist ❤️"
        description={`${wishlist.length} course${wishlist.length !== 1 ? "s" : ""} saved for later`}
        action={
          wishlist.length > 0 ? (
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Total: ${totalDiscounted.toFixed(2)}
            </Button>
          ) : null
        }
      />

      {wishlist.length === 0 ? (
        <div className="text-center py-24">
          <Heart className="h-24 w-24 text-muted-foreground/20 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-3">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Click the{" "}
            <span className="inline-flex items-center gap-1 font-semibold text-rose-500">
              <Heart className="h-4 w-4 fill-rose-500" /> heart
            </span>{" "}
            icon on any course card to save it here.
          </p>
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600">
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <>
          {totalSavings > 0 && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <p className="font-semibold text-green-700 dark:text-green-400">
                  🎉 You're saving ${totalSavings.toFixed(2)} on your wishlist!
                </p>
                <p className="text-sm text-muted-foreground">
                  Original: <span className="line-through">${totalOriginal.toFixed(2)}</span>
                  {" → "}
                  <span className="font-bold text-green-600">${totalDiscounted.toFixed(2)}</span>
                </p>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search wishlist..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {filtered.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.06 }}
                  layout
                >
                  <Card className="group hover:shadow-lg transition-all overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">

                        {/* Thumbnail */}
                        <div className="relative sm:w-64 shrink-0">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-44 sm:h-full min-h-[176px] object-cover"
                          />
                          {course.bestseller && (
                            <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold">
                              Bestseller
                            </Badge>
                          )}
                          {/* ❤️ Heart on thumbnail */}
                          <button
                            onClick={() => toggleWishlist(course.id)}
                            className={[
                              "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-white/60",
                              "transition-all duration-200 hover:scale-110 active:scale-95",
                              wishlistedIds.has(course.id)
                                ? "bg-rose-500"
                                : "bg-white/90 hover:bg-white",
                            ].join(" ")}
                            title={wishlistedIds.has(course.id) ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart
                              className={[
                                "h-4 w-4 transition-all",
                                wishlistedIds.has(course.id) ? "fill-white text-white" : "text-rose-400",
                              ].join(" ")}
                            />
                          </button>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <Badge variant="outline" className="text-xs mb-2">
                                  {course.category}
                                </Badge>
                                <h3 className="font-semibold text-lg leading-tight mb-1">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarFallback className="text-xs">
                                      {course.instructor?.[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  {course.instructor}
                                </p>
                              </div>

                              {/* Share + Delete */}
                              <div className="flex gap-1 shrink-0">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Remove from Wishlist?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Remove "{course.title}" from your wishlist?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => removeFromWishlist(course.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        Remove
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-foreground">{course.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{course.students?.toLocaleString()} students</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {course.level}
                              </Badge>
                            </div>
                          </div>

                          {/* Price + actions */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-primary">
                                ${Number(course.price).toFixed(2)}
                              </span>
                              {course.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${Number(course.originalPrice).toFixed(2)}
                                </span>
                              )}
                              {course.originalPrice && (
                                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-xs">
                                  {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                                </Badge>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleWishlist(course.id)}
                                className={
                                  wishlistedIds.has(course.id)
                                    ? "border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800"
                                    : ""
                                }
                              >
                                <Heart
                                  className={[
                                    "h-4 w-4 mr-1",
                                    wishlistedIds.has(course.id) ? "fill-rose-500 text-rose-500" : "",
                                  ].join(" ")}
                                />
                                {wishlistedIds.has(course.id) ? "Saved" : "Save"}
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-indigo-500 to-purple-600"
                                onClick={() => handleEnroll(course.id)}
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Enroll Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && searchTerm && (
              <div className="text-center py-16">
                <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No wishlisted courses match your search.</p>
              </div>
            )}
          </div>
        </>
      )}
    </StudentDashboardLayout>
  );
}