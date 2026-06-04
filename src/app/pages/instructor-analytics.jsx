import { motion } from "motion/react";
import { BarChart3, TrendingUp, Users, Star, Eye, Clock, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { InstructorLayout } from "../components/instructor-sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 4200, students: 245 },
  { month: "Feb", revenue: 5800, students: 378 },
  { month: "Mar", revenue: 7200, students: 512 },
  { month: "Apr", revenue: 6500, students: 425 },
  { month: "May", revenue: 8900, students: 647 },
  { month: "Jun", revenue: 11200, students: 812 },
];

const coursePerformance = [
  { name: "Web Dev Bootcamp", students: 1542, revenue: 15420, rating: 4.8 },
  { name: "React & TypeScript", students: 892, revenue: 8920, rating: 4.9 },
  { name: "JS Essentials", students: 413, revenue: 4130, rating: 4.7 },
  { name: "Node.js Backend", students: 320, revenue: 3200, rating: 4.6 },
];

const trafficData = [
  { name: "Organic Search", value: 45, color: "#6366f1" },
  { name: "Direct", value: 25, color: "#8b5cf6" },
  { name: "Social Media", value: 18, color: "#a78bfa" },
  { name: "Referral", value: 12, color: "#c4b5fd" },
];

const completionData = [
  { range: "0-25%", count: 320 },
  { range: "26-50%", count: 580 },
  { range: "51-75%", count: 740 },
  { range: "76-99%", count: 460 },
  { range: "100%", count: 280 },
];

const topCountries = [
  { country: "India", flag: "🇮🇳", students: 842, percent: 30 },
  { country: "United States", flag: "🇺🇸", students: 654, percent: 23 },
  { country: "United Kingdom", flag: "🇬🇧", students: 365, percent: 13 },
  { country: "Germany", flag: "🇩🇪", students: 247, percent: 9 },
  { country: "Canada", flag: "🇨🇦", students: 198, percent: 7 },
];

export function AnalyticsPage() {
  const [period, setPeriod] = useState("6months");

  const kpis = [
    { label: "Total Views", value: "48.2K", change: "+18%", icon: Eye, color: "from-blue-500 to-cyan-500" },
    { label: "Total Students", value: "3,167", change: "+12%", icon: Users, color: "from-green-500 to-emerald-500" },
    { label: "Avg. Rating", value: "4.8", change: "+0.1", icon: Star, color: "from-yellow-500 to-orange-500" },
    { label: "Completion Rate", value: "68%", change: "+5%", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    { label: "Watch Time", value: "12.4K hrs", change: "+22%", icon: Clock, color: "from-red-500 to-pink-500" },
    { label: "Countries", value: "48", change: "+3", icon: Globe, color: "from-indigo-500 to-blue-500" },
  ];

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Analytics 📊</h1>
            <p className="text-muted-foreground">Track performance, revenue and student engagement</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpis.map((k, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${k.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${k.color} w-fit mb-2`}>
                    <k.icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-xl font-bold">{k.value}</p>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-xs text-green-500 font-medium mt-1">{k.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Revenue & Enrollment Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
              <CardDescription>Monthly revenue from all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ fill: "#6366f1", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Enrollments</CardTitle>
              <CardDescription>New students per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="students" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Course Performance & Traffic */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Students and revenue by course</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={coursePerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="name" type="category" className="text-xs" width={110} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="students" fill="#6366f1" radius={[0, 4, 4, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where students come from</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={trafficData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {trafficData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-3">
                {trafficData.map((t) => (
                  <div key={t.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ background: t.color }} />
                      <span>{t.name}</span>
                    </div>
                    <span className="font-semibold">{t.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completion Distribution & Top Countries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Completion Distribution</CardTitle>
              <CardDescription>How far students progress through courses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="range" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Students" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
              <CardDescription>Student distribution by location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCountries.map((c, i) => (
                <div key={c.country} className="flex items-center gap-3">
                  <span className="text-xl">{c.flag}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{c.country}</span>
                      <span className="text-muted-foreground">{c.students} students</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.percent}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-semibold w-10 text-right">{c.percent}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </InstructorLayout>
  );
}
