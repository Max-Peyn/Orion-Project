import * as THREE from 'three';
import { ModelLoader } from '../loaders/ModelLoader';
import { applyPropsToChild } from '../utils/materialUtils';
import type { VehicleModel, ModelLoadCallback } from '../../types/models';

export class PickupModel {
  private loader: ModelLoader;
  private wheelsNames = [
    'UTLTRUCK90_WheelStock_RR_RB1c_Tire_1k_0',
    'UTLTRUCK90_WheelStock_RL_RB1c_Tire_1k_0',
    'UTLTRUCK90_WheelStock_FL_RB1c_Tire_1k_0',
    'UTLTRUCK90_WheelStock_FR_RB1c_Tire_1k_0'
  ];

  constructor() {
    this.loader = new ModelLoader();
  }

  public async load(
    scene: THREE.Scene, 
    onLoad?: ModelLoadCallback,
    showWheels: boolean = true
  ): Promise<VehicleModel> {
    const model = await this.loader.loadModel('/models/PickUp/PickUpWithoutBagaznic.glb') as VehicleModel;
    
    // Setup model properties
    this.setupModel(model, showWheels);
    
    // Add update method
    model.updateWheelsVisibility = (visible: boolean) => {
      this.updateWheelsVisibility(model, visible);
    };
    
    scene.add(model);
    
    if (onLoad) onLoad(model);
    
    return model;
  }

  private setupModel(model: VehicleModel, showWheels: boolean): void {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply specific transformations
        applyPropsToChild(model, 'UTLTRUCK90_Truckbed_UTLTRUCK90_Bodymat_0001', {
          rotation: [0, 0, Math.PI / -2],
          position: [3, 2.8, 0]
        });

        // Set wheel visibility
        this.wheelsNames.forEach((wheelName) => {
          applyPropsToChild(model, wheelName, {
            visible: showWheels
          });
        });

        // Enable shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  private updateWheelsVisibility(model: VehicleModel, visible: boolean): void {
    this.wheelsNames.forEach((wheelName) => {
      applyPropsToChild(model, wheelName, {
        visible: visible
      });
    });
  }

  public setColor(model: VehicleModel, color: string): void {
    console.log('Setting PickUp color to:', color);
    let materialFound = false;
    
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        console.log('Child name:', child.name);
        
        if (Array.isArray(child.material)) {
          child.material.forEach((mat, index) => {
            console.log(`Material ${index} name:`, mat.name);
            if (mat.name === 'UTLTRUCK90_Bodymat' || 
                mat.name.includes('Bodymat') || 
                mat.name.includes('Body') ||
                child.name.includes('Body')) {
              console.log('Found body material, applying color');
              if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
                mat.color.set(color);
                mat.needsUpdate = true;
                materialFound = true;
              }
            }
          });
        } else {
          const mat = child.material;
          console.log('Single material name:', mat.name);
          if (mat.name === 'UTLTRUCK90_Bodymat' || 
              mat.name.includes('Bodymat') || 
              mat.name.includes('Body') ||
              child.name.includes('Body')) {
            console.log('Found body material, applying color');
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.color.set(color);
              mat.needsUpdate = true;
              materialFound = true;
            }
          }
        }
      }
    });
    
    console.log('Material found:', materialFound);
  }

  public dispose(): void {
    this.loader.dispose();
  }
}