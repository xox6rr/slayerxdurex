import { motion } from "framer-motion";

const Navbar = () => {
  return (
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(270,60%,30%)] flex items-center justify-center border-2 border-[hsl(270,60%,60%)]">
                <span className="font-japanese text-foreground text-xl">滅</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[hsl(270,60%,50%)]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-brush text-xl tracking-wider text-foreground">
                鬼滅<span className="text-primary">×</span>DUREX
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
                <span className="font-japanese text-xs text-[hsl(270,60%,60%)] group-hover:text-[hsl(270,60%,70%)] transition-colors">
                  {link.name}
                </span>
                <span className="font-display text-sm tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                  {link.en}
                </span>
                <span className="w-0 h-0.5 bg-gradient-to-r from-[hsl(180,80%,50%)] via-[hsl(270,70%,55%)] to-[hsl(330,80%,65%)] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-[hsl(340,80%,45%)] text-primary-foreground font-display tracking-wider glow-crimson breathing-pulse"
            >
              全集中 • SHOP
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;