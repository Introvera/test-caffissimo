"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Coffee, User, KeyRound, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === "admin" && password === "admin") { // Mock validation
      login();
      router.replace("/");
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary flex items-stretch">
      {/* Left Column: Branding / Marketing (Visible only on md+ screens) */}
      <div 
        className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url("/signin.jpg")' }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white">
            {/* <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md shadow-lg border border-white/10">
              <Coffee className="h-6 w-6" />
            </div> */}
            <span className="text-2xl font-bold tracking-tight drop-shadow-sm"> </span>
          </div>
        </div>
        
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6 drop-shadow-md">
            Elevate your coffee shop operations.
          </h1>
          <p className="text-white/90 text-lg max-w-md leading-relaxed drop-shadow-sm">
            Welcome to the modern Point of Sale system designed specifically for premium coffee houses. Sign in to start your shift.
          </p>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-cream">
        
        {/* Mobile Logo overlay */}
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white">
            <Coffee className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-text-primary">Caffissimo</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">Welcome back</h2>
            <p className="text-text-muted mt-2">
              Sign in to your account 
              {/* using <span className="font-semibold text-text-primary">admin</span> / <span className="font-semibold text-text-primary">admin</span> */}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary flex items-center gap-2">
                  <User className="w-4 h-4 text-text-muted" />
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(false); }}
                  className="h-12 bg-surface text-text-primary"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-text-muted" />
                    Password
                  </span>
                  <a href="#" className="text-xs text-accent hover:underline font-medium">Forgot password?</a>
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  className="h-12 bg-surface text-text-primary"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="p-3 rounded-xl bg-red-500/10 border border-error/20"
              >
                <p className="text-sm text-error font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-error" />
                  Invalid username or password
                </p>
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl shadow-md gap-2"
              disabled={isLoading || !username || !password}
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
