import * as THREE from 'three';

export interface ModelLoadCallback {
  (model: THREE.Group | THREE.Object3D): void;
}

export interface WheelsArray extends Array<THREE.Object3D> {
  updatePositions?: (isPickup: boolean) => void;
}

export interface VehicleModel extends THREE.Group {
  updateWheelsVisibility?: (visible: boolean) => void;
}

export interface ModelConfiguration {
  name: string;
  color: string;
  wheels?: 'v1' | 'v2';
  accessories?: string[];
}

export interface ModelPosition {
  x: number;
  y: number;
  z: number;
}

export interface ModelScale {
  x: number;
  y: number;
  z: number;
}

export interface ModelRotation {
  x: number;
  y: number;
  z: number;
}

export interface ModelTransform {
  position?: ModelPosition;
  scale?: ModelScale;
  rotation?: ModelRotation;
}

export interface LoaderOptions {
  dracoPath?: string;
  enableShadows?: boolean;
}