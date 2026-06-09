import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  toggleCart: () => void;
  toggleSearch: () => void;
  toggleMobileMenu: () => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  isCartOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  setCartOpen: (v) => set({ isCartOpen: v }),
  setSearchOpen: (v) => set({ isSearchOpen: v }),
  setMobileMenuOpen: (v) => set({ isMobileMenuOpen: v }),
}));
