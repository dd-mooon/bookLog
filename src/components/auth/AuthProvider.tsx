'use client';

import { useEffect } from 'react';

import { authService } from '@/services/api';
import { useAuthStore } from '@/store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { token, setUser, logout, isHydrated } = useAuthStore();

  useEffect(() => {
    if (!isHydrated || !token) {
      return;
    }

    authService
      .me()
      .then(setUser)
      .catch(() => logout());
  }, [isHydrated, token, setUser, logout]);

  return children;
}
