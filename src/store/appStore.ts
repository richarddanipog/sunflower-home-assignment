import { create } from 'zustand';
import type { ICity } from '../types/city';
import type { TUnits } from '../types/weather';
import type { TSortOption } from '../components/Toggle/ToggleSort';

export interface AppStoreState {
  units: TUnits;
  setUnits: (units: TUnits) => void;
  selectedCity: ICity | null;
  setSelectedCity: (city: ICity | null) => void;
  search: string;
  setSearch: (search: string) => void;
  continent: string;
  setContinent: (continent: string) => void;
  sort: TSortOption;
  setSort: (sort: TSortOption) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  units: 'celsius',
  setUnits: (units) => set({ units }),
  selectedCity: null,
  setSelectedCity: (city) => set({ selectedCity: city }),
  search: '',
  setSearch: (search) => set({ search }),
  continent: '',
  setContinent: (continent) => set({ continent }),
  sort: 'name',
  setSort: (sort) => set({ sort }),
}));
