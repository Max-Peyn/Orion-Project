import * as THREE from 'three';
import { ModelLoader } from '../loaders/ModelLoader';
import { applyMaterialProps } from '../utils/materialUtils';
import type { ModelLoadCallback } from '../../types/models';

export class RoofRackModel {
  private loader: ModelLoader;

  constructor() {
    this.loader = new ModelLoader();
  }

  public async load(
    scene: THREE.Scene,
    onLoad?: ModelLoadCallback
  ): Promise<THREE.Group> {
    const model = await this.loader.loadModel('/models/RoofRack/simple_generic_roofbox.glb');
    
    this.setupModel(model);
    
    scene.add(model);
    
    if (onLoad) onLoad(model);
    
    return model;
  }

  private setupModel(model: THREE.Group): void {
    model.position.set(0, 2.3, 0);
    model.scale.set(1.0, 1.0, 1.0);
    model.rotateY(Math.PI / 2);

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = true;
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          applyMaterialProps(child.material, {
            color: 0x2a2a2a,
            metalness: 0.8,
            roughness: 0.4
          });
        }
      }
    });
  }

  public dispose(): void {
    this.loader.dispose();
  }
}