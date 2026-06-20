import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Heart,
  MessageSquare,
  Bell,
  Award,
  Settings,
  LogOut,
  GraduationCap,
  Home,
  FileText,
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { getUser, logout } from "../lib/auth";
import { getUserAvatarUrl, getUserInitials } from "../lib/avatar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: BookOpen, label: "My Courses", href: "/dashboard/my-courses" },
  { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
  { icon: Heart, label: "Wishlist", href: "/dashboard/wishlist" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
  { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardHeader({ title, description, action }) {
  const user = getUser();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {action}
        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
          <AvatarImage src={getUserAvatarUrl(user)} alt={user?.name || "User"} />
          <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
        </Avatar>
        <div className="text-right text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{user?.name || "Student"}</p>
          <p className="capitalize">{user?.role || "student"}</p>
        </div>
      </div>
    </div>
  );
}

export function StudentDashboardLayout({ children }) {
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

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
            {/* ADDED: Back to Home button */}
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/">
                <Home className="h-5 w-5 mr-3" />
                Back to Home
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

        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* FIXED: removed lg:hidden so header shows on desktop too */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger />
            {/* Mobile: show logo text */}
            <span className="font-semibold lg:hidden">NexaLearn</span>
            {/* Desktop: show breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">Dashboard</span>
            </div>
            {/* ADDED: ThemeToggle on the right */}
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex-1 overflow-auto bg-background">
            <div className="container mx-auto p-4 sm:p-6 space-y-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}