"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/contact", formData);
      toast.success(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // reset form
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-12 bg-background">
      <Card className="w-full max-w-lg shadow-lg border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-foreground">Contact Us</CardTitle>
          <CardDescription className="text-muted-foreground">
            Have questions? We'd love to hear from you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="py-2" htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label className="py-2" htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>
            <div>
              <Label className="py-2" htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                disabled={loading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
