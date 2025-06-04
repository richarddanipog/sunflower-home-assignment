import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FiltersActions from './FiltersActions';
import type { ICity } from '../../types/city';

// Mock the child components
vi.mock('../SearchBar/SearchBar', () => ({
  default: () => <div data-testid="search-bar">Search Bar</div>,
}));

vi.mock('../ContinentFilter/ContinentFilter', () => ({
  default: ({ continents }: { continents: string[] }) => (
    <div data-testid="continent-filter">
      Continent Filter: {continents.join(', ')}
    </div>
  ),
}));

vi.mock('../Toggle/ToggleSort', () => ({
  default: () => <div data-testid="toggle-sort">Toggle Sort</div>,
}));

vi.mock('../Toggle/ToggleUnits', () => ({
  default: () => <div data-testid="toggle-units">Toggle Units</div>,
}));

const mockCities: ICity[] = [
  {
    name: 'London',
    country: 'UK',
    continent: 'Europe',
    active: true,
    description: 'Capital of UK',
    image: 'london.jpg',
    coords: { lat: 51.5074, lng: -0.1278 },
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    active: true,
    description: 'Capital of Japan',
    image: 'tokyo.jpg',
    coords: { lat: 35.6762, lng: 139.6503 },
  },
  {
    name: 'New York',
    country: 'USA',
    continent: 'North America',
    active: true,
    description: 'Big Apple',
    image: 'ny.jpg',
    coords: { lat: 40.7128, lng: -74.006 },
  },
];

describe('FiltersActions', () => {
  it('renders all filter components', () => {
    render(<FiltersActions activeCities={mockCities} />);

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('continent-filter')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-sort')).toBeInTheDocument();
    expect(screen.getByTestId('toggle-units')).toBeInTheDocument();
  });

  it('extracts and sorts unique continents from active cities', () => {
    render(<FiltersActions activeCities={mockCities} />);

    const continentFilter = screen.getByTestId('continent-filter');
    expect(continentFilter).toHaveTextContent('Asia, Europe, North America');
  });

  it('handles empty cities array', () => {
    render(<FiltersActions activeCities={[]} />);

    const continentFilter = screen.getByTestId('continent-filter');
    expect(continentFilter).toHaveTextContent('Continent Filter');
  });

  it('handles cities with duplicate continents', () => {
    const citiesWithDuplicates = [
      ...mockCities,
      {
        name: 'Paris',
        country: 'France',
        continent: 'Europe',
        active: true,
        description: 'Capital of France',
        image: 'paris.jpg',
        coords: { lat: 48.8566, lng: 2.3522 },
      },
    ];

    render(<FiltersActions activeCities={citiesWithDuplicates} />);

    const continentFilter = screen.getByTestId('continent-filter');
    expect(continentFilter).toHaveTextContent('Asia, Europe, North America');
  });
});
