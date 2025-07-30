import Navbar from "@/components/ui/navbar";
import HeroSection from "@/components/ui/hero-section";
import ServicesSection from "@/components/ui/services-section";
import PackagesSection from "@/components/ui/packages-section";
import ReviewsSection from "@/components/ui/reviews-section";
import ContactSection from "@/components/ui/contact-section";
import Footer from "@/components/ui/footer";
import AboutUs from "@/components/ui/about-us";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PackagesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
