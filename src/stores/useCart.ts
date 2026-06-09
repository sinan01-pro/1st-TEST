import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
  getItem: (productId: number, size: string, color: string) => CartItem | undefined;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color, quantity = 1) => {
        const { items } = get();
        const existing = items.find(
          i => i.product.id === product.id && i.size === size && i.color === color
        );
        if (existing) {
          set({
            items: items.map(i =>
              i.id === existing.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({
            items: [...items, { id: `${product.id}-${size}-${color}-${Date.now()}`, product, quantity, size, color }],
          });
        }
      },
      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter(i => i.id !== id) });
        } else {
          set({
            items: get().items.map(i => (i.id === id ? { ...i, quantity } : i)),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => {
        const price = i.product.discountPrice || i.product.price;
        return sum + price * i.quantity;
      }, 0),
      getItem: (productId, size, color) =>
        get().items.find(i => i.product.id === productId && i.size === size && i.color === color),
    }),
    { name: 'velaro-cart' }
  )
);
