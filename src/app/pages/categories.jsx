import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Search,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Brain,
  Layers,
  Shield,
  Cloud,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { label: "Main Domains", value: "9", icon: Layers, color: "text-blue-500" },
    { label: "Subtopics", value: "65+", icon: Sparkles, color: "text-yellow-500" },
    { label: "Active Courses", value: "500+", icon: BookOpen, color: "text-green-500" },
    { label: "Active Students", value: "50,000+", icon: Users, color: "text-purple-500" },
  ];

  const categories = [
    {
      id: "web-dev",
      name: "Web Development",
      description: "Build beautiful, highly interactive websites and robust web applications using HTML, CSS, JavaScript, React, and modern backend stacks.",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      coursesCount: 120,
      studentsCount: "15,420",
      rating: 4.8,
      topics: ["React & Next.js", "Node.js & Express", "HTML5 & TailwindCSS", "Full-Stack MERN", "REST APIs & GraphQL"],
    },
    {
      id: "ai-ml",
      name: "AI & Machine Learning",
      description: "Dive into artificial intelligence, training deep neural networks, machine learning models, natural language processing, and generative AI.",
      icon: Brain,
      color: "from-indigo-500 to-purple-500",
      coursesCount: 50,
      studentsCount: "18,200",
      rating: 4.9,
      topics: ["Python Mastery", "TensorFlow & PyTorch", "Neural Networks", "Generative AI & LLMs", "Computer Vision"],
    },
    {
      id: "data-science",
      name: "Data Science & Analytics",
      description: "Analyze complex datasets, perform statistical modeling, visualize data insights, and master SQL, R, and data pipelines.",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      coursesCount: 95,
      studentsCount: "12,850",
      rating: 4.7,
      topics: ["SQL & Databases", "Data Visualization", "Pandas & NumPy", "Business Intelligence", "Statistical Analysis"],
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      description: "Master user interface and user experience design. Learn prototyping, wireframing, design systems, and advanced Figma workflows.",
      icon: Palette,
      color: "from-orange-500 to-red-500",
      coursesCount: 75,
      studentsCount: "9,870",
      rating: 4.8,
      topics: ["Figma Mastery", "User Research", "Wireframing & Prototyping", "Design Systems", "Interaction Design"],
    },
    {
      id: "mobile-dev",
      name: "Mobile Development",
      description: "Create premium native and cross-platform mobile apps for iOS and Android devices using React Native, Flutter, Swift, and Kotlin.",
      icon: Smartphone,
      color: "from-pink-500 to-rose-500",
      coursesCount: 85,
      studentsCount: "8,450",
      rating: 4.6,
      topics: ["React Native", "Flutter & Dart", "iOS Development (Swift)", "Android (Kotlin)", "App Store Deployment"],
    },
    {
      id: "marketing",
      name: "Digital Marketing",
      description: "Grow brands online. Master SEO search optimization, Google Analytics, social media marketing, copywriting, and growth loops.",
      icon: Globe,
      color: "from-yellow-500 to-amber-500",
      coursesCount: 60,
      studentsCount: "6,120",
      rating: 4.5,
      topics: ["SEO Optimization", "Social Media Strategy", "Google Ads & Analytics", "Content Copywriting", "Email Marketing"],
    },
    {
      id: "cloud",
      name: "Cloud Computing",
      description: "Learn cloud infrastructure, virtualization, DevOps pipelines, container orchestration, and serverless architectures.",
      icon: Cloud,
      color: "from-sky-500 to-indigo-600",
      coursesCount: 40,
      studentsCount: "5,340",
      rating: 4.7,
      topics: ["AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Terraform IaC", "Serverless Functions"],
    },
    {
      id: "security",
      name: "Cybersecurity",
      description: "Protect systems, networks, and applications from cyber attacks. Understand network defense, penetration testing, and ethical hacking.",
      icon: Shield,
      color: "from-red-600 to-rose-700",
      coursesCount: 35,
      studentsCount: "4,200",
      rating: 4.8,
      topics: ["Ethical Hacking", "Network Security", "Cryptography", "Penetration Testing", "Threat Analysis"],
    },
  ];

  // Filtering categories based on search query
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              🎯 Choose Your Learning Journey
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Explore Learning Paths by{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Category
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover industry-led courses curated across all professional domains. Master in-demand skills step-by-step.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories, topics, or skills..."
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

      {/* Main Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse Learning Paths</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Click on a category to explore courses or browse tags below to learn specific tools.
            </p>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <Layers className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-xl font-semibold text-muted-foreground">No categories found matching "{searchQuery}"</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="h-full group hover:shadow-xl hover:shadow-primary/5 transition-all overflow-hidden flex flex-col relative border border-border/40">
                    {/* Color Banner */}
                    <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                    
                    <CardHeader className="pt-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-full text-xs font-semibold">
                          <Award className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span>{category.rating} Avg</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl mt-4 group-hover:text-primary transition-colors flex items-center gap-2">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-3">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-1">
                      {/* Sub-Topics tags */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {category.topics.map((topic, i) => (
                            <Badge key={i} variant="secondary" className="hover:bg-primary/20 transition-colors cursor-pointer text-xs font-medium">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    <div className="px-6 py-4 bg-muted/20 border-t border-border/40 flex items-center justify-between mt-auto">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-semibold text-foreground">{category.coursesCount}</span> courses
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span className="font-semibold text-foreground">{category.studentsCount}</span> learning
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" asChild className="group/btn text-xs font-bold text-primary gap-1 p-0 hover:bg-transparent hover:text-accent">
                        <Link to="/courses">
                          Explore Courses
                          <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner / Pathways */}
      <section className="py-20 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold mb-4">Not Sure Which Path is Right For You?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our 2-minute skill assessment to get personalized learning path recommendations that match your background and dream career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-black hover:opacity-90 font-semibold" asChild>
              <Link to="/register">
                Start Assessment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More About Careers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
