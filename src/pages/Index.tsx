import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SwordSlashTransition from "@/components/SwordSlashTransition";
import ProductSection from "@/components/ProductSection";
import Product3DViewerEnhanced from "@/components/Product3DViewerEnhanced";
import CharacterShowcase from "@/components/CharacterShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import AtmosphericParticles from "@/components/AtmosphericParticles";
import WisteriaDecoration from "@/components/WisteriaDecoration";
import ThemeTransitionOverlay from "@/components/ThemeTransitionOverlay";
import CartDrawer from "@/components/CartDrawer";
import { HashiraThemeProvider, useHashiraTheme } from "@/contexts/HashiraThemeContext";
import { CartProvider } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const IndexContent = () => {
  const { isTransitioning, targetTheme } = useHashiraTheme();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-background overflow-x-hidden"
    >
      <ThemeTransitionOverlay isTransitioning={isTransitioning} targetTheme={targetTheme} />
      <CartDrawer />
      <AtmosphericParticles />
      <WisteriaDecoration />
      <Navbar />
      <main>
        <HeroSection />
        <SwordSlashTransition variant="water" />
        <CharacterShowcase />
        <SwordSlashTransition variant="flame" />
        <ProductSection />
        <Product3DViewerEnhanced />
        <SwordSlashTransition variant="thunder" />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </motion.div>
  );
};

const Index = () => {
  return (
    <HashiraThemeProvider>
      <CartProvider>
        <IndexContent />
      </CartProvider>
    </HashiraThemeProvider>
  );
};

export default Index;
