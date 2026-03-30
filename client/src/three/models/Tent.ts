import * as THREE from 'three';
import { ModelLoader } from '../loaders/ModelLoader';
import { applyPropsToChild } from '../utils/materialUtils';
import type { ModelLoadCallback } from '../../types/models';

export class TentModel {
  private loader: ModelLoader;

  constructor() {
    this.loader = new ModelLoader();
  }

  public async load(
    scene: THREE.Scene,
    onLoad?: ModelLoadCallback
  ): Promise<THREE.Group> {
    const model = await this.loader.loadModel('/models/Tent/tentv2.glb');
    
    this.setupModel(model);
    
    scene.add(model);
    
    if (onLoad) onLoad(model);
    
    return model;
  }

  private setupModel(model: THREE.Group): void {
    model.scale.set(0.065, 0.05, 0.11);
    model.rotateY(Math.PI / -2);
    model.position.set(-1.3, 1.26, -0.03);

    applyPropsToChild(model, 'TANT__1', {
      position: [-190, -130, -20],
      scale: [1, 1, 0.7]
    });

    applyPropsToChild(model, 'TANT__2', {
      scale: [1, 1, 0.77],
      rotation: [Math.PI / 4.5, 0, 0],
      position: [-190, 10, -55]
    });
  }

  public dispose(): void {
    this.loader.dispose();
  }
}