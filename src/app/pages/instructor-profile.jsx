import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, User as UserIcon, Shield } from "lucide-react";
import { InstructorLayout } from "../components/instructor-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { getUser, updateStoredUser } from "../lib/auth";
import { authApi } from "../lib/api";
import { getUserAvatarUrl, getUserInitials } from "../lib/avatar";

export function InstructorProfilePage() {
  const [user, setUser] = useState(() => getUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .getMe()
      .then((data) => {
        updateStoredUser(data.user);
        setUser(data.user);
      })
      .catch(() => {
        const localUser = getUser();
        if (localUser) setUser(localUser);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <InstructorLayout>
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Profile</h1>
          <p className="text-muted-foreground">Your public instructor profile information</p>
        </div>

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
                    <p className="font-semibold text-lg">{user?.name || "Instructor"}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <Link to="/instructor-dashboard/settings">Change photo in Settings</Link>
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" value={user?.name || ""} disabled />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" value={user?.email || ""} disabled />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600" asChild>
                  <Link to="/instructor-dashboard/settings">Edit in Settings</Link>
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
                    {user?.role || "instructor"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium mt-1">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </InstructorLayout>
  );
}
