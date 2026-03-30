import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../utils/authService';
import type { User } from '../handlers/loginHandlers';
import type { AuthState } from '../types/managers';

interface AuthStore extends AuthState {
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null as User | null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user: User) => {
        set({
          currentUser: user,
          isAuthenticated: true,
          isLoading: false
        });
      },

      clearUser: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await authService.getCurrentUser();
          if (response.user) {
            get().setUser(response.user);
          } else {
            get().clearUser();
          }
        } catch {
          get().clearUser();
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
          get().clearUser();
        } catch {
          get().clearUser();
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);