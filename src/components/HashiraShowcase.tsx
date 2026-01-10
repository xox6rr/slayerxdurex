import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

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

        <div className="relative p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8">
          {/* Silhouette */}
          <motion.div
            style={{ y }}
            className="relative flex-shrink-0"
          >
            <div
              className={cn(
                "w-48 h-64 lg:w-56 lg:h-72 rounded-2xl bg-gradient-to-b flex items-end justify-center overflow-hidden",
                hashira.silhouetteGradient,
                hashira.glowColor
              )}
            >
              {/* Silhouette SVG */}
              <svg
                viewBox="0 0 100 150"
                className="w-full h-full opacity-90"
                fill="currentColor"
              >
                <defs>
                  <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(0,0,0,0.9)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="30" rx="15" ry="18" fill={`url(#grad-${index})`} />
                <path
                  d="M35 45 Q30 60 28 80 L25 150 L40 150 L42 90 L50 95 L58 90 L60 150 L75 150 L72 80 Q70 60 65 45 Z"
                  fill={`url(#grad-${index})`}
                />
                <path
                  d="M28 55 Q15 70 10 95 L20 100 Q28 75 35 60 Z"
                  fill={`url(#grad-${index})`}
                />
                <path
                  d="M72 55 Q85 70 90 95 L80 100 Q72 75 65 60 Z"
                  fill={`url(#grad-${index})`}
                />
              </svg>

              {/* Sword accent */}
              <div className="absolute bottom-4 right-4 w-1 h-32 bg-gradient-to-t from-transparent to-white/50 rotate-45 rounded-full" />
            </div>

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={cn("absolute w-2 h-2 rounded-full bg-gradient-to-br", hashira.color)}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${10 + Math.random() * 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              className="font-japanese text-2xl mb-2 bg-gradient-to-r bg-clip-text text-transparent opacity-80"
              style={{
                backgroundImage: `linear-gradient(to right, ${hashira.color.includes('orange') ? 'rgb(249, 115, 22), rgb(239, 68, 68)' : hashira.color.includes('blue') ? 'rgb(96, 165, 250), rgb(34, 211, 238)' : hashira.color.includes('purple') ? 'rgb(192, 132, 252), rgb(232, 121, 249)' : 'rgb(148, 163, 184), rgb(45, 212, 191)'})`
              }}
            >
              {hashira.japanese}
            </motion.p>

            <h3 className="font-display text-4xl lg:text-5xl text-foreground mb-2">
              {hashira.name}
            </h3>

            <p className={cn("font-display text-lg tracking-wider mb-4 bg-gradient-to-r bg-clip-text text-transparent", hashira.color)}>
              {hashira.title}
            </p>

            <div className="inline-block px-4 py-2 rounded-full glass-dark mb-4">
              <span className="font-japanese text-sm text-muted-foreground">
                {hashira.breathingStyle}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
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