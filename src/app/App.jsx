import { BrowserRouter, Routes, Route } from "react-router";
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
import { ContactPage } from "./pages/contact";
import { MyCoursesPage } from "./pages/my-courses";
import { WishlistPage } from "./pages/wishlist";
import { CertificatesPage } from "./pages/certificates";
// Instructor sub-pages
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
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student Dashboard Routes */}
          {/* Dashboard Routes (No Header/Footer) */}
          <Route path="/dashboard/messages" element={<MessagesPage />} />
          <Route path="/dashboard/notifications" element={<NotificationsPage />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/dashboard/my-courses" element={<MyCoursesPage />} />
          <Route path="/dashboard/wishlist" element={<WishlistPage />} />
          <Route path="/dashboard/certificates" element={<CertificatesPage />} />
          <Route path="/dashboard/*" element={<StudentDashboard />} />

          {/* Instructor Dashboard Routes */}
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/instructor-dashboard/courses" element={<ManageCoursesPage />} />
          <Route path="/instructor-dashboard/create" element={<CreateCoursePage />} />
          <Route path="/instructor-dashboard/upload" element={<UploadVideosPage />} />
          <Route path="/instructor-dashboard/students" element={<StudentsPage />} />
          <Route path="/instructor-dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/instructor-dashboard/earnings" element={<EarningsPage />} />
          <Route path="/instructor-dashboard/assignments" element={<AssignmentsPage />} />
          <Route path="/instructor-dashboard/quiz" element={<QuizManagementPage />} />
          <Route path="/instructor-dashboard/settings" element={<InstructorSettingsPage />} />
          <Route path="/instructor-dashboard/my-courses" element={<MyCoursesPage />} />
          <Route path="/instructor-dashboard/wishlist" element={<WishlistPage />} />
          <Route path="/instructor-dashboard/certificates" element={<CertificatesPage />} />
          <Route path="/instructor-dashboard/*" element={<InstructorDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Main Routes (With Header/Footer) */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/categories" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Categories</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/about" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">About Us</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/settings" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Settings</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/contact" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Contact</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/settings" element={<SettingsPage />} />
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