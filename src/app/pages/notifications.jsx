import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const notificationsData = [
  {
    id: 1,
    title: "New course launched",
    description: "Advanced React & TypeScript is now available in your dashboard.",
    time: "2h ago",
    read: false,
  },
  {
    id: 2,
    title: "Assignment deadline",
    description: "Your final project is due tomorrow at 11:59 PM.",
    time: "1d ago",
    read: false,
  },
  {
    id: 3,
    title: "Weekly summary",
    description: "You completed 3 lessons this week.",
    time: "3d ago",
    read: true,
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const markAllRead = () => {
    setNotifications((current) => current.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="Notifications"
        description={`${unreadCount} unread alert${unreadCount !== 1 ? "s" : ""}`}
      />

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
              You're all caught up — no notifications to show.
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
                      {!notification.read && <Badge variant="secondary">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{notification.time}</div>
                </div>
                <Button
                  variant={notification.read ? "outline" : "secondary"}
                  size="sm"
                  onClick={() => toggleRead(notification.id)}
                >
                  {notification.read ? "Mark unread" : "Mark read"}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </StudentDashboardLayout>
  );
}

export default NotificationsPage;
