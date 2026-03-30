import { useCallback } from 'react';
import type { FavouriteModel } from '../../../types/managers';

export interface FavouriteValidationError {
  field: keyof FavouriteModel;
  message: string;
}

export const useFavouritesValidation = () => {
  const validateFavourite = useCallback((favourite: Omit<FavouriteModel, 'id' | 'timestamp'>): FavouriteValidationError[] => {
    const errors: FavouriteValidationError[] = [];


    if (!favourite.name || favourite.name.trim().length === 0) {
      errors.push({
        field: 'name',
        message: 'Configuration name is required',
      });
    } else if (favourite.name.trim().length < 3) {
      errors.push({
        field: 'name',
        message: 'Configuration name must be at least 3 characters long',
      });
    } else if (favourite.name.trim().length > 50) {
      errors.push({
        field: 'name',
        message: 'Configuration name must be less than 50 characters',
      });
    }

    // Validate color
    if (!favourite.color || favourite.color.trim().length === 0) {
      errors.push({
        field: 'color',
        message: 'Color selection is required',
      });
    }

    // Validate vehicle type
    if (!favourite.name || !['sprinter', 'pickup', 'Sprinter', 'PickUp'].includes(favourite.name)) {
      // Note: Using name field to determine vehicle type based on existing structure
      if (!favourite.name || (!favourite.name.toLowerCase().includes('sprinter') && !favourite.name.toLowerCase().includes('pickup'))) {
        errors.push({
          field: 'name',
          message: 'Invalid vehicle type in configuration name',
        });
      }
    }

    return errors;
  }, []);

  const isValidFavourite = useCallback((favourite: Omit<FavouriteModel, 'id' | 'timestamp'>): boolean => {
    return validateFavourite(favourite).length === 0;
  }, [validateFavourite]);

  const getValidationMessage = useCallback((errors: FavouriteValidationError[]): string => {
    if (errors.length === 0) return '';
    return errors.map(error => error.message).join(', ');
  }, []);

  return {
    validateFavourite,
    isValidFavourite,
    getValidationMessage,
  };
};