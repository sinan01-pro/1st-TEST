import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useUI } from '@/stores/useUI';
import { products } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchOverlay() {
  const { isSearchOpen, setSearchOpen } = useUI();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-ivory"
        >
          <div className="container-velaro pt-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif font-medium text-xl tracking-[0.15em] uppercase text-obsidian">
                VELARO
              </span>
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative">
              <Search size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-warmgray" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-8 pr-4 py-4 text-2xl font-sans bg-transparent border-b-2 border-obsidian focus:outline-none placeholder:text-warmgray"
              />
            </div>

            <div className="mt-8">
              {query.length <= 1 ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-warmgray mb-4">Popular Categories</p>
                  <div className="flex flex-wrap gap-3">
                    {['Oversized Tees', 'Cargo Pants', 'Watches', 'Shirts', 'Wallets'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setQuery(cat);
                          inputRef.current?.focus();
                        }}
                        className="px-4 py-2 border border-light text-sm hover:bg-obsidian hover:text-ivory transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-wider text-warmgray">
                    {results.length} result{results.length > 1 ? 's' : ''}
                  </p>
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 hover:bg-charcoal/5 transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-20 object-cover"
                      />
                      <div>
                        <p className="font-sans font-medium text-obsidian">{product.name}</p>
                        <p className="text-sm text-warmgray">{product.category}</p>
                        <p className="font-sans font-bold text-sm mt-0.5">
                          ৳{(product.discountPrice || product.price).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-warmgray">No products found for &ldquo;{query}&rdquo;</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
