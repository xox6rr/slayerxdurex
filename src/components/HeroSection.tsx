import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, Shield } from "lucide-react";
import NichirinBlade from "./NichirinBlade";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";

const HeroSection = () => {
  const { themeInfo } = useHashiraTheme();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,30%,8%)] via-background to-background" />
      
      {/* Seigaiha wave pattern */}
      <div className="absolute inset-0 pattern-seigaiha" />
      
      {/* Checkered pattern overlay */}
      <div className="absolute inset-0 pattern-checkered" />

      {/* Moon glow */}
      <motion.div
        className="absolute top-10 right-20 w-32 h-32 rounded-full bg-[hsl(45,30%,85%)] glow-moon animate-moon-pulse"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Mountain silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden opacity-20">
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 200 L0 120 L200 60 L400 100 L500 40 L700 90 L900 30 L1100 80 L1200 50 L1200 200 Z" fill="hsl(240, 20%, 15%)" />
          <path d="M0 200 L0 150 L150 100 L350 130 L550 70 L750 120 L950 60 L1200 100 L1200 200 Z" fill="hsl(240, 20%, 10%)" />
        </svg>
      </div>

      {/* Dynamic theme glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[150px]"
        style={{ background: `hsl(${themeInfo.colors.primary})` }}
      />

      {/* Side kanji decorations */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="writing-vertical font-japanese text-4xl text-foreground tracking-[0.5em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          鬼滅の刃
        </motion.div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="writing-vertical font-japanese text-4xl text-foreground tracking-[0.5em]"
          style={{ writingMode: 'vertical-rl' }}
        >
          全集中
        </motion.div>
      </div>

      <div className="container relative z-20 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Japanese Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span 
                className="font-japanese text-2xl md:text-3xl tracking-wider"
                style={{ color: `hsl(${themeInfo.colors.accent})` }}
              >
                {themeInfo.japaneseName}
              </span>
              <span className="mx-4 text-muted-foreground">×</span>
              <span 
                className="font-display text-2xl md:text-3xl tracking-wider"
                style={{ color: `hsl(${themeInfo.colors.primary})` }}
              >
                DUREX
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-brush text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
            >
              <span className="text-foreground block">TOTAL</span>
              <span 
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: themeInfo.colors.gradient }}
              >
                CONCENTRATION
              </span>
              <span className="text-foreground block">PROTECTION</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-8 font-japanese"
            >
              {themeInfo.title} — {themeInfo.description}. Embrace the breathing techniques of the Demon Slayer Corps.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 font-display tracking-wider breathing-pulse text-white border-0"
                style={{ 
                  background: themeInfo.colors.gradient,
                  boxShadow: `0 0 40px hsl(${themeInfo.colors.glow} / 0.5)`
                }}
              >
                <Flame className="w-5 h-5 mr-2" />
                全集中 • SHOP NOW
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 font-display tracking-wider"
                style={{ 
                  borderColor: `hsl(${themeInfo.colors.primary})`,
                  color: `hsl(${themeInfo.colors.accent})`
                }}
              >
                <Shield className="w-5 h-5 mr-2" />
                BREATHING STYLES
              </Button>
            </motion.div>

            {/* Current Theme Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center gap-3 justify-center lg:justify-start"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                style={{ 
                  background: themeInfo.colors.gradient,
                  borderColor: `hsl(${themeInfo.colors.accent})`
                }}
              >
                <span className="font-japanese text-xs text-white">滅</span>
              </div>
              <span className="text-muted-foreground text-sm">
                {themeInfo.name} Theme Active
              </span>
            </motion.div>
          </motion.div>

          {/* Right Content - Nichirin Blade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <NichirinBlade />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-sm font-japanese tracking-widest">下へ</span>
          <div 
            className="w-px h-12"
            style={{ background: `linear-gradient(to bottom, hsl(${themeInfo.colors.primary}), transparent)` }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;