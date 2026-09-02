import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/types';

interface AuthState {
  token: string | null;
  user: User | null;
  isHydrated: boolean;
  setAuth: (token: string, user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false,
      setAuth: (token, user) => set({ token, user }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
      setHydrated: (isHydrated) => set({ isHydrated }),
    }),
    {
      name: 'book-log-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
