import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const SakuraParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 6,
      size: 8 + Math.random() * 12,
      opacity: 0.4 + Math.random() * 0.4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: -20,
          }}
          initial={{ y: -20, rotate: 0, opacity: 0 }}
          animate={{
            y: "100vh",
            rotate: 720,
            x: [0, 30, -20, 40, 0],
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
            height={particle.size}
            viewBox="0 0 24 24"
            className="text-sakura drop-shadow-lg"
          >
            <path
              fill="currentColor"
              d="M12 2C9.5 5 7 8 7 11c0 2.5 2 4.5 4.5 5.5C9 17.5 7 20 7 20s4-1 5-1c1 0 5 1 5 1s-2-2.5-4.5-3.5C15 15.5 17 13.5 17 11c0-3-2.5-6-5-9z"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default SakuraParticles;