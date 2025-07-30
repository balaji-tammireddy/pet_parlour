"use client";
import React from "react";
import Marquee from "react-fast-marquee";

export default function ReviewsSection() {
  const reviews = [
    "Very impressive team with fully packed products. – Sarah",
    "Best grooming experience ever! – Shivam",
    "Professional and friendly staff. – Akash",
    "Affordable and reliable pet care. – Vijay",
  ];

  return (
    <section id="reviews" className="py-20 bg-muted">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
      <Marquee pauseOnHover gradient={false}>
        {reviews.map((review, index) => (
          <div key={index} className="bg-card p-4 mx-4 rounded-lg shadow">
            {review}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
