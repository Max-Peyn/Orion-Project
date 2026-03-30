import * as THREE from 'three';
import { ModelLoader } from '../loaders/ModelLoader';
import type { WheelsArray, ModelLoadCallback } from '../../types/models';

export class WheelsV2Model {
  private loader: ModelLoader;

  constructor() {
    this.loader = new ModelLoader();
  }

  public async load(
    scene: THREE.Scene,
    isPickup: boolean = false,
    onLoad?: ModelLoadCallback
  ): Promise<WheelsArray> {
    const wheelModel = await this.loader.loadModel('/models/Wheels/v2/scene.gltf');
    
    // Setup wheel model
    const scale = 0.00062;
    wheelModel.scale.set(scale, scale, scale);
    
    this.loader.setupShadows(wheelModel, true, true);
    
    // Create wheel instances
    const positions = this.getPositions(isPickup);
    const wheels: WheelsArray = [];
    
    positions.forEach((pos, index) => {
      const wheelClone = wheelModel.clone();
      wheelClone.position.copy(pos);
      
      // Rotate rear wheels
      if (index === 2 || index === 3) {
        wheelClone.rotateY(Math.PI);
      }
      
      scene.add(wheelClone);
      wheels.push(wheelClone);
    });
    
    // Add update method
    wheels.updatePositions = (isPickup: boolean) => {
      this.updatePositions(wheels, isPickup);
    };
    
    if (onLoad) onLoad(wheels as unknown as THREE.Object3D);
    
    return wheels;
  }

  private getPositions(isPickup: boolean): THREE.Vector3[] {
    if (isPickup) {
      return [
        new THREE.Vector3(-1.315, 0.35, 1),
        new THREE.Vector3(1.845, 0.35, 0.9),
        new THREE.Vector3(-1.14, 0.35, -1),
        new THREE.Vector3(2, 0.35, -0.9)
      ];
    } else {
      return [
        new THREE.Vector3(-1.75, 0.35, 1.02),
        new THREE.Vector3(1.845, 0.35, 1.02),
        new THREE.Vector3(-1.6, 0.35, -1.02),
        new THREE.Vector3(2, 0.35, -1.02)
      ];
    }
  }

  private updatePositions(wheels: WheelsArray, isPickup: boolean): void {
    const newPositions = this.getPositions(isPickup);
    
    wheels.forEach((wheel, index) => {
      wheel.position.copy(newPositions[index]);
    });
  }

  public dispose(): void {
    this.loader.dispose();
  }
}