import { useAuthStore } from '../stores/authStore';
import { useFavouritesStore } from '../stores/favouritesStore';
import type { User } from '../handlers/loginHandlers';

export class AuthManager {
  private static instance: AuthManager;

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public async initialize(): Promise<void> {
    const authStore = useAuthStore.getState();
    await authStore.checkAuth();
    
    const favouritesStore = useFavouritesStore.getState();
    favouritesStore.loadFavourites();
  }

  public async login(user: User): Promise<void> {
    const authStore = useAuthStore.getState();
    authStore.setUser(user);
    
    const favouritesStore = useFavouritesStore.getState();
    favouritesStore.loadFavourites();
  }

  public async logout(): Promise<void> {
    const authStore = useAuthStore.getState();
    const favouritesStore = useFavouritesStore.getState();
    
    favouritesStore.clearFavourites();
    
    await authStore.logout();
  }

  public getCurrentUser(): User | null {
    const authStore = useAuthStore.getState();
    return authStore.currentUser;
  }

  public isAuthenticated(): boolean {
    const authStore = useAuthStore.getState();
    return authStore.isAuthenticated;
  }

  public isLoading(): boolean {
    const authStore = useAuthStore.getState();
    return authStore.isLoading;
  }
}

// Export singleton instance
export const authManager = AuthManager.getInstance();