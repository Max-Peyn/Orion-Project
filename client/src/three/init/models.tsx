import * as THREE from 'three' // <-- це потрібно лише для типів 
import { useGLTF } from "@react-three/drei"
import React, { useEffect } from "react"
import { applyMaterialProps, applyObjectProps, applyPropsToChild } from '../utils/materialUtils'

type ModelsProps = {
    color: string;
}

export const Models:React.FC<ModelsProps> = ({color}) => {
    const { scene } = useGLTF('/models/mersedes/SprinterOptimized.glb');
    const wheelsNames = ['Cylinder_Mat_0', 'Cylinder_1_Mat_0'];
     
    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) { // <--
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
            if (child instanceof THREE.Mesh && child.material) {
                if (child.name.includes('Carrosserie') || child.material.name === 'Carrosserie') {
                    applyMaterialProps(child.material, {color});
                }
            }
            wheelsNames.forEach((wheelName)=>{
                applyPropsToChild(scene, wheelName, {
                    visible:true
                })
            })
        });
    }, [scene, color])
    return (
        <primitive
            object={scene}
            position={[0, 0, 0]} />)
}