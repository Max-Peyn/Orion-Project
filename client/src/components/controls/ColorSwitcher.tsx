import React, { useState } from 'react';
import { useConfiguration } from '../../hooks';

interface ColorOption {
  name: string;
  value: string;
}

interface ColorSwitcherProps {
  onColorChange?: (color: string, colorName: string) => void;
}

const colors: ColorOption[] = [
  { name: 'white', value: '#FFFFFF' },
  { name: 'brown', value: '#544643' },
  { name: 'black', value: '#262626' },
  { name: 'yellow', value: '#f59e0b' },
  { name: 'gradient', value: 'conic-gradient(red, yellow, green, blue, red)' }
];

export const ColorSwitcher: React.FC<ColorSwitcherProps> = ({ onColorChange }) => {
  const { setVehicleColor } = useConfiguration();
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [customColor, setCustomColor] = useState('#FFFFFF');

  const handleColorClick = (color: ColorOption, index: number) => {
    setActiveColorIndex(index);
    setVehicleColor(color.value);
    
    if (onColorChange) {
      onColorChange(color.value, color.name);
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    setVehicleColor(newColor);
    setActiveColorIndex(-1);
    
    if (onColorChange) {
      onColorChange(newColor, 'custom');
    }
  };

  return (
    <div className="color-switcher">
      {colors.map((color, index) => (
        <div
          key={color.name}
          className={`color-circle ${activeColorIndex === index ? 'active' : ''}`}
          style={{ background: color.value }}
          onClick={() => handleColorClick(color, index)}
          data-color={color.value}
          data-name={color.name}
        />
      ))}
      <input
        type="color"
        className="inputColor"
        value={customColor}
        onChange={handleCustomColorChange}
      />
    </div>
  );
};