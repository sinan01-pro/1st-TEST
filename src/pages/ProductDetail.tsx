import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Minus, Plus, Heart, Truck, RotateCcw, ShieldCheck, ChevronLeft, ChevronRight, Star, CheckCircle, X } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { getProductReviews } from '@/data/reviews';
import { useCart } from '@/stores/useCart';
import { useWishlist } from '@/stores/useWishlist';
import { useToast } from '@/stores/useToast';
import StarRating from '@/components/StarRating';
import ProductCard from '@/components/ProductCard';
import SectionReveal, { StaggerContainer, StaggerItem } from '@/components/SectionReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addItem } = useCart();
  const { isInWishlist, toggle } = useWishlist();
  const { add: addToast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return <Navigate to="/collection" replace />;

  const reviews = getProductReviews(product.id);
  const relatedProducts = getRelatedProducts(product);
  const price = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;
  const inWishlist = isInWishlist(product.id);

  const images = product.images.length > 0 ? product.images : ['/images/placeholder.jpg'];

  const handleAddToCart = () => {
    const size = selectedSize || (product.sizes.length > 0 ? product.sizes[0] : 'One Size');
    const color = selectedColor || product.colors[0]?.name || '';
    addItem(product, size, color, quantity);
    setAddedToCart(true);
    addToast(`${product.name} added to cart`, 'success');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  const tabs = [
    { key: 'description' as const, label: 'Description' },
    { key: 'specs' as const, label: 'Specifications' },
    { key: 'shipping' as const, label: 'Shipping & Returns' },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-ivory pt-24 md:pt-28 pb-4">
        <div className="container-velaro">
          <div className="text-sm text-warmgray">
            <Link to="/" className="text-obsidian hover:underline underline-offset-4">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/collection" className="text-obsidian hover:underline underline-offset-4">Collection</Link>
            <span className="mx-2">/</span>
            <Link to={`/collection?category=${product.categorySlug}`} className="text-obsidian hover:underline underline-offset-4">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <div className="bg-ivory pb-16 md:pb-20">
        <div className="container-velaro">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <SectionReveal>
              <div>
                <div
                  className="aspect-[3/4] bg-charcoal/5 overflow-hidden cursor-zoom-in relative"
                  onClick={() => setLightboxOpen(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={images[selectedImage]}
                      alt={product.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
                {images.length > 1 && (
                  <div className="flex gap-3 mt-4">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-16 h-16 md:w-20 md:h-20 border-2 overflow-hidden flex-shrink-0 transition-colors ${
                          selectedImage === i ? 'border-obsidian' : 'border-transparent hover:border-warmgray'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </SectionReveal>

            {/* Product Info */}
            <SectionReveal delay={0.1}>
              <div className="lg:pt-4">
                <Link
                  to={`/collection?category=${product.categorySlug}`}
                  className="text-sm text-warmgray hover:text-obsidian transition-colors"
                >
                  {product.category}
                </Link>
                <h1 className="font-serif font-medium text-3xl md:text-4xl text-obsidian mt-2">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-3 mt-4">
                  {hasDiscount && (
                    <>
                      <span className="text-lg text-warmgray line-through">
                        ৳{product.price.toLocaleString()}
                      </span>
                      <span className="bg-obsidian text-ivory text-xs px-2 py-1 font-medium">
                        Save ৳{(product.price - product.discountPrice!).toLocaleString()}
                      </span>
                    </>
                  )}
                  <span className="font-sans font-bold text-2xl md:text-[28px] text-obsidian">
                    ৳{price.toLocaleString()}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <StarRating rating={Math.round(product.rating)} size={14} />
                  <span className="text-sm text-warmgray">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <p className="font-sans text-base leading-relaxed text-charcoal mt-6">
                  {product.shortDescription}
                </p>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-6">
                    <p className="font-sans font-medium text-sm text-obsidian mb-3">
                      Color: <span className="font-normal">{selectedColor || product.colors[0].name}</span>
                    </p>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            (selectedColor || product.colors[0].name) === color.name
                              ? 'border-obsidian ring-2 ring-obsidian/30'
                              : 'border-transparent hover:border-warmgray'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-sans font-medium text-sm text-obsidian">
                        Size: <span className="font-normal">{selectedSize || 'Select'}</span>
                      </p>
                      <button className="text-sm text-warmgray hover:text-obsidian transition-colors">
                        Size Guide &rarr;
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[48px] h-10 px-3 border text-sm font-sans font-medium transition-colors ${
                            selectedSize === size
                              ? 'bg-obsidian text-ivory border-obsidian'
                              : 'bg-transparent text-obsidian border-light hover:border-charcoal'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-6">
                  <p className="font-sans font-medium text-sm text-obsidian mb-3">Quantity</p>
                  <div className="flex items-center border border-light w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 h-10 flex items-center justify-center font-sans font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`w-full py-4 font-sans font-medium text-base uppercase tracking-widest transition-all duration-300 ${
                      product.stock <= 0
                        ? 'bg-warmgray text-ivory cursor-not-allowed'
                        : addedToCart
                        ? 'bg-emerald-600 text-ivory'
                        : 'bg-obsidian text-ivory hover:bg-charcoal hover:scale-[1.01]'
                    }`}
                  >
                    {product.stock <= 0 ? 'Out of Stock' : addedToCart ? 'Added ✓' : 'Add to Cart'}
                  </button>

                  <button
                    onClick={() => {
                      toggle(product);
                      addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info');
                    }}
                    className="w-full py-3.5 font-sans font-medium text-base uppercase tracking-widest border border-obsidian text-obsidian hover:bg-obsidian hover:text-ivory transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Heart size={16} className={inWishlist ? 'fill-red-500 text-red-500' : ''} />
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-8 border-t border-light grid grid-cols-2 gap-4">
                  {[
                    { icon: Truck, text: 'Free Shipping over ৳2,999' },
                    { icon: RotateCcw, text: '7-Day Returns' },
                    { icon: ShieldCheck, text: 'Authentic Products' },
                    { icon: CheckCircle, text: 'Cash on Delivery' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2">
                      <Icon size={18} strokeWidth={1.5} className="text-obsidian flex-shrink-0" />
                      <span className="text-xs text-warmgray">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-ivory pb-16 md:pb-20">
        <div className="container-velaro">
          {/* Tab Navigation */}
          <div className="flex border-b border-light mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 font-sans font-medium text-base transition-colors relative ${
                  activeTab === tab.key ? 'text-obsidian' : 'text-warmgray hover:text-obsidian'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="product-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-obsidian"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'description' && (
                <div className="max-w-2xl">
                  <p className="font-sans text-base leading-relaxed text-charcoal">
                    {product.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    <li className="flex items-start gap-2 text-charcoal">
                      <span className="text-obsidian mt-1">&bull;</span>
                      Premium quality materials sourced ethically
                    </li>
                    <li className="flex items-start gap-2 text-charcoal">
                      <span className="text-obsidian mt-1">&bull;</span>
                      Designed for the modern Bangladeshi gentleman
                    </li>
                    <li className="flex items-start gap-2 text-charcoal">
                      <span className="text-obsidian mt-1">&bull;</span>
                      Carefully inspected before shipping
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="max-w-xl">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between py-3 border-b border-light"
                    >
                      <span className="font-sans font-medium text-sm text-obsidian">{spec.label}</span>
                      <span className="font-sans text-sm text-charcoal">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="max-w-2xl space-y-4">
                  <p className="font-sans text-base leading-relaxed text-charcoal">
                    We deliver across all 64 districts of Bangladesh. Standard delivery takes 3–5 business days. Express delivery (1–2 business days) is available for select locations.
                  </p>
                  <p className="font-sans text-base leading-relaxed text-charcoal">
                    Cash on Delivery is available nationwide. bKash payment is accepted for faster processing.
                  </p>
                  <p className="font-sans text-base leading-relaxed text-charcoal">
                    <strong>Returns:</strong> You can return unworn items with original tags within 7 days of delivery. Contact our support team to initiate a return.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-ivory pb-16 md:pb-20">
        <div className="container-velaro">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Rating Summary */}
            <SectionReveal>
              <div>
                <h3 className="font-serif font-medium text-3xl text-obsidian mb-6">
                  Customer Reviews
                </h3>
                <div className="text-6xl font-serif font-medium text-obsidian">
                  {product.rating}
                </div>
                <StarRating rating={Math.round(product.rating)} size={18} />
                <p className="text-sm text-warmgray mt-2">
                  Based on {product.reviewCount} reviews
                </p>

                {/* Rating breakdown */}
                <div className="mt-6 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(r => r.rating === star).length;
                    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm w-8">{star} <Star size={10} className="inline fill-gold text-gold" /></span>
                        <div className="flex-1 h-2 bg-charcoal/10 overflow-hidden">
                          <div className="h-full bg-obsidian" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-warmgray w-6">{count}</span>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setReviewFormOpen(true)}
                  className="btn-secondary-outline text-sm mt-8 w-full"
                >
                  Write a Review
                </button>
              </div>
            </SectionReveal>

            {/* Review List */}
            <div className="lg:col-span-2">
              <StaggerContainer className="space-y-0" staggerDelay={0.1}>
                {reviews.map((review) => (
                  <StaggerItem key={review.id}>
                    <div className="py-6 border-b border-light">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <StarRating rating={review.rating} size={14} />
                          <span className="font-sans font-medium text-sm">{review.name}</span>
                        </div>
                        <span className="text-xs text-warmgray">{review.date}</span>
                      </div>
                      <p className="font-sans text-base leading-relaxed text-charcoal mt-2">
                        {review.text}
                      </p>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-2">
                          <CheckCircle size={12} /> Verified Purchase
                        </span>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-ivory pb-20 md:pb-28">
          <div className="container-velaro">
            <SectionReveal>
              <h2 className="font-serif font-medium text-3xl text-obsidian mb-10">
                You May Also Like
              </h2>
            </SectionReveal>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
              {relatedProducts.map((rp) => (
                <StaggerItem key={rp.id}>
                  <ProductCard product={rp} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-ivory hover:text-warmgray transition-colors"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 text-ivory hover:text-warmgray transition-colors"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory hover:text-warmgray transition-colors"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Form Modal */}
      <AnimatePresence>
        {reviewFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
            onClick={() => setReviewFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory p-8 md:p-10 max-w-[600px] w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif font-medium text-2xl">Write a Review</h3>
                <button onClick={() => setReviewFormOpen(false)} aria-label="Close">
                  <X size={20} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block font-sans font-medium text-sm mb-1">Your Rating</label>
                  <StarRating rating={reviewRating} size={24} interactive onChange={setReviewRating} />
                </div>
                <div>
                  <label className="block font-sans font-medium text-sm mb-1">Name</label>
                  <input type="text" required className="w-full px-4 py-3 border border-light bg-transparent font-sans text-sm focus:outline-none focus:border-obsidian" placeholder="Your name" />
                </div>
                <div>
                  <label className="block font-sans font-medium text-sm mb-1">Email</label>
                  <input type="email" required className="w-full px-4 py-3 border border-light bg-transparent font-sans text-sm focus:outline-none focus:border-obsidian" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block font-sans font-medium text-sm mb-1">Review</label>
                  <textarea required rows={4} className="w-full px-4 py-3 border border-light bg-transparent font-sans text-sm focus:outline-none focus:border-obsidian" placeholder="Share your experience..." />
                </div>
                <button type="submit" className="btn-primary-dark w-full">
                  Submit Review
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
