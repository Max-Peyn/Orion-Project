import { useEffect, useRef, useState } from 'react';
import { 
  createScene, 
  createCamera, 
  createRenderer, 
  createLights, 
  createControls, 
  animate 
} from '../three/init';
import type { Sizes, ThreeScene, AnimatedObject } from '../types/three';

interface UseThreeSceneOptions {
  enableAnimation?: boolean;
  objects?: AnimatedObject[];
}

export const useThreeScene = (options: UseThreeSceneOptions = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ThreeScene | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const sizes: Sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const scene = createScene();
    const camera = createCamera(sizes);
    const renderer = createRenderer(canvas, sizes);
    const lights = createLights();
    const controls = createControls(camera, canvas);

    scene.add(lights.directional);
    scene.add(lights.ambient);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      controls,
      lights
    };

    if (options.enableAnimation !== false) {
      animate(renderer, scene, camera, controls, options.objects);
    }

    setIsLoaded(true);

    const handleResize = () => {
      const newSizes = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      camera.aspect = newSizes.width / newSizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newSizes.width, newSizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [options.enableAnimation, options.objects]);

  return {
    canvasRef,
    sceneRef,
    isLoaded
  };
};