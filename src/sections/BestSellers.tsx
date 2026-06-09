import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import SectionReveal from '@/components/SectionReveal';
import { getBestsellers } from '@/data/products';

const bestsellers = getBestsellers(8);

export default function BestSellers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="bg-ivory section-padding">
      <div className="container-velaro">
        <SectionReveal>
          <div className="flex items-center justify-between mb-10 md:mb-16">
            <h2 className="font-serif font-medium text-3xl md:text-[44px] text-obsidian">
              Best Sellers
            </h2>
            <div className="flex items-center gap-2">
              <Link
                to="/collection?sort=bestsellers"
                className="hidden md:inline-block font-sans text-sm text-obsidian hover:text-warmgray transition-colors hover:underline underline-offset-4 mr-4"
              >
                View All &rarr;
              </Link>
              <button
                onClick={scrollPrev}
                disabled={!canPrev}
                className="w-10 h-10 md:w-12 md:h-12 border border-light flex items-center justify-center disabled:opacity-30 hover:bg-obsidian hover:text-ivory hover:border-obsidian transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canNext}
                className="w-10 h-10 md:w-12 md:h-12 border border-light flex items-center justify-center disabled:opacity-30 hover:bg-obsidian hover:text-ivory hover:border-obsidian transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </SectionReveal>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 md:gap-6">
            {bestsellers.map((product) => (
              <div
                key={product.id}
                className="flex-none w-[200px] md:w-[280px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
