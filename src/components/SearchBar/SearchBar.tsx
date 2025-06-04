import React from 'react';
import styles from './SearchBar.module.css';
import Label from '../Label/Label';
import { useAppStore } from '../../store/appStore';
import { getSearch, getSetSearch } from '../../store/appSelectors';

const SearchBar: React.FC = () => {
  const search = useAppStore(getSearch);
  const setSearch = useAppStore(getSetSearch);

  const handleClear = () => {
    setSearch('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Label htmlFor="search">Search</Label>
      <div className={styles.inputWrapper}>
        <input
          id="search"
          className={styles.input}
          type="text"
          value={search}
          onChange={handleChange}
          placeholder={'Search by city or country...'}
          autoFocus
        />
        {search && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
