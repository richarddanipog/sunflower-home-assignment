import type { TSortOption } from '../components/Toggle/ToggleSort';
import type { ICity } from '../types/city';
import { getDistanceKm } from './getDistanceKm';

const TEL_AVIV = { lat: 32.0853, lng: 34.7818 };

export const filterByContinent = (
  cities: ICity[],
  continent: string
): ICity[] => {
  if (!continent) return cities;

  return cities.filter((city) => city.continent === continent);
};

export const filterBySearch = (cities: ICity[], search: string): ICity[] => {
  if (!search.trim()) return cities;

  const searchLower = search.toLowerCase();

  return cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchLower) ||
      city.country.toLowerCase().includes(searchLower)
  );
};

export const sortCities = (
  cities: ICity[],
  sortOption: TSortOption
): ICity[] => {
  if (sortOption === 'name') {
    return [...cities].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  }

  return [...cities].sort(
    (a, b) =>
      getDistanceKm(a.coords, TEL_AVIV) - getDistanceKm(b.coords, TEL_AVIV)
  );
};

export const handleFilterCities = (
  activeCities: ICity[],
  continent: string,
  search: string,
  sort: TSortOption
) => {
  return sortCities(
    filterBySearch(filterByContinent(activeCities, continent), search),
    sort
  );
};
