import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SwordSlashTransition from "@/components/SwordSlashTransition";
import ProductSection from "@/components/ProductSection";
import Product3DViewer from "@/components/Product3DViewer";
import HashiraShowcase from "@/components/HashiraShowcase";
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
        <SwordSlashTransition />
        <ProductSection />
        <SwordSlashTransition />
        <Product3DViewer />
        <SwordSlashTransition />
        <HashiraShowcase />
        <SwordSlashTransition />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;