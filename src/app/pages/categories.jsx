import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  BookOpen, Users, Award, Search, Code, Palette, Database,
  Smartphone, Globe, Brain, Shield, Cloud, ChevronRight,
  Sparkles, Star, TrendingUp, Layers, Filter, ArrowRight,
  Play, Zap, CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { label: "All", value: "all" },
    { label: "Most Popular", value: "popular" },
    { label: "Trending", value: "trending" },
    { label: "New", value: "new" },
  ];

  const categories = [
    {
      id: "web-dev",
      name: "Web Development",
      tagline: "Build the internet",
      description: "Master HTML, CSS, JavaScript, React, Node.js and modern full-stack frameworks to create stunning web applications.",
      icon: Code,
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "from-blue-500/10 to-cyan-500/10",
      coursesCount: 120,
      studentsCount: "15,420",
      rating: 4.8,
      popular: true,
      trending: true,
      topics: ["React & Next.js", "Node.js & Express", "HTML5 & CSS3", "Full-Stack MERN", "REST APIs"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      salaryRange: "₹6L – ₹25L/yr",
      jobOpenings: "85,000+",
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      tagline: "Shape the future",
      description: "Dive into neural networks, NLP, computer vision, and generative AI. Build intelligent systems that learn and adapt.",
      icon: Brain,
      gradient: "from-indigo-500 to-purple-600",
      bgGlow: "from-indigo-500/10 to-purple-600/10",
      coursesCount: 50,
      studentsCount: "18,200",
      rating: 4.9,
      popular: true,
      trending: true,
      topics: ["TensorFlow & PyTorch", "Generative AI & LLMs", "Computer Vision", "NLP", "MLOps"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop",
      salaryRange: "₹10L – ₹40L/yr",
      jobOpenings: "45,000+",
    },
    {
      id: "data-science",
      name: "Data Science",
      tagline: "Turn data into decisions",
      description: "Analyze complex datasets, build predictive models, and communicate insights that drive real business outcomes.",
      icon: Database,
      gradient: "from-green-500 to-emerald-500",
      bgGlow: "from-green-500/10 to-emerald-500/10",
      coursesCount: 95,
      studentsCount: "12,850",
      rating: 4.7,
      popular: true,
      trending: false,
      topics: ["SQL & Databases", "Pandas & NumPy", "Data Visualization", "Statistical Analysis", "BI Tools"],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop",
      salaryRange: "₹8L – ₹30L/yr",
      jobOpenings: "60,000+",
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      tagline: "Design that delights",
      description: "Create intuitive, beautiful interfaces through user research, wireframing, and prototyping with Figma and beyond.",
      icon: Palette,
      gradient: "from-orange-500 to-red-500",
      bgGlow: "from-orange-500/10 to-red-500/10",
      coursesCount: 75,
      studentsCount: "9,870",
      rating: 4.8,
      popular: false,
      trending: true,
      topics: ["Figma Mastery", "User Research", "Wireframing", "Design Systems", "Interaction Design"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
      salaryRange: "₹5L – ₹20L/yr",
      jobOpenings: "40,000+",
    },
    {
      id: "mobile-dev",
      name: "Mobile Development",
      tagline: "Apps for every pocket",
      description: "Build cross-platform and native mobile apps for iOS and Android using React Native, Flutter, Swift, and Kotlin.",
      icon: Smartphone,
      gradient: "from-pink-500 to-rose-500",
      bgGlow: "from-pink-500/10 to-rose-500/10",
      coursesCount: 85,
      studentsCount: "8,450",
      rating: 4.6,
      popular: false,
      trending: true,
      topics: ["React Native", "Flutter & Dart", "Swift (iOS)", "Kotlin (Android)", "App Store Deployment"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop",
      salaryRange: "₹7L – ₹28L/yr",
      jobOpenings: "35,000+",
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      tagline: "Grow brands online",
      description: "Drive traffic, leads, and revenue through SEO, paid ads, social media strategy, email marketing, and analytics.",
      icon: Globe,
      gradient: "from-yellow-500 to-amber-500",
      bgGlow: "from-yellow-500/10 to-amber-500/10",
      coursesCount: 60,
      studentsCount: "6,120",
      rating: 4.5,
      popular: false,
      trending: false,
      topics: ["SEO Optimization", "Google Ads", "Social Media", "Email Marketing", "Analytics"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      salaryRange: "₹4L – ₹18L/yr",
      jobOpenings: "55,000+",
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      tagline: "Infrastructure at scale",
      description: "Master AWS, Azure, Docker, Kubernetes and CI/CD pipelines to build, deploy, and scale modern cloud applications.",
      icon: Cloud,
      gradient: "from-sky-500 to-indigo-600",
      bgGlow: "from-sky-500/10 to-indigo-600/10",
      coursesCount: 40,
      studentsCount: "5,340",
      rating: 4.7,
      popular: false,
      trending: true,
      topics: ["AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Terraform", "Serverless"],
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=200&fit=crop",
      salaryRange: "₹9L – ₹35L/yr",
      jobOpenings: "30,000+",
    },
    {
      id: "security",
      name: "Cybersecurity",
      tagline: "Defend & protect",
      description: "Protect systems from threats through ethical hacking, penetration testing, cryptography, and network defense strategies.",
      icon: Shield,
      gradient: "from-red-600 to-rose-700",
      bgGlow: "from-red-600/10 to-rose-700/10",
      coursesCount: 35,
      studentsCount: "4,200",
      rating: 4.8,
      popular: false,
      trending: false,
      topics: ["Ethical Hacking", "Penetration Testing", "Network Security", "Cryptography", "Threat Analysis"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=200&fit=crop",
      salaryRange: "₹8L – ₹32L/yr",
      jobOpenings: "25,000+",
    },
  ];

  const filteredCategories = categories.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeFilter === "popular") return matchSearch && c.popular;
    if (activeFilter === "trending") return matchSearch && c.trending;
    if (activeFilter === "new") return matchSearch;
    return matchSearch;
  });

  const totalStudents = categories.reduce(
    (acc, c) => acc + parseInt(c.studentsCount.replace(/,/g, "")), 0
  );

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-24">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.3) 1px,transparent 1px),linear-gradient(to right,rgba(99,102,241,0.3) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-sm px-4 py-1.5">
              🎯 Choose Your Learning Path
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-5 text-white leading-tight">
              Explore Every{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Learning Domain
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              From AI to web development, design to cybersecurity — find the field that matches your passion and fast-track your career.
            </p>
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10" />
              <Input
                type="search"
                placeholder="Search categories, topics, or skills..."
                className="pl-12 pr-4 h-13 text-base rounded-2xl bg-white/5 backdrop-blur border-white/10 text-white placeholder-slate-400 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────── */}
      <section className="py-10 border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Layers, value: `${categories.length}`, label: "Learning Domains" },
              { icon: BookOpen, value: "500+", label: "Total Courses" },
              { icon: Users, value: "80K+", label: "Active Students" },
              { icon: Award, value: "25K+", label: "Certificates Issued" },
              { icon: TrendingUp, value: "95%", label: "Career Success Rate" },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <s.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FILTER TABS ──────────────────────────────── */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border/40 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0
                    ${activeFilter === f.value
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
              {filteredCategories.length} categories
            </p>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES GRID ──────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredCategories.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <Layers className="h-20 w-20 mx-auto text-muted-foreground/20 mb-5" />
              <h3 className="text-2xl font-bold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-6">Try searching for something else</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}>
                Clear Search
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCategories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <Card className="group h-full overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-border/60 flex flex-col relative">
                    {/* Course thumbnail */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      {/* Icon + label overlay */}
                      <div className="absolute top-4 left-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg`}>
                          <cat.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      {/* Badges overlay */}
                      <div className="absolute top-4 right-4 flex gap-1.5">
                        {cat.popular && (
                          <Badge className="bg-yellow-500 text-black text-xs font-bold px-2">🔥 Popular</Badge>
                        )}
                        {cat.trending && !cat.popular && (
                          <Badge className="bg-green-500 text-white text-xs font-bold px-2">📈 Trending</Badge>
                        )}
                      </div>
                      {/* Title on image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-xs text-white/70 font-medium uppercase tracking-widest mb-1">{cat.tagline}</p>
                        <h3 className="text-xl font-extrabold text-white leading-tight">{cat.name}</h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <CardContent className="p-5 flex flex-col flex-1 gap-4">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{cat.description}</p>

                      {/* Topics */}
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Key Topics</p>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.topics.slice(0, 4).map((t) => (
                            <Badge key={t} variant="secondary" className="text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                              {t}
                            </Badge>
                          ))}
                          {cat.topics.length > 4 && (
                            <Badge variant="outline" className="text-xs">+{cat.topics.length - 4} more</Badge>
                          )}
                        </div>
                      </div>

                      {/* Career & salary info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/40 rounded-xl p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-0.5">Avg. Salary</p>
                          <p className="text-sm font-bold text-green-600">{cat.salaryRange}</p>
                        </div>
                        <div className="bg-muted/40 rounded-xl p-3 text-center">
                          <p className="text-xs text-muted-foreground mb-0.5">Job Openings</p>
                          <p className="text-sm font-bold">{cat.jobOpenings}</p>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          <span className="font-semibold text-foreground">{cat.coursesCount}</span> courses
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          <span className="font-semibold text-foreground">{cat.studentsCount}</span> learners
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-foreground">{cat.rating}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button
                        asChild
                        className={`w-full bg-gradient-to-r ${cat.gradient} hover:opacity-90 text-white font-semibold mt-auto`}
                      >
                        <Link to="/courses">
                          Explore Courses
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── LEARNING PATHS ───────────────────────────── */}
      <section className="py-20 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-500/40">Guided Paths</Badge>
            <h2 className="text-3xl font-bold mb-3">Not Sure Where to Start?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our structured learning paths guide you from complete beginner to job-ready professional.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend Developer Path",
                desc: "HTML → CSS → JavaScript → React → Next.js",
                duration: "6–9 months", courses: 12,
                icon: Code, color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Data Scientist Path",
                desc: "Python → SQL → ML → Deep Learning → MLOps",
                duration: "8–12 months", courses: 15,
                icon: Database, color: "from-purple-500 to-pink-500",
              },
              {
                title: "UX Designer Path",
                desc: "Research → Wireframes → Figma → Design Systems",
                duration: "4–6 months", courses: 8,
                icon: Palette, color: "from-orange-500 to-red-500",
              },
            ].map((path, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              >
                <Card className="group hover:shadow-xl transition-all border border-border/60 overflow-hidden h-full">
                  <div className={`h-1.5 bg-gradient-to-r ${path.color}`} />
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <path.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{path.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{path.desc}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{path.courses} courses</div>
                      <div className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" />{path.duration}</div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link to="/courses">
                        View Path <ChevronRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY NEXALEARN ────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-500/40">Why NexaLearn?</Badge>
              <h2 className="text-3xl font-bold mb-6 leading-tight">
                Courses built for{" "}
                <span className="text-primary">real careers</span>,<br />not just certificates
              </h2>
              <div className="space-y-4">
                {[
                  "All courses designed with hiring managers in mind",
                  "Real projects you can show in your portfolio",
                  "Industry-recognized certificates trusted by 500+ companies",
                  "Live instructor Q&As and community support",
                  "Learn at your own pace, on any device",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                <Link to="/register">Start Free Today <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Play, label: "Video Lessons", value: "12,000+", color: "from-blue-500 to-cyan-500" },
                  { icon: Users, label: "Expert Instructors", value: "200+", color: "from-purple-500 to-pink-500" },
                  { icon: Award, label: "Certificates", value: "25K+ issued", color: "from-green-500 to-emerald-500" },
                  { icon: TrendingUp, label: "Success Rate", value: "95%", color: "from-orange-500 to-red-500" },
                ].map((s, i) => (
                  <Card key={i} className="group hover:shadow-lg transition-all border border-border/60 overflow-hidden">
                    <div className={`h-1 bg-gradient-to-r ${s.color}`} />
                    <CardContent className="p-5 text-center">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <s.icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-2xl font-extrabold">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────── */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%,rgba(99,102,241,0.3) 0%,transparent 60%),radial-gradient(circle at 70% 50%,rgba(168,85,247,0.2) 0%,transparent 60%)" }}
        />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Sparkles className="h-12 w-12 text-indigo-400 mx-auto mb-5" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              Ready to Pick Your Path?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
              Join 50,000+ learners who chose NexaLearn to build the careers they actually want.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold h-13 px-10">
                <Link to="/register">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 h-13 px-10">
                <Link to="/about">About NexaLearn</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
