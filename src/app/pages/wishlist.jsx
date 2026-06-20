import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  BookOpen,
  Award,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Heart,
  FileText,
  BarChart3,
  GraduationCap,
  Trophy,
  Target,
  Star,
  Clock,
  Users,
  ShoppingCart,
  Trash2,
  Search,
  Filter,
  Share2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
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

export function WishlistPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      title: "Full Stack Web Development with Next.js",
      instructor: "James Wilson",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.9,
      ratingCount: 3421,
      students: 12400,
      duration: "42h",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=220&fit=crop",
      category: "Web Development",
      level: "Intermediate",
      addedDate: "2026-05-20",
      isBestseller: true,
    },
    {
      id: 2,
      title: "Machine Learning A-Z: Hands-On Python",
      instructor: "Priya Sharma",
      price: 74.99,
      originalPrice: 149.99,
      rating: 4.8,
      ratingCount: 5623,
      students: 25000,
      duration: "56h",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=220&fit=crop",
      category: "Data Science",
      level: "All Levels",
      addedDate: "2026-05-15",
      isBestseller: true,
    },
    {
      id: 3,
      title: "iOS Development with Swift & SwiftUI",
      instructor: "Liam O'Brien",
      price: 94.99,
      originalPrice: 189.99,
      rating: 4.7,
      ratingCount: 1892,
      students: 8300,
      duration: "38h",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=220&fit=crop",
      category: "Mobile Development",
      level: "Beginner",
      addedDate: "2026-05-10",
      isBestseller: false,
    },
    {
      id: 4,
      title: "Docker & Kubernetes: Complete DevOps Guide",
      instructor: "Carlos Rivera",
      price: 69.99,
      originalPrice: 139.99,
      rating: 4.9,
      ratingCount: 2744,
      students: 15600,
      duration: "30h",
      thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=220&fit=crop",
      category: "DevOps",
      level: "Intermediate",
      addedDate: "2026-05-05",
      isBestseller: false,
    },
    {
      id: 5,
      title: "Graphic Design Bootcamp: Photoshop, Illustrator",
      instructor: "Sophie Laurent",
      price: 59.99,
      originalPrice: 119.99,
      rating: 4.6,
      ratingCount: 4130,
      students: 18700,
      duration: "24h",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=220&fit=crop",
      category: "Design",
      level: "Beginner",
      addedDate: "2026-04-28",
      isBestseller: false,
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/my-courses" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist", active: true },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
    { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
    { icon: Trophy, label: "Quiz", href: "/dashboard/quiz" },
    { icon: Target, label: "Progress Tracking", href: "/dashboard/progress" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const filtered = wishlist.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSavings = wishlist.reduce((acc, c) => acc + (c.originalPrice - c.price), 0);
  const totalOriginal = wishlist.reduce((acc, c) => acc + c.originalPrice, 0);
  const totalDiscounted = wishlist.reduce((acc, c) => acc + c.price, 0);

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
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                  Wishlist
                  <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                </h1>
                <p className="text-muted-foreground">
                  {wishlist.length} course{wishlist.length !== 1 ? "s" : ""} saved for later
                </p>
              </div>
              {wishlist.length > 0 && (
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Enroll All (${totalDiscounted.toFixed(2)})
                </Button>
              )}
            </div>

            {wishlist.length > 0 && (
              <>
                {/* Savings Banner */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-green-700 dark:text-green-400">
                          🎉 You're saving ${totalSavings.toFixed(2)} on your wishlist!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Original total: <span className="line-through">${totalOriginal.toFixed(2)}</span>{" "}
                          → <span className="font-bold text-green-600">${totalDiscounted.toFixed(2)}</span>
                        </p>
                      </div>
                      <Badge className="bg-green-500 text-white text-sm px-3 py-1">
                        {Math.round((totalSavings / totalOriginal) * 100)}% OFF
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Search & Sort */}
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

                {/* Wishlist Items */}
                <div className="grid grid-cols-1 gap-4">
                  <AnimatePresence>
                    {filtered.map((course, index) => (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100, height: 0 }}
                        transition={{ delay: index * 0.06 }}
                        layout
                      >
                        <Card className="group hover:shadow-lg transition-all overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative sm:w-64 flex-shrink-0">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="w-full h-44 sm:h-full object-cover"
                                />
                                {course.isBestseller && (
                                  <Badge className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold">
                                    Bestseller
                                  </Badge>
                                )}
                              </div>
                              <div className="flex-1 p-5 flex flex-col justify-between gap-3">
                                <div>
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                      <Badge variant="outline" className="text-xs mb-2">{course.category}</Badge>
                                      <h3 className="font-semibold text-lg leading-tight mb-1">{course.title}</h3>
                                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <Avatar className="h-4 w-4">
                                          <AvatarFallback className="text-xs">{course.instructor[0]}</AvatarFallback>
                                        </Avatar>
                                        {course.instructor}
                                      </p>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Share2 className="h-4 w-4" />
                                      </Button>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Remove from Wishlist?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to remove "{course.title}" from your wishlist?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => removeFromWishlist(course.id)} className="bg-destructive text-destructive-foreground">
                                              Remove
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                      <span className="font-medium text-foreground">{course.rating}</span>
                                      <span>({course.ratingCount.toLocaleString()})</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Users className="h-4 w-4" />
                                      <span>{course.students.toLocaleString()} students</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{course.duration}</span>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                                  </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-primary">${course.price}</span>
                                    <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs">
                                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                                    </Badge>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">
                                      <Heart className="h-4 w-4 mr-1 fill-red-500 text-red-500" />
                                      Saved
                                    </Button>
                                    <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600">
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
                </div>
              </>
            )}

            {wishlist.length === 0 && (
              <div className="text-center py-24">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <Heart className="h-24 w-24 text-muted-foreground/20 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Start exploring courses and save the ones you love for later.
                </p>
                <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
