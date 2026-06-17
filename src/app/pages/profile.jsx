import { useState } from "react";
import { Mail, User as UserIcon, Shield } from "lucide-react";
import { StudentDashboardLayout, DashboardHeader } from "../components/student-dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { getUser } from "../lib/auth";

export function ProfilePage() {
  const currentUser = getUser();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");

  return (
    <StudentDashboardLayout>
      <DashboardHeader
        title="Profile"
        description="View and manage your personal information."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Personal information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
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
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
              <p className="text-xs text-muted-foreground">Email cannot be changed from this page.</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-accent text-black font-semibold">
              Save changes
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
                {currentUser?.role || "student"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Enrolled courses</p>
              <p className="text-2xl font-bold">{currentUser?.enrolledCourses?.length || 0}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wishlist items</p>
              <p className="text-2xl font-bold">{currentUser?.wishlist?.length || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentDashboardLayout>
  );
}
