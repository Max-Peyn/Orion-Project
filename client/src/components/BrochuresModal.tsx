import React from 'react';
import { BrochuresPage } from '../pages/BrochuresPage';

interface BrochuresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochuresModal: React.FC<BrochuresModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <BrochuresPage 
      isOpen={true}
      onClose={onClose}
    />
  );
};