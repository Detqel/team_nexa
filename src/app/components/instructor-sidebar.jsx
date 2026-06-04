import { Link, useLocation } from "react-router";
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
  Heart,
  Award,
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
} from "./ui/sidebar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/instructor-dashboard" },
  { icon: BookOpen, label: "Manage Courses", href: "/instructor-dashboard/courses" },
  { icon: Plus, label: "Create Course", href: "/instructor-dashboard/create" },
  { icon: Upload, label: "Upload Videos", href: "/instructor-dashboard/upload" },
  { icon: Users, label: "Students", href: "/instructor-dashboard/students" },
  { icon: BarChart3, label: "Analytics", href: "/instructor-dashboard/analytics" },
  { icon: DollarSign, label: "Earnings", href: "/instructor-dashboard/earnings" },
  { icon: FileText, label: "Assignments", href: "/instructor-dashboard/assignments" },
  { icon: Trophy, label: "Quiz Management", href: "/instructor-dashboard/quiz" },
  { icon: Settings, label: "Settings", href: "/instructor-dashboard/settings" },
];

export function InstructorLayout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">NexaLearn</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                        <Link to={item.href} className="flex items-center gap-3">
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
