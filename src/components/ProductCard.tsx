import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  id: string;
  name: string;
  japaneseName: string;
  breathingStyle: string;
  description: string;
  styleType: "water" | "flame" | "thunder" | "mist" | "glow";
  image?: string;
  price: number;
  delay?: number;
}

const styleConfig = {
  water: {
    gradient: "from-[hsl(200,90%,55%)] to-[hsl(220,80%,45%)]",
    glow: "shadow-[0_0_40px_hsl(200,90%,55%,0.4)]",
    border: "border-[hsl(200,90%,55%,0.3)] hover:border-[hsl(200,90%,55%,0.6)]",
    accent: "text-[hsl(200,90%,60%)]",
    bg: "bg-[hsl(200,90%,55%,0.1)]",
    particleColor: "hsl(200, 90%, 60%)",
    kanji: "水",
    buttonBg: "bg-gradient-to-r from-[hsl(200,90%,55%)] to-[hsl(220,80%,45%)]",
  },
  flame: {
    gradient: "from-[hsl(25,95%,55%)] to-[hsl(0,85%,50%)]",
    glow: "shadow-[0_0_40px_hsl(25,95%,55%,0.4)]",
    border: "border-[hsl(25,95%,55%,0.3)] hover:border-[hsl(25,95%,55%,0.6)]",
    accent: "text-[hsl(25,95%,60%)]",
    bg: "bg-[hsl(25,95%,55%,0.1)]",
    particleColor: "hsl(25, 95%, 60%)",
    kanji: "火",
    buttonBg: "bg-gradient-to-r from-[hsl(25,95%,55%)] to-[hsl(0,85%,50%)]",
  },
  thunder: {
    gradient: "from-[hsl(50,100%,55%)] to-[hsl(40,90%,50%)]",
    glow: "shadow-[0_0_40px_hsl(50,100%,55%,0.4)]",
    border: "border-[hsl(50,100%,55%,0.3)] hover:border-[hsl(50,100%,55%,0.6)]",
    accent: "text-[hsl(50,100%,60%)]",
    bg: "bg-[hsl(50,100%,55%,0.1)]",
    particleColor: "hsl(50, 100%, 60%)",
    kanji: "雷",
    buttonBg: "bg-gradient-to-r from-[hsl(50,100%,55%)] to-[hsl(40,90%,50%)]",
  },
  mist: {
    gradient: "from-[hsl(280,60%,60%)] to-[hsl(260,50%,50%)]",
    glow: "shadow-[0_0_40px_hsl(280,60%,60%,0.4)]",
    border: "border-[hsl(280,60%,60%,0.3)] hover:border-[hsl(280,60%,60%,0.6)]",
    accent: "text-[hsl(280,60%,70%)]",
    bg: "bg-[hsl(280,60%,60%,0.1)]",
    particleColor: "hsl(280, 60%, 70%)",
    kanji: "霞",
    buttonBg: "bg-gradient-to-r from-[hsl(280,60%,60%)] to-[hsl(260,50%,50%)]",
  },
};

const ProductCard = ({
  id,
  name,
  japaneseName,
  breathingStyle,
  description,
  styleType,
  image,
  price,
  delay = 0,
}: ProductCardProps) => {
  const config = styleConfig[styleType];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const isWishlisted = isInWishlist(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    addItem({
      id,
      name,
      japaneseName,
      breathingStyle,
      styleType,
      price,
      image,
    });

    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, breathingStyle });
    }
  };

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -10, transition: { duration: 0.25, ease: "easeOut" } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative glass-dark rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer",
        config.border,
        "hover:shadow-2xl"
      )}
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Product Image */}
      {image && (
        <div className="relative w-full aspect-square overflow-hidden">
          <motion.img
            src={image}
            alt={`${name} - ${breathingStyle} Edition`}
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            itemProp="image"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Wishlist Heart Button */}
          <motion.button
            onClick={handleWishlistToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm transition-all z-10",
              isWishlisted 
                ? "bg-red-500/20 text-red-500" 
                : "bg-black/30 text-white/70 hover:text-white"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          </motion.button>
          
          {/* Kanji watermark on image */}
          <motion.div 
            className="absolute top-4 right-4 font-japanese text-5xl opacity-30 text-white drop-shadow-lg"
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          >
            {config.kanji}
          </motion.div>

          {/* Breathing style particles on hover */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: config.particleColor,
                    left: `${10 + Math.random() * 80}%`,
                    bottom: `${20 + Math.random() * 40}%`,
                    boxShadow: `0 0 10px ${config.particleColor}`,
                  }}
                  initial={{ scale: 0, opacity: 0, y: 0 }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.9, 0],
                    y: styleType === 'flame' ? -80 : styleType === 'mist' ? -40 : [0, -30, 0],
                    x: styleType === 'thunder' ? [0, 15, -15, 0] : styleType === 'water' ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.08,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Glow effect on hover */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-2xl -z-10 transition-opacity duration-300",
            config.glow
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* Japanese name */}
        <p className={cn("font-japanese text-sm mb-2", config.accent)} itemProp="alternateName">
          {japaneseName}
        </p>

        {/* Breathing Style Badge */}
        <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-display tracking-wider mb-3", config.bg, config.accent)}>
          {breathingStyle}
        </div>

        {/* Title */}
        <h3 className="font-brush text-xl mb-2 text-foreground" itemProp="name">
          {name}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2" itemProp="description">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span className={cn("font-brush text-2xl", config.accent)} itemProp="price" content={price.toString()}>
            {formatPrice(price)}
          </span>
          <meta itemProp="priceCurrency" content="JPY" />
          <meta itemProp="availability" content="https://schema.org/InStock" />
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(Math.round(price * 1.2))}
          </span>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn(
            "w-full py-3 rounded-xl font-display tracking-wider text-sm flex items-center justify-center gap-2 text-white transition-all",
            config.buttonBg,
            isAdding && "opacity-80"
          )}
          aria-label={`Add ${name} to cart`}
        >
          {isAdding ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
              追加完了 • ADDED
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              カートに追加 • ADD TO CART
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
};

export default ProductCard;
