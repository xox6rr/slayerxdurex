import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sword, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      {/* Seigaiha pattern */}
      <div className="absolute inset-0 pattern-seigaiha opacity-10" />
      
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary opacity-10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[hsl(270,60%,50%)] opacity-10 rounded-full blur-[150px]" />

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
            className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[hsl(160,70%,30%)] to-[hsl(160,70%,20%)] mb-8 border-4 border-[hsl(160,60%,40%)] relative"
          >
            <span className="font-japanese text-4xl text-foreground">滅</span>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[hsl(160,60%,50%)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Japanese title */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-japanese text-2xl text-[hsl(270,60%,70%)] mb-4"
          >
            鬼殺隊に入隊せよ
          </motion.p>

          {/* Title */}
          <h2 className="font-brush text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">JOIN THE</span>
            <br />
            <span className="text-gradient-nichirin">DEMON SLAYER CORPS</span>
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
              className="glow-nichirin text-xl px-12 py-8 font-display tracking-widest group bg-gradient-to-r from-[hsl(180,80%,40%)] via-[hsl(270,70%,50%)] to-[hsl(330,80%,55%)] hover:opacity-90 breathing-pulse"
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
              { kanji: "水", text: "Free Shipping", color: "hsl(200, 90%, 55%)" },
              { kanji: "隠", text: "Discreet Packaging", color: "hsl(270, 60%, 60%)" },
              { kanji: "満", text: "100% Satisfaction", color: "hsl(340, 80%, 60%)" },
            ].map((badge) => (
              <span key={badge.text} className="flex items-center gap-2 text-muted-foreground text-sm">
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center font-japanese text-xs"
                  style={{ backgroundColor: `${badge.color}30`, color: badge.color }}
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