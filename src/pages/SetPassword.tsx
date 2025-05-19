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
import { useTranslation } from "react-i18next";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      toast.error(t("setPassword.errorTitle"), {
        description: t("setPassword.errorDescription"),
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
        toast.error(t("setPassword.errorSettingPassword"), {
          description: t("setPassword.errorSettingDescription"),
        });
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.user.email,
        password,
      });

      if (signInError) {
        toast.error(t("setPassword.errorSigningIn"), {
          description: t("setPassword.errorSigningDescription"),
        });
        return;
      }

      toast(t("setPassword.successMessage"), {
        description: t("setPassword.successDescription"),
      });

      // Redirect to login page or dashboard
      window.location.href = data.url;
    } catch (error) {
      toast.error(t("setPassword.errorSettingPassword"), {
        description: t("setPassword.errorSettingDescription"),
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
            {t("setPassword.title")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("setPassword.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">{t("setPassword.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("setPassword.enterPassword")}
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
                    {showPassword
                      ? t("common.hidePassword")
                      : t("common.showPassword")}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("setPassword.confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("setPassword.confirmYourPassword")}
              />
            </div>

            <div className="space-y-2 rounded-md border p-3">
              <p className="text-sm font-medium">
                {t("setPassword.passwordMustContain")}
              </p>
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
                    {t("setPassword.minLength")}
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
                    {t("setPassword.upperCase")}
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
                    {t("setPassword.lowerCase")}
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
                    {t("setPassword.number")}
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
                    {t("setPassword.specialChar")}
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
                    {t("setPassword.passwordsMatch")}
                  </span>
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isPasswordValid || isSubmitting}
            >
              {isSubmitting
                ? t("setPassword.settingPassword")
                : t("setPassword.setPasswordButton")}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>{t("setPassword.passwordSecure")}</span>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {t("setPassword.alreadyHaveAccount")}{" "}
            <a href="/login" className="text-primary hover:underline">
              {t("setPassword.logIn")}
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
