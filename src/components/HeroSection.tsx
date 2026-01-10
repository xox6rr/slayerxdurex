import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sword, Shield, Flame } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[100px] animate-glow-pulse" />
      
      {/* Secondary glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[80px]" />
      
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-japanese text-sakura text-lg mb-4 tracking-wider"
            >
              鬼滅の保護
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-6xl md:text-7xl lg:text-8xl leading-none mb-6"
            >
              <span className="text-foreground">SLAY</span>
              <br />
              <span className="text-gradient-crimson">WITH</span>
              <br />
              <span className="text-foreground">PROTECTION</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto lg:mx-0 mb-8"
            >
              Where the art of protection meets the spirit of the demon slayer. 
              Embrace your inner warrior.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="glow-crimson text-lg px-8 py-6 font-display tracking-wider">
                <Flame className="w-5 h-5 mr-2" />
                EXPLORE COLLECTION
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 font-display tracking-wider border-border hover:bg-muted"
              >
                <Shield className="w-5 h-5 mr-2" />
                LEARN MORE
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Sword Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Sword Glow Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-nichirin/20 blur-[60px] animate-glow-pulse" />
              </div>
              
              {/* Nichirin Sword SVG */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <Sword className="w-48 h-48 md:w-64 md:h-64 text-nichirin glow-nichirin rotate-45" strokeWidth={1} />
              </motion.div>

              {/* Energy rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-nichirin/30"
                  style={{
                    width: `${120 + i * 60}px`,
                    height: `${120 + i * 60}px`,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
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
          <span className="text-muted-foreground text-sm font-display tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;