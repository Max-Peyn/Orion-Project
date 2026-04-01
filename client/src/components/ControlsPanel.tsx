import React from 'react';
import { ColorSwitcher } from './controls/ColorSwitcher';
import { WheelsSwitcher } from './controls/WheelsSwitcher';

interface ControlsPanelProps {
  currentVehicle: 'sprinter' | 'pickup';
  controlsVisible: {
    wheels: boolean;
    roof: boolean;
    camping: boolean;
  };
  onCategorySelect: (category: string) => void;
  onColorChange: (color: string) => void;
  onWheelsChange: (wheels: 'v1' | 'v2' | null) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  currentVehicle,
  controlsVisible,
  onCategorySelect,
  onColorChange,
  onWheelsChange,
}) => {
  return (
    <>
      <div className="container">
        <div className="left-panel">
          <button
            className={`left-btn ${controlsVisible.wheels ? 'active' : ''}`}
            onClick={() => onCategorySelect('wheels')}
          >
            Wheels
          </button>
          {currentVehicle === 'pickup' && (
            <button
              className={`left-btn ${controlsVisible.camping ? 'active' : ''}`}
              onClick={() => onCategorySelect('camping')}
            >
              Camping
            </button>
          )}
        </div>

        <ColorSwitcher onColorChange={onColorChange} />
      </div>

      {controlsVisible.wheels && (
        <WheelsSwitcher onWheelsChange={onWheelsChange} />
      )}
    </>
  );
};
