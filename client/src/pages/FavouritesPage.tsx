import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavourites } from '../hooks';
import type { FavouriteModel } from '../types/managers';

interface FavouritesPageProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectFavourite?: (favourite: FavouriteModel) => void;
}

export const FavouritesPage: React.FC<FavouritesPageProps> = ({ 
  isOpen, 
  onClose, 
  onSelectFavourite 
}) => {
  const navigate = useNavigate();
  const { favourites, maxFavourites, removeFavourite } = useFavourites();

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

  const handleSelectFavourite = (favourite: FavouriteModel) => {
    if (onSelectFavourite) {
      onSelectFavourite(favourite);
      handleClose();
    } else {
      navigate('/', { state: { favourite } });
    }
  };

  const handleRemoveFavourite = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (confirm('Are you sure you want to remove this configuration?')) {
      removeFavourite(id);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`favourites-page ${isOpen !== undefined ? 'modal-mode' : 'page-mode'}`}>
      <div className="favourites-container">
        <button className="close-favourites-btn" onClick={handleClose}>
          X
        </button>
        
        <div className="favourites-header">
          <h1>My Favourites</h1>
          <p className="fav-count">{favourites.length} / {maxFavourites} configurations saved</p>
        </div>
        
        <div className="favourites-grid">
          {favourites.length === 0 ? (
            <div className="no-fav-container">
              <svg className="no-fav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <p className="no-fav-text">No favourites yet</p>
              <p className="no-fav-subtext">Configure your dream vehicle and save it here!</p>
            </div>
          ) : (
            favourites.map((favourite) => (
              <div 
                key={favourite.id}
                className="fav-card" 
                onClick={() => handleSelectFavourite(favourite)}
              >
                <div className="fav-card-header">
                  <div className="fav-card-badge">{favourite.name}</div>
                  <button 
                    className="remove-fav-btn" 
                    onClick={(e) => handleRemoveFavourite(favourite.id, e)}
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
                
                <div className="fav-card-body">
                  <div className="fav-detail">
                    <svg className="fav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <span>Color: <strong>{favourite.color}</strong></span>
                  </div>
                  
                  <div className="fav-detail">
                    <svg className="fav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    <span>Wheels: <strong>{favourite.wheels || 'Standard'}</strong></span>
                  </div>
                  
                  <div className="fav-detail fav-date">
                    <svg className="fav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{formatDate(favourite.timestamp)}</span>
                  </div>
                </div>
                
                <button className="fav-load-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  Load Configuration
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};