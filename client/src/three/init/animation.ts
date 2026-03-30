import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { AnimatedObject } from '../../types/three';

export function animate(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  objects: AnimatedObject[] = []
): void {
  const tick = () => {
    controls.update();
    
    objects.forEach(obj => {
      if (obj.update) obj.update();
    });
    
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };
  
  tick();
}