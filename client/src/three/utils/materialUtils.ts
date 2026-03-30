import * as THREE from 'three';

export interface MaterialProps {
  color?: string | number;
  visible?: boolean;
  metalness?: number;
  roughness?: number;
  opacity?: number;
  transparent?: boolean;
}

export interface ObjectProps extends MaterialProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

export function applyMaterialProps(material: THREE.Material, props: MaterialProps): void {
  if (material instanceof THREE.MeshStandardMaterial || 
      material instanceof THREE.MeshPhysicalMaterial) {
    
    if (props.color !== undefined) {
      material.color.set(props.color);
    }
    if (props.metalness !== undefined) {
      material.metalness = props.metalness;
    }
    if (props.roughness !== undefined) {
      material.roughness = props.roughness;
    }
  }
  
  if (props.visible !== undefined) {
    material.visible = props.visible;
  }
  if (props.opacity !== undefined) {
    material.opacity = props.opacity;
  }
  if (props.transparent !== undefined) {
    material.transparent = props.transparent;
  }
  
  material.needsUpdate = true;
}

export function applyObjectProps(object: THREE.Object3D, props: ObjectProps): void {
  if (props.position) {
    object.position.set(...props.position);
  }
  if (props.scale) {
    object.scale.set(...props.scale);
  }
  if (props.rotation) {
    object.rotation.set(...props.rotation);
  }
  
  // Apply material props if object has material
  if (object instanceof THREE.Mesh && object.material) {
    const materialProps: MaterialProps = {
      color: props.color,
      visible: props.visible,
      metalness: props.metalness,
      roughness: props.roughness,
      opacity: props.opacity,
      transparent: props.transparent
    };
    
    if (Array.isArray(object.material)) {
      object.material.forEach(mat => applyMaterialProps(mat, materialProps));
    } else {
      applyMaterialProps(object.material, materialProps);
    }
  }
}

export function findChildByName(parent: THREE.Object3D, name: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  
  parent.traverse((child) => {
    if (child.name === name) {
      found = child;
    }
  });
  
  return found;
}

export function applyPropsToChild(parent: THREE.Object3D, childName: string, props: ObjectProps): void {
  parent.traverse((child) => {
    if (child.name === childName) {
      applyObjectProps(child, props);
    }
  });
}