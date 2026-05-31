import { motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  BarChart3,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Shield,
  Search,
  MoreVertical,
  UserCheck,
  UserX,
  Edit,
  Trash2,
  Eye,
  Activity,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export function AdminDashboard() {
  const [userFilter, setUserFilter] = useState("all");

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/admin/dashboard",
      active: true,
    },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: GraduationCap, label: "Students", href: "/admin/students" },
    { icon: Users, label: "Instructors", href: "/admin/instructors" },
    { icon: BookOpen, label: "Courses", href: "/admin/courses" },
    { icon: FileText, label: "Reports", href: "/admin/reports" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: DollarSign, label: "Payments", href: "/admin/payments" },
    { icon: Bell, label: "Notifications", href: "/admin/notifications" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: "52,847",
      change: "+12.5%",
      trend: "up",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      label: "Total Courses",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: DollarSign,
      label: "Revenue",
      value: "$248,590",
      change: "+15.3%",
      trend: "up",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Activity,
      label: "Active Now",
      value: "3,429",
      change: "+5.7%",
      trend: "up",
      color: "from-orange-500 to-red-500",
    },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Student",
      status: "Active",
      joined: "2025-01-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Instructor",
      status: "Active",
      joined: "2024-11-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      role: "Instructor",
      status: "Active",
      joined: "2024-09-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      role: "Student",
      status: "Inactive",
      joined: "2025-03-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    {
      id: 5,
      name: "David Martinez",
      email: "david@example.com",
      role: "Instructor",
      status: "Active",
      joined: "2024-08-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 42000, users: 4200 },
    { month: "Feb", revenue: 58000, users: 5300 },
    { month: "Mar", revenue: 72000, users: 6800 },
    { month: "Apr", revenue: 65000, users: 6200 },
    { month: "May", revenue: 89000, users: 7500 },
    { month: "Jun", revenue: 95000, users: 8200 },
  ];

  const userGrowthData = [
    { month: "Jan", students: 3500, instructors: 120 },
    { month: "Feb", students: 4200, instructors: 135 },
    { month: "Mar", students: 5100, instructors: 158 },
    { month: "Apr", students: 4800, instructors: 142 },
    { month: "May", students: 6200, instructors: 175 },
  ];

  const courseCategoryData = [
    { name: "Web Dev", value: 320, color: "#6366f1" },
    { name: "Mobile", value: 185, color: "#8b5cf6" },
    { name: "Data Science", value: 245, color: "#06b6d4" },
    { name: "Design", value: 175, color: "#f59e0b" },
    { name: "Marketing", value: 142, color: "#10b981" },
    { name: "AI/ML", value: 180, color: "#ec4899" },
  ];

  const recentActivity = [
    {
      user: "Alice Cooper",
      action: "enrolled in",
      course: "Web Development Bootcamp",
      time: "5 min ago",
      type: "enrollment",
    },
    {
      user: "Bob Taylor",
      action: "created",
      course: "Advanced Python",
      time: "15 min ago",
      type: "course",
    },
    {
      user: "Carol White",
      action: "completed",
      course: "UI/UX Design",
      time: "1 hour ago",
      type: "completion",
    },
    {
      user: "David Lee",
      action: "reported",
      course: "Data Science 101",
      time: "2 hours ago",
      type: "report",
    },
    {
      user: "Eve Martinez",
      action: "purchased",
      course: "React Masterclass",
      time: "3 hours ago",
      type: "purchase",
    },
  ];

  const systemMetrics = [
    { metric: "Server Load", value: "45%", status: "good" },
    { metric: "Database", value: "32%", status: "good" },
    { metric: "API Response", value: "125ms", status: "good" },
    { metric: "Error Rate", value: "0.02%", status: "excellent" },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={item.active}>
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
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛡️</h1>
                <p className="text-muted-foreground">
                  Monitor and manage your platform
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
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
                        <Badge
                          variant={
                            stat.trend === "up" ? "default" : "destructive"
                          }
                          className="font-semibold"
                        >
                          {stat.change}
                        </Badge>
                      </div>
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue & User Growth</CardTitle>
                  <CardDescription>Monthly performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        name="Revenue ($)"
                      />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        name="New Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Courses by Category</CardTitle>
                  <CardDescription>Distribution of courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={courseCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {courseCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle>User Registration Trends</CardTitle>
                <CardDescription>
                  Students vs Instructors growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userGrowthData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="students"
                      fill="#6366f1"
                      radius={[8, 8, 0, 0]}
                      name="Students"
                    />
                    <Bar
                      dataKey="instructors"
                      fill="#8b5cf6"
                      radius={[8, 8, 0, 0]}
                      name="Instructors"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Management Table */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all platform users</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-initial">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        className="pl-9 md:w-[250px]"
                      />
                    </div>
                    <Select value={userFilter} onValueChange={setUserFilter}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="instructors">Instructors</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "Instructor"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "Active"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.joined}
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
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {user.status === "Active" ? (
                                    <>
                                      <UserX className="h-4 w-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-4 w-4 mr-2" />
                                      Activate
                                    </>
                                  )}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 pb-4 border-b last:border-0"
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            activity.type === "enrollment"
                              ? "bg-blue-100 dark:bg-blue-900/20"
                              : activity.type === "course"
                                ? "bg-green-100 dark:bg-green-900/20"
                                : activity.type === "completion"
                                  ? "bg-purple-100 dark:bg-purple-900/20"
                                  : activity.type === "report"
                                    ? "bg-red-100 dark:bg-red-900/20"
                                    : "bg-yellow-100 dark:bg-yellow-900/20"
                          }`}
                        >
                          <Activity
                            className={`h-5 w-5 ${
                              activity.type === "enrollment"
                                ? "text-blue-600 dark:text-blue-400"
                                : activity.type === "course"
                                  ? "text-green-600 dark:text-green-400"
                                  : activity.type === "completion"
                                    ? "text-purple-600 dark:text-purple-400"
                                    : activity.type === "report"
                                      ? "text-red-600 dark:text-red-400"
                                      : "text-yellow-600 dark:text-yellow-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.action}{" "}
                            <span className="font-medium">
                              {activity.course}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Real-time system monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {metric.metric}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">
                              {metric.value}
                            </span>
                            <Badge
                              variant={
                                metric.status === "excellent"
                                  ? "secondary"
                                  : "default"
                              }
                              className="text-xs"
                            >
                              {metric.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Overall Status
                        </span>
                        <Badge variant="secondary" className="font-semibold">
                          All Systems Operational
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last checked: Just now
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
