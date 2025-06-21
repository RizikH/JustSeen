import { create } from 'zustand';
import { User } from '@/types/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,

  fetchUser: async () => {
    try {
      const res = await fetch('http://localhost:8080/api/user/me', {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Not authenticated');
      }

      const data = await res.json();
      set({ user: data, loading: false, isAuthenticated: true, error: null });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ user: null, loading: false, isAuthenticated: false, error: err.message });
      } else {
        set({ user: null, loading: false, isAuthenticated: false, error: 'An unknown error occurred.' });
      }
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },
}));