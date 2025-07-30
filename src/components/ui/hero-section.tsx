"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Pamper Your Pets with <span className="text-primary">Professional Care</span>
      </h1>
      <p className="max-w-2xl text-muted-foreground mb-8">
        The Pet Parlour offers premium grooming, boarding, and wellness services for your furry friends.
        Book appointments with ease and keep your pets happy.
      </p>
    </section>
  );
}
