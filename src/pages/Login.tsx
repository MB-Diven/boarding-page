"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "./Layout";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Handle login logic here
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("Login error:", error.message);
      toast.error(`Login failed. ${error.message}`);
    } else {
      console.log("Login successful:", data);
      navigate("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? "opacity-50" : ""}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
