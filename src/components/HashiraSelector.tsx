import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles } from "lucide-react";
import { useHashiraTheme, hashiraThemes, HashiraTheme } from "@/contexts/HashiraThemeContext";
import { cn } from "@/lib/utils";

interface HashiraSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const HashiraSelector = ({ isOpen, onClose }: HashiraSelectorProps) => {
  const { theme, setTheme, themeInfo } = useHashiraTheme();

  const handleSelect = (newTheme: HashiraTheme) => {
    setTheme(newTheme);
  };

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
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[80vh] z-[70] glass-dark rounded-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-[hsl(270,60%,60%)]" />
                  <span className="font-japanese text-[hsl(270,60%,70%)]">柱を選択</span>
                </div>
                <h2 className="font-brush text-2xl md:text-3xl text-foreground">
                  CHOOSE YOUR HASHIRA
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Select a Hashira to personalize your experience
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            {/* Current Selection */}
            <div className="px-6 py-4 bg-muted/30 border-b border-border">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Current Theme</p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg"
                  style={{ background: themeInfo.colors.gradient }}
                />
                <div>
                  <p className="font-brush text-lg text-foreground">{themeInfo.name}</p>
                  <p className="text-xs text-muted-foreground font-japanese">{themeInfo.title}</p>
                </div>
              </div>
            </div>

            {/* Character Grid */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(Object.entries(hashiraThemes) as [HashiraTheme, typeof hashiraThemes[HashiraTheme]][]).map(([key, char]) => (
                  <motion.button
                    key={key}
                    onClick={() => handleSelect(key)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "relative p-3 rounded-xl border transition-all duration-300 text-left group",
                      theme === key
                        ? "border-[hsl(var(--hashira-primary))] bg-[hsl(var(--hashira-primary)/0.1)]"
                        : "border-border hover:border-muted-foreground bg-card/50"
                    )}
                  >
                    {/* Selection indicator */}
                    {theme === key && (
                      <motion.div
                        layoutId="selectedHashira"
                        className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: char.colors.gradient }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}

                    {/* Color preview */}
                    <div
                      className="w-full h-12 rounded-lg mb-3 relative overflow-hidden"
                      style={{ background: char.colors.gradient }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>

                    {/* Character info */}
                    <p className="font-japanese text-xs text-muted-foreground mb-1 truncate">
                      {char.japaneseName}
                    </p>
                    <p className="font-display text-sm text-foreground truncate">
                      {char.name.split(" ")[0]}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-japanese">
                      {char.title}
                    </p>

                    {/* Hover glow */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                        theme === key ? "opacity-100" : ""
                      )}
                      style={{
                        boxShadow: `0 0 30px hsl(${char.colors.glow} / 0.3)`,
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Theme affects buttons, accents, and glowing effects
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-2 rounded-lg font-display tracking-wider text-sm"
                style={{ background: themeInfo.colors.gradient }}
              >
                APPLY THEME
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HashiraSelector;