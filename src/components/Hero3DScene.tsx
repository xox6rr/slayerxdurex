import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  MeshDistortMaterial, 
  MeshTransmissionMaterial,
  Sparkles,
  Stars,
  Cloud,
  useTexture,
  PerspectiveCamera,
  OrbitControls
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";

// Animated Nichirin Blade 3D
const NichirinBlade3D = ({ color }: { color: string }) => {
  const bladeRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      bladeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={bladeRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI * 0.1]}>
        {/* Blade glow aura */}
        <mesh ref={glowRef} position={[0, 1, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>

        {/* Main blade body */}
        <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.08, 3, 0.02]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Blade edge highlight */}
        <mesh position={[-0.035, 1, 0.015]}>
          <boxGeometry args={[0.015, 3, 0.005]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive="#ffffff"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>

        {/* Blade tip */}
        <mesh position={[0, 2.6, 0]} rotation={[0, 0, Math.PI / 4]}>
          <tetrahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>

        {/* Tsuba (guard) */}
        <mesh position={[0, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2, 0.04, 16, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Guard decorative ring */}
        <mesh position={[0, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32]} />
          <meshStandardMaterial 
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0.1}
          />
        </mesh>

        {/* Handle (tsuka) */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
          <meshStandardMaterial 
            color="#1a2e25"
            roughness={0.8}
          />
        </mesh>

        {/* Handle wrap pattern */}
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[0, -0.7 + i * 0.1, 0.045]} rotation={[0, 0, i % 2 === 0 ? 0.3 : -0.3]}>
            <boxGeometry args={[0.08, 0.02, 0.01]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#2d4a3e" : "#0a0a0a"} />
          </mesh>
        ))}

        {/* Pommel */}
        <mesh position={[0, -1.45, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#2a2a35"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Energy particles around blade */}
        <Sparkles
          count={50}
          scale={[1, 4, 1]}
          size={3}
          speed={0.5}
          color={color}
          position={[0, 1, 0]}
        />
      </group>
    </Float>
  );
};

// Atmospheric fog and mist
const AtmosphericEffects = () => {
  return (
    <>
      {/* Volumetric fog layers using simple meshes */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, -2 + i * 0.5, -5 - i]}>
          <planeGeometry args={[20, 5]} />
          <meshBasicMaterial 
            color="#223344"
            transparent 
            opacity={0.08 - i * 0.02} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Stars background */}
      <Stars
        radius={50}
        depth={50}
        count={3000}
        factor={4}
        saturation={0.5}
        fade
        speed={0.5}
      />
    </>
  );
};

// Floating cherry blossom petals in 3D
const SakuraPetals3D = () => {
  const petalsRef = useRef<THREE.InstancedMesh>(null);
  const count = 100;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 10,
      z: (Math.random() - 0.5) * 10,
      rotationSpeed: Math.random() * 0.02,
      fallSpeed: 0.01 + Math.random() * 0.02,
      swaySpeed: Math.random() * 2,
      swayAmount: 0.5 + Math.random() * 1,
    }));
  }, []);

  useFrame((state) => {
    if (!petalsRef.current) return;
    
    positions.forEach((petal, i) => {
      petal.y -= petal.fallSpeed;
      if (petal.y < -5) petal.y = 10;
      
      const sway = Math.sin(state.clock.elapsedTime * petal.swaySpeed + i) * petal.swayAmount;
      
      dummy.position.set(petal.x + sway * 0.5, petal.y, petal.z);
      dummy.rotation.x += petal.rotationSpeed;
      dummy.rotation.y += petal.rotationSpeed * 0.5;
      dummy.rotation.z = sway * 0.2;
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      
      petalsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    petalsRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={petalsRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 0.8]} />
      <meshStandardMaterial
        color="#ffb7c5"
        emissive="#ff6b8a"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};

// Floating energy orbs
const EnergyOrbs = ({ color }: { color: string }) => {
  const orbsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={orbsRef}>
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 3;
        return (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(i) * 0.5, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.1 + i * 0.02, 32, 32]} />
              <MeshDistortMaterial
                color={color}
                emissive={color}
                emissiveIntensity={1}
                distort={0.4}
                speed={3}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

// Camera animation
const CameraRig = () => {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.1) * 0.5;
    camera.position.y = Math.cos(t * 0.15) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshBasicMaterial color="#333" wireframe />
  </mesh>
);

const Hero3DScene = () => {
  const { themeInfo } = useHashiraTheme();
  const primaryColor = `hsl(${themeInfo.colors.primary})`;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <spotLight
            position={[5, 10, 5]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            color={primaryColor}
            castShadow
          />
          <spotLight
            position={[-5, 5, -5]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#4488ff"
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
          <pointLight position={[0, -3, 3]} intensity={0.3} color={primaryColor} />

          {/* Main 3D sword */}
          <NichirinBlade3D color={primaryColor} />

          {/* Atmospheric effects */}
          <AtmosphericEffects />

          {/* Sakura petals */}
          <SakuraPetals3D />

          {/* Energy orbs */}
          <EnergyOrbs color={primaryColor} />

          {/* Environment */}
          <Environment preset="night" />

          {/* Camera animation */}
          <CameraRig />

          {/* Fog */}
          <fog attach="fog" args={["#0a0a15", 5, 30]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3DScene;
