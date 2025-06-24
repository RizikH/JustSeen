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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        credentials: 'include',
      });

      if (res.status === 403) {
        await new Promise((res) => setTimeout(res, 200));
        const retryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
          credentials: 'include',
        });

        if (!retryRes.ok) throw new Error('Still not authenticated');
        const retryData = await retryRes.json();
        set({ user: retryData, loading: false, isAuthenticated: true, error: null });
        return;
      }

      if (!res.ok) throw new Error('Not authenticated');
      const data = await res.json();
      set({ user: data, loading: false, isAuthenticated: true, error: null });

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      set({ user: null, loading: false, isAuthenticated: false, error: message });
    }
  },


  logout: () => {
    set({ user: null, isAuthenticated: false, error: null });
  },
}));