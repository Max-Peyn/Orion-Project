import * as THREE from 'three'
import { useGLTF } from "@react-three/drei";
import type React from "react";
import { useEffect } from "react";
import { applyMaterialProps } from '../utils/materialUtils';

type ModelsProps = {
    color: string;
}

export const ModelPickUp: React.FC<ModelsProps> = ({color}) => {
    const { scene } = useGLTF('/models/PickUp/PickUpWithoutBagaznic.glb');

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true;
                child.receiveShadow = true
            }
            if (child instanceof THREE.Mesh && child.material) {
                if (child.name.includes('UTLTRUCK90_Bodymat') || child.material.name === 'UTLTRUCK90_Bodymat') {
                    applyMaterialProps(child.material, { color });
                }
            }
        })
    }, [scene, color])

    return <primitive
        object={scene}
        position={[0, -1.3, 0]}
        rotation={[0, -Math.PI / 2, 0]} />
}