import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";

const CTASection = () => {
  const { themeInfo } = useHashiraTheme();

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      {/* Seigaiha pattern */}
      <div className="absolute inset-0 pattern-seigaiha opacity-10" />
      
      {/* Dynamic theme glows */}
      <div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] opacity-10 rounded-full blur-[150px]"
        style={{ background: `hsl(${themeInfo.colors.primary})` }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] opacity-10 rounded-full blur-[150px]"
        style={{ background: `hsl(${themeInfo.colors.accent})` }}
      />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Demon Slayer Corps Symbol */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-8 border-4 relative"
            style={{ 
              background: themeInfo.colors.gradient,
              borderColor: `hsl(${themeInfo.colors.accent})`
            }}
          >
            <span className="font-japanese text-4xl text-white">滅</span>
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{ borderColor: `hsl(${themeInfo.colors.primary})` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Japanese title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-japanese text-2xl mb-4"
            style={{ color: `hsl(${themeInfo.colors.accent})` }}
          >
            鬼殺隊に入隊せよ
          </motion.p>

          {/* Title */}
          <h2 className="font-brush text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">JOIN THE</span>
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: themeInfo.colors.gradient }}
            >
              DEMON SLAYER CORPS
            </span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-japanese">
            全集中・常中 — Achieve Total Concentration Breathing and join the ranks of elite warriors who trust only the best protection.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="text-xl px-12 py-8 font-display tracking-widest group text-white border-0 breathing-pulse"
              style={{ 
                background: themeInfo.colors.gradient,
                boxShadow: `0 0 50px hsl(${themeInfo.colors.glow} / 0.5)`
              }}
            >
              全集中 • SHOP THE COLLECTION
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12"
          >
            {[
              { kanji: "水", text: "Free Shipping" },
              { kanji: "隠", text: "Discreet Packaging" },
              { kanji: "満", text: "100% Satisfaction" },
            ].map((badge, i) => (
              <span key={badge.text} className="flex items-center gap-2 text-muted-foreground text-sm">
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center font-japanese text-xs text-white"
                  style={{ background: themeInfo.colors.gradient }}
                >
                  {badge.kanji}
                </span>
                {badge.text}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;