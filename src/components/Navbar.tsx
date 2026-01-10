import { motion } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { useHashiraTheme } from "@/contexts/HashiraThemeContext";
import HashiraSelector from "./HashiraSelector";

const Navbar = () => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const { themeInfo } = useHashiraTheme();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 glass-dark"
      >
        <div className="container px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Demon Slayer style */}
            <motion.a
              href="/"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
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
                  <span className="font-japanese text-white text-xl">滅</span>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: `hsl(${themeInfo.colors.primary})` }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
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
            <div className="hidden lg:flex items-center gap-8">
              {[
                { name: "呼吸法", en: "STYLES" },
                { name: "柱", en: "HASHIRA" },
                { name: "技", en: "TECHNIQUES" },
                { name: "物語", en: "STORY" },
              ].map((link) => (
                <a
                  key={link.en}
                  href="#"
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
                  />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Selector Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSelectorOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ background: themeInfo.colors.gradient }}
                />
                <Sparkles className="w-4 h-4 text-muted-foreground" />
              </motion.button>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg text-white font-display tracking-wider breathing-pulse"
                style={{ 
                  background: themeInfo.colors.gradient,
                  boxShadow: `0 0 30px hsl(${themeInfo.colors.glow} / 0.4)`
                }}
              >
                全集中 • SHOP
              </motion.button>

              {/* Mobile menu */}
              <button 
                onClick={() => setIsSelectorOpen(true)}
                className="md:hidden p-2"
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