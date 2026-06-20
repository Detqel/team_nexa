import { useState, useEffect } from "react";
import { Mail, User as UserIcon, Shield } from "lucide-react";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { getUser, updateStoredUser } from "../lib/auth";
import { authApi } from "../lib/api";
import { getUserAvatarUrl, getUserInitials } from "../lib/avatar";
import { Link } from "react-router-dom";

export function ProfilePage() {
  const [user, setUser] = useState(() => getUser());
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .getMe()
      .then((data) => {
        updateStoredUser(data.user);
        setUser(data.user);
        setName(data.user.name || "");
        setEmail(data.user.email || "");
      })
      .catch(() => {
        const localUser = getUser();
        if (localUser) {
          setUser(localUser);
          setName(localUser.name || "");
          setEmail(localUser.email || "");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="Profile"
        description="View and manage your personal information."
      />

      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-12">Loading profile...</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader>
              <CardTitle>Personal information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                  <AvatarImage src={getUserAvatarUrl(user)} alt={user?.name || "Profile"} />
                  <AvatarFallback className="text-lg">{getUserInitials(user)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{user?.name || "User"}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link to="/dashboard/settings">Change photo in Settings</Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-name">Full name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-name"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="profile-email"
                    type="email"
                    className="pl-10"
                    value={email}
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed from this page.</p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent text-black font-semibold" asChild>
                <Link to="/dashboard/settings">Edit in Settings</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Account type</p>
                <Badge variant="secondary" className="mt-1 capitalize">
                  {user?.role || "student"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Enrolled courses</p>
                <p className="text-2xl font-bold">{user?.enrolledCourses?.length || 0}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Wishlist items</p>
                <p className="text-2xl font-bold">{user?.wishlist?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </StudentDashboardLayout>
  );
}
