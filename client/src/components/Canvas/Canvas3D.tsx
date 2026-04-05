import React, { useEffect } from 'react';
import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { useThreeScene } from '../../hooks/useThreeScene';
import { PlaneObject } from '../../three/objects/Plane';

interface Canvas3DProps {
  onSceneReady: (sceneRef: React.MutableRefObject<any>) => void;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({ onSceneReady }) => {
  const { canvasRef, sceneRef, isLoaded } = useThreeScene({ enableAnimation: true });

  useEffect(() => {
    if (!sceneRef.current || !isLoaded) return;

    const plane = PlaneObject.create();
    sceneRef.current.scene.add(plane);

    const loader = new EXRLoader();
    loader.load('/texture/studio_small_08_1k.exr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      sceneRef.current!.scene.environmentIntensity = 0.3;
      sceneRef.current!.scene.environment = texture;
    });

    onSceneReady(sceneRef);
  }, [isLoaded, onSceneReady]);

  return <canvas ref={canvasRef} className="three-canvas" />;
};
