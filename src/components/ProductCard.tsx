import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface ProductCardProps {
  name: string;
  japaneseName: string;
  breathingStyle: string;
  description: string;
  styleType: "water" | "flame" | "thunder" | "mist";
  delay?: number;
}

const styleConfig = {
  water: {
    gradient: "from-[hsl(200,90%,55%)] to-[hsl(220,80%,45%)]",
    glow: "shadow-[0_0_40px_hsl(200,90%,55%,0.4)]",
    border: "border-[hsl(200,90%,55%,0.3)] hover:border-[hsl(200,90%,55%,0.6)]",
    accent: "text-[hsl(200,90%,60%)]",
    bg: "bg-[hsl(200,90%,55%,0.1)]",
    particleColor: "hsl(200, 90%, 60%)",
    kanji: "水",
  },
  flame: {
    gradient: "from-[hsl(25,95%,55%)] to-[hsl(0,85%,50%)]",
    glow: "shadow-[0_0_40px_hsl(25,95%,55%,0.4)]",
    border: "border-[hsl(25,95%,55%,0.3)] hover:border-[hsl(25,95%,55%,0.6)]",
    accent: "text-[hsl(25,95%,60%)]",
    bg: "bg-[hsl(25,95%,55%,0.1)]",
    particleColor: "hsl(25, 95%, 60%)",
    kanji: "火",
  },
  thunder: {
    gradient: "from-[hsl(50,100%,55%)] to-[hsl(40,90%,50%)]",
    glow: "shadow-[0_0_40px_hsl(50,100%,55%,0.4)]",
    border: "border-[hsl(50,100%,55%,0.3)] hover:border-[hsl(50,100%,55%,0.6)]",
    accent: "text-[hsl(50,100%,60%)]",
    bg: "bg-[hsl(50,100%,55%,0.1)]",
    particleColor: "hsl(50, 100%, 60%)",
    kanji: "雷",
  },
  mist: {
    gradient: "from-[hsl(200,20%,70%)] to-[hsl(180,30%,60%)]",
    glow: "shadow-[0_0_40px_hsl(200,20%,70%,0.4)]",
    border: "border-[hsl(200,20%,70%,0.3)] hover:border-[hsl(200,20%,70%,0.6)]",
    accent: "text-[hsl(200,20%,75%)]",
    bg: "bg-[hsl(200,20%,70%,0.1)]",
    particleColor: "hsl(200, 20%, 75%)",
    kanji: "霞",
  },
};

const ProductCard = ({
  name,
  japaneseName,
  breathingStyle,
  description,
  styleType,
  delay = 0,
}: ProductCardProps) => {
  const config = styleConfig[styleType];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative glass-dark rounded-2xl p-6 border transition-all duration-500 overflow-hidden",
        config.border,
        "hover:shadow-2xl"
      )}
    >
      {/* Breathing style particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: config.particleColor,
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                boxShadow: `0 0 10px ${config.particleColor}`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 0.8, 0],
                y: styleType === 'flame' ? -50 : [0, -20, 0],
                x: styleType === 'thunder' ? [0, 10, -10, 0] : 0,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10",
          config.glow
        )}
      />

      {/* Kanji background */}
      <div className="absolute top-4 right-4 font-japanese text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
        {config.kanji}
      </div>

      {/* Icon */}
      <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center mb-4 relative", config.bg)}>
        <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br", config.gradient)} />
        <motion.div
          className={cn("absolute inset-0 rounded-xl", config.bg)}
          animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Japanese name */}
      <p className={cn("font-japanese text-sm mb-2", config.accent)}>
        {japaneseName}
      </p>

      {/* Breathing Style Badge */}
      <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-display tracking-wider mb-3", config.bg, config.accent)}>
        {breathingStyle}
      </div>

      {/* Title */}
      <h3 className="font-brush text-2xl mb-2 text-foreground group-hover:text-gradient-nichirin transition-all">
        {name}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* CTA */}
      <motion.button
        whileHover={{ x: 5 }}
        className={cn("font-display tracking-wider text-sm flex items-center gap-2", config.accent)}
      >
        詳細を見る • DISCOVER
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;