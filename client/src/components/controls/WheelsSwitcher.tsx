import React from 'react';
import { useConfiguration } from '../../hooks';
import wheels1Img from '../../assets/wheels1.jpg';
import wheels2Img from '../../assets/wheels2.jpg';

interface WheelsSwitcherProps {
  onWheelsChange?: (wheelsType: 'v1' | 'v2' | null) => void;
}

export const WheelsSwitcher: React.FC<WheelsSwitcherProps> = ({ onWheelsChange }) => {
  const { activeWheels, switchWheels } = useConfiguration();

  const handleWheelsChange = (wheelsType: 'v1' | 'v2') => {
    const newWheels = activeWheels === wheelsType ? null : wheelsType;
    switchWheels(newWheels);
    
    if (onWheelsChange) {
      onWheelsChange(newWheels);
    }
  };

  return (
    <div className="wheels-switcher">
      <div
        className={`wheels-option ${activeWheels === 'v1' ? 'active' : ''}`}
        onClick={() => handleWheelsChange('v1')}
      >
        <img src={wheels1Img} alt="Wheels V1" />
      </div>
      <div
        className={`wheels-option ${activeWheels === 'v2' ? 'active' : ''}`}
        onClick={() => handleWheelsChange('v2')}
      >
        <img src={wheels2Img} alt="Wheels V2" />
      </div>
    </div>
  );
};