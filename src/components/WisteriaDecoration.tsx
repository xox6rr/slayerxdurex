import { motion } from "framer-motion";

const WisteriaDecoration = () => {
  const clusters = [
    { x: 5, delay: 0 },
    { x: 15, delay: 0.5 },
    { x: 85, delay: 0.3 },
    { x: 95, delay: 0.8 },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-64 pointer-events-none z-5 overflow-hidden">
      {clusters.map((cluster, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: `${cluster.x}%` }}
          animate={{
            rotate: [-2, 2, -2],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: cluster.delay,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 60 200"
            className="w-16 h-48 md:w-20 md:h-56"
            style={{ filter: 'drop-shadow(0 0 15px hsl(270 60% 70% / 0.5))' }}
          >
            {/* Main vine */}
            <path
              d="M30 0 Q35 30 28 60 Q25 90 32 120 Q38 150 30 180"
              stroke="hsl(140, 30%, 25%)"
              strokeWidth="3"
              fill="none"
            />

            {/* Wisteria flower clusters */}
            {[20, 45, 70, 95, 120, 145].map((y, idx) => (
              <g key={idx}>
                <motion.g
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                >
                  <ellipse cx={28 + (idx % 2) * 4} cy={y} rx="6" ry="8" fill="hsl(270, 60%, 75%)" opacity="0.9" />
                  <ellipse cx={28 + (idx % 2) * 4} cy={y + 12} rx="7" ry="9" fill="hsl(270, 55%, 70%)" opacity="0.85" />
                  <ellipse cx={28 + (idx % 2) * 4} cy={y + 25} rx="6" ry="8" fill="hsl(275, 50%, 65%)" opacity="0.8" />
                  <ellipse cx={28 + (idx % 2) * 4} cy={y + 36} rx="5" ry="6" fill="hsl(280, 45%, 60%)" opacity="0.7" />
                </motion.g>
              </g>
            ))}

            {/* Leaves */}
            <path d="M25 10 Q15 15 20 25 Q30 20 25 10" fill="hsl(140, 40%, 30%)" />
            <path d="M35 10 Q45 15 40 25 Q30 20 35 10" fill="hsl(140, 40%, 28%)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default WisteriaDecoration;