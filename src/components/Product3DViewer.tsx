import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, MeshDistortMaterial, RoundedBox, Cylinder, Text3D, Center } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface ProductModelProps {
  color: string;
  emissiveColor: string;
}

const ProductModel = ({ color, emissiveColor }: ProductModelProps) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Main product body - stylized capsule shape */}
        <Cylinder args={[0.6, 0.6, 2.5, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            distort={0.1}
            speed={2}
          />
        </Cylinder>

        {/* Top cap */}
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <MeshDistortMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            distort={0.05}
            speed={2}
          />
        </mesh>

        {/* Bottom cap */}
        <mesh position={[0, -1.25, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <MeshDistortMaterial
            color={color}
            emissive={emissiveColor}
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            distort={0.05}
            speed={2}
          />
        </mesh>

        {/* Decorative ring */}
        <mesh position={[0, 0.8, 0]}>
          <torusGeometry args={[0.65, 0.05, 16, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            metalness={1}
            roughness={0.1}
            emissive="#ffd700"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Brand accent strip */}
        <RoundedBox args={[0.1, 1.5, 0.7]} position={[0.55, 0, 0]} radius={0.02}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
      </group>
    </Float>
  );
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshBasicMaterial color="#333" wireframe />
  </mesh>
);

const variants = [
  { name: "FLAME GUARD", color: "#dc2626", emissive: "#991b1b", accent: "from-red-500 to-orange-500" },
  { name: "WATER FLOW", color: "#0ea5e9", emissive: "#0369a1", accent: "from-cyan-500 to-blue-500" },
  { name: "MIST VEIL", color: "#a855f7", emissive: "#7e22ce", accent: "from-purple-500 to-fuchsia-500" },
  { name: "THUNDER", color: "#eab308", emissive: "#a16207", accent: "from-yellow-500 to-amber-500" },
];

const Product3DViewer = () => {
  const [activeVariant, setActiveVariant] = useState(0);
  const [key, setKey] = useState(0);

  const resetView = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-japanese text-sakura text-lg mb-4">体験</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">3D</span>{" "}
            <span className="text-gradient-crimson">EXPERIENCE</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Drag to rotate • Scroll to zoom • Double-click to reset
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
            <div className="absolute inset-0 rounded-3xl glass-dark overflow-hidden border border-border/50">
              <Canvas
                key={key}
                camera={{ position: [0, 0, 6], fov: 45 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <Suspense fallback={<LoadingFallback />}>
                  <ambientLight intensity={0.5} />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    color={variants[activeVariant].color}
                  />
                  <spotLight
                    position={[-10, -10, -10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={0.5}
                  />
                  <pointLight
                    position={[0, 5, 0]}
                    intensity={0.5}
                    color={variants[activeVariant].emissive}
                  />

                  <ProductModel
                    color={variants[activeVariant].color}
                    emissiveColor={variants[activeVariant].emissive}
                  />

                  <OrbitControls
                    enablePan={false}
                    minDistance={4}
                    maxDistance={10}
                    autoRotate
                    autoRotateSpeed={1}
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
              <Button
                size="icon"
                variant="outline"
                className="glass-dark border-border/50 hover:bg-muted"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="glass-dark border-border/50 hover:bg-muted"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Variant selector */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-display text-3xl text-foreground">
              SELECT YOUR STYLE
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {variants.map((variant, index) => (
                <motion.button
                  key={variant.name}
                  onClick={() => setActiveVariant(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-4 rounded-xl glass-dark border transition-all duration-300 text-left ${
                    activeVariant === index
                      ? "border-primary shadow-[0_0_30px_hsl(0_85%_50%/0.3)]"
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  {/* Color indicator */}
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br mb-3 ${variant.accent}`}
                  />

                  <span className="font-display text-lg text-foreground block">
                    {variant.name}
                  </span>

                  {activeVariant === index && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="pt-6 border-t border-border/50">
              <p className="text-muted-foreground text-sm mb-4">
                Premium protection with{" "}
                <span className={`bg-gradient-to-r ${variants[activeVariant].accent} bg-clip-text text-transparent font-semibold`}>
                  {variants[activeVariant].name}
                </span>{" "}
                breathing style technology.
              </p>
              <Button className="w-full font-display tracking-wider glow-crimson">
                ADD TO CART
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product3DViewer;