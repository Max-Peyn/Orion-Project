import React from 'react';
import { AuthModal } from './modals/AuthModal';
import { BrochuresModal } from './BrochuresModal';
import { FavouritesModal } from './FavouritesModal';
import type { FavouriteModel } from '../types/managers';

interface ModalsSectionProps {
  authModalOpen: boolean;
  authModalPage: 'login' | 'register';
  brochuresOpen: boolean;
  favouritesOpen: boolean;
  onAuthClose: () => void;
  onAuthSuccess: () => void;
  onBrochuresClose: () => void;
  onFavouritesClose: () => void;
  onFavouriteSelect: (favourite: FavouriteModel) => void;
}

export const ModalsSection: React.FC<ModalsSectionProps> = ({
  authModalOpen,
  authModalPage,
  brochuresOpen,
  favouritesOpen,
  onAuthClose,
  onAuthSuccess,
  onBrochuresClose,
  onFavouritesClose,
  onFavouriteSelect,
}) => {
  return (
    <>
      <AuthModal
        isOpen={authModalOpen}
        onClose={onAuthClose}
        initialPage={authModalPage}
        onAuthSuccess={onAuthSuccess}
      />

      <BrochuresModal
        isOpen={brochuresOpen}
        onClose={onBrochuresClose}
      />

      <FavouritesModal
        isOpen={favouritesOpen}
        onClose={onFavouritesClose}
        onSelectFavourite={onFavouriteSelect}
      />
    </>
  );
};
