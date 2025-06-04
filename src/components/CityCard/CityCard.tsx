import React, { useState, useEffect, memo } from 'react';
import styles from './CityCard.module.css';
import type { ICity } from '../../types/city';

interface CityCardProps {
  city: ICity;
  onClick?: () => void;
  isVisible?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({
  city,
  onClick,
  isVisible = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isVisible && !imageLoaded && !imageError) {
      const img = new Image();
      img.src = city.image;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    }
  }, [isVisible, city.image, imageLoaded, imageError]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      className={styles.card}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${city.name}, ${city.country}`}
    >
      <div className={styles.imageContainer}>
        {!imageLoaded && <div className={styles.skeleton} />}
        {!imageError ? (
          <img
            src={city.image}
            alt={`${city.name}, ${city.country}`}
            className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className={styles.fallbackImage}>
            <span>{city.name[0]}</span>
          </div>
        )}
      </div>
      <div className={styles.overlay}>
        <h2 className={styles.name}>{city.name}</h2>
        <p className={styles.country}>{city.country}</p>
        <p className={styles.description}>{city.description}</p>
      </div>
    </div>
  );
};

export default memo(CityCard);
