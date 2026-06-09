import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '@/types';
import { useWishlist } from '@/stores/useWishlist';
import { useCart } from '@/stores/useCart';
import { useToast } from '@/stores/useToast';

interface ProductCardProps {
  product: Product;
  dark?: boolean;
}

export default function ProductCard({ product, dark = false }: ProductCardProps) {
  const { isInWishlist, toggle } = useWishlist();
  const { addItem } = useCart();
  const { add: addToast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const textColor = dark ? 'text-ivory' : 'text-obsidian';
  const subTextColor = dark ? 'text-warmgray' : 'text-warmgray';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes.length > 0 ? product.sizes[0] : 'One Size';
    const color = product.colors[0]?.name || '';
    addItem(product, size, color, 1);
    addToast(`${product.name} added to cart`, 'success');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info');
  };

  const price = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;

  return (
    <div className="group cursor-pointer">
      <Link to={`/product/${product.slug}`}>
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-charcoal/5">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
            loading="lazy"
          />

          {/* Quick add button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-0 left-0 right-0 bg-ivory text-obsidian py-3 text-sm font-medium uppercase tracking-wider
              translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center"
          >
            Add to Cart
          </button>

          {/* Wishlist heart */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-ivory/90
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-ivory"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={inWishlist ? 'fill-red-500 text-red-500' : 'text-obsidian'}
            />
          </button>

          {/* Badge */}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-obsidian text-ivory text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
              New
            </span>
          )}
          {hasDiscount && !product.isNew && (
            <span className="absolute top-3 left-3 bg-obsidian text-ivory text-[10px] uppercase tracking-wider px-2 py-1 font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="mt-3">
          <p className={`text-xs ${subTextColor} uppercase tracking-wider`}>{product.category}</p>
          <h3 className={`font-sans font-medium text-base mt-0.5 ${textColor} group-hover:underline underline-offset-2`}>
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {hasDiscount && (
              <span className={`text-sm line-through ${subTextColor}`}>
                ৳{product.price.toLocaleString()}
              </span>
            )}
            <span className={`font-sans font-bold text-base ${textColor}`}>
              ৳{price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
