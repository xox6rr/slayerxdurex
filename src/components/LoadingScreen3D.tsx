import { Canvas, useFrame } from "@react-three/fiber";
import { 
  MeshTransmissionMaterial, 
  Float, 
  Sparkles,
  Environment,
  Stars
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// Animated 3D sword for loading
const ForgingSword = ({ phase }: { phase: string }) => {
  const bladeRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      if (phase === "forge") {
        bladeRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else if (phase === "reveal") {
        bladeRef.current.rotation.y = state.clock.elapsedTime * 2;
      }
    }
    
    if (glowRef.current) {
      const intensity = phase === "forge" 
        ? 2 + Math.sin(state.clock.elapsedTime * 5) * 1
        : phase === "quench" 
        ? 1.5 - state.clock.elapsedTime * 0.1
        : 2 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      glowRef.current.intensity = Math.max(0.5, intensity);
    }
  });

  const getBladeColor = () => {
    switch (phase) {
      case "forge": return "#ff6b35";
      case "quench": return "#4488ff";
      default: return "#00d4ff";
    }
  };

  const getEmissiveColor = () => {
    switch (phase) {
      case "forge": return "#ff3300";
      case "quench": return "#0066cc";
      default: return "#00ffff";
    }
  };

  return (
    <Float speed={2} rotationIntensity={phase === "reveal" ? 0.5 : 0.1} floatIntensity={0.3}>
      <group>
        {/* Point light for glow effect */}
        <pointLight
          ref={glowRef}
          position={[0, 0, 0.5]}
          color={getEmissiveColor()}
          intensity={2}
          distance={5}
        />

        {/* Main blade */}
        <mesh ref={bladeRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[0.08, 2.5, 0.02]} />
          <meshStandardMaterial
            color={getBladeColor()}
            emissive={getEmissiveColor()}
            emissiveIntensity={phase === "reveal" ? 1 : 0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.95}
          />
        </mesh>

        {/* Blade tip */}
        <mesh position={[0, 1.85, 0]} rotation={[0, 0, Math.PI / 4]}>
          <tetrahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial
            color={getBladeColor()}
            emissive={getEmissiveColor()}
            emissiveIntensity={1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Guard */}
        <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.04, 16, 32]} />
          <meshStandardMaterial color="#2a2a35" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Handle */}
        <mesh position={[0, -1.3, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
          <meshStandardMaterial color="#1a2e25" roughness={0.8} />
        </mesh>

        {/* Sparkles */}
        <Sparkles
          count={phase === "forge" ? 100 : phase === "reveal" ? 50 : 20}
          scale={[2, 3, 2]}
          size={phase === "forge" ? 4 : 2}
          speed={phase === "forge" ? 2 : 0.5}
          color={getBladeColor()}
          position={[0, 0.5, 0]}
        />
      </group>
    </Float>
  );
};

// Forge fire effect
const ForgeFire = ({ visible }: { visible: boolean }) => {
  const fireRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (fireRef.current) {
      fireRef.current.children.forEach((child, i) => {
        child.scale.y = 1 + Math.sin(state.clock.elapsedTime * 5 + i) * 0.3;
        child.position.y = -2 + Math.sin(state.clock.elapsedTime * 3 + i * 0.5) * 0.1;
      });
    }
  });

  if (!visible) return null;

  return (
    <group ref={fireRef} position={[0, -2, -1]}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[(i - 2) * 0.3, 0, 0]}>
          <coneGeometry args={[0.15, 0.8, 8]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#ff6633" : "#ffaa00"} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
      ))}
      
      {/* Fire glow */}
      <pointLight position={[0, 0, 1]} color="#ff4400" intensity={3} distance={5} />
    </group>
  );
};

// Steam effect for quenching
const SteamEffect = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <Sparkles
      count={200}
      scale={[3, 4, 3]}
      size={5}
      speed={3}
      color="#aaddff"
      position={[0, 0, 0]}
      opacity={0.5}
    />
  );
};

const LoadingScreen3D = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<"forge" | "quench" | "reveal" | "complete">("forge");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    const forgeTimer = setTimeout(() => setPhase("quench"), 2000);
    const quenchTimer = setTimeout(() => setPhase("reveal"), 3500);
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      setTimeout(onLoadingComplete, 600);
    }, 5000);

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
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-[hsl(240,25%,3%)] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* 3D Canvas */}
          <div className="w-full h-[60vh] relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.2} />
                
                <ForgingSword phase={phase} />
                <ForgeFire visible={phase === "forge"} />
                <SteamEffect visible={phase === "quench"} />
                
                <Stars radius={30} depth={30} count={1000} factor={4} fade speed={1} />
                <Environment preset="night" />
                
                <fog attach="fog" args={["#0a0a15", 3, 15]} />
              </Suspense>
            </Canvas>

            {/* Phase overlay effects */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: phase === "forge" 
                  ? "radial-gradient(ellipse at 50% 80%, rgba(255,100,50,0.3) 0%, transparent 60%)"
                  : phase === "quench"
                  ? "radial-gradient(ellipse at 50% 80%, rgba(68,136,255,0.3) 0%, transparent 60%)"
                  : "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.2) 0%, transparent 70%)"
              }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Text and progress */}
          <div className="relative z-10 flex flex-col items-center px-4">
            {/* Japanese title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 text-center"
            >
              <span className="font-japanese text-3xl md:text-4xl text-[hsl(270,60%,70%)] tracking-widest">
                鬼滅の刃
              </span>
            </motion.div>

            {/* Phase text */}
            <motion.div
              className="text-center mb-6"
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="font-japanese text-xl text-muted-foreground block mb-1">
                {phase === "forge" && "鍛造中..."}
                {phase === "quench" && "焼入れ..."}
                {phase === "reveal" && "完成"}
              </span>
              <p className="font-display text-sm text-muted-foreground tracking-widest">
                {phase === "forge" && "FORGING THE BLADE"}
                {phase === "quench" && "QUENCHING IN SACRED WATER"}
                {phase === "reveal" && "NICHIRIN BLADE COMPLETE"}
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-1.5 bg-[hsl(240,15%,15%)] rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: phase === "forge" 
                    ? "linear-gradient(90deg, #ff6633, #ffaa00)"
                    : phase === "quench"
                    ? "linear-gradient(90deg, #4488ff, #00ccff)"
                    : "linear-gradient(90deg, hsl(180, 80%, 50%), hsl(270, 70%, 55%), hsl(330, 80%, 65%))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Demon Slayer Corps emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: phase === "reveal" ? 1 : 0.4,
                scale: phase === "reveal" ? 1 : 0.9,
              }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                style={{
                  background: "linear-gradient(135deg, hsl(160,70%,20%), hsl(160,50%,15%))",
                  borderColor: phase === "reveal" ? "hsl(160,60%,45%)" : "hsl(160,40%,25%)",
                  boxShadow: phase === "reveal" ? "0 0 30px hsla(160,60%,40%,0.5)" : "none"
                }}
              >
                <span className="font-japanese text-2xl text-foreground">滅</span>
              </div>
              
              {/* Animated ring */}
              {phase === "reveal" && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[hsl(160,60%,45%)]"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen3D;
