import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sword, Shield, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import character images
import tanjiroImg from "@/assets/characters/tanjiro.png";
import nezukoImg from "@/assets/characters/nezuko.png";
import rengokuImg from "@/assets/characters/rengoku.png";
import giyuImg from "@/assets/characters/giyu.png";
import shinobuImg from "@/assets/characters/shinobu.png";
import muichiroImg from "@/assets/characters/muichiro.png";

interface Character {
  id: string;
  name: string;
  japaneseName: string;
  title: string;
  breathingStyle: string;
  description: string;
  image: string;
  color: string;
  accentColor: string;
}

const characters: Character[] = [
  {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    japaneseName: "竈門炭治郎",
    title: "Demon Slayer",
    breathingStyle: "Water Breathing / Sun Breathing",
    description: "A kind-hearted boy who became a demon slayer to save his sister and avenge his family. His unwavering determination and compassion make him a formidable warrior.",
    image: tanjiroImg,
    color: "hsl(180, 70%, 45%)",
    accentColor: "hsl(160, 60%, 40%)",
  },
  {
    id: "nezuko",
    name: "Nezuko Kamado",
    japaneseName: "竈門禰豆子",
    title: "Demon",
    breathingStyle: "Blood Demon Art",
    description: "Tanjiro's younger sister who was turned into a demon. Despite this, she retains her human emotions and protects humans, defying her demonic nature.",
    image: nezukoImg,
    color: "hsl(340, 80%, 60%)",
    accentColor: "hsl(25, 90%, 55%)",
  },
  {
    id: "rengoku",
    name: "Kyojuro Rengoku",
    japaneseName: "煉獄杏寿郎",
    title: "Flame Hashira",
    breathingStyle: "Flame Breathing",
    description: "The passionate Flame Hashira whose burning spirit and unwavering sense of duty inspired countless demon slayers. His legacy lives on in all who knew him.",
    image: rengokuImg,
    color: "hsl(25, 100%, 55%)",
    accentColor: "hsl(45, 100%, 50%)",
  },
  {
    id: "giyu",
    name: "Giyu Tomioka",
    japaneseName: "冨岡義勇",
    title: "Water Hashira",
    breathingStyle: "Water Breathing",
    description: "The stoic Water Hashira who first discovered Tanjiro and Nezuko. His calm exterior hides a deep sense of justice and loyalty to his comrades.",
    image: giyuImg,
    color: "hsl(200, 80%, 50%)",
    accentColor: "hsl(0, 70%, 50%)",
  },
  {
    id: "shinobu",
    name: "Shinobu Kocho",
    japaneseName: "胡蝶しのぶ",
    title: "Insect Hashira",
    breathingStyle: "Insect Breathing",
    description: "The graceful Insect Hashira whose gentle smile conceals her deadly poison techniques. She developed a unique fighting style to overcome her physical limitations.",
    image: shinobuImg,
    color: "hsl(280, 60%, 60%)",
    accentColor: "hsl(300, 70%, 70%)",
  },
  {
    id: "muichiro",
    name: "Muichiro Tokito",
    japaneseName: "時透無一郎",
    title: "Mist Hashira",
    breathingStyle: "Mist Breathing",
    description: "The youngest Hashira who achieved his rank in just two months. His exceptional talent and mysterious past make him one of the most formidable demon slayers.",
    image: muichiroImg,
    color: "hsl(170, 50%, 55%)",
    accentColor: "hsl(180, 40%, 70%)",
  },
];

const CharacterShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentCharacter = characters[currentIndex];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === characters.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? characters.length - 1 : prev - 1;
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic background based on character */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse at 50% 30%, ${currentCharacter.color}20 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="container relative z-10 px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-japanese text-sakura text-lg mb-4">鬼殺隊員</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">DEMON SLAYER</span>{" "}
            <span className="text-gradient-crimson">CORPS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Meet the legendary warriors who protect humanity from demons
          </p>
        </motion.div>

        {/* Character display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Character image */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            {/* Glow effect behind image */}
            <motion.div
              className="absolute inset-0 rounded-full blur-[80px] opacity-40"
              animate={{ backgroundColor: currentCharacter.color }}
              transition={{ duration: 0.5 }}
            />

            {/* Character card frame */}
            <div 
              className="relative h-full rounded-3xl overflow-hidden border-2 glass-dark"
              style={{ borderColor: `${currentCharacter.color}50` }}
            >
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 20%, ${currentCharacter.color} 0%, transparent 40%), 
                                    radial-gradient(circle at 70% 80%, ${currentCharacter.accentColor} 0%, transparent 40%)`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />

              {/* Character image */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <img
                    src={currentCharacter.image}
                    alt={currentCharacter.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Breathing style badge */}
              <motion.div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-dark flex items-center gap-2"
                style={{ borderColor: `${currentCharacter.color}50` }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sword className="w-4 h-4" style={{ color: currentCharacter.color }} />
                <span className="text-xs font-display" style={{ color: currentCharacter.color }}>
                  {currentCharacter.title}
                </span>
              </motion.div>

              {/* Navigation arrows */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => paginate(-1)}
                  className="glass-dark border-border/50 hover:border-primary rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => paginate(1)}
                  className="glass-dark border-border/50 hover:border-primary rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: currentCharacter.color,
                  boxShadow: `0 0 10px ${currentCharacter.color}`,
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>

          {/* Character info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Japanese name */}
              <motion.p
                className="font-japanese text-3xl tracking-wider"
                style={{ color: currentCharacter.color }}
              >
                {currentCharacter.japaneseName}
              </motion.p>

              {/* English name */}
              <h3 className="font-display text-4xl md:text-5xl text-foreground">
                {currentCharacter.name.toUpperCase()}
              </h3>

              {/* Title badge */}
              <div className="flex items-center gap-3">
                <div
                  className="px-4 py-2 rounded-full border"
                  style={{ 
                    borderColor: currentCharacter.color,
                    backgroundColor: `${currentCharacter.color}15`
                  }}
                >
                  <span 
                    className="font-display text-sm tracking-wider"
                    style={{ color: currentCharacter.color }}
                  >
                    {currentCharacter.title}
                  </span>
                </div>
                <div
                  className="px-4 py-2 rounded-full border border-border/50 glass-dark"
                >
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <Flame className="w-4 h-4" />
                    {currentCharacter.breathingStyle}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">
                {currentCharacter.description}
              </p>

              {/* Stats/abilities preview */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${currentCharacter.color}20` }}
                  >
                    <Sword className="w-6 h-6" style={{ color: currentCharacter.color }} />
                  </motion.div>
                  <span className="text-xs text-muted-foreground">Combat</span>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${currentCharacter.color}20` }}
                  >
                    <Shield className="w-6 h-6" style={{ color: currentCharacter.color }} />
                  </motion.div>
                  <span className="text-xs text-muted-foreground">Defense</span>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-2"
                    style={{ backgroundColor: `${currentCharacter.color}20` }}
                  >
                    <Flame className="w-6 h-6" style={{ color: currentCharacter.color }} />
                  </motion.div>
                  <span className="text-xs text-muted-foreground">Breathing</span>
                </div>
              </div>

              {/* Character selector dots */}
              <div className="flex items-center justify-center gap-2 pt-6">
                {characters.map((char, index) => (
                  <button
                    key={char.id}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "w-8" 
                        : "opacity-40 hover:opacity-70"
                    }`}
                    style={{ 
                      backgroundColor: index === currentIndex ? currentCharacter.color : "hsl(var(--muted-foreground))"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CharacterShowcase;
