import { useState, useEffect } from "react";
import {
  User, Bell, Lock, CreditCard, Globe, Eye, EyeOff,
  Save, Trash2, Shield, Smartphone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { InstructorLayout } from "../components/instructor-sidebar";
import { ProfilePhotoUpload } from "../components/profile-photo-upload";
import { getUser, updateStoredUser } from "../lib/auth";
import { authApi } from "../lib/api";
import { toast } from "sonner";

function splitName(fullName = "") {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function joinName(firstName, lastName) {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(" ");
}

function profileFromUser(user) {
  const { firstName, lastName } = splitName(user?.name || "");
  return {
    firstName,
    lastName,
    email: user?.email || "",
    phone: "",
    bio: "",
    title: "",
    website: "",
    twitter: "",
    linkedin: "",
    language: "en",
    timezone: "Asia/Kolkata",
  };
}

function formatMemberSince(date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function InstructorSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => getUser());

  const [profile, setProfile] = useState(() => profileFromUser(getUser()));

  const [notifications, setNotifications] = useState({
    newEnrollment: true, newReview: true, assignmentSubmission: true,
    quizAttempt: false, weeklyReport: true, marketingEmails: false,
    smsAlerts: false, browserPush: true,
  });

  const [payoutInfo] = useState({
    method: "Bank Transfer", bankName: "HDFC Bank", accountNumber: "****4521",
    ifsc: "HDFC0001234", nextPayout: "June 15, 2026", payoutFrequency: "Monthly",
  });

  useEffect(() => {
    authApi
      .getMe()
      .then((data) => {
        updateStoredUser(data.user);
        setUser(data.user);
        setProfile(profileFromUser(data.user));
      })
      .catch(() => {
        const localUser = getUser();
        if (localUser) {
          setUser(localUser);
          setProfile(profileFromUser(localUser));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const name = joinName(profile.firstName, profile.lastName);
    if (!name) {
      toast.error("Please enter your name.");
      return;
    }

    setSaving(true);
    try {
      const data = await authApi.updateProfile({ name });
      updateStoredUser(data.user);
      setUser(data.user);
      setProfile(profileFromUser(data.user));
      setSaved(true);
      toast.success("Profile updated successfully!");
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      toast.error(error.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const set = (key, val) => setProfile((p) => ({ ...p, [key]: val }));
  const setN = (key, val) => setNotifications((n) => ({ ...n, [key]: val }));

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Settings ⚙️</h1>
          <p className="text-muted-foreground">Manage your account, preferences and security settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4" />Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2"><Bell className="h-4 w-4" />Notifications</TabsTrigger>
            <TabsTrigger value="security" className="gap-2"><Lock className="h-4 w-4" />Security</TabsTrigger>
            <TabsTrigger value="payout" className="gap-2"><CreditCard className="h-4 w-4" />Payout</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            {loading ? (
              <p className="text-sm text-muted-foreground text-center py-12">Loading profile...</p>
            ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Account Overview</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Account type</p>
                    <Badge variant="secondary" className="mt-1 capitalize">{user?.role || "instructor"}</Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Member since</p>
                    <p className="font-medium mt-1">{formatMemberSince(user?.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium mt-1 break-all">{user?.email || "—"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Profile Photo</CardTitle></CardHeader>
                <CardContent>
                  <ProfilePhotoUpload user={user} onUserUpdated={setUser} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input value={profile.firstName} onChange={(e) => set("firstName", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input value={profile.lastName} onChange={(e) => set("lastName", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Professional Title</Label>
                    <Input value={profile.title} onChange={(e) => set("title", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea value={profile.bio} rows={4} onChange={(e) => set("bio", e.target.value)} />
                    <p className="text-xs text-muted-foreground">{profile.bio.length}/300 characters</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input value={profile.email} disabled />
                      <p className="text-xs text-muted-foreground">Email is linked to your login account.</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input value={profile.phone} onChange={(e) => set("phone", e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Social & Website</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Website", key: "website", placeholder: "https://yourwebsite.com" },
                    { label: "Twitter / X", key: "twitter", placeholder: "@username" },
                    { label: "LinkedIn", key: "linkedin", placeholder: "linkedin.com/in/yourprofile" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key} className="space-y-2">
                      <Label>{label}</Label>
                      <Input value={profile[key]} placeholder={placeholder} onChange={(e) => set(key, e.target.value)} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={profile.language} onValueChange={(v) => set("language", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={profile.timezone} onValueChange={(v) => set("timezone", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Kolkata">India (IST)</SelectItem>
                          <SelectItem value="America/New_York">New York (EST)</SelectItem>
                          <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleSave}
                disabled={saving}
                className={`w-full ${saved ? "bg-green-500 hover:bg-green-600" : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"}`}
              >
                {saved ? "✓ Saved Successfully!" : <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save Changes"}</>}
              </Button>
            </div>
            )}
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader><CardTitle>Notification Preferences</CardTitle><CardDescription>Control how and when you receive notifications</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Course Activity</h3>
                  {[
                    { key: "newEnrollment", label: "New Enrollment", desc: "When a student enrolls in your course" },
                    { key: "newReview", label: "New Review", desc: "When a student leaves a review" },
                    { key: "assignmentSubmission", label: "Assignment Submission", desc: "When a student submits an assignment" },
                    { key: "quizAttempt", label: "Quiz Attempt", desc: "When a student completes a quiz" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl border">
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                      <Switch checked={notifications[key]} onCheckedChange={(v) => setN(key, v)} />
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Reports & Marketing</h3>
                  {[
                    { key: "weeklyReport", label: "Weekly Performance Report", desc: "Summary of earnings, enrollments, and ratings" },
                    { key: "marketingEmails", label: "Marketing Emails", desc: "Tips, promotions, and NexaLearn updates" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl border">
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                      <Switch checked={notifications[key]} onCheckedChange={(v) => setN(key, v)} />
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Delivery Methods</h3>
                  {[
                    { key: "smsAlerts", label: "SMS Alerts", desc: "Critical notifications via text message", icon: Smartphone },
                    { key: "browserPush", label: "Browser Push Notifications", desc: "Real-time alerts in your browser", icon: Globe },
                  ].map(({ key, label, desc, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl border">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                      <Switch checked={notifications[key]} onCheckedChange={(v) => setN(key, v)} />
                    </div>
                  ))}
                </div>
                <Button onClick={handleSave} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Save className="h-4 w-4 mr-2" />Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter current password" />
                      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <div className="relative">
                      <Input type={showNew ? "text" : "password"} placeholder="Enter new password (min 8 chars)" />
                      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => setShowNew(!showNew)}>
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm your new password" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Use Google Authenticator or similar</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Not Enabled</Badge>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>This will permanently delete your account, all your courses, student data, and earnings history. This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-destructive text-destructive-foreground">Yes, Delete Everything</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payout Tab */}
          <TabsContent value="payout">
            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Payout Method</CardTitle><CardDescription>Your current payout configuration</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{payoutInfo.method}</p>
                        <p className="text-sm text-muted-foreground">{payoutInfo.bankName} · {payoutInfo.accountNumber}</p>
                      </div>
                      <Badge className="ml-auto bg-green-500">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">IFSC:</span> <span className="font-medium">{payoutInfo.ifsc}</span></div>
                      <div><span className="text-muted-foreground">Frequency:</span> <span className="font-medium">{payoutInfo.payoutFrequency}</span></div>
                      <div><span className="text-muted-foreground">Next Payout:</span> <span className="font-medium">{payoutInfo.nextPayout}</span></div>
                    </div>
                  </div>
                  <Button variant="outline">Update Payout Method</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Tax Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>PAN / Tax ID</Label>
                    <Input placeholder="Enter your PAN number" />
                  </div>
                  <div className="space-y-2">
                    <Label>GST Number (optional)</Label>
                    <Input placeholder="Enter GST registration number" />
                  </div>
                  <Button>Save Tax Info</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </InstructorLayout>
  );
}
