"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import supabase from "@/lib/supabase";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Password validation criteria
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";

  const isPasswordValid =
    hasMinLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar &&
    passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Invalid password", {
        description:
          "Please make sure your password meets all requirements and both passwords match.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "try-set-password",
        {
          body: {
            password,
            checkoutSessionId: searchParams.get("session_id"),
          },
          method: "POST",
        }
      );

      if (error) {
        toast.error("Error setting password", {
          description:
            "There was a problem setting your password. Please try again.",
        });
        return;
      }

      console.log(data);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.user.email,
        password,
      });

      if (signInError) {
        toast.error("Error signing in", {
          description: "There was a problem signing in. Please try again.",
        });
        return;
      }

      toast("Password set successfully", {
        description:
          "Your account has been created. You can now log in with your new password.",
      });

      // Redirect to login page or dashboard
      window.location.href = data.url;
    } catch (error) {
      toast.error("Error setting password", {
        description:
          "There was a problem setting your password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!searchParams.get("session_id")) {
      navigate("/");
    }
  }, [searchParams.get("session_id")]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <KeyRound className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Set Your Password
          </CardTitle>
          <CardDescription className="text-center">
            Create a secure password for your new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <p className="text-sm font-medium">Password must contain:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      hasMinLength ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={
                      hasMinLength ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    At least 8 characters
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      hasUppercase ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={
                      hasUppercase ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    At least one uppercase letter (A-Z)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      hasLowercase ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={
                      hasLowercase ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    At least one lowercase letter (a-z)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      hasNumber ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={
                      hasNumber ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    At least one number (0-9)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      hasSpecialChar ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={
                      hasSpecialChar
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    At least one special character (!@#$%^&*)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      passwordsMatch ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={
                      passwordsMatch
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    Passwords match
                  </span>
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isPasswordValid || isSubmitting}
            >
              {isSubmitting ? "Setting Password..." : "Set Password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Your password is securely encrypted</span>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
