import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, Shield } from "lucide-react";
import Hero3DScene from "./Hero3DScene";
import { useHashiraTheme, HashiraTheme } from "@/contexts/HashiraThemeContext";
import { useRef } from "react";
import BreathingStyleParticles from "./BreathingStyleParticles";

// Character images
import tanjiroImg from "@/assets/characters/tanjiro.png";
import nezukoImg from "@/assets/characters/nezuko.png";
import rengokuImg from "@/assets/characters/rengoku.png";
import giyuImg from "@/assets/characters/giyu.png";
import shinobuImg from "@/assets/characters/shinobu.png";
import muichiroImg from "@/assets/characters/muichiro.png";

// Map themes to character images
const themeCharacterMap: Record<HashiraTheme, string> = {
  tanjiro: tanjiroImg,
  nezuko: nezukoImg,
  rengoku: rengokuImg,
  giyu: giyuImg,
  shinobu: shinobuImg,
  muichiro: muichiroImg,
  zenitsu: tanjiroImg, // fallback
  tengen: rengokuImg,  // fallback
  gyomei: giyuImg,     // fallback
  sanemi: muichiroImg, // fallback
};

const HeroSection = () => {
  const { themeInfo, theme } = useHashiraTheme();
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const characterY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const currentCharacterImg = themeCharacterMap[theme];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Scene */}
      <Hero3DScene />
      
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(240,30%,8%)/80] via-background/60 to-background pointer-events-none" />
      
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

      {/* Breathing Style Particles */}
      <BreathingStyleParticles />

      {/* Dynamic Character Background - FULLSCREEN */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ y: characterY }}
        >
          {/* Breathing animation wrapper */}
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.img 
              src={currentCharacterImg} 
              alt={themeInfo.name}
              className="w-auto h-full min-h-screen object-cover object-top"
              style={{
                opacity: 0.7,
                minWidth: '100%',
                maskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 65%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.4) 65%, transparent 85%)',
                filter: `drop-shadow(0 0 80px hsl(${themeInfo.colors.glow})) drop-shadow(0 0 200px hsl(${themeInfo.colors.primary} / 0.8))`,
              }}
            />
          </motion.div>
          
          {/* Intense pulsing aura effect */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ 
              background: `radial-gradient(ellipse at 50% 40%, hsl(${themeInfo.colors.primary} / 0.4), hsl(${themeInfo.colors.glow} / 0.2) 35%, transparent 60%)` 
            }}
          />
          
          {/* Bottom gradient fade */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, hsl(var(--background)), hsl(var(--background) / 0.8) 30%, transparent)'
            }}
          />
          
          {/* Top gradient fade for navbar */}
          <div 
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, hsl(var(--background) / 0.6), transparent)'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Vignette Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, transparent 50%, hsl(var(--background) / 0.4) 75%, hsl(var(--background) / 0.8) 90%, hsl(var(--background)) 100%)',
        }}
      />
      
      {/* Corner vignettes for extra drama */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          boxShadow: 'inset 0 0 200px 60px hsl(var(--background) / 0.6)',
        }}
      />

      {/* Dynamic theme glow - Enhanced */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[180px]"
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ background: `hsl(${themeInfo.colors.primary})` }}
      />

      <div className="container relative z-20 px-4">
        <div className="flex flex-col items-center lg:items-start justify-center min-h-[60vh]">
          {/* Centered Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left max-w-2xl"
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