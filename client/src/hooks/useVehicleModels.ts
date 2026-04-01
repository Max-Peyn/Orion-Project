import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SprinterModel } from '../three/models/Sprinter';
import { PickupModel } from '../three/models/Pickup';
import { WheelsV1Model } from '../three/models/WheelsV1';
import { WheelsV2Model } from '../three/models/WheelsV2';
import { TentModel } from '../three/models/Tent';
import { RoofRackModel } from '../three/models/RoofRack';

interface UseVehicleModelsProps {
  sceneRef: React.MutableRefObject<any>;
  currentVehicle: 'sprinter' | 'pickup' | null;
  activeWheels: 'v1' | 'v2' | null;
  vehicleColor: string;
  controlsVisible: {
    wheels: boolean;
    roof: boolean;
    camping: boolean;
  };
}

export const useVehicleModels = ({
  sceneRef,
  currentVehicle,
  activeWheels,
  vehicleColor,
  controlsVisible,
}: UseVehicleModelsProps) => {
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

    if (modelsRef.current.sprinter) {
      sceneRef.current.scene.remove(modelsRef.current.sprinter);
      modelsRef.current.sprinter = null;
    }

    try {
      const model = await modelLoadersRef.current.sprinter.load(
        sceneRef.current.scene,
        undefined,
        !activeWheels
      );
      modelsRef.current.sprinter = model;
    } catch (error) {
      console.error('Error loading Sprinter model:', error);
    }
  };

  const loadPickupModel = async () => {
    if (!sceneRef.current?.scene) return;

    if (modelsRef.current.pickup) {
      sceneRef.current.scene.remove(modelsRef.current.pickup);
      modelsRef.current.pickup = null;
    }

    try {
      const model = await modelLoadersRef.current.pickup.load(
        sceneRef.current.scene,
        undefined,
        !activeWheels
      );
      modelsRef.current.pickup = model;
    } catch (error) {
      console.error('Error loading Pickup model:', error);
    }
  };

  useEffect(() => {
    if (!sceneRef.current?.scene) return;

    if (modelsRef.current.sprinter) {
      sceneRef.current.scene.remove(modelsRef.current.sprinter);
      modelsRef.current.sprinter = null;
    }
    if (modelsRef.current.pickup) {
      sceneRef.current.scene.remove(modelsRef.current.pickup);
      modelsRef.current.pickup = null;
    }

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

  return {
    modelsRef,
    modelLoadersRef,
    loadSprinterModel,
    loadPickupModel,
  };
};
