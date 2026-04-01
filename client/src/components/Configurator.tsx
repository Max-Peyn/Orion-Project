import React, { useRef } from 'react';
import { useAuth, useConfiguration } from '../hooks';
import { useVehicleModels } from '../hooks/useVehicleModels';
import { useModalsState } from '../hooks/useModalsState';
import { useControlsState } from '../hooks/useControlsState';
import { Canvas3D } from './Canvas3D';
import { UIHeader } from './UIHeader';
import { ControlsPanel } from './ControlsPanel';
import { ModalsSection } from './ModalsSection';
import type { FavouriteModel } from '../types/managers';

export const Configurator: React.FC = () => {
  const sceneRef = useRef<any>(null);
  const { user } = useAuth();
  const { 
    currentVehicle, 
    activeWheels, 
    vehicleColor, 
    switchVehicle, 
    switchWheels, 
    setVehicleColor,
    toggleAccessory 
  } = useConfiguration();

  const modalsState = useModalsState();
  const controlsState = useControlsState();

  const { modelLoadersRef, modelsRef } = useVehicleModels({
    sceneRef,
    currentVehicle,
    activeWheels,
    vehicleColor,
    controlsVisible: controlsState.controlsVisible,
  });

  const handleColorChange = (color: string) => {
    setVehicleColor(color);

    if (currentVehicle === 'sprinter' && modelsRef.current.sprinter) {
      modelLoadersRef.current.sprinter.setColor(modelsRef.current.sprinter, color);
    } else if (currentVehicle === 'pickup' && modelsRef.current.pickup) {
      modelLoadersRef.current.pickup.setColor(modelsRef.current.pickup, color);
    }
  };

  const handleVehicleSwitch = (direction: 'left' | 'right') => {
    const newVehicle = direction === 'right' ? 'pickup' : 'sprinter';
    switchVehicle(newVehicle);
  };

  const handleWheelsChange = (wheelsType: 'v1' | 'v2' | null) => {
    switchWheels(wheelsType);
  };

  const handleFavouriteSelect = (favourite: FavouriteModel) => {
    if (favourite.name !== currentVehicle) {
      switchVehicle(favourite.name as 'pickup' | 'sprinter');
    }
    handleColorChange(favourite.color);
    if (favourite.wheels && favourite.wheels !== 'standard') {
      switchWheels(favourite.wheels as 'v1' | 'v2');
    }
  };

  const handleCategorySelect = (category: string) => {
    controlsState.handleCategorySelect(category, currentVehicle, toggleAccessory);
  };

  return (
    <div className="configurator">
      <Canvas3D onSceneReady={(ref) => { sceneRef.current = ref.current; }} />

      {currentVehicle && (
        <>
          <UIHeader
            user={user}
            currentVehicle={currentVehicle}
            vehicleColor={vehicleColor}
            activeWheels={activeWheels}
            onAuthClick={modalsState.openAuthModal}
            onBrochuresClick={modalsState.openBrochures}
            onFavouritesClick={modalsState.openFavourites}
            onNavigate={handleVehicleSwitch}
          />

          <ControlsPanel
            currentVehicle={currentVehicle}
            controlsVisible={controlsState.controlsVisible}
            onCategorySelect={handleCategorySelect}
            onColorChange={handleColorChange}
            onWheelsChange={handleWheelsChange}
          />
        </>
      )}

      <ModalsSection
        authModalOpen={modalsState.authModalOpen}
        authModalPage={modalsState.authModalPage}
        brochuresOpen={modalsState.brochuresOpen}
        favouritesOpen={modalsState.favouritesOpen}
        onAuthClose={modalsState.closeAuthModal}
        onAuthSuccess={modalsState.closeAuthModal}
        onBrochuresClose={modalsState.closeBrochures}
        onFavouritesClose={modalsState.closeFavourites}
        onFavouriteSelect={handleFavouriteSelect}
      />
    </div>
  );
};
