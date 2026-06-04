import { motion } from "motion/react";
import { Link } from "react-router";
import {
  GraduationCap, Target, Heart, Zap, Users, BookOpen, Award, TrendingUp,
  Globe, Star, ArrowRight, CheckCircle, Linkedin, Twitter, Github,
  Lightbulb, Shield, Rocket, Quote,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export function AboutPage() {
  const stats = [
    { icon: Users, value: "50,000+", label: "Students Worldwide", color: "from-blue-500 to-cyan-500" },
    { icon: BookOpen, value: "500+", label: "Expert-Led Courses", color: "from-purple-500 to-pink-500" },
    { icon: Award, value: "25,000+", label: "Certificates Issued", color: "from-green-500 to-emerald-500" },
    { icon: Globe, value: "48+", label: "Countries Reached", color: "from-orange-500 to-red-500" },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay ahead of the curve, constantly evolving our curriculum to reflect the latest industry trends and in-demand technologies.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make starts with one question: does this help our students succeed? From UX to support, learners come first.",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Shield,
      title: "Quality & Trust",
      description: "All instructors are vetted, all courses are reviewed, and all certifications are industry-recognized. No compromises.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: Rocket,
      title: "Career Outcomes",
      description: "We don't just teach skills — we build careers. Our courses are designed with hiring managers and real job requirements in mind.",
      color: "from-green-400 to-emerald-500",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Ex-Google engineer turned edtech pioneer. Sarah built her first online course in 2015 and hasn't stopped since.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah-ceo",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Full-stack architect with 15 years of experience. Michael designed the platform that now serves 50,000+ learners daily.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael-cto",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Emma Davis",
      role: "Head of Curriculum",
      bio: "Former Stanford professor and UX researcher. Emma ensures every course is pedagogically sound and immediately applicable.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma-head",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "David Martinez",
      role: "Head of Partnerships",
      bio: "Previously at Microsoft and LinkedIn, David brings world-class instructors and enterprise partnerships to NexaLearn.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david-partnerships",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Priya Sharma",
      role: "Lead Data Scientist",
      bio: "PhD in ML from IIT Bombay. Priya builds the AI systems that personalize every student's learning journey.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya-ds",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Alex Turner",
      role: "Head of Community",
      bio: "Community builder and lifelong learner. Alex nurtures the NexaLearn student network across 48 countries.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex-community",
      linkedin: "#",
      twitter: "#",
    },
  ];

  const milestones = [
    { year: "2019", title: "Founded", desc: "NexaLearn launched with 10 courses and 200 beta students in Chennai, India." },
    { year: "2020", title: "First 10K Students", desc: "Reached 10,000 enrolled students in just 12 months. Added mobile app support." },
    { year: "2021", title: "Series A Funding", desc: "Raised $5M to expand the team and build the AI-powered learning engine." },
    { year: "2022", title: "Global Expansion", desc: "Expanded to 30 countries. Launched enterprise plans for companies and teams." },
    { year: "2023", title: "Certificate Recognition", desc: "NexaLearn certificates recognized by 500+ companies including FAANG and startups." },
    { year: "2024", title: "50K+ Learners", desc: "Hit 50,000 active students. Surpassed $2M in instructor earnings paid out." },
  ];

  const testimonials = [
    {
      name: "Riya Patel",
      role: "Frontend Developer at Razorpay",
      text: "NexaLearn's React course completely changed my career. I went from a fresher to landing my dream job in 6 months. The quality of instruction is unmatched.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=riya-t",
    },
    {
      name: "James O'Brien",
      role: "Data Analyst at Deloitte",
      text: "The Data Science path here is better than any bootcamp I tried. Structured, practical, and you actually build portfolio projects along the way.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james-t",
    },
    {
      name: "Aisha Nwosu",
      role: "UX Designer at Canva",
      text: "I switched careers from accounting to UX design using only NexaLearn. The UI/UX curriculum is incredibly well thought out. Worth every rupee.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha-t",
    },
  ];

  const partners = [
    "Google", "Microsoft", "Meta", "Amazon", "Razorpay", "Figma", "Shopify", "Stripe",
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-28">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.3) 1px,transparent 1px),linear-gradient(to right,rgba(99,102,241,0.3) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Badge className="mb-5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-sm px-4 py-1.5">
              🌍 Our Story
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight tracking-tight">
              We're on a Mission to{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Democratize Learning
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              NexaLearn was built on one belief — that world-class education shouldn't be locked behind expensive tuition or geographic boundaries. We're changing that, one course at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white h-13 px-8 text-base font-semibold">
                <Link to="/courses">Explore Our Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 h-13 px-8 text-base">
                <Link to="/register">Join for Free</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────── */}
      <section className="py-16 border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <p className="text-3xl font-extrabold mb-1">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ────────────────────────────────────── */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-500/40">Our Story</Badge>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Born out of frustration,{" "}
                <span className="text-primary">built with purpose</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In 2019, Sarah Johnson — a software engineer at Google — noticed something troubling: brilliant colleagues with the drive to grow were being held back not by lack of talent, but by lack of access to affordable, quality education.
                </p>
                <p>
                  She teamed up with Michael Chen and started building NexaLearn from a rented co-working space in Chennai. The first version had 10 courses, one payment gateway, and a lot of hope.
                </p>
                <p>
                  Today, NexaLearn serves 50,000+ learners across 48 countries, has paid out $2M+ in instructor earnings, and is recognized by hundreds of top employers worldwide. But our mission hasn't changed — make world-class education accessible to everyone, everywhere.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["seed=alice","seed=bob","seed=carol","seed=david"].map((s, i) => (
                    <Avatar key={i} className="h-10 w-10 border-2 border-background">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?${s}`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-sm">50,000+ students trust us</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-xs text-muted-foreground ml-1">4.9 avg rating</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=500&fit=crop"
                  alt="Team working together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
                    <p className="text-sm font-semibold mb-1">🏆 2024 EdTech Award Winner</p>
                    <p className="text-xs opacity-80">Best Online Learning Platform — Asia Pacific</p>
                  </div>
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -top-6 -right-6 bg-background border border-border rounded-2xl p-4 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">95% Success Rate</p>
                    <p className="text-xs text-muted-foreground">Career outcomes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-500/40">Our Values</Badge>
            <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These aren't just words on a wall — they're the principles that guide every feature we ship, every course we approve, and every student we support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl hover:shadow-primary/5 transition-all border border-border/60 overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${v.color}`} />
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <v.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{v.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{v.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE / MILESTONES ────────────────────────── */}
      <section className="py-24 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-500/40">Our Journey</Badge>
            <h2 className="text-4xl font-bold mb-4">From Startup to Scale</h2>
            <p className="text-muted-foreground">Key milestones that shaped who we are today</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 -translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className={`bg-background border border-border/60 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow inline-block w-full`}>
                      <p className="text-sm font-bold text-primary mb-1">{m.year}</p>
                      <p className="text-lg font-bold mb-1">{m.title}</p>
                      <p className="text-muted-foreground text-sm">{m.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-background shadow-lg top-5" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-500/40">Meet the Team</Badge>
            <h2 className="text-4xl font-bold mb-4">The People Behind NexaLearn</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A passionate team of engineers, educators, and designers united by one mission.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              >
                <Card className="group hover:shadow-xl transition-all overflow-hidden border border-border/60 text-center">
                  <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                  <CardContent className="pt-8 pb-6 px-6">
                    <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-500">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-sky-400">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-foreground">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 bg-muted/20 border-y border-border/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-indigo-500 border-indigo-500/40">Student Stories</Badge>
            <h2 className="text-4xl font-bold mb-4">Real Outcomes, Real People</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Don't take our word for it — hear from the people whose careers changed because of NexaLearn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              >
                <Card className="h-full hover:shadow-xl transition-all border border-border/60">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <p className="text-muted-foreground leading-relaxed flex-1 mb-6 italic">"{t.text}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array(t.rating).fill(0).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUSTED BY ───────────────────────────────────── */}
      <section className="py-16 border-b border-border/40">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-medium mb-8">
            Our graduates work at
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="px-6 py-3 bg-muted/50 rounded-xl border border-border/40 font-bold text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all cursor-default"
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, rgba(99,102,241,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(168,85,247,0.3) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GraduationCap className="h-16 w-16 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to Build Your Future?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
              Join 50,000+ learners who chose NexaLearn to level up their skills and land better careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white h-13 px-10 text-base font-semibold">
                <Link to="/register">Start Learning for Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 h-13 px-10 text-base">
                <Link to="/contact">Talk to Us</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              {["No credit card required","Cancel anytime","500+ courses","48 countries"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
