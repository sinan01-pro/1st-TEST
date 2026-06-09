import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import SectionReveal, { StaggerContainer, StaggerItem } from '@/components/SectionReveal';
import { getNewArrivals } from '@/data/products';

const newProducts = getNewArrivals(4);

export default function NewArrivalsProducts() {
  return (
    <section className="bg-obsidian section-padding">
      <div className="container-velaro">
        <SectionReveal>
          <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-warmgray mb-3">
            NEW IN
          </p>
          <h2 className="font-serif font-medium text-3xl md:text-[44px] text-ivory mb-12 md:mb-16">
            New Arrivals
          </h2>
        </SectionReveal>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
          {newProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} dark />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <SectionReveal className="text-center mt-10" delay={0.4}>
          <Link
            to="/collection?sort=newest"
            className="inline-block font-sans text-ivory hover:text-warmgray transition-colors text-base hover:underline underline-offset-4"
          >
            View All New Arrivals &rarr;
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
