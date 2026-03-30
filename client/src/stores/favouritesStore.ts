import { create } from 'zustand';
import type { FavouriteModel, ModelConfiguration, FavouritesState } from '../types/managers';
import { useAuthStore } from './authStore';

interface FavouritesStore extends FavouritesState {
  loadFavourites: () => void;
  addFavourite: (model: ModelConfiguration) => boolean;
  removeFavourite: (id: number) => boolean;
  isFavourite: (modelName: string, color: string, wheels?: string) => boolean;
  getFavouriteId: (modelName: string, color: string, wheels?: string) => number | null;
  getFavouriteByName: (modelName: string) => FavouriteModel | undefined;
  clearFavourites: () => void;
}

const getStorageKey = (): string | null => {
  const authState = useAuthStore.getState();
  const user = authState.currentUser;
  if (!user || !user.email) return null;
  return `favourites_${user.email}`;
};

const loadFavouritesFromStorage = (): FavouriteModel[] => {
  const key = getStorageKey();
  if (!key) return [];

  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favourites:', error);
    return [];
  }
};

const saveFavouritesToStorage = (favourites: FavouriteModel[]): void => {
  const key = getStorageKey();
  if (!key) return;

  try {
    localStorage.setItem(key, JSON.stringify(favourites));
  } catch (error) {
    console.error('Error saving favourites:', error);
  }
};

export const useFavouritesStore = create<FavouritesStore>()(
  (set, get) => ({
    favourites: [],
    maxFavourites: 5,

    loadFavourites: () => {
      const favourites = loadFavouritesFromStorage();
      set({ favourites });
    },

    addFavourite: (model: ModelConfiguration): boolean => {
      const key = getStorageKey();
      if (!key) {
        console.warn('Please login to add favourites');
        return false;
      }

      const { favourites, maxFavourites } = get();
      const wheels = model.wheels || 'v1';

      const existingIndex = favourites.findIndex(
        f => f.name === model.name && f.color === model.color && f.wheels === wheels
      );

      if (existingIndex !== -1) {
        return false;
      }

      if (favourites.length >= maxFavourites) {
        console.warn(`Maximum ${maxFavourites} favourites allowed`);
        return false;
      }

      const newFavourite: FavouriteModel = {
        id: Date.now(),
        name: model.name,
        color: model.color,
        wheels,
        timestamp: new Date().toISOString()
      };

      const updatedFavourites = [...favourites, newFavourite];
      set({ favourites: updatedFavourites });
      saveFavouritesToStorage(updatedFavourites);

      return true;
    },

    removeFavourite: (id: number): boolean => {
      const key = getStorageKey();
      if (!key) return false;

      const { favourites } = get();
      const updatedFavourites = favourites.filter(f => f.id !== id);

      set({ favourites: updatedFavourites });
      saveFavouritesToStorage(updatedFavourites);

      return true;
    },

    isFavourite: (modelName: string, color: string, wheels: string = 'v1'): boolean => {
      const { favourites } = get();
      return favourites.some(f =>
        f.name === modelName &&
        f.color === color &&
        f.wheels === wheels
      );
    },

    getFavouriteId: (modelName: string, color: string, wheels: string = 'v1'): number | null => {
      const { favourites } = get();
      const favourite = favourites.find(f =>
        f.name === modelName &&
        f.color === color &&
        f.wheels === wheels
      );
      return favourite ? favourite.id : null;
    },

    getFavouriteByName: (modelName: string): FavouriteModel | undefined => {
      const { favourites } = get();
      return favourites.find(f => f.name === modelName);
    },

    clearFavourites: () => {
      set({ favourites: [] });
      const key = getStorageKey();
      if (key) {
        localStorage.removeItem(key);
      }
    }
  })
);