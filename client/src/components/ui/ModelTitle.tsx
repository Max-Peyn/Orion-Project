import React from 'react';
import { useAuth, useFavourites } from '../../hooks';
import favouritesIcon from '../../assets/favourites.png';

interface ModelTitleProps {
  modelName: string;
  color: string;
  wheels: string;
}

export const ModelTitle: React.FC<ModelTitleProps> = ({ modelName, color, wheels }) => {
  const { user } = useAuth();
  const { toggleFavourite, isFavourite } = useFavourites();

  const isCurrentlyFavourite = isFavourite(modelName, color, wheels);

  const handleFavouriteClick = () => {
    if (!user) {
      console.warn('Please log in to add favourites!');
      return;
    }

    const success = toggleFavourite({
      name: modelName,
      color: color,
      wheels: wheels
    });

    if (success) {
      console.log(isCurrentlyFavourite ? 'Removed from favourites!' : 'Added to favourites!');
    }
  };

  return (
    <div className="model-title-container">
      <h2 className="model-title">{modelName}</h2>
      <button
        className={`favourite-btn ${isCurrentlyFavourite ? 'active' : ''}`}
        onClick={handleFavouriteClick}
      >
        <img src={favouritesIcon} alt="Add to favourites" />
      </button>
    </div>
  );
};