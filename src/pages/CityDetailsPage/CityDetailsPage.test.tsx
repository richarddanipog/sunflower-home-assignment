import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import CityDetailsPage from './CityDetailsPage';
import { useWeather } from '../../hooks/useWeather';
import { describe, it, expect, beforeEach, vi } from 'vitest';

type Selector = {
  name: string;
  (state: unknown): unknown;
};

const mockNavigate = vi.fn();

// Mock the hooks and modules
vi.mock('../../store/appStore');
vi.mock('../../hooks/useWeather');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ cityName: 'London' }),
  };
});

describe('CityDetailsPage', () => {
  const mockSelectedCity = {
    name: 'London',
    coords: { lat: 51.5074, lng: -0.1278 },
    image: 'london-image-url',
  };

  const mockWeatherData = {
    list: [
      {
        dt: 1646092800,
        main: {
          temp: 15,
          feels_like: 14,
          humidity: 75,
        },
        weather: [
          {
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d',
          },
        ],
        wind: {
          speed: 5.2,
        },
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: Selector) => {
        if (selector.name === 'getUnits') return 'celsius';
        if (selector.name === 'getSelectedCity') return mockSelectedCity;
        return null;
      }
    );
    (useWeather as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockWeatherData,
      isLoading: false,
      error: null,
    });
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/city/London']}>
        <Routes>
          <Route path="/city/:cityName" element={<CityDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders city details correctly', () => {
    renderComponent();

    expect(screen.getByText('Details for London')).toBeInTheDocument();
    expect(screen.getByText('Units: °C')).toBeInTheDocument();

    const infoSection = screen.getByTestId('city-info');
    const coordinatesElements = within(infoSection).getAllByText(
      (content, element) => {
        return element?.textContent?.trim() === 'Coordinates: 51.5074, -0.1278';
      }
    );
    expect(coordinatesElements[0]).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useWeather as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderComponent();
    expect(screen.getByText('Loading weather...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    const errorMessage = 'Failed to fetch weather data';
    (useWeather as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(errorMessage),
    });

    renderComponent();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    renderComponent();
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('displays current weather information', async () => {
    renderComponent();

    await waitFor(() => {
      const currentWeatherContainer = screen.getByTestId('current-weather');

      const temperatureElement = within(currentWeatherContainer).getByText(
        (content, element) => {
          return element?.textContent?.trim() === 'Temperature: 15 °C';
        }
      );
      expect(temperatureElement).toBeInTheDocument();

      const weatherStatusElement = within(currentWeatherContainer).getByText(
        (content, element) => {
          return element?.textContent?.trim() === 'Status: scattered clouds';
        }
      );
      expect(weatherStatusElement).toBeInTheDocument();
    });
  });

  it('redirects to home when no city is selected', () => {
    (useAppStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: Selector) => {
        if (selector.name === 'getUnits') return 'celsius';
        if (selector.name === 'getSelectedCity') return null;
        return null;
      }
    );

    renderComponent();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
