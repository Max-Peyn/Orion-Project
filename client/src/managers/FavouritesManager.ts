import { useFavouritesStore } from '../stores/favouritesStore';
import { useAuthStore } from '../stores/authStore';
import type { FavouriteModel, ModelConfiguration } from '../types/managers';

export class FavouritesManager {
  private static instance: FavouritesManager;

  private constructor() {}

  public static getInstance(): FavouritesManager {
    if (!FavouritesManager.instance) {
      FavouritesManager.instance = new FavouritesManager();
    }
    return FavouritesManager.instance;
  }

  public requireAuth(): boolean {
    const authStore = useAuthStore.getState();
    if (!authStore.isAuthenticated) {
      console.warn('Please login to manage favourites');
      return false;
    }
    return true;
  }

  public getFavourites(): FavouriteModel[] {
    if (!this.requireAuth()) return [];
    
    const favouritesStore = useFavouritesStore.getState();
    return favouritesStore.favourites;
  }

  public addFavourite(model: ModelConfiguration): boolean {
    if (!this.requireAuth()) return false;
    
    const favouritesStore = useFavouritesStore.getState();
    return favouritesStore.addFavourite(model);
  }

  public removeFavourite(id: number): boolean {
    if (!this.requireAuth()) return false;
    
    const favouritesStore = useFavouritesStore.getState();
    return favouritesStore.removeFavourite(id);
  }

  public toggleFavourite(model: ModelConfiguration): boolean {
    if (!this.requireAuth()) return false;
    
    const favouritesStore = useFavouritesStore.getState();
    const wheels = model.wheels || 'v1';
    
    if (favouritesStore.isFavourite(model.name, model.color, wheels)) {
      const id = favouritesStore.getFavouriteId(model.name, model.color, wheels);
      if (id !== null) {
        return favouritesStore.removeFavourite(id);
      }
      return false;
    } else {
      return favouritesStore.addFavourite(model);
    }
  }

  public isFavourite(modelName: string, color: string, wheels?: string): boolean {
    if (!this.requireAuth()) return false;
    
    const favouritesStore = useFavouritesStore.getState();
    return favouritesStore.isFavourite(modelName, color, wheels);
  }

  public getFavouriteByName(modelName: string): FavouriteModel | undefined {
    if (!this.requireAuth()) return undefined;
    
    const favouritesStore = useFavouritesStore.getState();
    return favouritesStore.getFavouriteByName(modelName);
  }

  public getMaxFavourites(): number {
    const favouritesStore = useFavouritesStore.getState();
    return favouritesStore.maxFavourites;
  }

  public getFavouritesCount(): number {
    if (!this.requireAuth()) return 0;
    
    const favouritesStore = useFavouritesStore.getState();
    return favouritesStore.favourites.length;
  }

  public canAddMore(): boolean {
    if (!this.requireAuth()) return false;
    
    return this.getFavouritesCount() < this.getMaxFavourites();
  }
}

export const favouritesManager = FavouritesManager.getInstance();