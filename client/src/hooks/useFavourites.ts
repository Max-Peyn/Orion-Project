import { useFavouritesStore } from '../stores/favouritesStore';
import { favouritesManager } from '../managers/FavouritesManager';
import type { ModelConfiguration } from '../types/managers';

export const useFavourites = () => {
  const {
    favourites,
    maxFavourites,
    loadFavourites
  } = useFavouritesStore();

  const addFavourite = (model: ModelConfiguration): boolean => {
    return favouritesManager.addFavourite(model);
  };

  const removeFavourite = (id: number): boolean => {
    return favouritesManager.removeFavourite(id);
  };

  const toggleFavourite = (model: ModelConfiguration): boolean => {
    return favouritesManager.toggleFavourite(model);
  };

  const isFavourite = (modelName: string, color: string, wheels?: string): boolean => {
    return favouritesManager.isFavourite(modelName, color, wheels);
  };

  const getFavouriteByName = (modelName: string) => {
    return favouritesManager.getFavouriteByName(modelName);
  };

  const canAddMore = (): boolean => {
    return favouritesManager.canAddMore();
  };

  const getFavouritesCount = (): number => {
    return favouritesManager.getFavouritesCount();
  };

  return {
    favourites,
    maxFavourites,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    isFavourite,
    getFavouriteByName,
    canAddMore,
    getFavouritesCount,
    loadFavourites
  };
};