import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistState {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find(i => i.id === product.id);
        if (exists) {
          set({ items: get().items.filter(i => i.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      remove: (productId) => set({ items: get().items.filter(i => i.id !== productId) }),
      isInWishlist: (productId) => get().items.some(i => i.id === productId),
    }),
    { name: 'velaro-wishlist' }
  )
);
