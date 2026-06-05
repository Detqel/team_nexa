import { useState } from "react";
import { motion } from "motion/react";
import { Users, Search, Filter, Mail, MoreVertical, TrendingUp, Star, BookOpen, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { InstructorLayout } from "../components/instructor-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const students = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice", course: "Complete Web Development Bootcamp", progress: 72, enrolled: "May 28, 2026", rating: 5, lastActive: "2 hours ago", status: "active", completedLessons: 35, totalLessons: 48 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob", course: "Advanced React & TypeScript", progress: 45, enrolled: "May 20, 2026", rating: 4, lastActive: "1 day ago", status: "active", completedLessons: 16, totalLessons: 36 },
  { id: 3, name: "Carol Williams", email: "carol@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol", course: "JavaScript Essentials", progress: 100, enrolled: "April 10, 2026", rating: 5, lastActive: "3 days ago", status: "completed", completedLessons: 30, totalLessons: 30 },
  { id: 4, name: "David Brown", email: "david@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=davidb", course: "Complete Web Development Bootcamp", progress: 18, enrolled: "May 29, 2026", rating: null, lastActive: "5 hours ago", status: "active", completedLessons: 9, totalLessons: 48 },
  { id: 5, name: "Emma Davis", email: "emma@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", course: "Advanced React & TypeScript", progress: 88, enrolled: "April 25, 2026", rating: 5, lastActive: "Just now", status: "active", completedLessons: 32, totalLessons: 36 },
  { id: 6, name: "Frank Miller", email: "frank@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=frank", course: "JavaScript Essentials", progress: 60, enrolled: "May 5, 2026", rating: 4, lastActive: "1 week ago", status: "inactive", completedLessons: 18, totalLessons: 30 },
  { id: 7, name: "Grace Lee", email: "grace@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace", course: "Complete Web Development Bootcamp", progress: 95, enrolled: "March 15, 2026", rating: 5, lastActive: "Yesterday", status: "active", completedLessons: 46, totalLessons: 48 },
  { id: 8, name: "Henry Wilson", email: "henry@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=henry", course: "Advanced React & TypeScript", progress: 10, enrolled: "May 30, 2026", rating: null, lastActive: "6 hours ago", status: "active", completedLessons: 4, totalLessons: 36 },
];

export function StudentsPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === "all" || s.course === courseFilter;
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchCourse && matchStatus;
  });

  const courses = [...new Set(students.map(s => s.course))];

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Students 👥</h1>
          <p className="text-muted-foreground">Monitor and engage with your enrolled students</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: students.length, icon: Users, color: "from-blue-500 to-cyan-500" },
            { label: "Active Now", value: students.filter(s => s.status === "active").length, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
            { label: "Completed", value: students.filter(s => s.status === "completed").length, icon: Award, color: "from-purple-500 to-pink-500" },
            { label: "Avg Progress", value: `${Math.round(students.reduce((a, s) => a + s.progress, 0) / students.length)}%`, icon: BookOpen, color: "from-orange-500 to-red-500" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-5">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${s.color} w-fit mb-3`}>
                    <s.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map(c => <SelectItem key={c} value={c}>{c.slice(0, 30)}...</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="table">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-muted-foreground">{filtered.length} students</p>
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="table">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={s.avatar} />
                                <AvatarFallback>{s.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{s.name}</p>
                                <p className="text-xs text-muted-foreground">{s.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm max-w-[180px]">
                            <span className="line-clamp-1">{s.course}</span>
                          </TableCell>
                          <TableCell className="min-w-[140px]">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">{s.completedLessons}/{s.totalLessons} lessons</span>
                                <span className="font-semibold">{s.progress}%</span>
                              </div>
                              <Progress value={s.progress} className="h-1.5" />
                            </div>
                          </TableCell>
                          <TableCell>
                            {s.rating ? (
                              <div className="flex items-center gap-1">
                                {Array.from({ length: s.rating }).map((_, i) => (
                                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            ) : <span className="text-xs text-muted-foreground">No rating</span>}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{s.lastActive}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={s.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                s.status === "completed" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                  "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}
                            >
                              {s.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Mail className="h-4 w-4 mr-2" />Message</DropdownMenuItem>
                                <DropdownMenuItem><Users className="h-4 w-4 mr-2" />View Profile</DropdownMenuItem>
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
          </TabsContent>

          <TabsContent value="cards">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={s.avatar} />
                          <AvatarFallback>{s.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{s.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{s.email}</p>
                        </div>
                        <Badge variant="secondary" className={s.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          s.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}>
                          {s.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 truncate">{s.course}</p>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{s.completedLessons}/{s.totalLessons} lessons</span>
                          <span className="font-semibold">{s.progress}%</span>
                        </div>
                        <Progress value={s.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-0.5">
                          {s.rating ? Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < s.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                          )) : <span className="text-xs text-muted-foreground">No rating yet</span>}
                        </div>
                        <span className="text-xs text-muted-foreground">{s.lastActive}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="h-3.5 w-3.5 mr-2" />Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </InstructorLayout>
  );
}
