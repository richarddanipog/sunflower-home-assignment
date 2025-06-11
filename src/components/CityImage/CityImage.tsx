import type React from 'react';
import { useImageLoaded } from '../../hooks/useImageLoaded';
import type { ICity } from '../../types/city';
import styles from './CityImage.module.css';

export interface ICityImageProps {
  city: ICity;
}

const CityImage: React.FC<ICityImageProps> = ({ city }) => {
  const { imageLoaded, imageError, handleImageError, handleImageLoad } =
    useImageLoaded(city);

  return (
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
  );
};

export default CityImage;
