import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  japaneseName: string;
  breathingStyle: string;
  description: string;
  styleType: "water" | "flame" | "thunder" | "mist" | "glow";
  image?: string;
  price: number;
}

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const styleConfig = {
  water: {
    gradient: "from-[hsl(200,90%,55%)] to-[hsl(220,80%,45%)]",
    accent: "text-[hsl(200,90%,60%)]",
    bg: "bg-[hsl(200,90%,55%,0.1)]",
    buttonBg: "bg-gradient-to-r from-[hsl(200,90%,55%)] to-[hsl(220,80%,45%)]",
    kanji: "水",
    forms: ["水面斬り - Water Surface Slash", "水車 - Water Wheel", "流流舞い - Flowing Dance"],
  },
  flame: {
    gradient: "from-[hsl(25,95%,55%)] to-[hsl(0,85%,50%)]",
    accent: "text-[hsl(25,95%,60%)]",
    bg: "bg-[hsl(25,95%,55%,0.1)]",
    buttonBg: "bg-gradient-to-r from-[hsl(25,95%,55%)] to-[hsl(0,85%,50%)]",
    kanji: "火",
    forms: ["不知火 - Unknowing Fire", "昇り炎天 - Rising Scorching Sun", "炎虎 - Flame Tiger"],
  },
  thunder: {
    gradient: "from-[hsl(50,100%,55%)] to-[hsl(40,90%,50%)]",
    accent: "text-[hsl(50,100%,60%)]",
    bg: "bg-[hsl(50,100%,55%,0.1)]",
    buttonBg: "bg-gradient-to-r from-[hsl(50,100%,55%)] to-[hsl(40,90%,50%)]",
    kanji: "雷",
    forms: ["霹靂一閃 - Thunderclap and Flash", "電光石火 - Heat Lightning", "雷の呼吸 - Thunder Breathing"],
  },
  mist: {
    gradient: "from-[hsl(280,60%,60%)] to-[hsl(260,50%,50%)]",
    accent: "text-[hsl(280,60%,70%)]",
    bg: "bg-[hsl(280,60%,60%,0.1)]",
    buttonBg: "bg-gradient-to-r from-[hsl(280,60%,60%)] to-[hsl(260,50%,50%)]",
    kanji: "霞",
    forms: ["垂天遠霞 - Distant Haze", "移流斬り - Shifting Flow Slash", "朧 - Obscuring Clouds"],
  },
};

const sizes = ["S", "M", "L", "XL"];

const ProductQuickView = ({ product, isOpen, onClose }: ProductQuickViewProps) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, openCart } = useCart();
  const { themeInfo } = useHashiraTheme();

  if (!product) return null;

  const config = styleConfig[product.styleType];
  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  // Simulated multiple images (using same image for demo)
  const images = [product.image, product.image, product.image].filter(Boolean);

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        japaneseName: product.japaneseName,
        breathingStyle: product.breathingStyle,
        styleType: product.styleType,
        price: product.price,
        image: product.image,
      });
    }
    setTimeout(() => {
      setIsAdding(false);
      onClose();
      openCart();
    }, 800);
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[110] w-auto md:w-full md:max-w-4xl max-h-[90vh] overflow-y-auto glass-dark rounded-2xl border border-border"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              aria-label="Close quick view"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Gallery */}
              <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-card to-background">
                {images.length > 0 && (
                  <>
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={cn(
                            "w-2 h-2 rounded-full transition-colors",
                            idx === currentImageIndex ? config.buttonBg : "bg-white/50"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Kanji watermark */}
                <div className={cn("absolute top-4 left-4 font-japanese text-6xl opacity-20", config.accent)}>
                  {config.kanji}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8 flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <p className={cn("font-japanese text-sm mb-2", config.accent)}>
                    {product.japaneseName}
                  </p>
                  <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-display tracking-wider mb-3", config.bg, config.accent)}>
                    {product.breathingStyle}
                  </div>
                  <h2 className="font-brush text-3xl md:text-4xl text-foreground mb-2">
                    {product.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Forms/Features */}
                <div className="mb-6">
                  <h3 className="font-display text-sm text-muted-foreground mb-3">BREATHING FORMS</h3>
                  <ul className="space-y-2">
                    {config.forms.map((form, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className={cn("w-1.5 h-1.5 rounded-full", config.buttonBg)} />
                        <span className="font-japanese">{form}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="font-display text-sm text-muted-foreground mb-3">SIZE</h3>
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "w-12 h-12 rounded-lg border font-display text-sm transition-all",
                          selectedSize === size
                            ? cn(config.buttonBg, "text-white border-transparent")
                            : "border-border hover:border-muted-foreground text-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-display text-sm text-muted-foreground mb-3">QUANTITY</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-border hover:border-muted-foreground transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-display text-xl w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-border hover:border-muted-foreground transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="mt-auto pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className={cn("font-brush text-3xl", config.accent)}>
                        {formatPrice(product.price * quantity)}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2 line-through">
                        {formatPrice(Math.round(product.price * 1.2 * quantity))}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={cn(
                      "w-full py-6 font-display tracking-wider text-white text-lg",
                      config.buttonBg
                    )}
                  >
                    {isAdding ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        追加完了 • ADDED
                      </motion.span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        カートに追加 • ADD TO CART
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
