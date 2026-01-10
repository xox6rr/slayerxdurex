import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"forge" | "quench" | "reveal" | "complete">("forge");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Phase transitions
    const forgeTimer = setTimeout(() => setPhase("quench"), 1500);
    const quenchTimer = setTimeout(() => setPhase("reveal"), 2500);
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      setTimeout(onLoadingComplete, 500);
    }, 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(forgeTimer);
      clearTimeout(quenchTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[hsl(240,25%,3%)] flex items-center justify-center overflow-hidden"
        >
          {/* Background forge glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: phase === "forge" 
                ? "radial-gradient(ellipse at 50% 60%, hsl(25, 100%, 30%) 0%, transparent 50%)"
                : phase === "quench"
                ? "radial-gradient(ellipse at 50% 60%, hsl(200, 80%, 30%) 0%, transparent 50%)"
                : "radial-gradient(ellipse at 50% 50%, hsl(270, 60%, 20%) 0%, transparent 60%)"
            }}
            transition={{ duration: 0.8 }}
          />

          {/* Floating embers during forge phase */}
          {phase === "forge" && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${40 + Math.random() * 20}%`,
                    bottom: "30%",
                    background: `hsl(${20 + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`,
                    boxShadow: `0 0 6px hsl(25, 100%, 60%)`,
                  }}
                  animate={{
                    y: [0, -200 - Math.random() * 300],
                    x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1 + Math.random() * 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          )}

          {/* Steam during quench phase */}
          {phase === "quench" && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[hsl(200,20%,90%)]"
                  style={{
                    left: `${45 + Math.random() * 10}%`,
                    bottom: "40%",
                    width: 20 + Math.random() * 40,
                    height: 20 + Math.random() * 40,
                  }}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [0.5, 2, 3],
                    y: -200 - Math.random() * 200,
                    x: (Math.random() - 0.5) * 100,
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Japanese title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center"
            >
              <span className="font-japanese text-2xl md:text-3xl text-[hsl(270,60%,70%)] tracking-widest">
                鬼滅の刃
              </span>
            </motion.div>

            {/* Sword animation container */}
            <div className="relative w-48 h-80 md:w-56 md:h-96">
              {/* Forge fire base */}
              {phase === "forge" && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-20"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <defs>
                      <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="hsl(0, 100%, 50%)" />
                        <stop offset="50%" stopColor="hsl(30, 100%, 55%)" />
                        <stop offset="100%" stopColor="hsl(50, 100%, 60%)" />
                      </linearGradient>
                    </defs>
                    <ellipse cx="50" cy="40" rx="45" ry="15" fill="hsl(0, 80%, 20%)" />
                    <path d="M20 40 Q25 10 35 30 Q40 5 50 25 Q60 0 65 30 Q75 10 80 40 Z" fill="url(#fireGrad)" />
                  </svg>
                </motion.div>
              )}

              {/* Water trough for quench */}
              {phase === "quench" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16"
                >
                  <svg viewBox="0 0 120 50" className="w-full h-full">
                    <rect x="10" y="15" width="100" height="30" rx="5" fill="hsl(30, 30%, 25%)" />
                    <rect x="15" y="20" width="90" height="20" rx="3" fill="hsl(200, 70%, 35%)" opacity="0.8" />
                  </svg>
                </motion.div>
              )}

              {/* The Nichirin Sword */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  y: phase === "forge" ? [0, -5, 0] : phase === "quench" ? 30 : 0,
                  rotate: phase === "reveal" ? [0, 360] : 0,
                }}
                transition={{
                  y: { duration: 0.5, repeat: phase === "forge" ? Infinity : 0 },
                  rotate: { duration: 1, ease: "easeInOut" },
                }}
              >
                <motion.svg
                  viewBox="0 0 60 280"
                  className="w-24 h-72 md:w-28 md:h-80"
                  animate={{
                    filter: phase === "forge"
                      ? ["drop-shadow(0 0 20px hsl(30, 100%, 60%))", "drop-shadow(0 0 40px hsl(30, 100%, 70%))", "drop-shadow(0 0 20px hsl(30, 100%, 60%))"]
                      : phase === "quench"
                      ? "drop-shadow(0 0 30px hsl(200, 80%, 60%))"
                      : ["drop-shadow(0 0 20px hsl(180, 80%, 50%))", "drop-shadow(0 0 40px hsl(270, 70%, 60%))", "drop-shadow(0 0 20px hsl(330, 80%, 60%))"],
                  }}
                  transition={{ duration: phase === "reveal" ? 2 : 1, repeat: Infinity }}
                >
                  <defs>
                    {/* Hot metal gradient */}
                    <linearGradient id="hotMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(50, 100%, 70%)" />
                      <stop offset="50%" stopColor="hsl(30, 100%, 55%)" />
                      <stop offset="100%" stopColor="hsl(0, 80%, 45%)" />
                    </linearGradient>
                    
                    {/* Cooling metal gradient */}
                    <linearGradient id="coolingMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(200, 60%, 60%)" />
                      <stop offset="50%" stopColor="hsl(210, 50%, 50%)" />
                      <stop offset="100%" stopColor="hsl(220, 40%, 40%)" />
                    </linearGradient>
                    
                    {/* Nichirin gradient */}
                    <linearGradient id="nichirinFinal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(180, 80%, 55%)" />
                      <stop offset="35%" stopColor="hsl(220, 70%, 55%)" />
                      <stop offset="65%" stopColor="hsl(270, 70%, 60%)" />
                      <stop offset="100%" stopColor="hsl(330, 80%, 70%)" />
                    </linearGradient>
                  </defs>

                  {/* Blade */}
                  <motion.path
                    d="M25 5 L35 5 L38 180 Q30 195 22 180 L25 5"
                    fill={phase === "forge" ? "url(#hotMetal)" : phase === "quench" ? "url(#coolingMetal)" : "url(#nichirinFinal)"}
                  />
                  
                  {/* Blade tip */}
                  <motion.path
                    d="M25 5 L30 0 L35 5"
                    fill={phase === "forge" ? "url(#hotMetal)" : phase === "quench" ? "url(#coolingMetal)" : "url(#nichirinFinal)"}
                  />

                  {/* Hamon line - appears in reveal */}
                  {phase === "reveal" && (
                    <motion.path
                      d="M26 15 Q32 25 28 35 Q34 45 28 55 Q34 65 28 75 Q34 85 28 95 Q34 105 28 115 Q34 125 28 135 Q34 145 28 155 Q32 165 28 175"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                    />
                  )}

                  {/* Guard */}
                  <circle cx="30" cy="195" r="12" fill="hsl(240, 10%, 20%)" stroke="hsl(240, 10%, 35%)" strokeWidth="2" />
                  
                  {/* Handle wrap */}
                  <rect x="26" y="207" width="8" height="45" fill="hsl(240, 10%, 15%)" />
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <path
                      key={i}
                      d={`M26 ${209 + i * 5} L34 ${212 + i * 5}`}
                      stroke={i % 2 === 0 ? "hsl(160, 50%, 25%)" : "hsl(0, 0%, 10%)"}
                      strokeWidth="2"
                    />
                  ))}

                  {/* Pommel */}
                  <ellipse cx="30" cy="255" rx="5" ry="3" fill="hsl(240, 10%, 25%)" />
                </motion.svg>
              </motion.div>
            </div>

            {/* Phase text */}
            <motion.div
              className="mt-8 text-center"
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className="font-japanese text-lg text-muted-foreground">
                {phase === "forge" && "鍛造中..."}
                {phase === "quench" && "焼入れ..."}
                {phase === "reveal" && "完成"}
              </span>
              <p className="font-display text-sm text-muted-foreground tracking-widest mt-1">
                {phase === "forge" && "FORGING THE BLADE"}
                {phase === "quench" && "QUENCHING IN WATER"}
                {phase === "reveal" && "NICHIRIN COMPLETE"}
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="mt-6 w-48 h-1 bg-[hsl(240,15%,15%)] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, hsl(180, 80%, 50%), hsl(270, 70%, 55%), hsl(330, 80%, 65%))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Demon Slayer Corps mark */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "reveal" ? 1 : 0.3 }}
              className="mt-8"
            >
              <div className="w-12 h-12 rounded-full bg-[hsl(160,70%,25%)] border-2 border-[hsl(160,60%,35%)] flex items-center justify-center">
                <span className="font-japanese text-lg text-foreground">滅</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;