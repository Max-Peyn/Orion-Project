import * as THREE from 'three';
import type { Sizes } from '../../types/three';

export function createCamera(sizes: Sizes): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);
  return camera;
}