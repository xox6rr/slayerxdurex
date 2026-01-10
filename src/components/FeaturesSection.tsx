import { motion } from "framer-motion";
import { Shield, Zap, Heart, Award } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "DEMON-PROOF PROTECTION",
    description: "Triple-tested durability that would make even Upper Moons think twice.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "LIGHTNING SPEED",
    description: "Ultra-quick application when every second counts in battle.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "PURE INTENTIONS",
    description: "Made with care, respecting both warriors and their companions.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "HASHIRA APPROVED",
    description: "Meets the highest standards of the Demon Slayer Corps.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-japanese text-sakura text-lg mb-4">なぜ選ぶ</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">WHY</span>{" "}
            <span className="text-gradient-crimson">CHOOSE US</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center text-primary group-hover:glow-crimson transition-all duration-300"
              >
                {feature.icon}
              </motion.div>
              <h3 className="font-display text-xl mb-3 text-foreground">
                {feature.title}
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