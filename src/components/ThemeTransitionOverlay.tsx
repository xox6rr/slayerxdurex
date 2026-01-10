import { motion, AnimatePresence } from "framer-motion";
import { HashiraTheme, hashiraThemes } from "@/contexts/HashiraThemeContext";

interface ThemeTransitionOverlayProps {
  isTransitioning: boolean;
  targetTheme: HashiraTheme | null;
}

// Water droplets/splashes for water breathing
const WaterEffect = ({ colors }: { colors: { primary: string; accent: string } }) => (
  <>
    {/* Main water wave */}
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 origin-bottom"
      style={{
        background: `linear-gradient(to top, hsl(${colors.primary}) 0%, hsl(${colors.accent} / 0.5) 50%, transparent 100%)`,
      }}
    />
    {/* Water droplets */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "100vh", opacity: 0, scale: 0 }}
        animate={{ 
          y: `${Math.random() * -150}vh`, 
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0]
        }}
        transition={{ 
          duration: 0.8 + Math.random() * 0.4,
          delay: Math.random() * 0.3,
          ease: "easeOut"
        }}
        className="absolute rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          bottom: 0,
          width: 8 + Math.random() * 16,
          height: 12 + Math.random() * 20,
          background: `radial-gradient(ellipse at 30% 30%, hsl(${colors.accent}), hsl(${colors.primary}))`,
          boxShadow: `0 0 20px hsl(${colors.primary})`,
        }}
      />
    ))}
  </>
);

// Flame particles for fire breathing
const FlameEffect = ({ colors }: { colors: { primary: string; accent: string; secondary: string } }) => (
  <>
    {/* Central flame burst */}
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]"
      style={{
        background: `radial-gradient(circle, hsl(${colors.accent}) 0%, hsl(${colors.primary}) 30%, hsl(${colors.secondary}) 60%, transparent 80%)`,
      }}
    />
    {/* Rising flames */}
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: "100vh", opacity: 0, scale: 0.5 }}
        animate={{ 
          y: `${-50 - Math.random() * 100}vh`,
          x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1.5, 2, 0]
        }}
        transition={{ 
          duration: 0.6 + Math.random() * 0.3,
          delay: Math.random() * 0.2,
          ease: "easeOut"
        }}
        className="absolute"
        style={{
          left: `${Math.random() * 100}%`,
          bottom: 0,
          width: 20 + Math.random() * 40,
          height: 30 + Math.random() * 50,
          background: `linear-gradient(to top, hsl(${colors.secondary}), hsl(${colors.primary}), hsl(${colors.accent}))`,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          filter: `blur(${2 + Math.random() * 4}px)`,
          boxShadow: `0 0 30px hsl(${colors.primary})`,
        }}
      />
    ))}
  </>
);

// Lightning bolts for thunder breathing
const ThunderEffect = ({ colors }: { colors: { primary: string; accent: string } }) => (
  <>
    {/* Flash overlay */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.3, 1, 0] }}
      transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 1] }}
      className="absolute inset-0"
      style={{ background: `hsl(${colors.accent})` }}
    />
    {/* Lightning bolts */}
    {[...Array(6)].map((_, i) => (
      <motion.svg
        key={i}
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: [0, 1, 1, 0], pathLength: 1 }}
        transition={{ 
          duration: 0.4,
          delay: i * 0.05,
        }}
        className="absolute"
        style={{
          left: `${10 + i * 15}%`,
          top: 0,
          width: '15%',
          height: '100%',
        }}
        viewBox="0 0 100 400"
        preserveAspectRatio="none"
      >
        <motion.path
          d={`M ${50 + Math.random() * 20 - 10} 0 
              L ${30 + Math.random() * 20} 100 
              L ${60 + Math.random() * 20} 120 
              L ${20 + Math.random() * 30} 250 
              L ${55 + Math.random() * 20} 270 
              L ${35 + Math.random() * 30} 400`}
          fill="none"
          stroke={`hsl(${colors.primary})`}
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </motion.svg>
    ))}
  </>
);

// Mist/fog effect for mist breathing
const MistEffect = ({ colors }: { colors: { primary: string; accent: string } }) => (
  <>
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: i % 2 === 0 ? "-100%" : "100%" }}
        animate={{ 
          opacity: [0, 0.8, 0],
          x: i % 2 === 0 ? "100%" : "-100%"
        }}
        transition={{ 
          duration: 1,
          delay: i * 0.1,
          ease: "easeInOut"
        }}
        className="absolute"
        style={{
          top: `${i * 12}%`,
          left: 0,
          right: 0,
          height: '25%',
          background: `linear-gradient(to ${i % 2 === 0 ? 'right' : 'left'}, transparent, hsl(${colors.primary} / 0.6), hsl(${colors.accent} / 0.4), transparent)`,
          filter: 'blur(30px)',
        }}
      />
    ))}
  </>
);

// Wind swirls for wind breathing
const WindEffect = ({ colors }: { colors: { primary: string; accent: string } }) => (
  <>
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          opacity: 0, 
          x: "-100%",
          rotate: 0
        }}
        animate={{ 
          opacity: [0, 0.7, 0],
          x: "200%",
          rotate: 720
        }}
        transition={{ 
          duration: 0.8,
          delay: i * 0.06,
          ease: "easeOut"
        }}
        className="absolute"
        style={{
          top: `${5 + i * 8}%`,
          left: 0,
          width: 100 + Math.random() * 100,
          height: 3,
          background: `linear-gradient(to right, transparent, hsl(${colors.primary}), hsl(${colors.accent}), transparent)`,
          borderRadius: '50%',
          filter: 'blur(2px)',
        }}
      />
    ))}
  </>
);

// Petal effect for blood demon art / insect breathing
const PetalEffect = ({ colors }: { colors: { primary: string; accent: string } }) => (
  <>
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          opacity: 0,
          y: -20,
          x: `${Math.random() * 100}vw`,
          rotate: 0,
          scale: 0
        }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          y: "110vh",
          x: `${Math.random() * 100}vw`,
          rotate: 360 + Math.random() * 360,
          scale: [0, 1, 1, 0.5]
        }}
        transition={{ 
          duration: 1.2,
          delay: Math.random() * 0.4,
          ease: "easeInOut"
        }}
        className="absolute"
        style={{
          width: 15 + Math.random() * 15,
          height: 20 + Math.random() * 20,
          background: `linear-gradient(135deg, hsl(${colors.primary}), hsl(${colors.accent}))`,
          borderRadius: '50% 0 50% 50%',
          boxShadow: `0 0 15px hsl(${colors.primary} / 0.5)`,
        }}
      />
    ))}
  </>
);

// Stone/rock effect for stone breathing
const StoneEffect = ({ colors }: { colors: { primary: string; accent: string; secondary: string } }) => (
  <>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 2],
            x: Math.cos(i * 30 * Math.PI / 180) * 300,
            y: Math.sin(i * 30 * Math.PI / 180) * 300
          }}
          transition={{ 
            duration: 0.6,
            delay: i * 0.03,
          }}
          className="absolute"
          style={{
            width: 40 + Math.random() * 60,
            height: 40 + Math.random() * 60,
            background: `linear-gradient(135deg, hsl(${colors.secondary}), hsl(${colors.primary}), hsl(${colors.accent}))`,
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            boxShadow: `0 0 20px hsl(${colors.primary} / 0.5)`,
          }}
        />
      ))}
    </motion.div>
  </>
);

// Sound waves for sound breathing
const SoundEffect = ({ colors }: { colors: { primary: string; accent: string } }) => (
  <>
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 3],
          opacity: [0.8, 0]
        }}
        transition={{ 
          duration: 0.8,
          delay: i * 0.1,
          ease: "easeOut"
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4"
        style={{
          width: 100,
          height: 100,
          borderColor: i % 2 === 0 ? `hsl(${colors.primary})` : `hsl(${colors.accent})`,
          boxShadow: `0 0 30px hsl(${colors.primary})`,
        }}
      />
    ))}
  </>
);

const getEffectComponent = (theme: HashiraTheme, colors: { primary: string; secondary: string; accent: string }) => {
  switch (theme) {
    case "tanjiro":
    case "giyu":
      return <WaterEffect colors={colors} />;
    case "rengoku":
      return <FlameEffect colors={colors} />;
    case "zenitsu":
      return <ThunderEffect colors={colors} />;
    case "muichiro":
      return <MistEffect colors={colors} />;
    case "sanemi":
      return <WindEffect colors={colors} />;
    case "nezuko":
    case "shinobu":
      return <PetalEffect colors={colors} />;
    case "gyomei":
      return <StoneEffect colors={colors} />;
    case "tengen":
      return <SoundEffect colors={colors} />;
    default:
      return <WaterEffect colors={colors} />;
  }
};

const ThemeTransitionOverlay = ({ isTransitioning, targetTheme }: ThemeTransitionOverlayProps) => {
  if (!targetTheme) return null;
  
  const themeInfo = hashiraThemes[targetTheme];
  const colors = themeInfo.colors;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          {getEffectComponent(targetTheme, colors)}
          
          {/* Theme name flash */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1.1] }}
            transition={{ duration: 0.6, times: [0, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <p className="font-japanese text-2xl md:text-4xl text-white drop-shadow-lg" style={{ textShadow: `0 0 30px hsl(${colors.primary})` }}>
              {themeInfo.japaneseName}
            </p>
            <p className="font-brush text-4xl md:text-6xl text-white mt-2" style={{ textShadow: `0 0 40px hsl(${colors.primary})` }}>
              {themeInfo.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeTransitionOverlay;