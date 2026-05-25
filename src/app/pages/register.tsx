import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, GraduationCap, User, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Progress } from "../components/ui/progress";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block relative bg-gradient-to-br from-accent via-primary to-secondary"
      >
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
        <div className="relative h-full flex flex-col justify-center px-12 text-white">
          <div className="max-w-lg space-y-6">
            <h3 className="text-4xl font-bold">Start Your Learning Adventure</h3>
            <p className="text-xl text-white/90">
              Join 50,000+ students already learning on NexaLearn and unlock your potential.
            </p>
            <div className="space-y-4 pt-8">
              {[
                { icon: "✨", title: "Expert Instructors", desc: "Learn from the best in the industry" },
                { icon: "🎯", title: "Practical Projects", desc: "Build real-world applications" },
                { icon: "🏆", title: "Career Growth", desc: "Get certified and advance your career" },
                { icon: "💬", title: "Community Support", desc: "Connect with fellow learners" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Register Form */}
      <div className="flex flex-col justify-center px-6 py-12 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md space-y-8"
        >
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NexaLearn
              </span>
            </Link>
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="mt-2 text-muted-foreground">
              Get started with your free account today
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="space-y-2">
                    <Progress value={passwordStrength} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Password strength:{" "}
                      <span className={
                        passwordStrength >= 75 ? "text-green-600" :
                        passwordStrength >= 50 ? "text-yellow-600" :
                        "text-red-600"
                      }>
                        {passwordStrength >= 75 ? "Strong" :
                         passwordStrength >= 50 ? "Medium" : "Weak"}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <p className="font-medium">Password must contain:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${password.length >= 8 ? "text-green-600" : "text-muted-foreground"}`} />
                    <span className={password.length >= 8 ? "text-green-600" : "text-muted-foreground"}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-600" : "text-muted-foreground"}`} />
                    <span className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-600" : "text-muted-foreground"}>
                      Upper & lowercase letters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`h-4 w-4 ${/[0-9]/.test(password) ? "text-green-600" : "text-muted-foreground"}`} />
                    <span className={/[0-9]/.test(password) ? "text-green-600" : "text-muted-foreground"}>
                      At least one number
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" className="mt-1" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/30 text-black font-semibold"
              size="lg"
            >
              Create account
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
