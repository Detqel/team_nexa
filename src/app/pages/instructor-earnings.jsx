import { motion } from "motion/react";
import { useState } from "react";
import { DollarSign, TrendingUp, Download, CreditCard, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { InstructorLayout } from "../components/instructor-sidebar";
import { Progress } from "../components/ui/progress";

const monthlyEarnings = [
  { month: "Jan", gross: 4200, net: 3360 },
  { month: "Feb", gross: 5800, net: 4640 },
  { month: "Mar", gross: 7200, net: 5760 },
  { month: "Apr", gross: 6500, net: 5200 },
  { month: "May", gross: 8900, net: 7120 },
  { month: "Jun", gross: 11200, net: 8960 },
];

const transactions = [
  { id: "TXN-001", date: "Jun 1, 2026", course: "Complete Web Development Bootcamp", student: "Alice Johnson", amount: 89.99, fee: 18.00, net: 71.99, type: "enrollment" },
  { id: "TXN-002", date: "May 31, 2026", course: "Advanced React & TypeScript", student: "Bob Smith", amount: 74.99, fee: 15.00, net: 59.99, type: "enrollment" },
  { id: "TXN-003", date: "May 30, 2026", course: "Complete Web Development Bootcamp", student: "Emma Davis", amount: 89.99, fee: 18.00, net: 71.99, type: "enrollment" },
  { id: "TXN-004", date: "May 28, 2026", course: "JavaScript Essentials", student: "Frank Miller", amount: 59.99, fee: 12.00, net: 47.99, type: "enrollment" },
  { id: "TXN-005", date: "May 27, 2026", course: "Node.js & Express", student: "Grace Lee", amount: 69.99, fee: 14.00, net: 55.99, type: "enrollment" },
  { id: "TXN-006", date: "May 25, 2026", course: "Advanced React & TypeScript", student: "Henry Wilson", amount: 74.99, fee: 15.00, net: 59.99, type: "refund", refund: true },
];

const courseEarnings = [
  { title: "Complete Web Dev Bootcamp", gross: 15420, net: 12336, students: 1542, percent: 52 },
  { title: "Advanced React & TypeScript", gross: 8920, net: 7136, students: 892, percent: 30 },
  { title: "JavaScript Essentials", gross: 4130, net: 3304, students: 413, percent: 14 },
  { title: "Node.js & Express", gross: 3200, net: 2560, students: 320, percent: 11 },
];

export function EarningsPage() {
  const [period, setPeriod] = useState("6months");

  const totalGross = monthlyEarnings.reduce((a, m) => a + m.gross, 0);
  const totalNet = monthlyEarnings.reduce((a, m) => a + m.net, 0);
  const pendingPayout = 3240;

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Earnings 💰</h1>
            <p className="text-muted-foreground">Track your revenue, payouts and transaction history</p>
          </div>
          <div className="flex gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">This year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Gross Revenue", value: `$${totalGross.toLocaleString()}`, sub: "Before platform fee", icon: DollarSign, color: "from-blue-500 to-cyan-500", change: "+18%" },
            { label: "Net Earnings", value: `$${totalNet.toLocaleString()}`, sub: "After 20% platform fee", icon: TrendingUp, color: "from-green-500 to-emerald-500", change: "+18%" },
            { label: "Pending Payout", value: `$${pendingPayout.toLocaleString()}`, sub: "Next payout: June 15", icon: Wallet, color: "from-purple-500 to-pink-500", change: "" },
            { label: "Paid Out (Total)", value: "$18,400", sub: "All-time payouts", icon: CreditCard, color: "from-orange-500 to-red-500", change: "" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all">
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color}`}>
                      <s.icon className="h-6 w-6 text-white" />
                    </div>
                    {s.change && <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">{s.change}</Badge>}
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payout Banner */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-indigo-700 dark:text-indigo-300">💳 Next Payout: $3,240.00 on June 15, 2026</p>
              <p className="text-sm text-muted-foreground">Payout via Bank Transfer to account ending in ****4521</p>
            </div>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 whitespace-nowrap">
              <CreditCard className="h-4 w-4 mr-2" />Request Early Payout
            </Button>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Earnings Over Time</CardTitle><CardDescription>Gross vs net earnings per month</CardDescription></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                  <Line type="monotone" dataKey="gross" stroke="#6366f1" strokeWidth={2} name="Gross" />
                  <Line type="monotone" dataKey="net" stroke="#10b981" strokeWidth={2} name="Net" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Earnings by Course</CardTitle><CardDescription>Revenue breakdown per course</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {courseEarnings.map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium truncate max-w-[200px]">{c.title}</span>
                    <span className="font-bold text-green-600">${c.net.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={c.percent} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-8">{c.percent}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.students} students · ${c.gross.toLocaleString()} gross</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div><CardTitle>Transaction History</CardTitle><CardDescription>Recent enrollments and payouts</CardDescription></div>
              <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />CSV</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-right">Gross</TableHead>
                    <TableHead className="text-right">Fee</TableHead>
                    <TableHead className="text-right">Net</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-mono text-xs">{t.id}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{t.date}</TableCell>
                      <TableCell className="text-sm max-w-[160px]"><span className="line-clamp-1">{t.course}</span></TableCell>
                      <TableCell className="text-sm">{t.student}</TableCell>
                      <TableCell className={`text-right font-semibold ${t.refund ? "text-red-500 line-through" : ""}`}>
                        ${t.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">${t.fee.toFixed(2)}</TableCell>
                      <TableCell className={`text-right font-bold ${t.refund ? "text-red-500" : "text-green-600"}`}>
                        {t.refund ? "-" : ""}${t.net.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={t.refund ? "destructive" : "default"} className={t.refund ? "" : "bg-green-500"}>
                          {t.refund ? "Refund" : "Enrollment"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
}
