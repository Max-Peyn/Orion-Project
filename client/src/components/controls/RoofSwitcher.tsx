import React from 'react';
import { useConfiguration } from '../../hooks';

interface RoofSwitcherProps {
  onRoofChange?: (hasRoof: boolean) => void;
  visible?: boolean;
}

export const RoofSwitcher: React.FC<RoofSwitcherProps> = ({ 
  onRoofChange, 
  visible = true 
}) => {
  const { accessories, toggleAccessory } = useConfiguration();

  const handleRoofToggle = (hasRoof: boolean) => {
    if (accessories.roofRack !== hasRoof) {
      toggleAccessory('roofRack');
      
      if (onRoofChange) {
        onRoofChange(hasRoof);
      }
    }
  };

  if (!visible) return null;

  return (
    <div className="roof-switcher">
      <div className="roof-switcher-container">
        <h3>Roof Rack</h3>
        <div className="roof-options">
          <button
            className={`roof-option ${!accessories.roofRack ? 'active' : ''}`}
            onClick={() => handleRoofToggle(false)}
          >
            <span className="roof-label">No Roof Rack</span>
          </button>
          <button
            className={`roof-option ${accessories.roofRack ? 'active' : ''}`}
            onClick={() => handleRoofToggle(true)}
          >
            <span className="roof-label">Add Roof Rack</span>
          </button>
        </div>
      </div>
    </div>
  );
};