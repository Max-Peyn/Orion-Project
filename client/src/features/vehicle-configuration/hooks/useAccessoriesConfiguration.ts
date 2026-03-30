import { useMemo } from 'react';

export interface AccessoryConfiguration {
  id: 'tent' | 'roofRack';
  name: string;
  description: string;
  compatibleVehicles: ('sprinter' | 'pickup')[];
  image?: string;
}

const AVAILABLE_ACCESSORIES: AccessoryConfiguration[] = [
  {
    id: 'tent',
    name: 'Camping Tent',
    description: 'Rooftop camping tent for outdoor adventures',
    compatibleVehicles: ['pickup'],
  },
  {
    id: 'roofRack',
    name: 'Roof Rack',
    description: 'Heavy-duty roof rack for additional storage',
    compatibleVehicles: ['sprinter', 'pickup'],
  },
];

export const useAccessoriesConfiguration = () => {
  const accessories = useMemo(() => AVAILABLE_ACCESSORIES, []);

  const getAccessoryById = (id: 'tent' | 'roofRack') => {
    return accessories.find(accessory => accessory.id === id);
  };

  const getCompatibleAccessories = (vehicleType: 'sprinter' | 'pickup') => {
    return accessories.filter(accessory => 
      accessory.compatibleVehicles.includes(vehicleType)
    );
  };

  return {
    accessories,
    getAccessoryById,
    getCompatibleAccessories,
  };
};