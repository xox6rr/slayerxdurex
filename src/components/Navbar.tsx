import { motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "COLLECTION", href: "#" },
    { name: "BREATHING STYLES", href: "#" },
    { name: "ABOUT", href: "#" },
    { name: "CONTACT", href: "#" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-japanese text-primary-foreground text-xl">鬼</span>
            </div>
            <span className="font-display text-2xl tracking-wider text-foreground">
              DUREX<span className="text-primary">×</span>DS
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-display text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ShoppingBag className="w-5 h-5" />
            </Button>
            <Button size="sm" className="font-display tracking-wider">
              SHOP NOW
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-foreground p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className={cn("lg:hidden overflow-hidden glass-dark")}
      >
        <div className="container px-4 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-display text-lg tracking-wider text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full font-display tracking-wider mt-4">
            SHOP NOW
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;