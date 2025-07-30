"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <section id="about" className="py-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            At <span className="text-primary font-semibold">The Pet Parlour</span>,
            we are passionate about pampering pets and providing top-quality grooming
            and wellness services. Our team of expert groomers ensures that your furry
            friends are happy, healthy, and always looking their best.
          </p>
          <p className="text-muted-foreground mb-6">
            From luxury grooming to customized care packages, we make pet care
            stress-free for both pets and their parents. Your pet's comfort is our top priority.
          </p>
          <Button variant="default" size="lg">
            Learn More
          </Button>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/about-us.jpeg"
            alt="About The Pet Parlour"
            width={500}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
