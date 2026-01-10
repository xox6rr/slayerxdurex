import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SakuraParticles from "@/components/SakuraParticles";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SakuraParticles />
      <Navbar />
      <main>
        <HeroSection />
        <ProductSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;