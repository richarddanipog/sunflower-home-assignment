import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityGrid from './CityGrid';
import type { ICity } from '../../types/city';

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
    name: 'Paris',
    country: 'France',
    continent: 'Europe',
    active: true,
    description: 'Capital of France',
    image: 'paris.jpg',
    coords: { lat: 48.8566, lng: 2.3522 },
  },
];

describe('CityGrid', () => {
  it('renders grid with cities', () => {
    render(<CityGrid cities={mockCities} />);

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('UK')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  it('shows no results message when cities array is empty', () => {
    render(<CityGrid cities={[]} />);

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('calls onCityClick when a city card is clicked', async () => {
    const mockOnClick = vi.fn();
    render(<CityGrid cities={mockCities} onCityClick={mockOnClick} />);

    const londonCard = screen.getByRole('button', {
      name: /View details for London/,
    });
    await userEvent.click(londonCard);

    expect(mockOnClick).toHaveBeenCalledWith(mockCities[0]);
  });

  it('renders city descriptions', () => {
    render(<CityGrid cities={mockCities} />);

    expect(screen.getByText('Capital of UK')).toBeInTheDocument();
    expect(screen.getByText('Capital of France')).toBeInTheDocument();
  });

  it('renders city images with correct alt text', () => {
    render(<CityGrid cities={mockCities} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'London, UK');
    expect(images[1]).toHaveAttribute('alt', 'Paris, France');
  });

  it('does not call onCityClick when not provided', async () => {
    render(<CityGrid cities={mockCities} />);

    const londonCard = screen.getByRole('button', {
      name: /View details for London/,
    });
    await userEvent.click(londonCard);

    // No error should be thrown
  });
});
