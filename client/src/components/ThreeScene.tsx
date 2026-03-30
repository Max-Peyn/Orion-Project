import React from 'react';
import { useThreeScene } from '../hooks';
import type { AnimatedObject, ThreeScene as ThreeSceneType } from '../types/three';

interface ThreeSceneProps {
  className?: string;
  enableAnimation?: boolean;
  objects?: AnimatedObject[];
  onSceneReady?: (scene: ThreeSceneType) => void;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  className = '',
  enableAnimation = true,
  objects = [],
  onSceneReady
}) => {
  const { canvasRef, sceneRef, isLoaded } = useThreeScene({
    enableAnimation,
    objects
  });

  React.useEffect(() => {
    if (isLoaded && sceneRef.current && onSceneReady) {
      onSceneReady(sceneRef.current);
    }
  }, [isLoaded, sceneRef, onSceneReady]);

  return (
    <canvas
      ref={canvasRef}
      className={`three-canvas ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        outline: 'none',
        zIndex: 1
      }}
    />
  );
};