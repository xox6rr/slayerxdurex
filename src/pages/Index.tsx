import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SwordSlashTransition from "@/components/SwordSlashTransition";
import ProductSection from "@/components/ProductSection";
import Product3DViewerEnhanced from "@/components/Product3DViewerEnhanced";
import HashiraShowcase from "@/components/HashiraShowcase";
import CharacterShowcase from "@/components/CharacterShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AtmosphericParticles from "@/components/AtmosphericParticles";
import WisteriaDecoration from "@/components/WisteriaDecoration";
import LoadingScreen3D from "@/components/LoadingScreen3D";
import { HashiraThemeProvider } from "@/contexts/HashiraThemeContext";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <HashiraThemeProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        {isLoading && <LoadingScreen3D onLoadingComplete={() => setIsLoading(false)} />}
        
        {!isLoading && (
          <>
            <AtmosphericParticles />
            <WisteriaDecoration />
            <Navbar />
            <main>
              <HeroSection />
              <SwordSlashTransition variant="water" />
              <CharacterShowcase />
              <SwordSlashTransition variant="flame" />
              <ProductSection />
              <SwordSlashTransition variant="thunder" />
              <Product3DViewerEnhanced />
              <SwordSlashTransition />
              <HashiraShowcase />
              <SwordSlashTransition variant="water" />
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