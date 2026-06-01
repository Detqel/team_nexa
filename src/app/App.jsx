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
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (No Header/Footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard Routes (No Header/Footer) */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/dashboard/*" element={<StudentDashboard />} />
          <Route path="/instructor-dashboard/*" element={<InstructorDashboard />} />
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
                    <Route path="/instructor-dashboard" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Instructors</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/about" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">About Us</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/settings" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Settings</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
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
