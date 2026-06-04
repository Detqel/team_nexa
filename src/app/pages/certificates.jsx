import { useState } from "react";
import { motion } from "motion/react";
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
  Download,
  Share2,
  Eye,
  Search,
  Calendar,
  CheckCircle2,
  Medal,
  Star,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const CertificatePreview = ({ cert }) => (
  <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 rounded-2xl p-8 text-white overflow-hidden">
    {/* Background decorations */}
    <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 -translate-y-20" />
    <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-20 translate-y-20" />
    <div className="absolute top-4 right-4 opacity-10">
      <GraduationCap className="h-32 w-32" />
    </div>

    {/* Border */}
    <div className="absolute inset-3 border-2 border-white/20 rounded-xl pointer-events-none" />
    <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none" />

    <div className="relative text-center space-y-4">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <GraduationCap className="h-7 w-7 text-yellow-400" />
        <span className="font-bold text-xl tracking-wider text-yellow-400">NEXALEARN</span>
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-200 font-medium">Certificate of Completion</p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-2" />
      </div>

      <div>
        <p className="text-sm text-blue-200 mb-1">This is to certify that</p>
        <p className="text-3xl font-bold font-serif text-white">{cert.studentName}</p>
      </div>

      <div>
        <p className="text-sm text-blue-200">has successfully completed</p>
        <p className="text-xl font-semibold mt-1 text-yellow-300">{cert.courseName}</p>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        <Badge className="bg-white/20 text-white border-white/30 text-xs">
          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
          {cert.grade} Grade
        </Badge>
        <Badge className="bg-white/20 text-white border-white/30 text-xs">
          <Trophy className="h-3 w-3 mr-1 text-yellow-400" />
          {cert.score}% Score
        </Badge>
      </div>

      <div className="pt-2">
        <p className="text-xs text-blue-300">Issued by <span className="font-semibold text-white">{cert.instructor}</span></p>
        <p className="text-xs text-blue-300 mt-1">
          <Calendar className="h-3 w-3 inline mr-1" />
          {cert.issueDate}
        </p>
        <p className="text-xs text-blue-400 mt-2 font-mono">ID: {cert.credentialId}</p>
      </div>
    </div>
  </div>
);

export function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/my-courses" },
    { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates", active: true },
    { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
    { icon: Trophy, label: "Quiz", href: "/dashboard/quiz" },
    { icon: Target, label: "Progress Tracking", href: "/dashboard/progress" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  const certificates = [
    {
      id: 1,
      courseName: "HTML & CSS Fundamentals",
      instructor: "Sarah Johnson",
      issueDate: "February 14, 2026",
      completionDate: "February 14, 2026",
      duration: "24 hours",
      grade: "Distinction",
      score: 98,
      studentName: "John Doe",
      category: "Web Development",
      credentialId: "NXL-2026-HTML-001",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=220&fit=crop",
      skills: ["HTML5", "CSS3", "Flexbox", "Grid", "Responsive Design"],
      status: "verified",
    },
    {
      id: 2,
      courseName: "JavaScript Basics",
      instructor: "Chris Williams",
      issueDate: "March 22, 2026",
      completionDate: "March 22, 2026",
      duration: "32 hours",
      grade: "Merit",
      score: 91,
      studentName: "John Doe",
      category: "Web Development",
      credentialId: "NXL-2026-JS-002",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=220&fit=crop",
      skills: ["JavaScript", "ES6+", "DOM", "APIs", "Async/Await"],
      status: "verified",
    },
    {
      id: 3,
      courseName: "React Fundamentals",
      instructor: "Michael Chen",
      issueDate: "April 10, 2026",
      completionDate: "April 10, 2026",
      duration: "28 hours",
      grade: "Distinction",
      score: 96,
      studentName: "John Doe",
      category: "Web Development",
      credentialId: "NXL-2026-REACT-003",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=220&fit=crop",
      skills: ["React", "JSX", "Hooks", "State Management", "Component Design"],
      status: "verified",
    },
    {
      id: 4,
      courseName: "Introduction to Design Thinking",
      instructor: "Emma Davis",
      issueDate: "April 30, 2026",
      completionDate: "April 30, 2026",
      duration: "16 hours",
      grade: "Pass",
      score: 84,
      studentName: "John Doe",
      category: "Design",
      credentialId: "NXL-2026-DESIGN-004",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=220&fit=crop",
      skills: ["Design Thinking", "User Research", "Prototyping", "Ideation"],
      status: "verified",
    },
    {
      id: 5,
      courseName: "Python Fundamentals",
      instructor: "David Martinez",
      issueDate: "May 18, 2026",
      completionDate: "May 18, 2026",
      duration: "36 hours",
      grade: "Distinction",
      score: 95,
      studentName: "John Doe",
      category: "Programming",
      credentialId: "NXL-2026-PY-005",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=220&fit=crop",
      skills: ["Python 3", "OOP", "Data Structures", "File I/O", "Libraries"],
      status: "verified",
    },
  ];

  const filtered = certificates.filter(
    (c) =>
      c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const gradeColors = {
    Distinction: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    Merit: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    Pass: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

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
                  My Certificates
                  <Medal className="h-8 w-8 text-yellow-500" />
                </h1>
                <p className="text-muted-foreground">
                  Showcase your achievements and share with the world
                </p>
              </div>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Public Profile
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Certificates", value: certificates.length, icon: Award, color: "from-purple-500 to-pink-500" },
                { label: "Distinctions", value: certificates.filter(c => c.grade === "Distinction").length, icon: Star, color: "from-yellow-500 to-orange-500" },
                { label: "Avg. Score", value: `${Math.round(certificates.reduce((a, c) => a + c.score, 0) / certificates.length)}%`, icon: Trophy, color: "from-green-500 to-emerald-500" },
                { label: "Verified", value: certificates.filter(c => c.status === "verified").length, icon: CheckCircle2, color: "from-blue-500 to-cyan-500" },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <CardContent className="p-5">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} w-fit mb-3`}>
                        <stat.icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="grid">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-muted-foreground">{filtered.length} certificate{filtered.length !== 1 ? "s" : ""}</p>
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                    >
                      <Card className="group hover:shadow-xl transition-all overflow-hidden">
                        {/* Mini certificate visual */}
                        <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6 text-white text-center">
                          <div className="absolute inset-0 opacity-5">
                            <GraduationCap className="h-full w-full" />
                          </div>
                          <div className="absolute inset-2 border border-white/20 rounded-lg pointer-events-none" />
                          <p className="text-xs text-yellow-400 uppercase tracking-widest font-medium mb-2">Certificate of Completion</p>
                          <Award className="h-12 w-12 mx-auto text-yellow-400 mb-2" />
                          <p className="font-bold text-sm line-clamp-2">{cert.courseName}</p>
                        </div>

                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Badge variant="outline" className="text-xs mb-1">{cert.category}</Badge>
                              <p className="text-xs text-muted-foreground">by {cert.instructor}</p>
                            </div>
                            <Badge className={`text-xs ${gradeColors[cert.grade]}`}>
                              {cert.grade}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {cert.issueDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Trophy className="h-3 w-3 text-yellow-500" />
                              {cert.score}%
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {cert.skills.slice(0, 3).map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                            ))}
                            {cert.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">+{cert.skills.length - 3}</Badge>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedCert(cert)}>
                                  <Eye className="h-3.5 w-3.5 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Certificate Preview</DialogTitle>
                                </DialogHeader>
                                {selectedCert && <CertificatePreview cert={selectedCert} />}
                                <div className="flex gap-2 mt-2">
                                  <Button className="flex-1" size="sm">
                                    <Download className="h-4 w-4 mr-2" /> Download PDF
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex-1">
                                    <Share2 className="h-4 w-4 mr-2" /> Share
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" className="flex-1">
                              <Download className="h-3.5 w-3.5 mr-1" />
                              Download
                            </Button>
                          </div>

                          <p className="text-xs text-muted-foreground/70 font-mono truncate">
                            <CheckCircle2 className="h-3 w-3 inline mr-1 text-green-500" />
                            {cert.credentialId}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="space-y-3">
                  {filtered.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Card className="hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl flex-shrink-0">
                              <Award className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <p className="font-semibold truncate">{cert.courseName}</p>
                                <Badge className={`text-xs w-fit ${gradeColors[cert.grade]}`}>{cert.grade}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{cert.instructor} • {cert.issueDate}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{cert.category}</Badge>
                                <span className="text-xs text-muted-foreground">Score: {cert.score}%</span>
                                <span className="text-xs text-muted-foreground font-mono hidden sm:block">{cert.credentialId}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" onClick={() => setSelectedCert(cert)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-lg">
                                  <DialogHeader>
                                    <DialogTitle>Certificate Preview</DialogTitle>
                                  </DialogHeader>
                                  {selectedCert && <CertificatePreview cert={selectedCert} />}
                                  <div className="flex gap-2 mt-2">
                                    <Button className="flex-1" size="sm">
                                      <Download className="h-4 w-4 mr-2" /> Download PDF
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                      <Share2 className="h-4 w-4 mr-2" /> Share
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
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

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Award className="h-20 w-20 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No certificates yet</h3>
                <p className="text-muted-foreground mb-6">Complete courses to earn your certificates!</p>
                <Button asChild>
                  <Link to="/dashboard/my-courses">View My Courses</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
