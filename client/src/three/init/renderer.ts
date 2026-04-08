import * as THREE from 'three';
import type { Sizes } from '../../types/three';

export function createRenderer(canvas: HTMLCanvasElement, sizes: Sizes): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  return renderer;
}