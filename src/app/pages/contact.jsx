import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  BookOpen,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", category: "general", message: "" });
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Our team replies within 24 hours",
      detail: "support@nexalearn.com",
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon–Fri, 9 AM – 6 PM IST",
      detail: "+91 98765 43210",
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      detail: "Chennai, Tamil Nadu, India",
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "We're here when you need us",
      detail: "Mon – Sat: 9 AM – 8 PM",
      color: "from-orange-500 to-red-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "General Inquiry",
      desc: "Questions about NexaLearn, partnerships, or press",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: Headphones,
      title: "Technical Support",
      desc: "Issues with your account, video playback, or access",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Course Support",
      desc: "Help with course content, assignments, or certificates",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const faqs = [
    {
      q: "How do I enroll in a course?",
      a: "Simply browse our course catalog, click on any course you like, and hit 'Enroll Now'. You can pay securely and get instant access.",
    },
    {
      q: "Can I get a refund if I'm not satisfied?",
      a: "Yes! We offer a 30-day money-back guarantee on all courses. No questions asked — just contact our support team.",
    },
    {
      q: "Do I get a certificate after completing a course?",
      a: "Absolutely. Upon completing all lessons and assessments, you'll receive a verifiable certificate you can share on LinkedIn or your resume.",
    },
    {
      q: "How long do I have access to a purchased course?",
      a: "You get lifetime access to every course you purchase, including all future updates the instructor makes.",
    },
    {
      q: "Can I download course videos for offline viewing?",
      a: "Yes, our mobile app supports offline downloads so you can learn anywhere, even without an internet connection.",
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", color: "hover:text-blue-600" },
    { icon: Twitter, label: "Twitter", color: "hover:text-sky-500" },
    { icon: Instagram, label: "Instagram", color: "hover:text-pink-500" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Youtube, label: "YouTube", color: "hover:text-red-600" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-50/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black" />
        <div className="container mx-auto px-4 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hi? Our friendly
              team is always ready to help you on your learning journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`group hover:shadow-xl transition-all border-border/50 ${card.bg}`}>
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{card.description}</p>
                    <p className="font-medium text-primary">{card.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Support Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left: Support Options + Social */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">How can we help?</h2>
                <p className="text-muted-foreground">
                  Choose the type of support you need and we'll connect you with the right team.
                </p>
              </div>

              <div className="space-y-4">
                {supportOptions.map((opt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="group hover:shadow-md transition-all cursor-pointer border-border/50">
                      <CardContent className="p-4 flex items-start gap-4">
                        <div
                          className={`p-2.5 rounded-xl bg-gradient-to-br ${opt.color} flex-shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <opt.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{opt.title}</p>
                          <p className="text-sm text-muted-foreground">{opt.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Follow us</CardTitle>
                  <CardDescription>Stay updated with our latest courses & news</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 flex-wrap">
                    {socialLinks.map((s, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        size="icon"
                        className={`transition-colors ${s.color}`}
                        aria-label={s.label}
                      >
                        <s.icon className="h-5 w-5" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-border/50 h-48 bg-muted flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/40 dark:to-purple-950/40" />
                <div className="relative text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Chennai, Tamil Nadu, India</p>
                  <p className="text-xs text-muted-foreground mt-1">View on Google Maps →</p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-border/50 bg-background">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Fill in the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                    >
                      <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold">Message sent!</h3>
                      <p className="text-muted-foreground max-w-sm">
                        Thanks for reaching out. Our team will reply to your email within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email Address</label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject</label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Category</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="general">General Inquiry</option>
                            <option value="technical">Technical Support</option>
                            <option value="course">Course Support</option>
                            <option value="billing">Billing</option>
                            <option value="partnership">Partnership</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Message</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your question or issue..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all text-black font-semibold"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By submitting, you agree to our{" "}
                        <span className="underline cursor-pointer hover:text-primary">Privacy Policy</span>.
                        We never share your information.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Can't find the answer you're looking for? Send us a message above.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border border-border/50 rounded-xl px-6 bg-background shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 text-center text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-white/[0.05]" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to start learning?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
                Join over 50,000 students already transforming their careers with NexaLearn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-purple-700 hover:bg-white/90 font-semibold hover:scale-105 transition-all"
                >
                  Browse Courses
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold hover:scale-105 transition-all"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
