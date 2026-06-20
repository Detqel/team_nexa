import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { ProfilePhotoUpload } from "../components/profile-photo-upload";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { getUser, updateStoredUser } from "../lib/auth";
import { authApi } from "../lib/api";
import { toast } from "sonner";

export function SettingsPage() {
  const [user, setUser] = useState(() => getUser());
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .getMe()
      .then((data) => {
        updateStoredUser(data.user);
        setUser(data.user);
        setFullName(data.user.name || "");
        setEmail(data.user.email || "");
      })
      .catch(() => {
        const localUser = getUser();
        if (localUser) {
          setUser(localUser);
          setFullName(localUser.name || "");
          setEmail(localUser.email || "");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!fullName.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setSaving(true);
    try {
      const data = await authApi.updateProfile({ name: fullName.trim() });
      updateStoredUser(data.user);
      setUser(data.user);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="Settings"
        description="Manage your account preferences and privacy settings."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-12">Loading settings...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile photo</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfilePhotoUpload user={user} onUserUpdated={setUser} />
              </CardContent>
            </Card>

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
                <Button className="w-full" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="p-6 h-fit">
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
      )}
    </StudentDashboardLayout>
  );
}

export default SettingsPage;
