import { useState } from 'react';

export const useControlsState = () => {
  const [controlsVisible, setControlsVisible] = useState({
    wheels: false,
    roof: false,
    camping: false
  });

  const handleCategorySelect = (category: string, currentVehicle: 'sprinter' | 'pickup' | null, toggleAccessory: (key: 'tent' | 'roofRack' | 'additionalLight') => void) => {
    const newControls = { wheels: false, roof: false, camping: false };

    switch (category) {
      case 'wheels':
        newControls.wheels = true;
        break;
      case 'camping':
        if (currentVehicle === 'pickup') {
          newControls.camping = true;
          toggleAccessory('tent');
        } else {
          console.warn('Camping tent is only available for PickUp model!');
          return;
        }
        break;
    }

    setControlsVisible(newControls);
  };

  return {
    controlsVisible,
    handleCategorySelect,
  };
};
