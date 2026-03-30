import React from 'react';
import { useNavigate } from 'react-router-dom';
import { b1Img, b2Img, b3Img, b4Img } from '../assets';

const brochures = [
  { 
    img: b1Img, 
    link: 'https://acrobat.adobe.com/id/urn:aaid:sc:EU:b50e15bc-def6-412c-881c-f3a16fe51195?x_api_client_id=edge_extension_viewer&x_api_client_location=share&locale=en-US&theme=light&page_theme=light' 
  },
  { 
    img: b2Img, 
    link: 'https://acrobat.adobe.com/id/urn:aaid:sc:EU:0d7f4189-3391-4c1f-9e0f-917f51265923' 
  },
  { 
    img: b3Img, 
    link: 'https://acrobat.adobe.com/id/urn:aaid:sc:EU:58db68e7-e491-4e95-a208-053998f64918?viewer%21megaVerb=group-discover' 
  },
  { 
    img: b4Img, 
    link: 'https://acrobat.adobe.com/id/urn:aaid:sc:eu:4e182555-7573-4e7e-93c1-a9d24cd671f1?viewer%21megaVerb=group-discover' 
  }
];

interface BrochuresPageProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const BrochuresPage: React.FC<BrochuresPageProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (isOpen !== undefined && !isOpen) {
    return null;
  }

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`brochures-page ${isOpen !== undefined ? 'modal-mode' : 'page-mode'}`}>
      <div className="brochures-container">
        <button className="close-brochures-btn" onClick={handleClose}>
          ✕
        </button>
        <h1>Brochures</h1>
        <div className="brochures-grid">
          {brochures.map((brochure, index) => (
            <a 
              key={index}
              href={brochure.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="brochure-card"
            >
              <img src={brochure.img} alt={`Brochure ${index + 1}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};