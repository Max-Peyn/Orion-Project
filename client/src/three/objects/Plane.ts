import * as THREE from 'three';

export class PlaneObject {
  public static create(size: number = 10, opacity: number = 0.4): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.ShadowMaterial({ opacity });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.receiveShadow = true;
    
    return mesh;
  }
}