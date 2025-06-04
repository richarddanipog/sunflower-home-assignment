import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockCities from '../../data/data.json';
import CityGrid from '../../components/CityGrid/CityGrid';
import { useAppStore } from '../../store/appStore';
import { handleFilterCities } from '../../utils/cityFilters';
import { useDebounce } from '../../hooks/useDebounce';
import type { ICity } from '../../types/city';
import FiltersActions from '../../components/FiltersActions/FiltersActions';
import {
  getContinent,
  getSearch,
  getSetSelectedCity,
  getSort,
} from '../../store/appSelectors';

const MainPage = () => {
  const navigate = useNavigate();

  const setSelectedCity = useAppStore(getSetSelectedCity);
  const continent = useAppStore(getContinent);
  const sort = useAppStore(getSort);
  const search = useAppStore(getSearch);
  const debounceSearch = useDebounce(search, 500);

  const activeCities: ICity[] = useMemo(
    () => mockCities.cities.filter((city) => city.active),
    []
  );

  const onCityClick = (city: ICity) => {
    setSelectedCity(city);
    navigate(`/city/${encodeURIComponent(city.name)}`);
  };

  const filteredCities = handleFilterCities(
    activeCities,
    continent,
    debounceSearch,
    sort
  );

  return (
    <div className="app">
      <FiltersActions activeCities={activeCities} />
      <CityGrid cities={filteredCities} onCityClick={onCityClick} />
    </div>
  );
};

export default MainPage;
