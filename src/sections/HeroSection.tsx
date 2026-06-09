import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-obsidian flex items-center justify-center">
      {/* Fallback background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-fallback.jpg"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/40 to-obsidian/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[800px] px-5">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-serif font-light text-5xl md:text-7xl tracking-[0.2em] uppercase text-ivory"
        >
          VELARO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-serif text-lg md:text-[28px] leading-relaxed text-ivory/80 mt-4 max-w-[600px] mx-auto"
        >
          Bangladesh&apos;s finest collection of premium menswear. Crafted for the modern gentleman.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-10"
        >
          <Link to="/collection" className="btn-primary-light inline-block px-12">
            Explore Collection
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-px h-[60px] bg-ivory/40 relative overflow-hidden">
          <div className="absolute w-full h-3 bg-ivory animate-scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
}
