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

const SwordSlashTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embers, setEmbers] = useState<Ember[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const slashProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const slashOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const glowIntensity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  useEffect(() => {
    const newEmbers: Ember[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 20,
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
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-xl" />
      </motion.div>

      {/* Main slash SVG */}
      <motion.svg
        style={{ opacity: slashOpacity }}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="slashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="hsl(0, 85%, 60%)" />
            <stop offset="50%" stopColor="hsl(0, 100%, 70%)" />
            <stop offset="80%" stopColor="hsl(0, 85%, 60%)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="slashGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="slashClip">
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

        {/* Main slash line */}
        <g clipPath="url(#slashClip)">
          <path
            d="M0 100 Q300 80 600 100 Q900 120 1200 100"
            stroke="url(#slashGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#slashGlow)"
          />
          {/* Secondary lines for depth */}
          <path
            d="M0 95 Q300 75 600 95 Q900 115 1200 95"
            stroke="hsl(0, 85%, 50%)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M0 105 Q300 85 600 105 Q900 125 1200 105"
            stroke="hsl(0, 85%, 50%)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
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
            background: `radial-gradient(circle, hsl(${20 + Math.random() * 20}, 100%, 60%), hsl(0, 85%, 50%))`,
            boxShadow: `0 0 ${ember.size * 2}px hsl(0, 85%, 50%)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, -50 - Math.random() * 100],
          }}
          transition={{
            duration: ember.duration,
            delay: ember.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}

      {/* Japanese text decoration */}
      <motion.div
        style={{ opacity: slashOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span className="font-japanese text-4xl text-primary/20 tracking-[2rem]">
          斬
        </span>
      </motion.div>
    </div>
  );
};

export default SwordSlashTransition;