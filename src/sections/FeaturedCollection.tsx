import { Link } from 'react-router-dom';
import SectionReveal, { StaggerContainer, StaggerItem } from '@/components/SectionReveal';

const categories = [
  { name: 'Oversized Tees', count: 12, image: '/images/cat-oversized.jpg', slug: 'oversized-tees' },
  { name: 'Premium Shirts', count: 8, image: '/images/cat-shirts.jpg', slug: 'shirts' },
  { name: 'Bottom Wear', count: 10, image: '/images/cat-bottoms.jpg', slug: 'cargo-pants' },
  { name: 'Accessories', count: 6, image: '/images/cat-accessories.jpg', slug: 'watches' },
];

export default function FeaturedCollection() {
  return (
    <section className="bg-ivory section-padding">
      <div className="container-velaro">
        <SectionReveal>
          <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-warmgray mb-3">
            CURATED FOR YOU
          </p>
          <h2 className="font-serif font-medium text-3xl md:text-[44px] text-obsidian mb-12 md:mb-16">
            Featured Collection
          </h2>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.15}>
          {categories.map((cat) => (
            <StaggerItem key={cat.name}>
              <Link to={`/collection?category=${cat.slug}`} className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-charcoal/5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-sans font-medium text-base md:text-lg text-obsidian mt-3 group-hover:underline underline-offset-4">
                  {cat.name}
                </h3>
                <p className="text-xs text-warmgray mt-0.5">{cat.count} Products</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
