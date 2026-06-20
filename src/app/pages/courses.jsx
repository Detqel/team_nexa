import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Star,
  Clock,
  Users,
  Play,
  BookOpen,
  Heart,
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
import { coursesApi } from "../lib/api";
import { getUser, updateStoredUser } from "../lib/auth";
import { toast } from "sonner";

const PRICE_FILTERS = [
  { id: "all", label: "All Prices", min: null, max: null },
  { id: "free", label: "Free", min: 0, max: 0 },
  { id: "under50", label: "Under $50", min: 0.01, max: 49.99 },
  { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
  { id: "over100", label: "Over $100", min: 100.01, max: null },
];

const DURATION_FILTERS = [
  { id: "all", label: "Any Duration", min: null, max: null },
  { id: "short", label: "Under 20 hours", min: 0, max: 20 },
  { id: "medium", label: "20 - 35 hours", min: 20, max: 35 },
  { id: "long", label: "Over 35 hours", min: 35, max: null },
];

function formatPrice(price) {
  if (price === 0) return "Free";
  return `$${Number(price).toFixed(2)}`;
}

// ── shared localStorage keys — must match WishlistPage & CreateCoursePage ────
const WISHLIST_KEY          = "nexa_wishlist_ids";
const WISHLIST_COURSES_KEY  = "nexa_wishlist_courses";
const PUBLISHED_COURSES_KEY = "nexa_published_courses";   // ← new

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

// ── read courses published via CreateCoursePage ──────────────────────────────
function getPublishedCourses() {
  try { return JSON.parse(localStorage.getItem(PUBLISHED_COURSES_KEY) || "[]"); }
  catch { return []; }
}

// Fill in any fields the card expects that CreateCoursePage might not set
function normalizePublished(course) {
  return {
    reviews:    0,
    students:   0,
    rating:     0,
    bestseller: false,
    // Estimate a readable duration from lesson count if not already set
    duration:
      course.duration ||
      (course.totalLessons
        ? `${Math.ceil(course.totalLessons * 0.5)}h total`
        : "N/A"),
    lessons: course.totalLessons || course.lessons || 0,
    ...course, // actual stored values always win
  };
}

// ── filter constants ─────────────────────────────────────────────────────────
const PRICE_FILTERS = [
  { id: "all",      label: "All Prices",   min: null,   max: null   },
  { id: "free",     label: "Free",         min: 0,      max: 0      },
  { id: "under50",  label: "Under $50",    min: 0.01,   max: 49.99  },
  { id: "50-100",   label: "$50 – $100",   min: 50,     max: 100    },
  { id: "over100",  label: "Over $100",    min: 100.01, max: null   },
];

const DURATION_FILTERS = [
  { id: "all",    label: "Any Duration",    min: null, max: null },
  { id: "short",  label: "Under 20 hours", min: 0,    max: 20   },
  { id: "medium", label: "20 – 35 hours",  min: 20,   max: 35   },
  { id: "long",   label: "Over 35 hours",  min: 35,   max: null },
];

function formatPrice(price) {
  if (price === 0) return "Free";
  return `$${Number(price).toFixed(2)}`;
}

// ── apply the same active filters to a list of courses client-side ───────────
// Used for localStorage courses that never pass through the backend API.
function applyFiltersLocally(courses, {
  search, selectedCategories, selectedLevels,
  selectedPrice, selectedRating,
}) {
  const priceFilter = PRICE_FILTERS.find((p) => p.id === selectedPrice);

  return courses.filter((c) => {
    // text search
    if (search) {
      const q = search.toLowerCase();
      if (
        !c.title?.toLowerCase().includes(q) &&
        !c.instructor?.toLowerCase().includes(q)
      ) return false;
    }
    // category
    if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
    // level
    if (selectedLevels.length > 0 && !selectedLevels.includes(c.level)) return false;
    // rating
    if (selectedRating && c.rating < selectedRating) return false;
    // price
    if (priceFilter?.min != null && c.price < priceFilter.min) return false;
    if (priceFilter?.max != null && c.price > priceFilter.max) return false;
    return true;
  });
}

// ── component ────────────────────────────────────────────────────────────────
export function CoursesPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels,     setSelectedLevels]     = useState([]);
  const [selectedPrice,      setSelectedPrice]      = useState("all");
  const [selectedRating,     setSelectedRating]     = useState(null);
  const [selectedDuration,   setSelectedDuration]   = useState("all");
  const [searchQuery,        setSearchQuery]        = useState("");
  const [debouncedSearch,    setDebouncedSearch]    = useState("");
  const [sortOption,         setSortOption]         = useState("title-asc");
  const [courses,            setCourses]            = useState([]);
  const [categories,         setCategories]         = useState([]);
  const [loading,            setLoading]            = useState(true);

  const [userState,     setUserState]     = useState(() => getUser());
  const [wishlistedIds, setWishlistedIds] = useState(() => getStoredWishlistIds());

  const navigate = useNavigate();

  // ── debounce search ─────────────────────────────────────────────────────────
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userState, setUserState] = useState(getUser());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ── load categories ─────────────────────────────────────────────────────────
  useEffect(() => {
    coursesApi
      .getCategories()
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  // ── sync wishlist + published courses from other tabs / pages ───────────────
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === WISHLIST_KEY)          setWishlistedIds(getStoredWishlistIds());
      // A new course was published — trigger a re-fetch so it shows up
      if (e.key === PUBLISHED_COURSES_KEY) fetchCourses();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── fetch courses (API + localStorage merge) ────────────────────────────────
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      // 1️⃣  Build API params
      const params = { sort: sortOption };
      if (debouncedSearch.trim())        params.search      = debouncedSearch.trim();
      if (selectedCategories.length > 0) params.category    = selectedCategories.join(",");
      if (selectedLevels.length > 0)     params.level       = selectedLevels.join(",");
      if (selectedRating)                params.rating      = selectedRating;

      const priceFilter = PRICE_FILTERS.find((p) => p.id === selectedPrice);
      if (priceFilter?.min != null) params.priceMin = priceFilter.min;
      if (priceFilter?.max != null) params.priceMax = priceFilter.max;

      const durationFilter = DURATION_FILTERS.find((d) => d.id === selectedDuration);
      if (durationFilter?.min != null) params.durationMin = durationFilter.min;
      if (durationFilter?.max != null) params.durationMax = durationFilter.max;

      // 2️⃣  Fetch from backend
      const data       = await coursesApi.getAll(params);
      const apiCourses = data.courses || [];
      const apiIds     = new Set(apiCourses.map((c) => c.id));

      // 3️⃣  Load & normalize courses published via CreateCoursePage
      const localPublished = getPublishedCourses()
        .map(normalizePublished)
        // Don't duplicate a course that's already returned by the API
        .filter((c) => !apiIds.has(c.id));

      // 4️⃣  Apply the active filters client-side to local courses
      const filteredLocal = applyFiltersLocally(localPublished, {
        search:             debouncedSearch.trim(),
        selectedCategories,
        selectedLevels,
        selectedPrice,
        selectedRating,
      });

      // 5️⃣  Newest published courses appear at the top
      setCourses([...filteredLocal, ...apiCourses]);
    } catch {
      toast.error("Failed to load courses. Please try again.");
      setCourses([]);
    } finally {
      setLoading(false);
    coursesApi.getCategories().then((data) => setCategories(data.categories || [])).catch(() => { });
  }, []);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const params = { sort: sortOption };
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      if (selectedCategories.length > 0) params.category = selectedCategories.join(",");
      if (selectedLevels.length > 0) params.level = selectedLevels.join(",");
      if (selectedRating) params.rating = selectedRating;

      const priceFilter = PRICE_FILTERS.find((p) => p.id === selectedPrice);
      if (priceFilter?.min != null) params.priceMin = priceFilter.min;
      if (priceFilter?.max != null) params.priceMax = priceFilter.max;

      const durationFilter = DURATION_FILTERS.find((d) => d.id === selectedDuration);
      if (durationFilter?.min != null) params.durationMin = durationFilter.min;
      if (durationFilter?.max != null) params.durationMax = durationFilter.max;

      const data = await coursesApi.getAll(params);
      setCourses(data.courses || []);
    } catch {
      toast.error("Failed to load courses. Please try again.");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedCategories, selectedLevels, selectedPrice, selectedRating, selectedDuration, sortOption]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  async function handleEnroll(courseId) {
    const user = getUser();
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent("/courses")}`);
      return;
    }
  }, [
    debouncedSearch, selectedCategories, selectedLevels,
    selectedPrice, selectedRating, selectedDuration, sortOption,
  ]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  // ── enroll ──────────────────────────────────────────────────────────────────
  async function handleEnroll(courseId) {
    const user = getUser();
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent("/courses")}`);
      return;
    }
    if (user.enrolledCourses?.includes(courseId)) {
      toast.info("You are already enrolled in this course.");
      return;
    }
    if (user.enrolledCourses?.includes(courseId)) {
      toast.info("You are already enrolled in this course.");
      return;
    }

    try {
      const data = await coursesApi.enroll(courseId);
      const updatedUser = {
        ...user,
        enrolledCourses: data.enrolledCourses,
        courseProgress:  data.courseProgress,
        courseProgress: data.courseProgress,
      };
      updateStoredUser(updatedUser);
      setUserState(updatedUser);
      toast.success("Successfully enrolled!");
    } catch (error) {
      toast.error(error.message || "Enrollment failed.");
    }
  }

  // ── wishlist toggle ─────────────────────────────────────────────────────────
  function toggleWishlist(courseId) {
    const user = getUser();
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent("/courses")}`);
      return;
    }

    setWishlistedIds((prev) => {
      const next     = new Set(prev);
      const course   = courses.find((c) => c.id === courseId);
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
            saveWishlistCourses([...stored, course]);
          }
        } else {
          saveWishlistCourses(stored.filter((c) => c.id !== courseId));
        }
      }

      return next;
    });
  }

  // ── filter helpers ──────────────────────────────────────────────────────────
  function toggleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
  function toggleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  }

  function toggleLevel(level) {
    setSelectedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  }

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">

      {/* Hero / search bar */}
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
              Explore courses across all categories and skill levels
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

      {/* Courses + sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* ── Sidebar filters ── */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" /> Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                  {/* Category */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Category</Label>
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const checked = selectedCategories.includes(category);
                        return (
                          <div
                            key={category}
                            className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${checked ? "bg-muted/30" : ""}`}
                            onClick={() => toggleCategory(category)}
                          >
                            <Checkbox checked={checked} onCheckedChange={() => toggleCategory(category)} />
                            <span className="text-sm font-medium">{category}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Difficulty</Label>
                    <div className="space-y-2">
                      {["Beginner", "Intermediate", "Advanced"].map((level) => {
                        const checked = selectedLevels.includes(level);
                        return (
                          <div
                            key={level}
                            className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${checked ? "bg-muted/30" : ""}`}
                            onClick={() => toggleLevel(level)}
                          >
                            <Checkbox checked={checked} onCheckedChange={() => toggleLevel(level)} />
                            <span className="text-sm font-medium">{level}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Price</Label>
                    <div className="space-y-2">
                      {PRICE_FILTERS.map((price) => (
                        <div
                          key={price.id}
                          className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${selectedPrice === price.id ? "bg-muted/30" : ""}`}
                          onClick={() => setSelectedPrice(price.id)}
                        >
                          <Checkbox checked={selectedPrice === price.id} onCheckedChange={() => setSelectedPrice(price.id)} />
                          <span className="text-sm font-medium">{price.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Rating</Label>
                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                        <div
                          key={rating}
                          className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${selectedRating === rating ? "bg-muted/30" : ""}`}
                          onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                        >
                          <Checkbox
                            checked={selectedRating === rating}
                            onCheckedChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                          />
                          <Checkbox checked={selectedRating === rating} onCheckedChange={() => setSelectedRating(selectedRating === rating ? null : rating)} />
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {rating} & up
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Duration</Label>
                    <div className="space-y-2">
                      {DURATION_FILTERS.map((duration) => (
                        <div
                          key={duration.id}
                          className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${selectedDuration === duration.id ? "bg-muted/30" : ""}`}
                          onClick={() => setSelectedDuration(duration.id)}
                        >
                          <Checkbox checked={selectedDuration === duration.id} onCheckedChange={() => setSelectedDuration(duration.id)} />
                          <span className="text-sm font-medium">{duration.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Duration</Label>
                    <div className="space-y-2">
                      {DURATION_FILTERS.map((duration) => (
                        <div
                          key={duration.id}
                          className={`flex items-center space-x-2 cursor-pointer p-1 rounded ${selectedDuration === duration.id ? "bg-muted/30" : ""}`}
                          onClick={() => setSelectedDuration(duration.id)}
                        >
                          <Checkbox
                            checked={selectedDuration === duration.id}
                            onCheckedChange={() => setSelectedDuration(duration.id)}
                          />
                          <span className="text-sm font-medium">{duration.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </CardContent>
              </Card>
            </aside>

            {/* ── Course cards ── */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{courses.length}</span> courses
                </p>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Sort by" />
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

              {loading ? (
                <div className="text-center py-16 text-muted-foreground">Loading courses...</div>
              ) : courses.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <p className="text-muted-foreground">
                      No courses match your filters. Try adjusting your search.
                    </p>
                    <p className="text-muted-foreground">No courses match your filters. Try adjusting your search.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="group hover:shadow-xl transition-all h-full flex flex-col">

                        {/* Thumbnail */}
                        <div className="relative overflow-hidden">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />

                          {/* ❤️ Wishlist heart — top-left */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(course.id);
                            }}
                            className={[
                              "absolute top-3 left-3 z-20",
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              "shadow-md border border-white/60",
                              "transition-all duration-200 hover:scale-110 active:scale-95",
                              wishlistedIds.has(course.id)
                                ? "bg-rose-500"
                                : "bg-white/90 backdrop-blur-sm hover:bg-white",
                            ].join(" ")}
                            title={wishlistedIds.has(course.id) ? "Remove from wishlist" : "Add to wishlist"}
                            aria-label={wishlistedIds.has(course.id) ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            <Heart
                              className={[
                                "h-4 w-4 transition-all duration-200",
                                wishlistedIds.has(course.id)
                                  ? "fill-white text-white"
                                  : "text-rose-400",
                              ].join(" ")}
                            />
                          </button>

                          {course.bestseller && (
                            <Badge className="absolute top-3 right-10 bg-yellow-500 text-white z-10">
                              Bestseller
                            </Badge>
                          )}
                          {/* "New" badge for locally published courses */}
                          {course.publishedAt && !course.bestseller && (
                            <Badge className="absolute top-3 right-3 bg-indigo-500 text-white z-10">
                              New
                            </Badge>
                          )}
                          {!course.publishedAt && (
                            <Badge variant="secondary" className="absolute top-3 right-3 z-10">
                              {course.level}
                            </Badge>
                          )}

                          {/* Play overlay on hover */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <Play className="h-16 w-16 text-white" />
                          </div>
                        </div>

                        {/* Card header */}
                          {course.bestseller && (
                            <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">Bestseller</Badge>
                          )}
                          <Badge variant="secondary" className="absolute top-4 right-4">{course.level}</Badge>
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
                              <AvatarFallback>{course.instructor?.[0]}</AvatarFallback>
                              <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                            </Avatar>
                            <span>{course.instructor}</span>
                          </CardDescription>
                        </CardHeader>

                        {/* Stats */}
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold">{course.rating}</span>
                              <span className="text-muted-foreground">
                                ({(course.reviews || 0).toLocaleString()})
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>
                                {course.students >= 1000
                                  ? `${(course.students / 1000).toFixed(1)}k`
                                  : course.students || 0}
                              </span>
                              <span className="text-muted-foreground">({course.reviews?.toLocaleString()})</span>
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

                        {/* Footer — price + enroll + wishlist */}
                        <CardFooter className="flex justify-between items-center border-t pt-4 gap-2">
                          <span className="text-2xl font-bold text-primary">
                            {formatPrice(course.price)}
                          </span>
                          <div className="flex gap-2 items-center">
                            {/* ❤️ compact wishlist button in footer */}
                            <Button
                              size="icon"
                              variant="outline"
                              className={[
                                "h-8 w-8 transition-colors",
                                wishlistedIds.has(course.id)
                                  ? "border-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:border-rose-800"
                                  : "hover:border-rose-300 hover:bg-rose-50",
                              ].join(" ")}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(course.id);
                              }}
                              title={wishlistedIds.has(course.id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart
                                className={[
                                  "h-4 w-4 transition-all",
                                  wishlistedIds.has(course.id)
                                    ? "fill-rose-500 text-rose-500"
                                    : "text-gray-400",
                                ].join(" ")}
                              />
                            </Button>

                            <Button
                              size="sm"
                              variant={userState?.enrolledCourses?.includes(course.id) ? "secondary" : "default"}
                              onClick={() => handleEnroll(course.id)}
                            >
                              {userState?.enrolledCourses?.includes(course.id) ? "Enrolled" : "Enroll Now"}
                            </Button>
                          </div>
                        <CardFooter className="flex justify-between items-center border-t pt-4">
                          <span className="text-2xl font-bold text-primary">{formatPrice(course.price)}</span>
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
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}