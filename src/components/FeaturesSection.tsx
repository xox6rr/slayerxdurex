import { motion } from "framer-motion";
import { Shield, Zap, Heart, Award } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    kanji: "守",
    title: "鬼殺の守護",
    enTitle: "DEMON-PROOF PROTECTION",
    description: "Triple-tested durability that would make even Upper Moons think twice. Forged with Nichirin-grade quality.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    kanji: "雷",
    title: "雷の速さ",
    enTitle: "THUNDER SPEED",
    description: "Lightning-fast application inspired by Zenitsu's Thunderclap and Flash technique.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    kanji: "心",
    title: "純粋な心",
    enTitle: "PURE HEART",
    description: "Made with care, respecting both warriors and their companions. Nezuko-approved gentleness.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    kanji: "柱",
    title: "柱の認定",
    enTitle: "HASHIRA CERTIFIED",
    description: "Meets the highest standards of the Demon Slayer Corps. Trusted by all nine Hashira.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      {/* Checkered pattern */}
      <div className="absolute inset-0 pattern-checkered" />
      
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(270,60%,50%)] opacity-5 rounded-full blur-[150px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-japanese text-[hsl(270,60%,70%)] text-xl mb-4">なぜ選ぶのか</p>
          <h2 className="font-brush text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">THE</span>{" "}
            <span className="text-gradient-nichirin">DEMON SLAYER</span>{" "}
            <span className="text-foreground">DIFFERENCE</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.enTitle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group relative"
            >
              {/* Background kanji */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 font-japanese text-8xl text-foreground opacity-5 group-hover:opacity-10 transition-opacity">
                {feature.kanji}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[hsl(270,60%,40%)] to-[hsl(270,60%,25%)] flex items-center justify-center text-[hsl(270,60%,70%)] group-hover:glow-nichirin transition-all duration-300 relative z-10"
              >
                {feature.icon}
              </motion.div>
              <p className="font-japanese text-sm text-[hsl(270,60%,60%)] mb-2">
                {feature.title}
              </p>
              <h3 className="font-display text-lg mb-3 text-foreground">
                {feature.enTitle}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;