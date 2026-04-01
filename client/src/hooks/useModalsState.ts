import { useState } from 'react';

export const useModalsState = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalPage, setAuthModalPage] = useState<'login' | 'register'>('login');
  const [brochuresOpen, setBrochuresOpen] = useState(false);
  const [favouritesOpen, setFavouritesOpen] = useState(false);

  const openAuthModal = (page: 'login' | 'register') => {
    setAuthModalPage(page);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const openBrochures = () => {
    setBrochuresOpen(true);
  };

  const closeBrochures = () => {
    setBrochuresOpen(false);
  };

  const openFavourites = () => {
    setFavouritesOpen(true);
  };

  const closeFavourites = () => {
    setFavouritesOpen(false);
  };

  return {
    authModalOpen,
    authModalPage,
    brochuresOpen,
    favouritesOpen,
    openAuthModal,
    closeAuthModal,
    openBrochures,
    closeBrochures,
    openFavourites,
    closeFavourites,
  };
};
