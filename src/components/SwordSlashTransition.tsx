import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Ember {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface SwordSlashTransitionProps {
  variant?: "water" | "flame" | "thunder" | "default";
}

const slashColors = {
  default: {
    primary: "hsl(0, 85%, 55%)",
    secondary: "hsl(340, 80%, 50%)",
    glow: "hsl(0, 85%, 50%)",
  },
  water: {
    primary: "hsl(200, 90%, 60%)",
    secondary: "hsl(220, 80%, 50%)",
    glow: "hsl(200, 90%, 55%)",
  },
  flame: {
    primary: "hsl(25, 95%, 60%)",
    secondary: "hsl(45, 100%, 55%)",
    glow: "hsl(25, 95%, 55%)",
  },
  thunder: {
    primary: "hsl(50, 100%, 60%)",
    secondary: "hsl(55, 100%, 70%)",
    glow: "hsl(50, 100%, 55%)",
  },
};

const SwordSlashTransition = ({ variant = "default" }: SwordSlashTransitionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embers, setEmbers] = useState<Ember[]>([]);
  const colors = slashColors[variant];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const slashProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const slashOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const glowIntensity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  useEffect(() => {
    const newEmbers: Ember[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 30 + Math.random() * 40,
      size: 2 + Math.random() * 6,
      delay: Math.random() * 0.5,
      duration: 1 + Math.random() * 1.5,
    }));
    setEmbers(newEmbers);
  }, []);

  return (
    <div ref={containerRef} className="relative h-48 overflow-hidden">
      {/* Central glow */}
      <motion.div
        style={{ opacity: glowIntensity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div 
          className="w-full h-4 blur-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)` }}
        />
      </motion.div>

      {/* Main slash SVG */}
      <motion.svg
        style={{ opacity: slashOpacity }}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`slashGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor={colors.secondary} stopOpacity="0.5" />
            <stop offset="50%" stopColor={colors.primary} />
            <stop offset="85%" stopColor={colors.secondary} stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id={`slashGlow-${variant}`}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id={`slashClip-${variant}`}>
            <motion.rect
              x="0"
              y="0"
              width="1200"
              height="200"
              style={{
                scaleX: slashProgress,
                transformOrigin: "left center",
              }}
            />
          </clipPath>
        </defs>

        {/* Multiple slash lines for Hinokami Kagura effect */}
        <g clipPath={`url(#slashClip-${variant})`}>
          <path
            d="M0 90 Q300 70 600 100 Q900 130 1200 90"
            stroke={`url(#slashGradient-${variant})`}
            strokeWidth="4"
            fill="none"
            filter={`url(#slashGlow-${variant})`}
          />
          <path
            d="M0 100 Q300 80 600 100 Q900 120 1200 100"
            stroke={colors.primary}
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M0 110 Q300 130 600 100 Q900 70 1200 110"
            stroke={`url(#slashGradient-${variant})`}
            strokeWidth="3"
            fill="none"
            filter={`url(#slashGlow-${variant})`}
            opacity="0.6"
          />
        </g>
      </motion.svg>

      {/* Ember particles */}
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          className="absolute rounded-full"
          style={{
            left: `${ember.x}%`,
            top: `${ember.y}%`,
            width: ember.size,
            height: ember.size,
            background: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
            boxShadow: `0 0 ${ember.size * 2}px ${colors.glow}`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [0, (Math.random() - 0.5) * 80],
            y: [0, -40 - Math.random() * 60],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}

      {/* Japanese kanji */}
      <motion.div
        style={{ opacity: slashOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span 
          className="font-japanese text-5xl tracking-[2rem]"
          style={{ color: colors.primary, opacity: 0.2 }}
        >
          斬
        </span>
      </motion.div>
    </div>
  );
};

export default SwordSlashTransition;