import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import StarRating from '@/components/StarRating';
import SectionReveal from '@/components/SectionReveal';
import { testimonials } from '@/data/reviews';

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1, containScroll: 'trimSnaps' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
  }, [emblaApi]);

  const pages = Math.ceil(testimonials.length / 3);

  return (
    <section className="bg-obsidian section-padding">
      <div className="container-velaro">
        <SectionReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-warmgray mb-3">
              TESTIMONIALS
            </p>
            <h2 className="font-serif font-medium text-3xl md:text-[44px] text-ivory">
              What Our Customers Say
            </h2>
          </div>
        </SectionReveal>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-10 h-10 border border-dark flex items-center justify-center text-ivory hover:bg-ivory/10 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-10 h-10 border border-dark flex items-center justify-center text-ivory hover:bg-ivory/10 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          <div ref={emblaRef} className="overflow-hidden mx-8 md:mx-12">
            <div className="flex gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="bg-charcoal p-8 md:p-10 h-full">
                    <StarRating rating={t.rating} size={16} />
                    <p className="font-serif text-lg md:text-xl leading-relaxed text-ivory italic mt-4">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-6">
                      <p className="font-sans font-medium text-base text-ivory">{t.name}</p>
                      <p className="text-sm text-warmgray">{t.location}</p>
                      {t.verified && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 mt-1">
                          <CheckCircle size={12} /> Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i * 3)}
              className={`w-2 h-2 rounded-full transition-colors ${
                selected === i ? 'bg-ivory' : 'bg-ivory/30'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
