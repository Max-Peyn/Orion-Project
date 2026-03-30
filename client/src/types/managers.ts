import type { User } from '../handlers/loginHandlers';
import type { ModelConfiguration } from './models';

export type { ModelConfiguration };

export interface FavouriteModel {
  id: number;
  name: string;
  color: string;
  wheels: string;
  timestamp: string;
}

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface FavouritesState {
  favourites: FavouriteModel[];
  maxFavourites: number;
}