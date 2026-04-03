import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Zap, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import glowBanner from "@/assets/glow-banner.jpg";
import glowVideo from "@/assets/glow-promo.mp4.asset.json";

const glowFeatures = [
  { icon: Eye, label: "GLOW-IN-DARK", japanese: "暗闇で光る", desc: "Bioluminescent coating activates in darkness" },
  { icon: Zap, label: "CHARGED", japanese: "充電済み", desc: "6+ hours of radiant luminescence" },
  { icon: Shield, label: "ULTRA-SAFE", japanese: "超安全", desc: "Premium latex with FDA approval" },
  { icon: Sparkles, label: "REACTIVE", japanese: "反応性", desc: "Responds to body heat intensity" },
];

const FloatingParticle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: "-5%",
      background: "hsl(120, 80%, 50%)",
      boxShadow: `0 0 ${size * 3}px hsl(120, 80%, 50%), 0 0 ${size * 6}px hsl(120, 80%, 40%)`,
    }}
    animate={{
      y: [0, -800],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1.2, 0.8, 0],
      x: [0, Math.sin(delay) * 60, Math.cos(delay) * -40, 0],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const GlowPromoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [countdown, setCountdown] = useState({ h: 23, m: 59, s: 59 });
  const { addItem } = useCart();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["50px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: "glow-breathing-001",
      name: "GLOW BREATHING",
      japaneseName: "光の呼吸",
      breathingStyle: "終ノ型 • LUMINOUS FORM",
      styleType: "glow",
      price: 2980,
      image: glowBanner,
    });
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={glowBanner}
          alt="Glow Breathing Product"
          className="w-full h-[120%] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 25 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} x={Math.random() * 100} size={3 + Math.random() * 5} />
        ))}
      </div>

      {/* Pulsing glow ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border-2 border-[hsl(120,80%,50%)]"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.6, 0.2, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full border border-[hsl(120,80%,50%)]"
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.4, 0.1, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
        />
      </div>

      <motion.div
        className="container relative z-10 px-4 py-24 flex flex-col items-center justify-center min-h-screen"
        style={{ y: textY, opacity }}
      >
        {/* Limited edition badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6 px-5 py-2 rounded-full border border-[hsl(120,80%,50%,0.5)] bg-[hsl(120,80%,50%,0.1)] backdrop-blur-lg"
        >
          <span className="font-display tracking-widest text-sm text-[hsl(120,80%,60%)] flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[hsl(120,80%,50%)]"
            />
            LIMITED EDITION • 限定版
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-6xl md:text-8xl lg:text-9xl text-center leading-none mb-4"
        >
          <span className="text-foreground">LIGHTS</span>
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, hsl(120,80%,50%), hsl(150,70%,40%), hsl(120,90%,60%))",
            }}
          >
            OUT
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-japanese text-2xl md:text-3xl text-[hsl(120,80%,60%)] mb-2"
        >
          闇を照らせ
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-lg md:text-xl text-center max-w-2xl mb-10"
        >
          The world's first bioluminescent protection. When the lights go off,
          the show begins. Engineered with photoluminescent nano-particles.
        </motion.p>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-3xl rounded-2xl overflow-hidden border border-[hsl(120,80%,50%,0.3)] mb-12"
          style={{ boxShadow: "0 0 80px hsl(120, 80%, 40%, 0.25)" }}
        >
          <video
            src={glowVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover"
          />
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
          {glowFeatures.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-4 rounded-xl glass-dark border border-[hsl(120,80%,50%,0.2)] text-center group cursor-default"
            >
              <motion.div
                className="mx-auto w-10 h-10 rounded-lg bg-[hsl(120,80%,50%,0.1)] flex items-center justify-center mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <feat.icon className="w-5 h-5 text-[hsl(120,80%,60%)]" />
              </motion.div>
              <p className="font-display text-sm text-foreground tracking-wider">{feat.label}</p>
              <p className="font-japanese text-xs text-[hsl(120,80%,60%)] mb-1">{feat.japanese}</p>
              <p className="text-xs text-muted-foreground">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Countdown + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="font-display text-sm text-muted-foreground tracking-widest mb-3">
            DROP ENDS IN
          </p>
          <div className="flex gap-3 justify-center mb-6">
            {[
              { val: countdown.h, label: "HRS" },
              { val: countdown.m, label: "MIN" },
              { val: countdown.s, label: "SEC" },
            ].map((t) => (
              <div
                key={t.label}
                className="w-16 h-16 rounded-xl glass-dark border border-[hsl(120,80%,50%,0.3)] flex flex-col items-center justify-center"
              >
                <span className="font-display text-2xl text-[hsl(120,80%,60%)]">{pad(t.val)}</span>
                <span className="text-[10px] text-muted-foreground">{t.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleAddToCart}
              className="font-display tracking-widest text-white px-10 py-6 text-lg border-0"
              style={{
                background: "linear-gradient(135deg, hsl(120,80%,45%), hsl(150,70%,35%))",
                boxShadow: "0 0 40px hsl(120, 80%, 40%, 0.5)",
              }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              光を纏え • GET THE GLOW — ¥2,980
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Only 500 units available worldwide. Ships in discreet packaging.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GlowPromoSection;
