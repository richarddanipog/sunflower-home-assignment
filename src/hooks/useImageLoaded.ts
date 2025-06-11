import { useEffect, useState } from 'react';
import type { ICity } from '../types/city';

export const useImageLoaded = (city: ICity, isVisible = true) => {
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

  return { handleImageError, handleImageLoad, imageLoaded, imageError };
};
