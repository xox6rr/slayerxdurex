import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SwordSlashTransition from "@/components/SwordSlashTransition";
import ProductSection from "@/components/ProductSection";
import Product3DViewer from "@/components/Product3DViewer";
import HashiraShowcase from "@/components/HashiraShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AtmosphericParticles from "@/components/AtmosphericParticles";
import WisteriaDecoration from "@/components/WisteriaDecoration";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AtmosphericParticles />
      <WisteriaDecoration />
      <Navbar />
      <main>
        <HeroSection />
        <SwordSlashTransition variant="water" />
        <ProductSection />
        <SwordSlashTransition variant="flame" />
        <Product3DViewer />
        <SwordSlashTransition variant="thunder" />
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