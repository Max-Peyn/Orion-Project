import { useMemo } from 'react';

export interface VehicleColor {
  id: string;
  name: string;
  hex: string;
  metallic?: boolean;
}

const AVAILABLE_COLORS: VehicleColor[] = [
  { id: 'white', name: 'Arctic White', hex: '#ffffff' },
  { id: 'black', name: 'Obsidian Black', hex: '#1a1a1a' },
  { id: 'silver', name: 'Silver Metallic', hex: '#c0c0c0', metallic: true },
  { id: 'red', name: 'Crimson Red', hex: '#dc2626' },
  { id: 'blue', name: 'Ocean Blue', hex: '#2563eb' },
  { id: 'orange', name: 'Sunset Orange', hex: '#f97316' },
];

export const useVehicleColors = () => {
  const colors = useMemo(() => AVAILABLE_COLORS, []);

  const getColorByHex = (hex: string) => {
    return colors.find(color => color.hex === hex);
  };

  const getColorById = (id: string) => {
    return colors.find(color => color.id === id);
  };

  return {
    colors,
    getColorByHex,
    getColorById,
  };
};