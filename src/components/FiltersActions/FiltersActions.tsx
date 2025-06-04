import React, { memo } from 'react';
import styles from './FiltersActions.module.css';
import SearchBar from '../SearchBar/SearchBar';
import ContinentFilter from '../ContinentFilter/ContinentFilter';
import ToggleSort from '../Toggle/ToggleSort';
import ToggleUnits from '../Toggle/ToggleUnits';
import type { ICity } from '../../types/city';

interface FiltersActionsProps {
  activeCities: ICity[];
}

const FiltersActions: React.FC<FiltersActionsProps> = ({ activeCities }) => {
  const continents = Array.from(
    new Set(activeCities.map((city) => city.continent))
  ).sort();

  return (
    <div className={styles.filters}>
      <SearchBar />
      <ContinentFilter continents={continents} />
      <div className={styles.filterGroup}>
        <ToggleSort />
        <ToggleUnits />
      </div>
    </div>
  );
};

export default memo(FiltersActions);
