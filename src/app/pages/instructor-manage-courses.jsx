import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  BookOpen, Plus, Eye, Edit, Trash2, MoreVertical,
  Search, Filter, Star, Users, DollarSign, Clock, CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { InstructorLayout } from "../components/instructor-sidebar";

const initialCourses = [
  { id: 1, title: "Complete Web Development Bootcamp", students: 1542, revenue: 15420, rating: 4.8, status: "Published", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=60&fit=crop", lastUpdated: "2 days ago", category: "Web Development", lessons: 48, duration: "42h" },
  { id: 2, title: "Advanced React & TypeScript", students: 892, revenue: 8920, rating: 4.9, status: "Published", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=60&fit=crop", lastUpdated: "5 days ago", category: "Web Development", lessons: 36, duration: "28h" },
  { id: 3, title: "JavaScript Essentials", students: 413, revenue: 4130, rating: 4.7, status: "Draft", thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=100&h=60&fit=crop", lastUpdated: "1 week ago", category: "Programming", lessons: 30, duration: "22h" },
  { id: 4, title: "Node.js & Express Backend", students: 320, revenue: 3200, rating: 4.6, status: "Published", thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=60&fit=crop", lastUpdated: "3 days ago", category: "Backend", lessons: 40, duration: "32h" },
  { id: 5, title: "Python for Beginners", students: 0, revenue: 0, rating: 0, status: "Draft", thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=60&fit=crop", lastUpdated: "Today", category: "Programming", lessons: 10, duration: "8h" },
];

export function ManageCoursesPage() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = () => {
    setCourses((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen, color: "from-blue-500 to-cyan-500" },
    { label: "Published", value: courses.filter(c => c.status === "Published").length, icon: CheckCircle2, color: "from-green-500 to-emerald-500" },
    { label: "Drafts", value: courses.filter(c => c.status === "Draft").length, icon: Edit, color: "from-yellow-500 to-orange-500" },
    { label: "Total Students", value: courses.reduce((a, c) => a + c.students, 0).toLocaleString(), icon: Users, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Manage Courses 📚</h1>
            <p className="text-muted-foreground">View, edit and manage all your courses</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            <Link to="/instructor-dashboard/create">
              <Plus className="h-4 w-4 mr-2" /> Create New Course
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
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

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>{filtered.length} courses found</CardDescription>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search courses..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <Filter className="h-4 w-4 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
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
                    <TableHead>Course</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <img src={course.thumbnail} alt={course.title} className="w-16 h-10 rounded object-cover flex-shrink-0" />
                          <span className="font-medium line-clamp-2">{course.title}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-xs whitespace-nowrap">{course.category}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          {course.students.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ${course.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {course.rating > 0 ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        ) : <span className="text-muted-foreground text-xs">No ratings</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                          {course.lessons}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.status === "Published" ? "default" : "secondary"}
                          className={course.status === "Published" ? "bg-green-500" : ""}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{course.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(course.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-semibold">No courses found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search</p>
              </div>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Course?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. The course and all its data will be permanently deleted.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </InstructorLayout>
  );
}
