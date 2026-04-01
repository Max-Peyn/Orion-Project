import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useAuth, useConfiguration } from '../hooks';
import { Canvas3D } from './Canvas3D';
import { UIHeader } from './UIHeader';
import { ControlsPanel } from './ControlsPanel';
import { ModalsSection } from './ModalsSection';
import { SprinterModel } from '../three/models/Sprinter';
import { PickupModel } from '../three/models/Pickup';
import { WheelsV1Model } from '../three/models/WheelsV1';
import { WheelsV2Model } from '../three/models/WheelsV2';
import { TentModel } from '../three/models/Tent';
import { RoofRackModel } from '../three/models/RoofRack';
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

  const modelsRef = useRef({
    sprinter: null as THREE.Group | null,
    pickup: null as THREE.Group | null,
    wheels: null as THREE.Object3D[] | null,
    tent: null as THREE.Group | null,
    roofRack: null as THREE.Group | null
  });

  const modelLoadersRef = useRef({
    sprinter: new SprinterModel(),
    pickup: new PickupModel(),
    wheelsV1: new WheelsV1Model(),
    wheelsV2: new WheelsV2Model(),
    tent: new TentModel(),
    roofRack: new RoofRackModel()
  });

  const loadSprinterModel = async () => {
    if (!sceneRef.current?.scene) return;

    // Remove existing Sprinter if any
    if (modelsRef.current.sprinter) {
      sceneRef.current.scene.remove(modelsRef.current.sprinter);
      modelsRef.current.sprinter = null;
    }

    try {
      const model = await modelLoadersRef.current.sprinter.load(
        sceneRef.current.scene,
        undefined,
        !activeWheels // Hide built-in wheels if custom wheels are active
      );
      modelsRef.current.sprinter = model;
    } catch (error) {
      console.error('Error loading Sprinter model:', error);
    }
  };

  const loadPickupModel = async () => {
    if (!sceneRef.current?.scene) return;

    // Remove existing Pickup if any
    if (modelsRef.current.pickup) {
      sceneRef.current.scene.remove(modelsRef.current.pickup);
      modelsRef.current.pickup = null;
    }

    try {
      const model = await modelLoadersRef.current.pickup.load(
        sceneRef.current.scene,
        undefined,
        !activeWheels // Hide built-in wheels if custom wheels are active
      );
      modelsRef.current.pickup = model;
    } catch (error) {
      console.error('Error loading Pickup model:', error);
    }
  };

  useEffect(() => {
    if (!sceneRef.current?.scene) return;

    // Remove all models first
    if (modelsRef.current.sprinter) {
      sceneRef.current.scene.remove(modelsRef.current.sprinter);
      modelsRef.current.sprinter = null;
    }
    if (modelsRef.current.pickup) {
      sceneRef.current.scene.remove(modelsRef.current.pickup);
      modelsRef.current.pickup = null;
    }

    // Load only the current vehicle
    if (currentVehicle === 'sprinter') {
      loadSprinterModel();
    } else if (currentVehicle === 'pickup') {
      loadPickupModel();
    }
  }, [currentVehicle]);

  useEffect(() => {
    if (currentVehicle === 'sprinter' && modelsRef.current.sprinter) {
      modelLoadersRef.current.sprinter.setColor(modelsRef.current.sprinter, vehicleColor);
    } else if (currentVehicle === 'pickup' && modelsRef.current.pickup) {
      modelLoadersRef.current.pickup.setColor(modelsRef.current.pickup, vehicleColor);
    }
  }, [vehicleColor, currentVehicle]);

  useEffect(() => {
    if (!sceneRef.current?.scene) return;

    if (controlsVisible.camping) {
      if (!modelsRef.current.tent) {
        modelLoadersRef.current.tent.load(sceneRef.current.scene).then(model => {
          modelsRef.current.tent = model;
        }).catch(error => console.error('Error loading tent:', error));
      } else {
        modelsRef.current.tent.visible = true;
      }
    } else if (modelsRef.current.tent) {
      modelsRef.current.tent.visible = false;
    }

    if (controlsVisible.roof) {
      if (!modelsRef.current.roofRack) {
        modelLoadersRef.current.roofRack.load(sceneRef.current.scene).then(model => {
          modelsRef.current.roofRack = model;
        }).catch(error => console.error('Error loading roof rack:', error));
      } else {
        modelsRef.current.roofRack.visible = true;
      }
    } else if (modelsRef.current.roofRack) {
      modelsRef.current.roofRack.visible = false;
    }
  }, [controlsVisible]);

  useEffect(() => {
    if (!sceneRef.current?.scene || !currentVehicle) return;

    if (modelsRef.current.wheels) {
      modelsRef.current.wheels.forEach(wheel => {
        wheel.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose());
            } else if (child.material) {
              child.material.dispose();
            }
          }
        });
        sceneRef.current!.scene.remove(wheel);
      });
      modelsRef.current.wheels = null;
    }

    if (activeWheels) {
      const wheelsLoader = activeWheels === 'v1' ? modelLoadersRef.current.wheelsV1 : modelLoadersRef.current.wheelsV2;
      const isPickup = currentVehicle === 'pickup';

      wheelsLoader.load(sceneRef.current.scene, isPickup).then(wheels => {
        modelsRef.current.wheels = wheels;
      }).catch(error => console.error(`Error loading wheels ${activeWheels}:`, error));
    }
  }, [activeWheels, currentVehicle]);

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