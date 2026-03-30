import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export interface Sizes {
  width: number;
  height: number;
}

export interface ThreeScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  lights: {
    directional: THREE.DirectionalLight;
    ambient: THREE.AmbientLight;
  };
}

export interface AnimatedObject {
  update?: () => void;
}