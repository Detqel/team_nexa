import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { HomePage } from "./pages/home";
import { StudentDashboard } from "./pages/student-dashboard";
import { InstructorDashboard } from "./pages/instructor-dashboard";
import { AdminDashboard } from "./pages/admin-dashboard";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { CoursesPage } from "./pages/courses";
import Categories from "./pages/categories";
import { AboutPage } from "./pages/about";
import { ContactPage } from "./pages/contact";
import { MyCoursesPage } from "./pages/my-courses";
import { WishlistPage } from "./pages/wishlist";
import { CertificatesPage } from "./pages/certificates";
import { ManageCoursesPage } from "./pages/instructor-manage-courses";
import { CreateCoursePage } from "./pages/instructor-create-course";
import { UploadVideosPage } from "./pages/instructor-upload-videos";
import { StudentsPage } from "./pages/instructor-students";
import { AnalyticsPage } from "./pages/instructor-analytics";
import { EarningsPage } from "./pages/instructor-earnings";
import { AssignmentsPage } from "./pages/instructor-assignments";
import { QuizManagementPage } from "./pages/instructor-quiz";
import { InstructorSettingsPage } from "./pages/instructor-settings";
import { MessagesPage } from "./pages/messages";
import { NotificationsPage } from "./pages/notifications";
import { SettingsPage } from "./pages/settings";
import { ProfilePage } from "./pages/profile";
import { Toaster } from "./components/ui/sonner";
import { isAuthenticated } from "./lib/auth";

function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mt-4">The page you were looking for doesn't exist.</p>
    </div>
  );
}

function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<RequireAuth><StudentDashboard /></RequireAuth>} />
          <Route path="/dashboard/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path="/dashboard/my-courses" element={<RequireAuth><MyCoursesPage /></RequireAuth>} />
          <Route path="/dashboard/wishlist" element={<RequireAuth><WishlistPage /></RequireAuth>} />
          <Route path="/dashboard/messages" element={<RequireAuth><MessagesPage /></RequireAuth>} />
          <Route path="/dashboard/notifications" element={<RequireAuth><NotificationsPage /></RequireAuth>} />
          <Route path="/dashboard/certificates" element={<RequireAuth><CertificatesPage /></RequireAuth>} />
          <Route path="/dashboard/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
          <Route path="/dashboard/*" element={<RequireAuth><StudentDashboard /></RequireAuth>} />

          <Route path="/instructor-dashboard" element={<RequireAuth><InstructorDashboard /></RequireAuth>} />
          <Route path="/instructor-dashboard/courses" element={<RequireAuth><ManageCoursesPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/create" element={<RequireAuth><CreateCoursePage /></RequireAuth>} />
          <Route path="/instructor-dashboard/upload" element={<RequireAuth><UploadVideosPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/students" element={<RequireAuth><StudentsPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/analytics" element={<RequireAuth><AnalyticsPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/earnings" element={<RequireAuth><EarningsPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/assignments" element={<RequireAuth><AssignmentsPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/quiz" element={<RequireAuth><QuizManagementPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/settings" element={<RequireAuth><InstructorSettingsPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/my-courses" element={<RequireAuth><MyCoursesPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/wishlist" element={<RequireAuth><WishlistPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/certificates" element={<RequireAuth><CertificatesPage /></RequireAuth>} />
          <Route path="/instructor-dashboard/*" element={<RequireAuth><InstructorDashboard /></RequireAuth>} />

          <Route path="/admin/*" element={<AdminDashboard />} />

          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<RequireAuth><CoursesPage /></RequireAuth>} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/instructors" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Instructors</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/settings" element={<Navigate to="/dashboard/settings" replace />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}
