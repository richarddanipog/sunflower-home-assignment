import React from 'react';
import styles from './ContinentFilter.module.css';
import Label from '../Label/Label';
import { useAppStore } from '../../store/appStore';
import { getContinent, getSetContinent } from '../../store/appSelectors';

interface ContinentFilterProps {
  continents: string[];
}

const ContinentFilter: React.FC<ContinentFilterProps> = ({ continents }) => {
  const continent = useAppStore(getContinent);
  const setContinent = useAppStore(getSetContinent);

  if (!continents.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Label htmlFor="continent">Continent</Label>
      <select
        id="continent"
        className={styles.select}
        value={continent}
        onChange={(e) => setContinent(e.target.value)}
        aria-label="Filter by continent"
      >
        <option value="">All Continents</option>
        {continents.map((continent) => (
          <option key={continent} value={continent}>
            {continent}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContinentFilter;
