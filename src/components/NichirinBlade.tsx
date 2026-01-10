import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NichirinBlade = () => {
  const bladeRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: bladeRef,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div
      ref={bladeRef}
      style={{ rotate: rotation }}
      className="relative"
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Outer glow layers */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-[hsl(180,80%,45%)] opacity-20 blur-[80px] animate-moon-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-60 h-60 rounded-full bg-[hsl(270,70%,55%)] opacity-30 blur-[60px] animate-nichirin-glow" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-40 h-40 rounded-full bg-[hsl(330,80%,65%)] opacity-40 blur-[40px]" />
      </div>

      {/* Nichirin Sword SVG */}
      <svg
        viewBox="0 0 100 300"
        className="w-32 h-80 md:w-40 md:h-96 relative z-10 animate-nichirin-glow"
        style={{ filter: 'drop-shadow(0 0 20px hsl(180 80% 50% / 0.8))' }}
      >
        <defs>
          {/* Nichirin blade gradient - Tanjiro's colors */}
          <linearGradient id="nichirinBlade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(180, 80%, 55%)" />
            <stop offset="35%" stopColor="hsl(220, 70%, 55%)" />
            <stop offset="65%" stopColor="hsl(270, 70%, 60%)" />
            <stop offset="100%" stopColor="hsl(330, 80%, 70%)" />
          </linearGradient>
          
          {/* Blade edge highlight */}
          <linearGradient id="bladeEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Hamon pattern */}
          <pattern id="hamon" patternUnits="userSpaceOnUse" width="20" height="10">
            <path 
              d="M0 5 Q5 0 10 5 Q15 10 20 5" 
              stroke="rgba(255,255,255,0.3)" 
              fill="none" 
              strokeWidth="1"
            />
          </pattern>

          {/* Guard gradient */}
          <linearGradient id="guardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a35" />
            <stop offset="50%" stopColor="#1a1a25" />
            <stop offset="100%" stopColor="#0a0a15" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="bladeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Blade body */}
        <path
          d="M45 10 L55 10 L58 220 Q50 230 42 220 L45 10"
          fill="url(#nichirinBlade)"
          filter="url(#bladeGlow)"
        />
        
        {/* Blade edge highlight */}
        <path
          d="M45 10 L47 10 L49 220 L45 215 L45 10"
          fill="url(#bladeEdge)"
        />

        {/* Hamon line */}
        <path
          d="M46 20 Q52 30 48 40 Q54 50 48 60 Q54 70 48 80 Q54 90 48 100 Q54 110 48 120 Q54 130 48 140 Q54 150 48 160 Q54 170 48 180 Q54 190 48 200 Q52 210 48 215"
          stroke="rgba(255,255,255,0.4)"
          fill="none"
          strokeWidth="1"
        />

        {/* Blood groove (hi) */}
        <path
          d="M50 25 L50 200"
          stroke="rgba(0,0,0,0.3)"
          strokeWidth="2"
        />

        {/* Blade tip (kissaki) */}
        <path
          d="M45 10 L50 2 L55 10"
          fill="url(#nichirinBlade)"
          filter="url(#bladeGlow)"
        />

        {/* Guard (tsuba) - wheel design */}
        <circle cx="50" cy="230" r="18" fill="url(#guardGradient)" stroke="#333" strokeWidth="2" />
        <circle cx="50" cy="230" r="14" fill="none" stroke="#444" strokeWidth="1" />
        <circle cx="50" cy="230" r="10" fill="none" stroke="#555" strokeWidth="1" />
        {/* Decorative holes in guard */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <circle
            key={i}
            cx={50 + 12 * Math.cos((angle * Math.PI) / 180)}
            cy={230 + 12 * Math.sin((angle * Math.PI) / 180)}
            r="2"
            fill="#222"
          />
        ))}

        {/* Handle wrapping (tsuka-ito) */}
        <rect x="46" y="248" width="8" height="50" fill="#1a1a25" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <path
            key={i}
            d={`M46 ${250 + i * 5} L54 ${253 + i * 5}`}
            stroke={i % 2 === 0 ? "#2d4a3e" : "#1a2e25"}
            strokeWidth="2"
          />
        ))}

        {/* Pommel (kashira) */}
        <ellipse cx="50" cy="298" rx="6" ry="3" fill="#2a2a35" stroke="#333" strokeWidth="1" />
      </svg>

      {/* Energy rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: `${80 + i * 50}px`,
            height: `${80 + i * 50}px`,
            borderColor: i === 1 ? 'hsl(180 80% 50% / 0.4)' : i === 2 ? 'hsl(270 70% 55% / 0.3)' : 'hsl(330 80% 65% / 0.2)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Water breathing particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[hsl(200,90%,60%)]"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${20 + Math.random() * 40}%`,
            boxShadow: '0 0 10px hsl(200 90% 60%)',
          }}
          animate={{
            y: [0, -30 - Math.random() * 20, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
};

export default NichirinBlade;