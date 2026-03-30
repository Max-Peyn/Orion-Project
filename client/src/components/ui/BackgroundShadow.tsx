import React from 'react';
import { bgShadowImg } from '../../assets';

export const BackgroundShadow: React.FC = () => {
  return (
    <div className="bg-shadow">
      <img src={bgShadowImg} alt="Shadow" />
    </div>
  );
};