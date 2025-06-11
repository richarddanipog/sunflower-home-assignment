import React, { memo } from 'react';
import styles from './CityCard.module.css';
import type { ICity } from '../../types/city';
import CityImage from '../CityImage/CityImage';

interface CityCardProps {
  city: ICity;
  onClick?: () => void;
  isVisible?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({ city, onClick }) => {
  return (
    <div
      className={styles.card}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${city.name}, ${city.country}`}
    >
      <CityImage city={city} />
      <div className={styles.overlay}>
        <h2 className={styles.name}>{city.name}</h2>
        <p className={styles.country}>{city.country}</p>
        <p className={styles.description}>{city.description}</p>
      </div>
    </div>
  );
};

export default memo(CityCard);
