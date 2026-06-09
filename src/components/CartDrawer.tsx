import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/stores/useCart';
import { useUI } from '@/stores/useUI';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/stores/useToast';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const { isCartOpen, setCartOpen } = useUI();
  const { add: addToast } = useToast();
  const total = subtotal();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-ivory z-[80] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-light">
              <h2 className="font-serif text-2xl">Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} strokeWidth={1} className="text-warmgray mb-4" />
                  <p className="font-serif text-xl text-obsidian mb-2">Your cart is empty</p>
                  <p className="text-sm text-warmgray mb-6">Looks like you haven't added anything yet.</p>
                  <Link
                    to="/collection"
                    onClick={() => setCartOpen(false)}
                    className="btn-primary-dark text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                                <div className="space-y-4">
                  <AnimatePresence>
                    {items.map((item) => {
                      const price = item.product.discountPrice || item.product.price;
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="flex gap-4 pb-4 border-b border-light"
                        >
                          <Link
                            to={`/product/${item.product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="w-24 h-32 flex-shrink-0"
                          >
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/product/${item.product.slug}`}
                              onClick={() => setCartOpen(false)}
                              className="font-sans font-medium text-sm text-obsidian hover:underline truncate block"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-warmgray mt-0.5">
                              {item.color && `Color: ${item.color}`}
                              {item.size && item.color ? ' / ' : ''}
                              {item.size && `Size: ${item.size}`}
                            </p>
                            <p className="font-sans font-bold text-sm mt-1">
                              ৳{(price * item.quantity).toLocaleString()}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-light">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 h-8 flex items-center justify-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-charcoal hover:text-ivory transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <button
                                onClick={() => {
                                  removeItem(item.id);
                                  addToast('Item removed from cart', 'info');
                                }}
                                className="text-warmgray hover:text-red-500 transition-colors"
                                aria-label="Remove item"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-light">
                <div className="flex justify-between mb-4">
                  <span className="font-sans font-medium">Subtotal</span>
                  <span className="font-sans font-bold">৳{total.toLocaleString()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary-dark w-full block text-center text-sm"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => {
                    clearCart();
                    addToast('Cart cleared', 'info');
                  }}
                  className="w-full text-center text-xs text-warmgray mt-3 hover:text-obsidian transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
