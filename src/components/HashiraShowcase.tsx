import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Import character images
import rengokuImg from "@/assets/characters/rengoku.png";
import giyuImg from "@/assets/characters/giyu.png";
import shinobuImg from "@/assets/characters/shinobu.png";
import muichiroImg from "@/assets/characters/muichiro.png";

const hashiras = [
  {
    name: "KYOJURO RENGOKU",
    title: "Flame Hashira",
    japanese: "煉獄杏寿郎",
    breathingStyle: "火の呼吸",
    description: "Set your heart ablaze. The Flame Hashira's unwavering spirit inspires our most passionate protection.",
    color: "from-orange-500 via-red-500 to-yellow-500",
    glowColor: "shadow-[0_0_60px_hsl(25_100%_50%/0.5)]",
    silhouetteGradient: "from-orange-600 to-red-700",
    image: rengokuImg,
  },
  {
    name: "GIYU TOMIOKA",
    title: "Water Hashira",
    japanese: "冨岡義勇",
    breathingStyle: "水の呼吸",
    description: "Flow like water, strike like a wave. The Water Hashira's calm mastery guides our smoothest experience.",
    color: "from-blue-400 via-cyan-500 to-blue-600",
    glowColor: "shadow-[0_0_60px_hsl(200_100%_50%/0.5)]",
    silhouetteGradient: "from-blue-500 to-cyan-600",
    image: giyuImg,
  },
  {
    name: "SHINOBU KOCHO",
    title: "Insect Hashira",
    japanese: "胡蝶しのぶ",
    breathingStyle: "蟲の呼吸",
    description: "Gentle yet deadly. The Insect Hashira's precision inspires our most delicate, ultra-thin protection.",
    color: "from-purple-400 via-pink-400 to-fuchsia-500",
    glowColor: "shadow-[0_0_60px_hsl(300_100%_60%/0.5)]",
    silhouetteGradient: "from-purple-500 to-fuchsia-600",
    image: shinobuImg,
  },
  {
    name: "MUICHIRO TOKITO",
    title: "Mist Hashira",
    japanese: "時透無一郎",
    breathingStyle: "霞の呼吸",
    description: "Swift as the mist. The youngest Hashira's prodigious skill inspires our most innovative designs.",
    color: "from-slate-300 via-teal-300 to-cyan-400",
    glowColor: "shadow-[0_0_60px_hsl(180_50%_70%/0.5)]",
    silhouetteGradient: "from-slate-400 to-teal-500",
    image: muichiroImg,
  },
];

interface HashiraCardProps {
  hashira: typeof hashiras[0];
  index: number;
}

const HashiraCard = ({ hashira, index }: HashiraCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className={cn(
        "relative group",
        index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
      )}
    >
      <div className="relative glass-dark rounded-3xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500">
        {/* Background gradient glow */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br",
            hashira.color
          )}
        />

        <div className={cn(
          "relative p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8",
          index % 2 === 1 ? "lg:flex-row-reverse" : ""
        )}>
          {/* Character Image */}
          <motion.div
            style={{ y }}
            className="relative flex-shrink-0"
          >
            <div
              className={cn(
                "relative w-48 h-64 lg:w-64 lg:h-80 rounded-2xl overflow-hidden",
                hashira.glowColor
              )}
            >
              {/* Gradient background behind image */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-b",
                hashira.silhouetteGradient
              )} />
              
              {/* Character image */}
              <motion.img
                src={hashira.image}
                alt={hashira.name}
                className="relative z-10 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              
              {/* Side gradient overlay */}
              <div className={cn(
                "absolute inset-0 z-20 opacity-30",
                index % 2 === 0 
                  ? "bg-gradient-to-r from-transparent to-background/50" 
                  : "bg-gradient-to-l from-transparent to-background/50"
              )} />

              {/* Breathing style kanji overlay */}
              <motion.div 
                className="absolute top-3 right-3 z-30 font-japanese text-3xl text-white/80 drop-shadow-lg"
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {hashira.breathingStyle.charAt(0)}
              </motion.div>
            </div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={cn("absolute w-2 h-2 rounded-full bg-gradient-to-br", hashira.color)}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </motion.div>

          {/* Content */}
          <div className={cn(
            "flex-1 text-center",
            index % 2 === 0 ? "lg:text-left" : "lg:text-right"
          )}>
            <motion.p
              className="font-japanese text-2xl lg:text-3xl mb-2 bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${hashira.color.includes('orange') ? 'rgb(249, 115, 22), rgb(239, 68, 68)' : hashira.color.includes('blue') ? 'rgb(96, 165, 250), rgb(34, 211, 238)' : hashira.color.includes('purple') ? 'rgb(192, 132, 252), rgb(232, 121, 249)' : 'rgb(148, 163, 184), rgb(45, 212, 191)'})`
              }}
            >
              {hashira.japanese}
            </motion.p>

            <h3 className="font-display text-4xl lg:text-5xl xl:text-6xl text-foreground mb-3">
              {hashira.name}
            </h3>

            <p className={cn("font-display text-lg lg:text-xl tracking-wider mb-4 bg-gradient-to-r bg-clip-text text-transparent", hashira.color)}>
              {hashira.title}
            </p>

            <div className={cn(
              "inline-block px-4 py-2 rounded-full glass-dark mb-5 border border-border/30",
              index % 2 === 0 ? "lg:ml-0" : "lg:mr-0"
            )}>
              <span className="font-japanese text-sm text-muted-foreground">
                {hashira.breathingStyle}
              </span>
            </div>

            <p className={cn(
              "text-muted-foreground text-lg leading-relaxed max-w-lg",
              index % 2 === 0 ? "mx-auto lg:mx-0" : "mx-auto lg:ml-auto lg:mr-0"
            )}>
              {hashira.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HashiraShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-japanese text-sakura text-xl mb-4">柱</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">THE</span>{" "}
            <span className="text-gradient-crimson">HASHIRA</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Inspired by the legendary pillars of the Demon Slayer Corps. 
            Each protector embodies the spirit of these elite warriors.
          </p>
        </motion.div>

        {/* Hashira Cards */}
        <div className="space-y-16 lg:space-y-24">
          {hashiras.map((hashira, index) => (
            <HashiraCard key={hashira.name} hashira={hashira} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HashiraShowcase;
