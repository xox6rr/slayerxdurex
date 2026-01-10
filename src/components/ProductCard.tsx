import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  breathingStyle: string;
  description: string;
  color: "crimson" | "nichirin" | "sakura" | "gold";
  icon: React.ReactNode;
  delay?: number;
}

const colorStyles = {
  crimson: {
    glow: "shadow-[0_0_40px_hsl(0_85%_50%/0.3)]",
    border: "border-primary/30 hover:border-primary/60",
    accent: "text-primary",
    bg: "bg-primary/10",
  },
  nichirin: {
    glow: "shadow-[0_0_40px_hsl(200_80%_50%/0.3)]",
    border: "border-nichirin/30 hover:border-nichirin/60",
    accent: "text-nichirin",
    bg: "bg-nichirin/10",
  },
  sakura: {
    glow: "shadow-[0_0_40px_hsl(330_80%_75%/0.3)]",
    border: "border-sakura/30 hover:border-sakura/60",
    accent: "text-sakura",
    bg: "bg-sakura/10",
  },
  gold: {
    glow: "shadow-[0_0_40px_hsl(45_100%_60%/0.3)]",
    border: "border-gold/30 hover:border-gold/60",
    accent: "text-gold",
    bg: "bg-gold/10",
  },
};

const ProductCard = ({
  name,
  breathingStyle,
  description,
  color,
  icon,
  delay = 0,
}: ProductCardProps) => {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={cn(
        "group relative glass-dark rounded-2xl p-6 border transition-all duration-500",
        styles.border,
        "hover:shadow-2xl"
      )}
    >
      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
          styles.glow
        )}
      />

      {/* Icon */}
      <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", styles.bg)}>
        <span className={styles.accent}>{icon}</span>
      </div>

      {/* Breathing Style Badge */}
      <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-display tracking-wider mb-3", styles.bg, styles.accent)}>
        {breathingStyle}
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl mb-2 text-foreground group-hover:text-gradient-crimson transition-all">
        {name}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* CTA */}
      <motion.button
        whileHover={{ x: 5 }}
        className={cn("font-display tracking-wider text-sm flex items-center gap-2", styles.accent)}
      >
        DISCOVER
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;