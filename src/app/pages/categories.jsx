import { motion } from "motion/react";
import {
  LayoutGrid,
  Code2,
  Cpu,
  Pencil,
  Globe2,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Web Development",
    description: "Build responsive websites, front-end apps, and backend APIs.",
    courses: 112,
    icon: LayoutGrid,
    tag: "Trending",
  },
  {
    title: "AI & Machine Learning",
    description: "Learn models, data pipelines, and real-world AI systems.",
    courses: 84,
    icon: Cpu,
    tag: "Popular",
  },
  {
    title: "Design",
    description: "Master UI/UX, product design, and visual storytelling.",
    courses: 61,
    icon: Pencil,
    tag: "Creative",
  },
  {
    title: "Business & Marketing",
    description: "Grow your skills in strategy, marketing, and leadership.",
    courses: 48,
    icon: TrendingUp,
    tag: "Business",
  },
  {
    title: "Mobile Development",
    description: "Create native and cross-platform apps for mobile devices.",
    courses: 77,
    icon: Code2,
    tag: "Fast-Track",
  },
  {
    title: "Data Science",
    description: "Explore analytics, data visualization, and machine learning.",
    courses: 53,
    icon: Globe2,
    tag: "In-Demand",
  },
];

export default function Categories() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-sm uppercase tracking-[0.24em] font-semibold text-primary mb-3">
            Explore by category
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find the perfect learning path
          </h1>
          <p className="text-base text-muted-foreground">
            Browse our most popular learning categories and discover courses designed to help you grow fast.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="overflow-hidden">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="uppercase text-[11px] font-semibold">
                      {category.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{category.courses} courses</span>
                    <span>Beginner friendly</span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/courses">Browse courses</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
