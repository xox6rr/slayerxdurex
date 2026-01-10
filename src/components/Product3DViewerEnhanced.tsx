import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  Float, 
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Sparkles,
  ContactShadows,
  PresentationControls,
  useProgress,
  Html
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkle } from "lucide-react";
import * as THREE from "three";

interface ProductModelProps {
  color: string;
  emissiveColor: string;
  variant: string;
}

// Enhanced product with glass/transmission materials
const ProductModel = ({ color, emissiveColor, variant }: ProductModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Inner glow core */}
        <mesh ref={innerGlowRef} position={[0, 0, 0]}>
          <capsuleGeometry args={[0.35, 1.8, 8, 32]} />
          <meshBasicMaterial color={emissiveColor} transparent opacity={0.4} />
        </mesh>

        {/* Main product body - glass effect */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.5, 2, 32, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={0.3}
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outer shell - metallic rim */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.52, 2.02, 32, 64]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.95}
            roughness={0.1}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Top cap with metallic finish */}
        <mesh position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.52, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.9}
            roughness={0.15}
            emissive={emissiveColor}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Decorative gold band */}
        <mesh position={[0, 0.9, 0]}>
          <torusGeometry args={[0.53, 0.03, 16, 64]} />
          <meshStandardMaterial 
            color="#ffd700"
            metalness={1}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Second decorative band */}
        <mesh position={[0, -0.9, 0]}>
          <torusGeometry args={[0.53, 0.025, 16, 64]} />
          <meshStandardMaterial 
            color="#ffd700"
            metalness={1}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Breathing style symbol inset */}
        <mesh position={[0.52, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.15, 32]} />
          <MeshDistortMaterial 
            color={emissiveColor}
            emissive={emissiveColor}
            emissiveIntensity={1}
            distort={0.3}
            speed={3}
          />
        </mesh>

        {/* Sparkle effects */}
        <Sparkles 
          count={30}
          scale={[2, 3, 2]}
          size={2}
          speed={0.3}
          color={color}
        />
      </group>
    </Float>
  );
};

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-foreground font-display text-sm">
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

const variants = [
  { 
    name: "FLAME HASHIRA", 
    japaneseName: "炎柱",
    color: "#dc2626", 
    emissive: "#991b1b", 
    accent: "from-red-500 to-orange-500",
    description: "Rengoku's burning passion"
  },
  { 
    name: "WATER HASHIRA", 
    japaneseName: "水柱",
    color: "#0ea5e9", 
    emissive: "#0369a1", 
    accent: "from-cyan-500 to-blue-500",
    description: "Tomioka's tranquil flow"
  },
  { 
    name: "MIST HASHIRA", 
    japaneseName: "霞柱",
    color: "#a855f7", 
    emissive: "#7e22ce", 
    accent: "from-purple-500 to-fuchsia-500",
    description: "Tokito's obscuring haze"
  },
  { 
    name: "THUNDER HASHIRA", 
    japaneseName: "鳴柱",
    color: "#eab308", 
    emissive: "#a16207", 
    accent: "from-yellow-500 to-amber-500",
    description: "Zenitsu's lightning strike"
  },
];

const Product3DViewerEnhanced = () => {
  const [activeVariant, setActiveVariant] = useState(0);
  const [key, setKey] = useState(0);

  const resetView = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      {/* Ambient glows matching variant */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
        animate={{ 
          backgroundColor: variants[activeVariant].emissive,
          opacity: 0.15 
        }}
        transition={{ duration: 0.8 }}
      />

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-japanese text-sakura text-lg mb-4">三次元体験</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">IMMERSIVE</span>{" "}
            <span className="text-gradient-crimson">3D</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Experience premium protection in stunning detail
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-lg mx-auto w-full"
          >
            <div 
              className="absolute inset-0 rounded-3xl overflow-hidden border transition-all duration-500"
              style={{
                borderColor: `${variants[activeVariant].color}33`,
                boxShadow: `0 0 60px ${variants[activeVariant].emissive}33`
              }}
            >
              {/* Glassmorphism background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(240,20%,8%)] to-[hsl(240,25%,4%)]" />
              
              <Canvas
                key={key}
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true }}
              >
                <Suspense fallback={<Loader />}>
                  {/* Complex lighting setup */}
                  <ambientLight intensity={0.3} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.2}
                    penumbra={1}
                    intensity={1.5}
                    color={variants[activeVariant].color}
                    castShadow
                  />
                  <spotLight
                    position={[-10, -10, -10]}
                    angle={0.2}
                    penumbra={1}
                    intensity={0.8}
                    color="#ffffff"
                  />
                  <pointLight
                    position={[0, 5, 0]}
                    intensity={0.5}
                    color={variants[activeVariant].emissive}
                  />
                  <pointLight
                    position={[0, -5, 5]}
                    intensity={0.3}
                    color="#4488ff"
                  />

                  {/* Presentation controls for touch/drag */}
                  <PresentationControls
                    global
                    rotation={[0.1, 0.1, 0]}
                    polar={[-0.4, 0.4]}
                    azimuth={[-0.8, 0.8]}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 400 }}
                  >
                    <ProductModel
                      color={variants[activeVariant].color}
                      emissiveColor={variants[activeVariant].emissive}
                      variant={variants[activeVariant].name}
                    />
                  </PresentationControls>

                  {/* Contact shadow for grounding */}
                  <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.5}
                    scale={10}
                    blur={2}
                    far={4}
                    color={variants[activeVariant].emissive}
                  />

                  <OrbitControls
                    enablePan={false}
                    minDistance={3}
                    maxDistance={8}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                  
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            </div>

            {/* Controls overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={resetView}
                className="glass-dark border-border/50 hover:bg-muted"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Breathing style indicator */}
            <motion.div 
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass-dark flex items-center gap-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkle className="w-4 h-4" style={{ color: variants[activeVariant].color }} />
              <span className="font-japanese text-sm" style={{ color: variants[activeVariant].color }}>
                {variants[activeVariant].japaneseName}
              </span>
            </motion.div>
          </motion.div>

          {/* Variant selector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-3xl text-foreground">
              BREATHING STYLE
            </h3>
            <p className="text-muted-foreground">
              Select your protection style, inspired by the legendary Hashira
            </p>

            <div className="grid grid-cols-2 gap-4">
              {variants.map((variant, index) => (
                <motion.button
                  key={variant.name}
                  onClick={() => setActiveVariant(index)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl glass-dark border transition-all duration-300 text-left overflow-hidden ${
                    activeVariant === index
                      ? "border-primary"
                      : "border-border/50 hover:border-border"
                  }`}
                  style={{
                    boxShadow: activeVariant === index 
                      ? `0 0 30px ${variant.emissive}50` 
                      : 'none'
                  }}
                >
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `linear-gradient(135deg, ${variant.color}, ${variant.emissive})`
                    }}
                    animate={{
                      opacity: activeVariant === index ? 0.2 : 0.05
                    }}
                  />

                  {/* Color indicator */}
                  <div
                    className={`relative w-10 h-10 rounded-xl bg-gradient-to-br mb-3 ${variant.accent} flex items-center justify-center`}
                  >
                    <span className="font-japanese text-xs text-white drop-shadow-lg">
                      {variant.japaneseName.charAt(0)}
                    </span>
                  </div>

                  <span className="font-display text-lg text-foreground block relative z-10">
                    {variant.name}
                  </span>
                  <span className="text-xs text-muted-foreground relative z-10">
                    {variant.description}
                  </span>

                  {activeVariant === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-xl border-2 pointer-events-none"
                      style={{ borderColor: variant.color }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="pt-6 border-t border-border/50">
              <p className="text-muted-foreground text-sm mb-4">
                Premium protection infused with{" "}
                <span className={`bg-gradient-to-r ${variants[activeVariant].accent} bg-clip-text text-transparent font-semibold`}>
                  {variants[activeVariant].name}
                </span>{" "}
                breathing technique essence.
              </p>
              <Button 
                className="w-full font-display tracking-wider text-white border-0"
                style={{
                  background: `linear-gradient(135deg, ${variants[activeVariant].color}, ${variants[activeVariant].emissive})`,
                  boxShadow: `0 0 30px ${variants[activeVariant].emissive}50`
                }}
              >
                全集中 • ADD TO CART
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product3DViewerEnhanced;
