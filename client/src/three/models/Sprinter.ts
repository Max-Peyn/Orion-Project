import * as THREE from 'three';
import { ModelLoader } from '../loaders/ModelLoader';
import { applyPropsToChild, applyMaterialProps } from '../utils/materialUtils';
import type { VehicleModel, ModelLoadCallback } from '../../types/models';

export class SprinterModel {
  private loader: ModelLoader;
  private wheelsNames = ['Cylinder_Mat_0', 'Cylinder_1_Mat_0'];

  constructor() {
    this.loader = new ModelLoader();
  }

  public async load(
    scene: THREE.Scene, 
    onLoad?: ModelLoadCallback,
    showWheels: boolean = true,
    color: string = '#fff'
  ): Promise<VehicleModel> {
    const model = await this.loader.loadModel('/models/mersedes/SprinterOptimized.glb') as VehicleModel;
    
    // Setup model properties
    this.setupModel(model, showWheels, color);
    
    // Add update method
    model.updateWheelsVisibility = (visible: boolean) => {
      this.updateWheelsVisibility(model, visible);
    };
    
    scene.add(model);
    
    if (onLoad) onLoad(model);
    
    return model;
  }

  private setupModel(model: VehicleModel, showWheels: boolean, color: string): void {
    // Set position and rotation
    model.position.y = 1.28;
    model.rotateY(Math.PI / 2);

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply body color
        if (child.material && child.material instanceof THREE.Material) {
          if (child.name.includes('Carrosserie') || child.material.name === 'Carrosserie') {
            applyMaterialProps(child.material, { color });
          }
        }

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
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (child.name.includes('Carrosserie') || child.material.name === 'Carrosserie') {
          applyMaterialProps(child.material, { color });
        }
      }
    });
  }

  public dispose(): void {
    this.loader.dispose();
  }
}