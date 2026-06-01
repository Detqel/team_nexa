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
import Categories from "./pages/categories";
import { Toaster } from "./components/ui/sonner";

function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground mt-4">The page you were looking for doesn’t exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (No Header/Footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard Routes (No Header/Footer) */}
          <Route path="/dashboard/*" element={<StudentDashboard />} />
          <Route path="/instructor/*" element={<InstructorDashboard />} />
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
                    <Route path="/categories" element={<Categories />} />
                    <Route
                      path="/about"
                      element={
                        <div className="container mx-auto px-4 py-20 text-center">
                          <h1 className="text-4xl font-bold">About</h1>
                          <p className="text-muted-foreground mt-4">Coming soon...</p>
                        </div>
                      }
                    />
                    <Route path="/instructors" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Instructors</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/contact" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Contact</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
                    <Route path="/settings" element={<div className="container mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-bold">Settings</h1><p className="text-muted-foreground mt-4">Coming soon...</p></div>} />
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