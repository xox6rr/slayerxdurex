import { useState } from "react";
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
import LoadingScreen from "@/components/LoadingScreen";
import { HashiraThemeProvider } from "@/contexts/HashiraThemeContext";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HashiraThemeProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
        
        {!isLoading && (
          <>
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
          </>
        )}
      </div>
    </HashiraThemeProvider>
  );
};

export default Index;