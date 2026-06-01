import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Star,
  BookOpen,
  Users,
  Award,
  Search,
  Mail,
  Linkedin,
  Twitter,
  Github,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Video,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

export function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All");

  const filterTabs = ["All", "Web Dev", "AI & ML", "Data Science", "Design", "Cloud & Mobile"];

  const stats = [
    { label: "Expert Mentors", value: "150+", icon: GraduationCap, color: "text-blue-500" },
    { label: "Avg Student Rating", value: "4.8/5", icon: Star, color: "text-yellow-500" },
    { label: "Active Students", value: "50,000+", icon: Users, color: "text-purple-500" },
    { label: "Total Reviews", value: "85,000+", icon: Award, color: "text-green-500" },
  ];

  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Full-Stack Engineer",
      company: "Formerly at Google",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 4.9,
      reviews: 15420,
      students: "32,500",
      coursesCount: 12,
      bio: "Full stack web developer and architect with 10+ years of building large scale cloud systems. Passionate about React, Next.js, and teaching developers production-ready patterns.",
      expertise: "Web Dev",
      skills: ["React & Next.js", "Node.js", "GraphQL", "TailwindCSS"],
      socials: { linkedin: "#", twitter: "#", github: "#" },
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "AI & ML Research Lead",
      company: "Tech-AI Solutions",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4.8,
      reviews: 12350,
      students: "28,900",
      coursesCount: 8,
      bio: "Doctorate in Deep Learning. Active researcher and AI consultant specializing in generative artificial intelligence, neural architectures, and large language model customization.",
      expertise: "AI & ML",
      skills: ["Python", "PyTorch", "Generative AI", "LLMs", "TensorFlow"],
      socials: { linkedin: "#", github: "#" },
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Lead UI/UX Architect",
      company: "DesignCo Studio",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 4.7,
      reviews: 9870,
      students: "19,870",
      coursesCount: 10,
      bio: "Product designer and educator. Helping students learn wireframing, component-driven design systems, user personas, and visual UI design layouts using Figma.",
      expertise: "Design",
      skills: ["Figma Mastery", "Product Design", "Design Systems", "Prototyping"],
      socials: { linkedin: "#", twitter: "#" },
    },
    {
      id: 4,
      name: "David Martinez",
      role: "Lead Data Scientist",
      company: "FinData Group",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 4.9,
      reviews: 18200,
      students: "42,100",
      coursesCount: 15,
      bio: "Former lead data analyst with 8+ years experience. Expert in teaching big-data visualizations, predictive algorithms, Pandas/NumPy, and complex database analytics.",
      expertise: "Data Science",
      skills: ["SQL", "Pandas & NumPy", "Data Visualization", "R Programming"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Mobile Solutions Architect",
      company: "AppLabs",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      rating: 4.6,
      reviews: 8450,
      students: "15,300",
      coursesCount: 7,
      bio: "Cross-platform mobile apps expert. Specializes in building responsive, offline-first mobile applications with React Native, Flutter, Swift, and native Android configurations.",
      expertise: "Cloud & Mobile",
      skills: ["React Native", "Flutter", "SwiftUI", "Android Development"],
      socials: { linkedin: "#", github: "#" },
    },
    {
      id: 6,
      name: "James Wilson",
      role: "DevOps & Cloud Expert",
      company: "CloudNative Ltd",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      rating: 4.8,
      reviews: 14700,
      students: "26,200",
      coursesCount: 9,
      bio: "Certified AWS Architect and Kubernetes instructor. Helping engineering teams transition to robust microservices, automated pipelines, and highly scalable cloud clouds.",
      expertise: "Cloud & Mobile",
      skills: ["AWS", "Docker & K8s", "CI/CD", "Terraform Infrastructure"],
      socials: { linkedin: "#", github: "#", twitter: "#" },
    },
  ];

  // Filtering instructors based on search query and expertise tab
  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesExpertise =
      selectedExpertise === "All" || instructor.expertise === selectedExpertise;

    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-20">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-50/[0.02]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="default" className="mb-4 bg-primary text-black font-semibold">
              🎓 Learn from the Best
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Learn from Outstanding{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Industry Experts
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Courses built and instructed by senior tech professionals, researchers, and designers. Get real-world advice.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search mentors by name, role, or skills..."
                className="pl-12 pr-4 h-12 text-base rounded-xl bg-slate-900/50 backdrop-blur border-white/10 text-white placeholder-slate-400 focus-visible:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-border/40 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-4 bg-background/50 backdrop-blur p-4 rounded-xl border border-border/40"
              >
                <div className={`p-3 rounded-lg bg-muted/80 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Catalog */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Filtering Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterTabs.map((tab) => (
              <Button
                key={tab}
                variant={selectedExpertise === tab ? "default" : "outline"}
                className={`rounded-full px-5 h-9 text-sm font-semibold transition-all ${
                  selectedExpertise === tab
                    ? "bg-primary text-black hover:opacity-90"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
                onClick={() => setSelectedExpertise(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          {filteredInstructors.length === 0 ? (
            <div className="text-center py-20">
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-xl font-semibold text-muted-foreground">No mentors found matching your filters</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedExpertise("All");
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredInstructors.map((instructor, index) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="h-full group hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden flex flex-col border border-border/40 relative">
                    <CardHeader className="pt-8 flex flex-col items-center text-center">
                      {/* Avatar Ring */}
                      <div className="relative">
                        <Avatar className="h-24 w-24 ring-4 ring-primary/20 group-hover:scale-105 transition-transform duration-300">
                          <AvatarImage src={instructor.avatar} />
                          <AvatarFallback>{instructor.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background" title="Available for mentorship" />
                      </div>

                      <div className="mt-4">
                        <CardTitle className="text-xl font-bold flex items-center justify-center gap-1">
                          {instructor.name}
                          <ShieldCheck className="h-5 w-5 text-primary fill-primary/10 shrink-0" title="Verified NexaLearn Mentor" />
                        </CardTitle>
                        <p className="text-sm text-primary font-medium mt-1">{instructor.role}</p>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">{instructor.company}</p>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 text-center flex-1 px-6">
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        "{instructor.bio}"
                      </p>

                      {/* Instructor Stats */}
                      <div className="grid grid-cols-3 gap-2 bg-muted/30 p-2.5 rounded-lg border border-border/40 text-center">
                        <div>
                          <p className="text-sm font-bold">{instructor.rating}</p>
                          <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            Rating
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-bold">{instructor.students}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Students</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold">{instructor.coursesCount}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Courses</p>
                        </div>
                      </div>

                      {/* Expertises skills */}
                      <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                        {instructor.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px] py-0 px-2 font-medium">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="px-6 py-4 bg-muted/10 border-t border-border/40 flex items-center justify-between mt-auto">
                      {/* Social Actions */}
                      <div className="flex items-center gap-2">
                        {instructor.socials.linkedin && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10 rounded-full" asChild>
                            <a href={instructor.socials.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {instructor.socials.twitter && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10 rounded-full" asChild>
                            <a href={instructor.socials.twitter} target="_blank" rel="noopener noreferrer">
                              <Twitter className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {instructor.socials.github && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10 rounded-full" asChild>
                            <a href={instructor.socials.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>

                      <Button size="sm" className="bg-primary hover:bg-accent text-black font-semibold text-xs h-8" asChild>
                        <Link to="/courses">
                          View Courses
                          <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vetting section / Apply Section */}
      <section className="py-20 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vetting & Selection Process</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that learning to code or design should only be taught by active developers and designers with real technical achievements.
              </p>
              
              <div className="space-y-4">
                {[
                  "Rigorous portfolio & code reviews",
                  "Demonstrated teaching ability and communication",
                  "Professional backgrounds at top technology companies",
                  "Ongoing curriculum updates reflecting tech trends",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8 border border-border/40 bg-background/50 backdrop-blur">
              <Video className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Want to Teach on NexaLearn?</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Join our global mentor network. Share your experience, help students transition into technical roles, and build your digital audience.
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-accent text-black hover:opacity-90 font-semibold" asChild>
                <Link to="/register">
                  Apply as an Instructor
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
