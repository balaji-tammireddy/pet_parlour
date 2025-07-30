export default function ServicesSection() {
  const services = [
    { title: "Pet Grooming", description: "Professional grooming for dogs and cats." },
    { title: "Boarding", description: "Safe and comfortable boarding facilities." },
    { title: "Training", description: "Expert trainers for obedience and behavior." },
    { title: "Vet Care", description: "On-site vet consultations and check-ups." },
  ];

  return (
    <section id="services" className="py-20 px-6 bg-muted">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-card rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
