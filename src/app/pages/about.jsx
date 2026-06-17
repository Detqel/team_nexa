import { Link } from "react-router-dom";
import { Users, BookOpen, Award, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";

export function AboutPage() {
  const stats = [
    { icon: Users, label: "Active Students", value: "50,000+" },
    { icon: BookOpen, label: "Courses", value: "500+" },
    { icon: Award, label: "Certificates", value: "25,000+" },
  ];

  const team = [
    { name: "Sarah Johnson", role: "Head of Curriculum", seed: "sarah" },
    { name: "Michael Chen", role: "Lead Engineer", seed: "michael" },
    { name: "Emma Davis", role: "Design Lead", seed: "emma" },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <section className="text-center max-w-4xl mx-auto mb-16">
        <Badge variant="default" className="mb-4">Our Story</Badge>
        <h1 className="text-5xl font-bold mb-4">About NexaLearn</h1>
        <p className="text-lg text-muted-foreground">
          NexaLearn is on a mission to make high-quality education accessible to
          everyone. We build hands-on courses taught by industry experts,
          focused on skills employers value.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((s, i) => (
          <div key={i} className="p-6 rounded-lg border bg-background/50 text-center">
            <s.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">What We Believe</h2>
          <p className="text-muted-foreground">
            Learning should be practical, project-driven, and aligned with the
            real-world needs of learners and employers. Our curriculum and
            community reflect that philosophy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Practical Projects</h3>
            <p className="text-sm text-muted-foreground">Build portfolio-ready work while you learn.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Expert Instructors</h3>
            <p className="text-sm text-muted-foreground">Courses taught by industry practitioners.</p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Career Support</h3>
            <p className="text-sm text-muted-foreground">Guidance, mentorship, and hiring pathways.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Meet the Team</h2>
          <p className="text-muted-foreground">A small team building big learning experiences.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {team.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-3 p-6 border rounded-lg">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.seed}`} />
                <AvatarFallback>{t.name[0]}</AvatarFallback>
              </Avatar>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-12 bg-muted/20 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Ready to join thousands of learners?</h3>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Link to="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/courses">Browse Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
