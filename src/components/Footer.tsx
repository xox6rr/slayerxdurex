import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border overflow-hidden">
      {/* Seigaiha pattern */}
      <div className="absolute inset-0 pattern-seigaiha opacity-5" />
      
      <div className="container px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(270,60%,50%)] to-[hsl(270,60%,30%)] flex items-center justify-center border-2 border-[hsl(270,60%,60%)]">
                <span className="font-japanese text-foreground text-lg">滅</span>
              </div>
              <div>
                <span className="font-brush text-2xl tracking-wider text-foreground block">
                  鬼滅<span className="text-primary">×</span>DUREX
                </span>
                <span className="text-xs text-muted-foreground">Demon Slayer Limited Edition</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm font-japanese">
              全集中の呼吸で、あなたを守る。A legendary collaboration bringing together the art of protection with the spirit of the Demon Slayer Corps.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-brush text-lg mb-4 text-foreground flex items-center gap-2">
              <span className="font-japanese text-[hsl(270,60%,60%)]">探す</span>
              EXPLORE
            </h4>
            <ul className="space-y-2">
              {[
                { jp: "呼吸法", en: "Breathing Styles" },
                { jp: "柱", en: "Hashira Collection" },
                { jp: "物語", en: "Our Story" },
                { jp: "連絡", en: "Contact" },
              ].map((link) => (
                <li key={link.en}>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-2">
                    <span className="font-japanese text-xs text-[hsl(270,60%,50%)]">{link.jp}</span>
                    {link.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-brush text-lg mb-4 text-foreground flex items-center gap-2">
              <span className="font-japanese text-[hsl(270,60%,60%)]">法的</span>
              LEGAL
            </h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Age Verification"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © 2024 Durex × 鬼滅の刃. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-japanese text-[hsl(270,60%,60%)] text-lg">全集中・常中</span>
            <div className="w-8 h-8 rounded-full bg-[hsl(160,70%,25%)] flex items-center justify-center border border-[hsl(160,60%,35%)]">
              <span className="font-japanese text-xs text-foreground">滅</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;