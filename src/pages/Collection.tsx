import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import SectionReveal, { StaggerContainer, StaggerItem } from '@/components/SectionReveal';

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'featured';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categorySlug === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
      case 'bestsellers':
        result = result.filter(p => p.bestseller).concat(result.filter(p => !p.bestseller));
        break;
      case 'price-low':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === 'all') params.delete('category');
    else params.set('category', slug);
    setSearchParams(params);
  };

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === 'featured') params.delete('sort');
    else params.set('sort', value);
    setSearchParams(params);
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-ivory pt-28 md:pt-32 pb-10 md:pb-16">
        <div className="container-velaro">
          <SectionReveal>
            <h1 className="font-serif font-medium text-4xl md:text-[56px] text-obsidian mb-3">
              Collection
            </h1>
            <p className="font-sans text-lg text-warmgray mb-5">
              Discover our curated range of premium menswear and accessories
            </p>
            <div className="text-sm text-warmgray">
              <Link to="/" className="text-obsidian hover:underline underline-offset-4">Home</Link>
              <span className="mx-2">/</span>
              <span>Collection</span>
            </div>
          </SectionReveal>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 md:top-20 z-40 bg-ivory border-b border-light">
        <div className="container-velaro py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Category pills - scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setCategory(cat.slug)}
                  className={`px-4 py-2 text-sm font-sans whitespace-nowrap border transition-colors flex-shrink-0 ${
                    activeCategory === cat.slug
                      ? 'bg-obsidian text-ivory border-obsidian'
                      : 'bg-transparent text-charcoal border-light hover:border-charcoal'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-9 pr-4 py-2 border border-light bg-transparent font-sans text-sm w-52 focus:outline-none focus:border-obsidian transition-colors"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-warmgray" />
                <select
                  value={sortBy}
                  onChange={(e) => setSort(e.target.value)}
                  className="py-2 px-3 border border-light bg-transparent font-sans text-sm focus:outline-none focus:border-obsidian cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="bestsellers">Best Selling</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-3 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 border border-light bg-transparent font-sans text-sm focus:outline-none focus:border-obsidian transition-colors"
            />
          </div>

          <p className="text-sm text-warmgray mt-3">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="bg-ivory pb-20 md:pb-28 pt-8">
        <div className="container-velaro">
          {filteredProducts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-10" staggerDelay={0.08}>
              {filteredProducts.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-20">
              <Search size={48} strokeWidth={1} className="text-warmgray mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-obsidian mb-2">No products found</h3>
              <p className="text-warmgray mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategory('all');
                }}
                className="btn-secondary-outline text-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-obsidian py-12 md:py-16">
        <div className="container-velaro flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-xl md:text-[28px] text-ivory text-center md:text-left">
            Free delivery on orders over ৳2,999 across Bangladesh
          </p>
          <Link to="/collection" className="btn-primary-light text-sm flex-shrink-0">
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
}
