import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Flame, Droplets, Wind, Sparkles } from "lucide-react";

const products = [
  {
    name: "FLAME GUARD",
    breathingStyle: "火の呼吸 • FIRE BREATHING",
    description: "Intense protection with heat-activated technology. Inspired by the fierce passion of Flame Hashira.",
    color: "crimson" as const,
    icon: <Flame className="w-6 h-6" />,
  },
  {
    name: "WATER FLOW",
    breathingStyle: "水の呼吸 • WATER BREATHING",
    description: "Ultra-smooth experience with advanced lubricant formula. Flow like water, adapt to every moment.",
    color: "nichirin" as const,
    icon: <Droplets className="w-6 h-6" />,
  },
  {
    name: "GENTLE MIST",
    breathingStyle: "霞の呼吸 • MIST BREATHING",
    description: "Ultra-thin design for heightened sensitivity. Soft as morning mist, strong as steel.",
    color: "sakura" as const,
    icon: <Wind className="w-6 h-6" />,
  },
  {
    name: "THUNDER STRIKE",
    breathingStyle: "雷の呼吸 • THUNDER BREATHING",
    description: "Electrifying experience with textured design. Swift protection for lightning-fast warriors.",
    color: "gold" as const,
    icon: <Sparkles className="w-6 h-6" />,
  },
];

const ProductSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container relative z-10 px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-japanese text-sakura text-lg mb-4"
          >
            呼吸スタイル
          </motion.p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">BREATHING</span>{" "}
            <span className="text-gradient-crimson">STYLES</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each style represents a unique form of protection, inspired by the legendary breathing techniques of the Demon Slayer Corps.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              {...product}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;