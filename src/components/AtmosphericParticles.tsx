import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  type: 'sakura' | 'ember' | 'wisteria';
}

const AtmosphericParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const sakuraParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 8,
      size: 10 + Math.random() * 15,
      opacity: 0.5 + Math.random() * 0.4,
      type: 'sakura' as const,
    }));

    const emberParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 100,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 4 + Math.random() * 4,
      size: 3 + Math.random() * 5,
      opacity: 0.6 + Math.random() * 0.4,
      type: 'ember' as const,
    }));

    const wisteriaParticles: Particle[] = Array.from({ length: 10 }, (_, i) => ({
      id: i + 200,
      x: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 15 + Math.random() * 10,
      size: 8 + Math.random() * 12,
      opacity: 0.4 + Math.random() * 0.3,
      type: 'wisteria' as const,
    }));

    setParticles([...sakuraParticles, ...emberParticles, ...wisteriaParticles]);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => {
        if (particle.type === 'sakura') {
          return (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{ left: `${particle.x}%`, top: -30 }}
              initial={{ y: -30, rotate: 0, opacity: 0 }}
              animate={{
                y: "110vh",
                rotate: 720,
                x: [0, 50, -30, 60, 0],
                opacity: [0, particle.opacity, particle.opacity, particle.opacity, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg
                width={particle.size}
                height={particle.size}
                viewBox="0 0 24 24"
                className="text-[hsl(340,80%,80%)] drop-shadow-lg"
              >
                <path
                  fill="currentColor"
                  d="M12 2C9 5 7 8 7 11c0 3 2.5 5 5 5s5-2 5-5c0-3-2-6-5-9zM12 14c-1.5 0-3-1-3-2.5S10.5 9 12 9s3 1 3 2.5-1.5 2.5-3 2.5z"
                />
              </svg>
            </motion.div>
          );
        }

        if (particle.type === 'ember') {
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                bottom: 0,
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, hsl(${35 + Math.random() * 20}, 100%, 60%), hsl(20, 90%, 50%))`,
                boxShadow: `0 0 ${particle.size * 2}px hsl(25, 100%, 55%)`,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: "-100vh",
                x: [0, 20, -15, 25, 0],
                opacity: [0, particle.opacity, particle.opacity, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );
        }

        // Wisteria
        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{ left: `${particle.x}%`, top: -20 }}
            initial={{ y: -20, rotate: 0, opacity: 0 }}
            animate={{
              y: "105vh",
              rotate: [0, 10, -10, 5, 0],
              opacity: [0, particle.opacity, particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              width={particle.size}
              height={particle.size * 1.5}
              viewBox="0 0 20 30"
              className="text-[hsl(270,60%,70%)] wisteria-shadow"
            >
              <ellipse cx="10" cy="5" rx="4" ry="5" fill="currentColor" opacity="0.9" />
              <ellipse cx="10" cy="13" rx="5" ry="5" fill="currentColor" opacity="0.8" />
              <ellipse cx="10" cy="22" rx="4" ry="5" fill="currentColor" opacity="0.6" />
            </svg>
          </motion.div>
        );
      })}

      {/* Mist layer at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(200,20%,90%,0.08)] to-transparent pointer-events-none" />
    </div>
  );
};

export default AtmosphericParticles;