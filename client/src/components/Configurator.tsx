import React, { useRef, useState } from 'react';
import { useAuth, useConfiguration } from '../hooks';
import { useVehicleModels } from '../hooks/useVehicleModels';
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

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalPage, setAuthModalPage] = useState<'login' | 'register'>('login');
  const [brochuresOpen, setBrochuresOpen] = useState(false);
  const [favouritesOpen, setFavouritesOpen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState({
    wheels: false,
    roof: false,
    camping: false
  });

  const { modelLoadersRef, modelsRef } = useVehicleModels({
    sceneRef,
    currentVehicle,
    activeWheels,
    vehicleColor,
    controlsVisible,
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
    const newControls = { wheels: false, roof: false, camping: false };

    switch (category) {
      case 'wheels':
        newControls.wheels = true;
        break;
      case 'camping':
        if (currentVehicle === 'pickup') {
          newControls.camping = true;
          toggleAccessory('tent');
        } else {
          console.warn('Camping tent is only available for PickUp model!');
          return;
        }
        break;
    }

    setControlsVisible(newControls);
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
            onAuthClick={(type) => {
              setAuthModalPage(type);
              setAuthModalOpen(true);
            }}
            onBrochuresClick={() => setBrochuresOpen(true)}
            onFavouritesClick={() => setFavouritesOpen(true)}
            onNavigate={handleVehicleSwitch}
          />

          <ControlsPanel
            currentVehicle={currentVehicle}
            controlsVisible={controlsVisible}
            onCategorySelect={handleCategorySelect}
            onColorChange={handleColorChange}
            onWheelsChange={handleWheelsChange}
          />
        </>
      )}

      <ModalsSection
        authModalOpen={authModalOpen}
        authModalPage={authModalPage}
        brochuresOpen={brochuresOpen}
        favouritesOpen={favouritesOpen}
        onAuthClose={() => setAuthModalOpen(false)}
        onAuthSuccess={() => setAuthModalOpen(false)}
        onBrochuresClose={() => setBrochuresOpen(false)}
        onFavouritesClose={() => setFavouritesOpen(false)}
        onFavouriteSelect={handleFavouriteSelect}
      />
    </div>
  );
};