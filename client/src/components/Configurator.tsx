import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { useThreeScene, useAuth, useConfiguration } from '../hooks';
import { Navbar } from './Navbar';
import { AuthModal } from './modals/AuthModal';
import { ModelTitle } from './ui/ModelTitle';
import { NavigationArrows } from './ui/NavigationArrows';
import { BackgroundShadow } from './ui/BackgroundShadow';
import { ColorSwitcher } from './controls/ColorSwitcher';
import { WheelsSwitcher } from './controls/WheelsSwitcher';
import { FavouritesModal } from './FavouritesModal';
import { BrochuresModal } from './BrochuresModal';
import { SprinterModel } from '../three/models/Sprinter';
import { PickupModel } from '../three/models/Pickup';
import { WheelsV1Model } from '../three/models/WheelsV1';
import { WheelsV2Model } from '../three/models/WheelsV2';
import { TentModel } from '../three/models/Tent';
import { RoofRackModel } from '../three/models/RoofRack';
import { PlaneObject } from '../three/objects/Plane';
import type { FavouriteModel } from '../types/managers';

export const Configurator: React.FC = () => {
  const { canvasRef, sceneRef, isLoaded } = useThreeScene({ enableAnimation: true });
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
    if (!sceneRef.current?.scene || modelsRef.current.sprinter) return;

    try {
      const model = await modelLoadersRef.current.sprinter.load(
        sceneRef.current.scene,
        undefined,
        true
      );
      modelsRef.current.sprinter = model;
    } catch (error) {
      console.error('Error loading Sprinter model:', error);
    }
  };

  const loadPickupModel = async () => {
    if (!sceneRef.current?.scene || modelsRef.current.pickup) return;

    try {
      const model = await modelLoadersRef.current.pickup.load(
        sceneRef.current.scene,
        undefined,
        true
      );
      modelsRef.current.pickup = model;
    } catch (error) {
      console.error('Error loading Pickup model:', error);
    }
  };

  useEffect(() => {
    if (!sceneRef.current?.scene) return;

    if (modelsRef.current.sprinter) {
      modelsRef.current.sprinter.visible = false;
    }
    if (modelsRef.current.pickup) {
      modelsRef.current.pickup.visible = false;
    }

    if (currentVehicle === 'sprinter' && modelsRef.current.sprinter) {
      modelsRef.current.sprinter.visible = true;
    } else if (currentVehicle === 'pickup' && modelsRef.current.pickup) {
      modelsRef.current.pickup.visible = true;
    }
  }, [currentVehicle]);

  useEffect(() => {
    if (!sceneRef.current || !isLoaded) return;

    const loaders = modelLoadersRef.current;

    const plane = PlaneObject.create();
    sceneRef.current.scene.add(plane);

    const loader = new EXRLoader();
    loader.load('/texture/studio_small_08_1k.exr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      sceneRef.current!.scene.environmentIntensity = 0.3;
      sceneRef.current!.scene.environment = texture;
    });

    loadSprinterModel();
    loadPickupModel();

    return () => {
      Object.values(loaders).forEach(loader => {
        if (loader && typeof loader.dispose === 'function') {
          loader.dispose();
        }
      });
    };
  }, [isLoaded]);

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
      <canvas ref={canvasRef} className="three-canvas" />

      <Navbar
        user={user}
        onAuthClick={(type) => {
          setAuthModalPage(type);
          setAuthModalOpen(true);
        }}
        onBrochuresClick={() => setBrochuresOpen(true)}
        onFavouritesClick={() => setFavouritesOpen(true)}
      />

      <BackgroundShadow />

      <NavigationArrows onNavigate={handleVehicleSwitch} />

      <ModelTitle
        modelName={currentVehicle === 'pickup' ? 'PickUp' : 'Sprinter'}
        color={vehicleColor}
        wheels={activeWheels || 'standard'}
      />

      <div className="container">
        <div className="left-panel">
          <button
            className={`left-btn ${controlsVisible.wheels ? 'active' : ''}`}
            onClick={() => handleCategorySelect('wheels')}
          >
            Wheels
          </button>
          {currentVehicle === 'pickup' && (
            <button
              className={`left-btn ${controlsVisible.camping ? 'active' : ''}`}
              onClick={() => handleCategorySelect('camping')}
            >
              Camping
            </button>
          )}
        </div>

        <ColorSwitcher onColorChange={handleColorChange} />
      </div>

      {controlsVisible.wheels && (
        <WheelsSwitcher onWheelsChange={handleWheelsChange} />
      )}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialPage={authModalPage}
        onAuthSuccess={() => setAuthModalOpen(false)}
      />

      <BrochuresModal
        isOpen={brochuresOpen}
        onClose={() => setBrochuresOpen(false)}
      />

      <FavouritesModal
        isOpen={favouritesOpen}
        onClose={() => setFavouritesOpen(false)}
        onSelectFavourite={handleFavouriteSelect}
      />
    </div>
  );
};