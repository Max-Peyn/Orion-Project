import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import type { LoaderOptions, ModelLoadCallback } from '../../types/models';

export class ModelLoader {
  private gltfLoader: GLTFLoader;
  private dracoLoader: DRACOLoader;

  constructor(options: LoaderOptions = {}) {
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    
    const dracoPath = options.dracoPath || 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';
    this.dracoLoader.setDecoderPath(dracoPath);
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  public async loadModel(
    path: string, 
    onLoad?: ModelLoadCallback,
    onProgress?: (progress: ProgressEvent) => void,
    onError?: (error: Error) => void
  ): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        path,
        (gltf) => {
          const model = gltf.scene;
          if (onLoad) onLoad(model);
          resolve(model);
        },
        onProgress,
        (error: unknown) => {
          const err = error instanceof Error ? error : new Error(String(error));
          if (onError) onError(err);
          reject(err);
        }
      );
    });
  }

  public setupShadows(object: THREE.Object3D, castShadow: boolean = true, receiveShadow: boolean = true): void {
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = castShadow;
        child.receiveShadow = receiveShadow;
      }
    });
  }

  public applyTransform(object: THREE.Object3D, transform: {
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
  }): void {
    if (transform.position) {
      object.position.set(...transform.position);
    }
    if (transform.scale) {
      object.scale.set(...transform.scale);
    }
    if (transform.rotation) {
      object.rotation.set(...transform.rotation);
    }
  }

  public dispose(): void {
    this.dracoLoader.dispose();
  }
}