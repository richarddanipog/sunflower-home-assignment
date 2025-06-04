import React, { memo } from 'react';
import type { ICity } from '../../types/city';
import styles from './CityGrid.module.css';
import CityCard from '../CityCard/CityCard';

interface CityGridProps {
  cities: ICity[];
  onCityClick?: (city: ICity) => void;
}

const CityGrid: React.FC<CityGridProps> = ({ cities, onCityClick }) => (
  <>
    {cities.length > 0 ? (
      <div className={styles.grid}>
        {cities.map((city, index) => (
          <CityCard
            key={`${city.name}-${index}`}
            city={city}
            onClick={() => onCityClick?.(city)}
          />
        ))}
      </div>
    ) : (
      <div className={styles.noResults}>No results found</div>
    )}
  </>
);

export default memo(CityGrid);
