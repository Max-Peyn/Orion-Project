import React from 'react';
import { leftArrowImg, rightArrowImg } from '../../assets';

interface NavigationArrowsProps {
  onNavigate: (direction: 'left' | 'right') => void;
}

export const NavigationArrows: React.FC<NavigationArrowsProps> = ({ onNavigate }) => {
  return (
    <div className="navigation-arrows">
      <button
        className="arrow-btn arrow-left"
        onClick={() => onNavigate('left')}
      >
        <img src={leftArrowImg} alt="Previous" />
      </button>
      <button
        className="arrow-btn arrow-right"
        onClick={() => onNavigate('right')}
      >
        <img src={rightArrowImg} alt="Next" />
      </button>
    </div>
  );
};