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

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/register", {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
      });

      const registeredUser = response.data.user;
      if (!registeredUser || !registeredUser.id) {
        throw new Error("User ID missing from server response");
      }

      localStorage.setItem("user", JSON.stringify(registeredUser));

      toast.success("Registration successful! Redirecting to your dashboard...");

      router.push(`/${registeredUser.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to register user");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Create an Account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your details below to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onRegister} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="py-2" htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <Label className="py-2" htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  disabled={loading}
                  required
                />
              </div>
              <div>
                <Label className="py-2" htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="text"
                  value={user.mobile}
                  onChange={(e) => setUser({ ...user, mobile: e.target.value })}
                  disabled={loading}
                  required
                />
              </div>
              <div className="relative">
                <Label className="py-2" htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
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
              <div className="relative">
                <Label className="py-2" htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  disabled={loading}
                  required
                />
                <div
                  className="absolute right-3 top-8 cursor-pointer text-muted-foreground py-1.5"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/signin")}
                className="cursor-pointer text-primary hover:underline"
              >
                Sign In
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}