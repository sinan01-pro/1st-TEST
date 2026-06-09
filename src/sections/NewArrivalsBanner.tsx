import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionReveal from '@/components/SectionReveal';

export default function NewArrivalsBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="bg-obsidian">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
        {/* Image */}
        <div className="relative overflow-hidden h-[50vh] md:h-auto">
          <motion.img
            src="/images/new-arrivals-img.jpg"
            alt="New Arrivals"
            style={{ y }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex items-center justify-center p-10 md:p-20">
          <SectionReveal direction="right">
            <div>
              <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-gold mb-6">
                JUST DROPPED
              </p>
              <h2 className="font-serif font-medium text-4xl md:text-[52px] leading-tight text-ivory mb-5">
                New Arrivals
              </h2>
              <p className="font-sans text-lg text-ivory/70 leading-relaxed max-w-[400px] mb-10">
                Discover our latest collection of premium menswear. Fresh styles, same uncompromising quality.
              </p>
              <Link to="/collection?sort=newest" className="btn-primary-light">
                Shop New Arrivals
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
