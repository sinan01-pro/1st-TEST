import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const mockUsers: { email: string; password: string; user: User }[] = [];

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (email, password) => {
        const found = mockUsers.find(u => u.email === email && u.password === password);
        if (found) {
          set({ user: found.user });
          return true;
        }
        // Also check localStorage for registered users
        const stored = localStorage.getItem('velaro-users');
        if (stored) {
          const users = JSON.parse(stored) as { email: string; password: string; user: User }[];
          const match = users.find(u => u.email === email && u.password === password);
          if (match) {
            set({ user: match.user });
            return true;
          }
        }
        return false;
      },
      register: (name, email, phone, password) => {
        const stored = localStorage.getItem('velaro-users');
        const users = stored ? JSON.parse(stored) : [];
        if (users.some((u: { email: string }) => u.email === email)) return false;
        const user: User = { name, email, phone, token: `token-${Date.now()}` };
        users.push({ email, password, user });
        localStorage.setItem('velaro-users', JSON.stringify(users));
        set({ user });
        return true;
      },
      logout: () => set({ user: null }),
      isAuthenticated: () => !!get().user,
    }),
    { name: 'velaro-auth' }
  )
);
