import * as THREE from 'three';
import { ModelLoader } from '../loaders/ModelLoader';
import type { ModelLoadCallback } from '../../types/models';

export class AdditionalLightModel {
  private loader: ModelLoader;

  constructor() {
    this.loader = new ModelLoader();
  }

  public async load(
    scene: THREE.Scene,
    onLoad?: ModelLoadCallback
  ): Promise<THREE.Group> {
    const model = await this.loader.loadModel('/models/lights/sunstrip_led_bar/scene.gltf');
    
    // Setup model properties
    this.setupModel(model);
    
    scene.add(model);
    
    if (onLoad) onLoad(model);
    
    return model;
  }

  private setupModel(model: THREE.Group): void {
    // Set rotation and position for Sprinter
    model.rotateY(Math.PI / 2);
    model.rotateX(Math.PI / 2);
    model.position.set(1.9, 0.53, 2.5);
  }

  public dispose(): void {
    this.loader.dispose();
  }
}