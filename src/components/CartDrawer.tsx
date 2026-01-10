import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";
import { Button } from "@/components/ui/button";
const CartDrawer = () => {
  const navigate = useNavigate();
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { themeInfo } = useHashiraTheme();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[90] w-full max-w-md glass-dark border-l border-border flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <header className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: themeInfo.colors.gradient }}
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-brush text-xl text-foreground">YOUR CART</h2>
                  <p className="text-xs text-muted-foreground font-japanese">
                    {totalItems} 商品 • {totalItems} items
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </header>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                    style={{ background: `hsl(${themeInfo.colors.primary} / 0.2)` }}
                  >
                    <ShoppingBag className="w-10 h-10" style={{ color: `hsl(${themeInfo.colors.primary})` }} />
                  </motion.div>
                  <p className="font-japanese text-lg text-muted-foreground mb-2">空のカート</p>
                  <p className="text-sm text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <ul className="space-y-4" role="list">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border"
                    >
                      {/* Product Image */}
                      {item.image && (
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-japanese text-xs text-muted-foreground truncate">
                          {item.japaneseName}
                        </p>
                        <h3 className="font-display text-sm text-foreground truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{item.breathingStyle}</p>
                        <p className="font-display text-sm mt-1" style={{ color: `hsl(${themeInfo.colors.primary})` }}>
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-2 bg-muted rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-muted-foreground/20 rounded-l-lg transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-display w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-muted-foreground/20 rounded-r-lg transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <footer className="p-6 border-t border-border space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-japanese">小計 • Subtotal</span>
                  <span className="font-brush text-2xl text-foreground">{formatPrice(totalPrice)}</span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={handleCheckout}
                    className="w-full py-6 font-display tracking-wider text-white"
                    style={{ 
                      background: themeInfo.colors.gradient,
                      boxShadow: `0 0 30px hsl(${themeInfo.colors.glow} / 0.4)`
                    }}
                  >
                    全集中 • CHECKOUT
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full font-display tracking-wider text-muted-foreground"
                  >
                    CLEAR CART
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  送料無料 • Free shipping on orders over ¥5,000
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;