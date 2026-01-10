import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "WATER BREATHING",
    japaneseName: "水の呼吸",
    breathingStyle: "壱ノ型 • FIRST FORM",
    description: "Flow like the calm river. Ultra-smooth experience with advanced lubricant formula inspired by Giyu Tomioka's fluid techniques.",
    styleType: "water" as const,
  },
  {
    name: "FLAME BREATHING",
    japaneseName: "炎の呼吸",
    breathingStyle: "玖ノ型 • NINTH FORM",
    description: "Set your heart ablaze. Heat-activated technology for intense passion, channeling Rengoku's unwavering spirit.",
    styleType: "flame" as const,
  },
  {
    name: "THUNDER BREATHING",
    japaneseName: "雷の呼吸",
    breathingStyle: "壱ノ型 • THUNDERCLAP",
    description: "Swift as lightning. Ultra-thin for maximum sensation, inspired by Zenitsu's lightning-fast Thunderclap and Flash.",
    styleType: "thunder" as const,
  },
  {
    name: "MIST BREATHING",
    japaneseName: "霞の呼吸",
    breathingStyle: "漆ノ型 • OBSCURING CLOUDS",
    description: "Gentle as morning mist. Ultra-sensitive protection with subtle textures, channeling Muichiro's ethereal techniques.",
    styleType: "mist" as const,
  },
];

const ProductSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />
      
      {/* Seigaiha pattern */}
      <div className="absolute inset-0 pattern-seigaiha opacity-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(270,60%,50%)] opacity-5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-[100px]" />

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
            className="font-japanese text-[hsl(270,60%,70%)] text-xl mb-4"
          >
            呼吸法コレクション
          </motion.p>
          <h2 className="font-brush text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">BREATHING</span>{" "}
            <span className="text-gradient-nichirin">STYLES</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-japanese">
            全集中の呼吸 — Each protection style represents a legendary breathing technique of the Demon Slayer Corps.
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