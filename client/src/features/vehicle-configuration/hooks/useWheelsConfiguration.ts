import { useMemo } from 'react';

export interface WheelConfiguration {
  id: 'v1' | 'v2';
  name: string;
  description: string;
  image?: string;
}

const AVAILABLE_WHEELS: WheelConfiguration[] = [
  {
    id: 'v1',
    name: 'Sport Wheels V1',
    description: 'High-performance sport wheels with modern design',
  },
  {
    id: 'v2',
    name: 'Sport Wheels V2',
    description: 'Premium sport wheels with enhanced aerodynamics',
  },
];

export const useWheelsConfiguration = () => {
  const wheels = useMemo(() => AVAILABLE_WHEELS, []);

  const getWheelsById = (id: 'v1' | 'v2') => {
    return wheels.find(wheel => wheel.id === id);
  };

  return {
    wheels,
    getWheelsById,
  };
};