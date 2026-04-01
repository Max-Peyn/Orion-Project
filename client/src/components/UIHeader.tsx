import React from 'react';
import { Navbar } from './Navbar';
import { ModelTitle } from './ui/ModelTitle';
import { NavigationArrows } from './ui/NavigationArrows';
import { BackgroundShadow } from './ui/BackgroundShadow';
import type { User } from '../handlers/loginHandlers';

interface UIHeaderProps {
  user: User | null;
  currentVehicle: 'sprinter' | 'pickup';
  vehicleColor: string;
  activeWheels: 'v1' | 'v2' | null;
  onAuthClick: (type: 'login' | 'register') => void;
  onBrochuresClick: () => void;
  onFavouritesClick: () => void;
  onNavigate: (direction: 'left' | 'right') => void;
}

export const UIHeader: React.FC<UIHeaderProps> = ({
  user,
  currentVehicle,
  vehicleColor,
  activeWheels,
  onAuthClick,
  onBrochuresClick,
  onFavouritesClick,
  onNavigate,
}) => {
  return (
    <>
      <Navbar
        user={user}
        onAuthClick={onAuthClick}
        onBrochuresClick={onBrochuresClick}
        onFavouritesClick={onFavouritesClick}
      />

      <BackgroundShadow />

      <NavigationArrows onNavigate={onNavigate} />

      <ModelTitle
        modelName={currentVehicle === 'pickup' ? 'PickUp' : 'Sprinter'}
        color={vehicleColor}
        wheels={activeWheels || 'standard'}
      />
    </>
  );
};
