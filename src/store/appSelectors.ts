import type { AppStoreState } from './appStore';

export const getUnits = (state: AppStoreState) => state.units;

export const getSetUnits = (state: AppStoreState) => state.setUnits;

export const getSelectedCity = (state: AppStoreState) => state.selectedCity;

export const getSetSelectedCity = (state: AppStoreState) =>
  state.setSelectedCity;

export const getSearch = (state: AppStoreState) => state.search;

export const getSetSearch = (state: AppStoreState) => state.setSearch;

export const getContinent = (state: AppStoreState) => state.continent;

export const getSetContinent = (state: AppStoreState) => state.setContinent;

export const getSort = (state: AppStoreState) => state.sort;

export const getSetSort = (state: AppStoreState) => state.setSort;
