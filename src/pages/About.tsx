import { Link } from 'react-router-dom';
import SectionReveal, { StaggerContainer, StaggerItem } from '@/components/SectionReveal';
import { useEffect, useRef, useState } from 'react';

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const values = [
  {
    title: 'Uncompromising Quality',
    description: 'We source premium fabrics from the best mills and inspect every garment before it reaches you. If it doesn\'t meet our standards, it doesn\'t leave our workshop.',
  },
  {
    title: 'Honest Pricing',
    description: 'No inflated markups, no fake discounts. We price our products fairly based on what they cost to make — and we pass the savings on to you.',
  },
  {
    title: 'Customer First',
    description: 'Every decision we make starts with one question: "Is this best for our customer?" From sizing to shipping to returns, your experience is our priority.',
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="container-velaro max-w-[800px] text-center">
          <SectionReveal>
            <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-warmgray mb-5">
              ABOUT VELARO
            </p>
            <h1 className="font-serif font-medium text-4xl md:text-[56px] leading-tight text-ivory mb-5">
              Redefining Men&apos;s Fashion in Bangladesh
            </h1>
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-ivory/70">
              Born from a passion for quality and a vision for accessible luxury.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-ivory section-padding">
        <div className="container-velaro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/about-story.jpg"
                  alt="VELARO Story"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div>
                <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-warmgray mb-4">
                  OUR STORY
                </p>
                <h2 className="font-serif font-medium text-3xl md:text-4xl text-obsidian mb-6">
                  From a Small Studio to a National Brand
                </h2>
                <div className="space-y-5 font-sans text-lg leading-relaxed text-charcoal">
                  <p>
                    VELARO was founded in 2022 with a simple but powerful idea: Bangladeshi men deserve access to world-class fashion without the inflated price tags. What started as a small operation in a Dhaka studio has grown into one of the country&apos;s most trusted menswear brands.
                  </p>
                  <p>
                    We started with just oversized t-shirts — perfected over countless prototypes until the fabric weight, the drape, and the fit were exactly right. Word spread. Customers became repeat buyers. Repeat buyers became advocates.
                  </p>
                  <p>
                    Today, VELARO offers a full range of premium menswear — from casual essentials to formal wear, accessories to outerwear. But our core mission remains unchanged: exceptional quality, honest pricing, and a relentless focus on the customer experience.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f5f4f0] py-20 md:py-24">
        <div className="container-velaro">
          <SectionReveal>
            <h2 className="font-serif font-medium text-3xl md:text-[44px] text-obsidian text-center mb-12 md:mb-16">
              What We Stand For
            </h2>
          </SectionReveal>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10" staggerDelay={0.15}>
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div>
                  <h3 className="font-sans font-medium text-xl text-obsidian mb-3">{v.title}</h3>
                  <p className="font-sans text-base leading-relaxed text-warmgray">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-obsidian py-16 md:py-20">
        <div className="container-velaro">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 50000, suffix: '+', label: 'Happy Customers' },
              { value: 20, suffix: '+', label: 'Premium Products' },
              { value: 64, suffix: '', label: 'Districts Served' },
              { value: 99, suffix: '%', label: 'Positive Reviews' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif font-medium text-4xl md:text-5xl text-ivory">
                  <CountUp end={stat.value} />{stat.suffix}
                </p>
                <p className="font-sans text-base text-warmgray mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-ivory section-padding">
        <div className="container-velaro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionReveal>
              <div>
                <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-warmgray mb-4">
                  CRAFTSMANSHIP
                </p>
                <h2 className="font-serif font-medium text-3xl md:text-4xl text-obsidian mb-6">
                  Every Detail Matters
                </h2>
                <p className="font-sans text-lg leading-relaxed text-charcoal mb-8">
                  From the initial fabric selection to the final quality check, every VELARO product goes through a rigorous process. We partner with skilled craftsmen who share our obsession with quality. Each stitch is intentional. Each button is carefully chosen. Each fabric is tested for durability, comfort, and colorfastness.
                </p>
                <Link
                  to="/collection"
                  className="inline-block font-sans font-medium text-obsidian hover:text-warmgray transition-colors hover:underline underline-offset-4"
                >
                  Explore Our Collection &rarr;
                </Link>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/about-craft.jpg"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-charcoal py-16 md:py-20">
        <div className="container-velaro max-w-[600px] text-center">
          <h2 className="font-serif font-medium text-3xl text-ivory mb-4">
            Experience the VELARO Difference
          </h2>
          <p className="font-sans text-lg text-ivory/70 mb-8">
            Browse our collection and discover why thousands of men across Bangladesh choose VELARO.
          </p>
          <Link to="/collection" className="btn-primary-light mb-4 inline-block">
            Shop Now
          </Link>
          <div className="mt-4">
            <Link to="/contact" className="font-sans text-base text-ivory hover:underline underline-offset-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
