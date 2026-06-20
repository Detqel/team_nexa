import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Plus,
  Upload,
  Users,
  BarChart3,
  DollarSign,
  FileText,
  Trophy,
  Settings,
  LogOut,
  GraduationCap,
  Home,
  ChevronLeft,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "./ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
import { getUser, logout } from "../lib/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard",       href: "/instructor-dashboard" },
  { icon: BookOpen,        label: "Manage Courses",  href: "/instructor-dashboard/courses" },
  { icon: Plus,            label: "Create Course",   href: "/instructor-dashboard/create" },
  { icon: Upload,          label: "Upload Videos",   href: "/instructor-dashboard/upload" },
  { icon: Users,           label: "Students",        href: "/instructor-dashboard/students" },
  { icon: BarChart3,       label: "Analytics",       href: "/instructor-dashboard/analytics" },
  { icon: DollarSign,      label: "Earnings",        href: "/instructor-dashboard/earnings" },
  { icon: FileText,        label: "Assignments",     href: "/instructor-dashboard/assignments" },
  { icon: Trophy,          label: "Quiz Management", href: "/instructor-dashboard/quiz" },
  { icon: User,            label: "Profile",         href: "/instructor-dashboard/profile" },
  { icon: Settings,        label: "Settings",        href: "/instructor-dashboard/settings" },
];

export function InstructorLayout({ children }) {
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* ── Sidebar ── */}
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <Link to="/" className="flex items-center gap-2 group">
              <GraduationCap className="h-6 w-6 text-primary transition-transform group-hover:rotate-6" />
              <span className="font-bold text-lg">NexaLearn</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.href}
                      >
                        <Link to={item.href} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4 space-y-1">
            {/* Back to Home */}
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/">
                <Home className="h-5 w-5 mr-3" />
                Back to Home
              </Link>
            </Button>
            {/* Switch to Student View */}
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard">
                <ChevronLeft className="h-5 w-5 mr-3" />
                Student View
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* Top header — visible on ALL screen sizes */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b bg-background px-4">
            <SidebarTrigger />

            {/* Mobile: show logo */}
            <span className="font-semibold lg:hidden">NexaLearn</span>

            {/* Desktop: breadcrumb with Home link */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Instructor Dashboard</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                <Link to="/dashboard">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Student View
                </Link>
              </Button>
              <ThemeToggle />
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 overflow-auto bg-background">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}