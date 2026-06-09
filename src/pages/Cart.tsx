import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/stores/useCart';
import { useToast } from '@/stores/useToast';
import SectionReveal from '@/components/SectionReveal';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const { add: addToast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const total = subtotal();
  const discount = couponApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount;

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setCouponApplied(true);
      setCouponError('');
      addToast('Coupon applied: 10% off', 'success');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-[80vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <ShoppingBag size={64} strokeWidth={1} className="text-warmgray mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-obsidian mb-2">Your cart is empty</h2>
          <p className="text-warmgray mb-6">Looks like you haven&apos;t added anything yet.</p>
          <Link to="/collection" className="btn-primary-dark text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="container-velaro">
        <SectionReveal>
          <h1 className="font-serif font-medium text-3xl md:text-[44px] text-obsidian mb-2">
            Shopping Cart
          </h1>
          <p className="font-sans text-base text-warmgray mb-10">
            {items.reduce((s, i) => s + i.quantity, 0)} items
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((item) => {
                const price = item.product.discountPrice || item.product.price;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 md:gap-6 py-6 border-b border-light"
                  >
                    <Link to={`/product/${item.product.slug}`} className="w-24 md:w-[120px] h-32 md:h-[160px] flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-sans font-medium text-base md:text-lg text-obsidian hover:underline truncate block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-warmgray mt-1">
                        {item.color && `Color: ${item.color}`}
                        {item.size && item.color ? ' / ' : ''}
                        {item.size && `Size: ${item.size}`}
                      </p>
                      <p className="font-sans font-bold text-base mt-2">
                        ৳{price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-light">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            removeItem(item.id);
                            addToast('Item removed from cart', 'info');
                          }}
                          className="text-warmgray hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <button
              onClick={() => {
                clearCart();
                addToast('Cart cleared', 'info');
              }}
              className="text-sm text-warmgray hover:text-obsidian transition-colors mt-6"
            >
              Clear all items
            </button>
          </div>

          {/* Order Summary */}
          <SectionReveal delay={0.2}>
            <div className="lg:sticky lg:top-28 border border-light p-6 md:p-8">
              <h3 className="font-serif font-medium text-2xl text-obsidian mb-6">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-sans text-base text-charcoal">Subtotal</span>
                  <span className="font-sans font-medium text-base">৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-base text-charcoal">Shipping</span>
                  <span className="font-sans text-sm text-warmgray">Calculated at checkout</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between">
                    <span className="font-sans text-base text-charcoal">Discount (WELCOME10)</span>
                    <span className="font-sans font-medium text-base text-emerald-600">
                      -৳{discount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="h-px bg-light my-5" />

              <div className="flex justify-between mb-8">
                <span className="font-sans font-bold text-lg">Total</span>
                <span className="font-sans font-bold text-2xl">৳{finalTotal.toLocaleString()}</span>
              </div>

              <Link
                to="/checkout"
                className="btn-primary-dark w-full block text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/collection"
                className="block text-center text-sm text-obsidian mt-4 hover:underline underline-offset-4"
              >
                &larr; Continue Shopping
              </Link>

              {/* Coupon */}
              <div className="mt-8 pt-6 border-t border-light">
                <p className="text-sm text-warmgray mb-3">Have a coupon?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value); setCouponError(''); }}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-light bg-transparent font-sans text-sm focus:outline-none focus:border-obsidian"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 border border-obsidian text-sm font-sans font-medium hover:bg-obsidian hover:text-ivory transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-sm text-emerald-600 mt-2">10% discount applied</p>
                )}
                {couponError && (
                  <p className="text-sm text-red-500 mt-2">{couponError}</p>
                )}
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
