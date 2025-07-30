import { Button } from "@/components/ui/button";

export default function PackagesSection() {
  const packages = [
    { name: "Basic", price: "₹ 999/-", features: ["Grooming", "Bath", "Nail Trim"] },
    { name: "Premium", price: "₹ 1999/-", features: ["Grooming", "Spa", "Vet Checkup"] },
    { name: "Deluxe", price: "₹ 2499/-", features: ["Grooming", "Training", "Boarding"] },
  ];

  return (
    <section id="packages" className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Packages</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
              <p className="text-2xl font-bold mb-4">{pkg.price}</p>
              <ul className="mb-4 space-y-1 text-muted-foreground">
                {pkg.features.map((f, i) => <li key={i}>• {f}</li>)}
              </ul>
              {/* <Button>Choose Plan</Button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
