import { motion } from "framer-motion";
import { useHashiraTheme, HashiraTheme } from "@/contexts/HashiraThemeContext";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: 'primary' | 'secondary';
}

// Generate particles based on breathing style
const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 40, // Center area (30-70%)
    y: 20 + Math.random() * 60, // Vertical spread
    size: 3 + Math.random() * 8,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4,
    type: Math.random() > 0.5 ? 'primary' : 'secondary',
  }));
};

// Theme-specific particle configurations
const themeParticleConfig: Record<HashiraTheme, { 
  shape: 'circle' | 'flame' | 'lightning' | 'droplet' | 'petal' | 'mist';
  animation: 'float' | 'flicker' | 'spark' | 'ripple' | 'flutter' | 'drift';
}> = {
  tanjiro: { shape: 'droplet', animation: 'ripple' },
  nezuko: { shape: 'petal', animation: 'flutter' },
  rengoku: { shape: 'flame', animation: 'flicker' },
  giyu: { shape: 'droplet', animation: 'ripple' },
  shinobu: { shape: 'petal', animation: 'flutter' },
  muichiro: { shape: 'mist', animation: 'drift' },
  zenitsu: { shape: 'lightning', animation: 'spark' },
  tengen: { shape: 'circle', animation: 'float' },
  gyomei: { shape: 'circle', animation: 'float' },
  sanemi: { shape: 'mist', animation: 'drift' },
};

const BreathingStyleParticles = () => {
  const { theme, themeInfo } = useHashiraTheme();
  const particles = useMemo(() => generateParticles(25), []);
  const config = themeParticleConfig[theme];

  const getParticleElement = (particle: Particle) => {
    const color = particle.type === 'primary' 
      ? `hsl(${themeInfo.colors.primary})` 
      : `hsl(${themeInfo.colors.accent})`;
    const glowColor = `hsl(${themeInfo.colors.glow})`;

    switch (config.shape) {
      case 'flame':
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size * 2,
              height: particle.size * 3,
            }}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.6, 0],
              scale: [0.5, 1.2, 1, 0.3],
              y: [-20, -60, -100, -140],
              x: [0, Math.random() * 20 - 10, Math.random() * 30 - 15],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(ellipse at bottom, ${color}, ${glowColor}, transparent)`,
                filter: `blur(${particle.size / 4}px)`,
                boxShadow: `0 0 ${particle.size * 2}px ${color}`,
              }}
            />
          </motion.div>
        );

      case 'lightning':
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scaleY: [0, 1, 1, 0],
            }}
            transition={{
              duration: 0.3,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: particle.duration,
            }}
          >
            <svg 
              width={particle.size * 2} 
              height={particle.size * 6} 
              viewBox="0 0 20 60"
            >
              <path
                d="M10 0 L5 25 L12 25 L8 40 L15 40 L6 60 L10 38 L3 38 L8 22 L2 22 L10 0"
                fill={color}
                filter={`drop-shadow(0 0 ${particle.size}px ${glowColor})`}
              />
            </svg>
          </motion.div>
        );

      case 'droplet':
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size * 1.4,
              background: `radial-gradient(circle at 30% 30%, white, ${color})`,
              boxShadow: `0 0 ${particle.size * 2}px ${glowColor}, inset 0 0 ${particle.size / 2}px rgba(255,255,255,0.5)`,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0.5, 0],
              y: [0, 30, 60, 90],
              scale: [0.5, 1, 0.8, 0.3],
              x: [0, Math.sin(particle.id) * 15, Math.sin(particle.id) * 25],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );

      case 'petal':
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size * 2,
              height: particle.size,
              background: `linear-gradient(135deg, ${color}, ${glowColor})`,
              borderRadius: '50% 0 50% 0',
              boxShadow: `0 0 ${particle.size}px ${glowColor}`,
            }}
            initial={{ opacity: 0, rotate: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.6, 0],
              rotate: [0, 180, 360, 540],
              scale: [0.3, 1, 0.8, 0.2],
              x: [0, Math.random() * 60 - 30, Math.random() * 100 - 50],
              y: [0, 40, 80, 120],
            }}
            transition={{
              duration: particle.duration * 1.5,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );

      case 'mist':
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size * 4,
              height: particle.size * 4,
              background: `radial-gradient(circle, ${color}, transparent)`,
              filter: `blur(${particle.size}px)`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.4, 0.3, 0],
              scale: [0.5, 1.5, 2, 2.5],
              x: [0, Math.random() * 50 - 25, Math.random() * 80 - 40],
              y: [0, -20, -40, -60],
            }}
            transition={{
              duration: particle.duration * 2,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        );

      default: // circle
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              background: color,
              boxShadow: `0 0 ${particle.size * 2}px ${glowColor}`,
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0.4, 0],
              y: [-10, -30, -50, -70],
              scale: [0.5, 1, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map(particle => getParticleElement(particle))}
    </div>
  );
};

export default BreathingStyleParticles;
