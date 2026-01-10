import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-japanese text-primary-foreground text-xl">鬼</span>
              </div>
              <span className="font-display text-2xl tracking-wider text-foreground">
                DUREX<span className="text-primary">×</span>DS
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              A limited edition collaboration bringing together the world of protection with the art of the demon slayer.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">QUICK LINKS</h4>
            <ul className="space-y-2">
              {["Collection", "About", "FAQ", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg mb-4 text-foreground">LEGAL</h4>
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
            © 2024 Durex × Demon Slayer. All rights reserved.
          </p>
          <p className="font-japanese text-sakura text-sm">
            全集中・常中
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;