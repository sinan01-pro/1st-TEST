import { Link } from 'react-router-dom';
import SectionReveal from '@/components/SectionReveal';

export default function BrandStory() {
  return (
    <section className="bg-ivory section-padding">
      <div className="container-velaro">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <SectionReveal>
            <div>
              <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-warmgray mb-4">
                OUR STORY
              </p>
              <h2 className="font-serif font-medium text-3xl md:text-[44px] leading-tight text-obsidian mb-6">
                Born in Bangladesh, Crafted for the World
              </h2>
              <p className="font-sans text-lg leading-relaxed text-charcoal mb-8">
                VELARO was founded with a simple mission: to bring world-class menswear to Bangladesh at honest prices. We source the finest fabrics, partner with skilled craftsmen, and obsess over every stitch. From our studio in Dhaka to your doorstep — excellence is our only standard.
              </p>
              <Link
                to="/about"
                className="inline-block font-sans font-medium text-obsidian hover:text-warmgray transition-colors hover:underline underline-offset-4"
              >
                Read Our Story &rarr;
              </Link>
            </div>
          </SectionReveal>

          {/* Image */}
          <SectionReveal delay={0.2}>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="/images/brand-story-img.jpg"
                alt="VELARO Workshop"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
