import * as THREE from 'three';
import { ModelLoader } from '../loaders/ModelLoader';
import type { WheelsArray, ModelLoadCallback } from '../../types/models';

export class WheelsV1Model {
  private loader: ModelLoader;

  constructor() {
    this.loader = new ModelLoader();
  }

  public async load(
    scene: THREE.Scene,
    isPickup: boolean = false,
    onLoad?: ModelLoadCallback
  ): Promise<WheelsArray> {
    const wheelModel = await this.loader.loadModel('/models/Wheels/v1/tuner_wheel.glb');
    
    // Setup wheel model
    const scale = this.getScale();
    wheelModel.scale.set(scale, scale, scale);
    wheelModel.rotateY(Math.PI * -0.5);
    
    this.loader.setupShadows(wheelModel, false, true);
    
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
        new THREE.Vector3(-1.225, 0.35, 0.85),
        new THREE.Vector3(1.93, 0.35, 0.75),
        new THREE.Vector3(-1.225, 0.35, -0.85),
        new THREE.Vector3(1.93, 0.35, -0.75)
      ];
    } else {
      return [
        new THREE.Vector3(-1.67, 0.35, 0.85),
        new THREE.Vector3(1.93, 0.35, 0.85),
        new THREE.Vector3(-1.67, 0.35, -0.85),
        new THREE.Vector3(1.93, 0.35, -0.85)
      ];
    }
  }

  private getScale(): number {
    return 0.14;
  }

  private updatePositions(wheels: WheelsArray, isPickup: boolean): void {
    const newPositions = this.getPositions(isPickup);
    const newScale = this.getScale();
    
    wheels.forEach((wheel, index) => {
      wheel.position.copy(newPositions[index]);
      wheel.scale.set(newScale, newScale, newScale);
    });
  }

  public dispose(): void {
    this.loader.dispose();
  }
}