import { create } from 'zustand';
import type { Toast } from '@/types';

interface ToastState {
  toasts: Toast[];
  add: (message: string, type?: 'success' | 'error' | 'info') => void;
  remove: (id: string) => void;
}

export const useToast = create<ToastState>((set, get) => ({
  toasts: [],
  add: (message, type = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toasts = [...get().toasts, { id, message, type }].slice(-3);
    set({ toasts });
    setTimeout(() => {
      set({ toasts: get().toasts.filter(t => t.id !== id) });
    }, 4000);
  },
  remove: (id) => set({ toasts: get().toasts.filter(t => t.id !== id) }),
}));
