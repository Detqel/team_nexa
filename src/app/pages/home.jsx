import { Link } from "react-router";
import { motion } from "motion/react";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Star,
  Clock,
  Play,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
  Brain,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function HomePage() {
  const stats = [
    { icon: Users, label: "Active Students", value: "50,000+" },
    { icon: BookOpen, label: "Total Courses", value: "500+" },
    { icon: Award, label: "Certificates Issued", value: "25,000+" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" },
  ];

  const categories = [
    {
      icon: Code,
      name: "Web Development",
      count: 120,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      name: "Mobile Development",
      count: 85,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      name: "Data Science",
      count: 95,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      name: "Design",
      count: 75,
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Globe,
      name: "Digital Marketing",
      count: 60,
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: Brain,
      name: "AI & Machine Learning",
      count: 50,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 4.8,
      students: 15420,
      duration: "40 hours",
      price: "$99.99",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Advanced React & TypeScript",
      instructor: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4.9,
      students: 12350,
      duration: "35 hours",
      price: "$129.99",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
      level: "Advanced",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 4.7,
      students: 9870,
      duration: "28 hours",
      price: "$89.99",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop",
      level: "Intermediate",
    },
    {
      id: 4,
      title: "Python for Data Science",
      instructor: "David Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      rating: 4.9,
      students: 18200,
      duration: "45 hours",
      price: "$119.99",
      thumbnail:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
      level: "Intermediate",
    },
  ];

  const instructors = [
    {
      name: "Sarah Johnson",
      role: "Senior Web Developer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      students: 25000,
      courses: 12,
      rating: 4.9,
    },
    {
      name: "Michael Chen",
      role: "React Specialist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      students: 18000,
      courses: 8,
      rating: 4.8,
    },
    {
      name: "Emma Davis",
      role: "UX Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      students: 15000,
      courses: 10,
      rating: 4.7,
    },
    {
      name: "David Martinez",
      role: "Data Scientist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      students: 22000,
      courses: 15,
      rating: 4.9,
    },
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      content:
        "NexaLearn transformed my career! The courses are well-structured and the instructors are top-notch. I landed my dream job within 3 months of completing the bootcamp.",
      rating: 5,
    },
    {
      name: "Lisa Anderson",
      role: "UX Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      content:
        "The UI/UX design course exceeded my expectations. The practical projects helped me build a strong portfolio that impressed employers.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Data Analyst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      content:
        "Best investment I've made in my education. The data science track is comprehensive and the community support is amazing!",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer:
        "Simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. You'll need to create an account if you haven't already. Once enrolled, you'll have instant access to all course materials.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes! Upon successfully completing a course and passing all assessments, you'll receive a verified certificate that you can share on LinkedIn, add to your resume, or showcase in your portfolio.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer:
        "Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers. You can learn anytime, anywhere.",
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer:
        "We offer a 30-day money-back guarantee on all courses. If you're not satisfied for any reason, simply contact our support team within 30 days of purchase for a full refund.",
    },
    {
      question: "Are there any prerequisites for courses?",
      answer:
        "Prerequisites vary by course and are clearly listed on each course page. Beginner courses typically have no prerequisites, while advanced courses may require prior knowledge in the subject area.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-50/[0.02]" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="default" className="mb-4">
                🎉 New courses added every week!
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Transform Your Future with{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  NexaLearn
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Master in-demand skills with expert-led courses. Join thousands
                of students learning to code, design, and innovate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all text-black font-semibold"
                >
                  <Link to="/courses">
                    Start Learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Explore Courses</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-xl opacity-50 animate-blob" />
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-accent/20 rounded-full filter blur-xl opacity-50 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-10 left-20 w-72 h-72 bg-secondary/20 rounded-full filter blur-xl opacity-50 animate-blob animation-delay-4000" />
                <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                    alt="Students learning"
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:scale-105 transition-transform"
              >
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover courses across multiple disciplines and find your passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer hover:shadow-xl hover:scale-105 transition-all">
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.count} courses
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
              <p className="text-lg text-muted-foreground">
                Handpicked courses by industry experts
              </p>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link to="/courses">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer hover:shadow-xl transition-all overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    <Badge
                      variant="secondary"
                      className="absolute top-4 right-4"
                    >
                      {course.level}
                    </Badge>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={course.avatar} />
                        <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                      </Avatar>
                      <span>{course.instructor}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                        <span>({course.students.toLocaleString()})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {course.price}
                    </span>
                    <Button size="sm" variant="default">
                      Enroll Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Instructors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Top Instructors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn from industry professionals with years of experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-xl hover:scale-105 transition-all">
                  <CardContent className="pt-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/20">
                      <AvatarImage src={instructor.avatar} />
                      <AvatarFallback>{instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {instructor.role}
                    </p>
                    <div className="flex justify-center gap-4 text-sm mb-4">
                      <div>
                        <p className="font-bold text-lg">
                          {instructor.students.toLocaleString()}
                        </p>
                        <p className="text-muted-foreground">Students</p>
                      </div>
                      <div>
                        <p className="font-bold text-lg">
                          {instructor.courses}
                        </p>
                        <p className="text-muted-foreground">Courses</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{instructor.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-black via-muted/10 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from our students who transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <Quote className="h-10 w-10 text-primary/20 mb-4" />
                    <p className="text-muted-foreground mb-6">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers!
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-black mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-black/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students already learning on NexaLearn. Get
              started today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="default"
                asChild
                className="bg-black text-primary hover:bg-black/90 border-2 border-black"
              >
                <Link to="/register">
                  Sign Up for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-black text-black hover:bg-black/10"
              >
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
