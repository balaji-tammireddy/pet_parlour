"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export default function SigninPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/users/signin", credentials);

      toast.success("Login successful!");

      const userId = response.data.user?.id;
      if (!userId) {
        throw new Error("User ID missing from server response");
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push(`/${userId}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">
            Welcome back! Please login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="py-2" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </div>

              <div className="relative">
                <Label className="py-2" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  disabled={loading}
                  required
                />
                <div
                  className="absolute right-3 top-8 cursor-pointer text-muted-foreground py-1.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-2">
              <span
                onClick={() => router.push("/forgot-password")}
                className="cursor-pointer text-primary hover:underline"
              >
                Forgot Password?
              </span>
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <span
                onClick={() => router.push("/register")}
                className="cursor-pointer text-primary hover:underline"
              >
                Register
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}