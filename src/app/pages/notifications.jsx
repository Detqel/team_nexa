import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Bell, MessageSquare, Settings, GraduationCap, CheckCircle2, XCircle } from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const notificationsData = [
  {
    id: 1,
    title: "New course launched",
    description: "Advanced React & TypeScript is now available in your dashboard.",
    time: "2h ago",
    read: false,
    variant: "success",
  },
  {
    id: 2,
    title: "Assignment deadline",
    description: "Your final project is due tomorrow at 11:59 PM.",
    time: "1d ago",
    read: false,
    variant: "warning",
  },
  {
    id: 3,
    title: "Weekly summary",
    description: "You completed 3 lessons this week.",
    time: "3d ago",
    read: true,
    variant: "primary",
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  const markAllRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: !notification.read } : notification,
      ),
    );
  };

  const menuItems = [
    { icon: MessageSquare, label: "Dashboard", href: "/dashboard" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications", active: true },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

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
                      <SidebarMenuButton asChild isActive={item.active}>
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
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto bg-background">
          <div className="container mx-auto p-6 space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">Your recent alerts and dashboard updates.</p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-right text-sm text-muted-foreground">
                  <p className="font-medium">John Doe</p>
                  <p>{unreadCount} unread</p>
                </div>
              </div>
            </div>

            <Card className="overflow-hidden">
              <CardHeader className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Recent notifications</CardTitle>
                  <p className="text-sm text-muted-foreground">Manage alerts for your account and courses.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={markAllRead}>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Mark all read
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setNotifications([])}>
                    <XCircle className="mr-2 h-4 w-4" /> Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 px-0 py-4">
                {notifications.length === 0 ? (
                  <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                    You’re all caught up — no notifications to show.
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex flex-col gap-3 border-b px-6 py-4 transition ${
                        notification.read ? "bg-card" : "bg-muted/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-semibold">{notification.title}</span>
                            {!notification.read ? <Badge variant="secondary">New</Badge> : null}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">{notification.time}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={notification.read ? "outline" : "secondary"}
                          size="sm"
                          onClick={() => toggleRead(notification.id)}
                        >
                          {notification.read ? "Mark unread" : "Mark read"}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default NotificationsPage;
