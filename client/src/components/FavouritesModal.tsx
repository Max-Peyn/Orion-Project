import React from 'react';
import { FavouritesPage } from '../pages/FavouritesPage';
import type { FavouriteModel } from '../types/managers';

interface FavouritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFavourite?: (favourite: FavouriteModel) => void;
}

export const FavouritesModal: React.FC<FavouritesModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectFavourite 
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <FavouritesPage 
      isOpen={true}
      onClose={onClose}
      onSelectFavourite={onSelectFavourite}
    />
  );
};