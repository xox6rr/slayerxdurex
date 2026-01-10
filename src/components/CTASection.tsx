import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sword, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-8"
          >
            <Sword className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Title */}
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">BECOME A</span>
            <br />
            <span className="text-gradient-crimson">DEMON SLAYER</span>
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join the ranks of elite warriors who trust only the best protection. 
            Your journey to becoming a Hashira starts here.
          </p>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="glow-crimson text-xl px-12 py-8 font-display tracking-widest group"
            >
              SHOP THE COLLECTION
              <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 text-muted-foreground text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Free Shipping
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-nichirin" />
              Discreet Packaging
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sakura" />
              100% Satisfaction
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;