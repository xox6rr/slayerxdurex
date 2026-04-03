import { motion } from "framer-motion";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";

// Import product images
import waterBreathingImg from "@/assets/products/water-breathing.png";
import flameBreathingImg from "@/assets/products/flame-breathing.png";
import thunderBreathingImg from "@/assets/products/thunder-breathing.png";
import mistBreathingImg from "@/assets/products/mist-breathing.png";
import glowBreathingImg from "@/assets/products/glow-breathing.png";

export const products = [
  {
    id: "water-breathing-001",
    name: "WATER BREATHING",
    japaneseName: "水の呼吸",
    breathingStyle: "壱ノ型 • FIRST FORM",
    description: "Flow like the calm river. Ultra-smooth experience with advanced lubricant formula inspired by Giyu Tomioka's fluid techniques.",
    styleType: "water" as const,
    image: waterBreathingImg,
    price: 1980,
  },
  {
    id: "flame-breathing-001",
    name: "FLAME BREATHING",
    japaneseName: "炎の呼吸",
    breathingStyle: "玖ノ型 • NINTH FORM",
    description: "Set your heart ablaze. Heat-activated technology for intense passion, channeling Rengoku's unwavering spirit.",
    styleType: "flame" as const,
    image: flameBreathingImg,
    price: 2480,
  },
  {
    id: "thunder-breathing-001",
    name: "THUNDER BREATHING",
    japaneseName: "雷の呼吸",
    breathingStyle: "壱ノ型 • THUNDERCLAP",
    description: "Swift as lightning. Ultra-thin for maximum sensation, inspired by Zenitsu's lightning-fast Thunderclap and Flash.",
    styleType: "thunder" as const,
    image: thunderBreathingImg,
    price: 2280,
  },
  {
    id: "mist-breathing-001",
    name: "MIST BREATHING",
    japaneseName: "霞の呼吸",
    breathingStyle: "漆ノ型 • OBSCURING CLOUDS",
    description: "Gentle as morning mist. Ultra-sensitive protection with subtle textures, channeling Muichiro's ethereal techniques.",
    styleType: "mist" as const,
    image: mistBreathingImg,
    price: 2180,
  },
  {
    id: "glow-breathing-001",
    name: "GLOW BREATHING",
    japaneseName: "光の呼吸",
    breathingStyle: "終ノ型 • LUMINOUS FORM",
    description: "Illuminate the darkness. Glow-in-the-dark technology with bioluminescent coating, inspired by the mystical green flames of the Demon Slayer mark.",
    styleType: "glow" as const,
    image: glowBreathingImg,
    price: 2980,
  },
];

interface ProductSectionProps {
  onProductClick?: (product: typeof products[0]) => void;
}

const ProductSection = ({ onProductClick }: ProductSectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleProductClick = (product: typeof products[0]) => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      setSelectedProduct(product);
      setIsQuickViewOpen(true);
    }
  };

  return (
    <>
      <section 
        id="products" 
        className="relative py-24 overflow-hidden"
        aria-labelledby="products-heading"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" aria-hidden="true" />
        
        {/* Seigaiha pattern */}
        <div className="absolute inset-0 pattern-seigaiha opacity-10" aria-hidden="true" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[hsl(270,60%,50%)] opacity-5 rounded-full blur-[100px]" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-[100px]" aria-hidden="true" />

        <div className="container relative z-10 px-4">
          {/* Section Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-japanese text-[hsl(270,60%,70%)] text-xl mb-4"
            >
              呼吸法コレクション
            </motion.p>
            <h2 id="products-heading" className="font-brush text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="text-foreground">BREATHING</span>{" "}
              <span className="text-gradient-nichirin">STYLES</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-japanese">
              全集中の呼吸 — Each protection style represents a legendary breathing technique of the Demon Slayer Corps.
            </p>
          </motion.header>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6" role="list">
            {products.map((product, index) => (
              <div key={product.id} onClick={() => handleProductClick(product)}>
                <ProductCard
                  {...product}
                  delay={index * 0.1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductSection;
