import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Plus,
  Upload,
  Users,
  BarChart3,
  DollarSign,
  FileText,
  Trophy,
  Settings,
  LogOut,
  GraduationCap,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Heart,
  Award,
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
import { Input } from "../components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

export function InstructorDashboard() {
  const location = useLocation();
  const [createCourseOpen, setCreateCourseOpen] = useState(false);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/instructor-dashboard",
    },
    { icon: BookOpen, label: "Manage Courses", href: "/instructor-dashboard/courses" },
    { icon: Plus, label: "Create Course", href: "/instructor-dashboard/create" },
    { icon: Upload, label: "Upload Videos", href: "/instructor-dashboard/upload" },
    { icon: Users, label: "Students", href: "/instructor-dashboard/students" },
    { icon: BarChart3, label: "Analytics", href: "/instructor-dashboard/analytics" },
    { icon: DollarSign, label: "Earnings", href: "/instructor-dashboard/earnings" },
    { icon: FileText, label: "Assignments", href: "/instructor-dashboard/assignments" },
    { icon: Trophy, label: "Quiz Management", href: "/instructor-dashboard/quiz" },
    { icon: Settings, label: "Settings", href: "/instructor-dashboard/settings" },
  ];

  const stats = [
    {
      icon: BookOpen,
      label: "Total Courses",
      value: "12",
      change: "+2 this month",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      label: "Total Students",
      value: "2,847",
      change: "+147 this week",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: "$24,850",
      change: "+12% this month",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      label: "Avg. Rating",
      value: "4.8",
      change: "98% positive",
      color: "from-orange-500 to-red-500",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      students: 1542,
      revenue: "$15,420",
      rating: 4.8,
      status: "Published",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=60&fit=crop",
      lastUpdated: "2 days ago",
    },
    {
      id: 2,
      title: "Advanced React & TypeScript",
      students: 892,
      revenue: "$8,920",
      rating: 4.9,
      status: "Published",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=60&fit=crop",
      lastUpdated: "5 days ago",
    },
    {
      id: 3,
      title: "JavaScript Essentials",
      students: 413,
      revenue: "$4,130",
      rating: 4.7,
      status: "Draft",
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=100&h=60&fit=crop",
      lastUpdated: "1 week ago",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5800 },
    { month: "Mar", revenue: 7200 },
    { month: "Apr", revenue: 6500 },
    { month: "May", revenue: 8900 },
  ];

  const enrollmentData = [
    { month: "Jan", students: 245 },
    { month: "Feb", students: 378 },
    { month: "Mar", students: 512 },
    { month: "Apr", students: 425 },
    { month: "May", students: 647 },
  ];

  const recentStudents = [
    {
      name: "Alice Johnson",
      course: "Web Development Bootcamp",
      enrolled: "2 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    },
    {
      name: "Bob Smith",
      course: "Advanced React",
      enrolled: "5 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    },
    {
      name: "Carol Williams",
      course: "JavaScript Essentials",
      enrolled: "1 day ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
    },
    {
      name: "David Brown",
      course: "Web Development Bootcamp",
      enrolled: "2 days ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=davidb",
    },
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
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Instructor Dashboard 👨‍🏫
                </h1>
                <p className="text-muted-foreground">
                  Manage your courses and track your performance
                </p>
              </div>
              <Dialog
                open={createCourseOpen}
                onOpenChange={setCreateCourseOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new course
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="course-title">Course Title</Label>
                      <Input
                        id="course-title"
                        placeholder="e.g., Advanced React Development"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course-description">Description</Label>
                      <Textarea
                        id="course-description"
                        placeholder="Describe what students will learn..."
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course-price">Price ($)</Label>
                        <Input
                          id="course-price"
                          type="number"
                          placeholder="99.99"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="course-level">Level</Label>
                        <Input id="course-level" placeholder="Beginner" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setCreateCourseOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setCreateCourseOpen(false)}>
                      Create Course
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                      </div>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {stat.label}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Access - Student Pages */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-muted-foreground">Student View</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/40">
                  <Link to="/instructor-dashboard/my-courses">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">My Courses</p>
                        <p className="text-xs text-muted-foreground">Your enrolled courses</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
                <Card className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/40">
                  <Link to="/instructor-dashboard/wishlist">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-pink-500">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">Wishlist</p>
                        <p className="text-xs text-muted-foreground">Saved courses</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
                <Card className="group hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/40">
                  <Link to="/instructor-dashboard/certificates">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold group-hover:text-primary transition-colors">Certificates</p>
                        <p className="text-xs text-muted-foreground">Your certifications</p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Monthly revenue from your courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Enrollments</CardTitle>
                  <CardDescription>New students by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={enrollmentData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Bar
                        dataKey="students"
                        fill="#6366f1"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Course Management Table */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>
                      Manage and monitor your published courses
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-initial">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search courses..."
                        className="pl-9 md:w-[250px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-16 h-10 rounded object-cover"
                              />
                              <span className="font-medium">
                                {course.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {course.students.toLocaleString()}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {course.revenue}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">
                                {course.rating}
                              </span>
                              <span className="text-yellow-500">★</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                course.status === "Published"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {course.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {course.lastUpdated}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Recent Students */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Student Enrollments</CardTitle>
                <CardDescription>
                  Latest students who enrolled in your courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.course}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {student.enrolled}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
