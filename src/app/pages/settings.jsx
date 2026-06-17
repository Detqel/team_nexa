import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { getUser } from "../lib/auth";

export function SettingsPage() {
  const currentUser = getUser();
  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="Settings"
        description="Manage your account preferences and privacy settings."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Account preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" value={email} disabled />
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

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold">Security</p>
              <p className="text-sm text-muted-foreground">Update your password and account details.</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>Two-factor authentication is not enabled.</p>
            <p>Keep your account safe with a strong password.</p>
          </div>
        </Card>
      </div>
    </StudentDashboardLayout>
  );
}

export default SettingsPage;
