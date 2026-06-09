import { motion } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';

export default function BrandStatement() {
  return (
    <section className="bg-obsidian py-24 md:py-40">
      <div className="container-velaro max-w-[900px] text-center">
        <SectionReveal>
          <p className="font-serif text-xl md:text-4xl leading-relaxed text-ivory">
            We believe every man deserves to feel exceptional. VELARO brings world-class menswear to Bangladesh — crafted with precision, designed with purpose, priced with honesty.
          </p>
        </SectionReveal>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-px bg-warmgray mx-auto my-10"
        />

        <SectionReveal delay={0.6}>
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-warmgray">
            Since 2022
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
