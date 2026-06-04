import { useState } from "react";
import { Link } from "react-router";
import { Settings as SettingsIcon, GraduationCap, ShieldCheck, Bell, MessageSquare } from "lucide-react";
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
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export function SettingsPage() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const menuItems = [
    { icon: MessageSquare, label: "Dashboard", href: "/dashboard" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: SettingsIcon, label: "Settings", href: "/settings", active: true },
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
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and privacy settings.</p>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="text-right text-sm text-muted-foreground">
                  <p className="font-medium">John Doe</p>
                  <p>Student</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <Card className="space-y-6">
                <CardHeader>
                  <CardTitle>Profile settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-3">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                      <div>
                        <p className="font-semibold">Email updates</p>
                        <p className="text-sm text-muted-foreground">Receive weekly progress summaries.</p>
                      </div>
                      <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                      <div>
                        <p className="font-semibold">App notifications</p>
                        <p className="text-sm text-muted-foreground">Get alerts for deadlines and messages.</p>
                      </div>
                      <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                    </div>
                  </div>
                  <Button className="w-full">Save changes</Button>
                </CardContent>
              </Card>

              <Card className="space-y-4 rounded-xl bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Security</p>
                    <p className="text-sm text-muted-foreground">Update your password and recover account details.</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Two-factor authentication is not enabled.</p>
                  <p>Last password change was 42 days ago.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default SettingsPage;
