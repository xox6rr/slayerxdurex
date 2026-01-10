import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles, ShoppingCart, User, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import HashiraSelector from "./HashiraSelector";

const Navbar = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { themeInfo } = useHashiraTheme();
  const { totalItems, openCart } = useCart();
  const { user, profile, loading } = useAuth();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-dark"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Demon Slayer style */}
            <motion.a
              href="/"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              aria-label="Demon Slayer × Durex Home"
            >
              {/* Wisteria crest inspired logo */}
              <div className="relative w-12 h-12">
                <div 
                  className="absolute inset-0 rounded-full flex items-center justify-center border-2"
                  style={{ 
                    background: themeInfo.colors.gradient,
                    borderColor: `hsl(${themeInfo.colors.accent})`
                  }}
                >
                  <span className="font-japanese text-white text-xl" aria-hidden="true">滅</span>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: `hsl(${themeInfo.colors.primary})` }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-brush text-xl tracking-wider text-foreground">
                  鬼滅<span style={{ color: `hsl(${themeInfo.colors.primary})` }}>×</span>DUREX
                </span>
                <span className="text-xs text-muted-foreground font-japanese">Demon Slayer Edition</span>
              </div>
            </motion.a>

            {/* Desktop Links */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Product categories">
              {[
                { name: "呼吸法", en: "STYLES", href: "#products" },
                { name: "柱", en: "HASHIRA", href: "#characters" },
                { name: "技", en: "TECHNIQUES", href: "#features" },
                { name: "物語", en: "STORY", href: "#story" },
              ].map((link) => (
                <a
                  key={link.en}
                  href={link.href}
                  className="group flex flex-col items-center text-center"
                >
                  <span 
                    className="font-japanese text-xs transition-colors"
                    style={{ color: `hsl(${themeInfo.colors.accent})` }}
                  >
                    {link.name}
                  </span>
                  <span className="font-display text-sm tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.en}
                  </span>
                  <span 
                    className="w-0 h-0.5 transition-all group-hover:w-full"
                    style={{ background: themeInfo.colors.gradient }}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Selector Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSelectorOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                aria-label="Choose Hashira theme"
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ background: themeInfo.colors.gradient }}
                  aria-hidden="true"
                />
                <Sparkles className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              </motion.button>

              {/* Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openCart}
                className="relative p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingCart className="w-5 h-5 text-foreground" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-display text-white"
                      style={{ background: themeInfo.colors.gradient }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Auth */}
              {!loading && (
                user ? (
                  <Link to="/profile">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: themeInfo.colors.gradient }}
                      >
                        {profile?.display_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "S"}
                      </div>
                      <span className="hidden lg:block text-sm text-foreground font-medium truncate max-w-[80px]">
                        {profile?.display_name || "Slayer"}
                      </span>
                    </motion.div>
                  </Link>
                ) : (
                  <Link to="/login">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <LogIn className="w-4 h-4 text-foreground" />
                      <span className="hidden sm:block text-sm text-foreground">Login</span>
                    </motion.div>
                  </Link>
                )
              )}

              {/* CTA */}
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex px-6 py-2 rounded-lg text-white font-display tracking-wider breathing-pulse"
                style={{ 
                  background: themeInfo.colors.gradient,
                  boxShadow: `0 0 30px hsl(${themeInfo.colors.glow} / 0.4)`
                }}
              >
                全集中 • SHOP
              </motion.a>

              {/* Mobile menu */}
              <button 
                onClick={() => setIsSelectorOpen(true)}
                className="md:hidden p-2"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <HashiraSelector isOpen={isSelectorOpen} onClose={() => setIsSelectorOpen(false)} />
    </>
  );
};

export default Navbar;