# Cities App

A modern web application for exploring cities and their weather information.

## Features

- **City Search**: Search for cities by name or country.
- **City Details**: View detailed information about each city, including weather data.
- **Temperature Units**: Toggle between Celsius and Fahrenheit.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Filtering**: Filter cities by continent.
- **Sorting**: Sort cities by name or distance.
- **Weather Forecast**: View current weather and forecast for the next few days.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: For type-safe code.
- **React Router**: For handling navigation and routing.
- **Zustand**: A state management library for React.
- **Vite**: A build tool for modern web projects.
- **OpenWeatherMap API**: For weather data.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── store/         # State management
├── types/         # TypeScript types
├── utils/         # Utility functions
└── data/          # Mock data
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/cities-app.git
   cd cities-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Usage

### Main Page

- Use the search bar to find cities by name or country
- Use the continent filter to filter cities by continent
- Use the sort dropdown to sort cities by name or distance
- Click on a city card to view detailed information

### City Details Page

- View current weather conditions
- See the weather forecast for the next few days
- Toggle between Celsius and Fahrenheit
- Use the back button to return to the main page

## Components

### CityGrid

Displays a responsive grid of city cards.

```typescript
<CityGrid cities={filteredCities} onCityClick={handleCityClick} />
```

### CityCard

Displays individual city information.

```typescript
<CityCard city={cityData} onClick={handleClick} />
```

### FiltersActions

Provides search, filter, and sorting functionality.

```typescript
<FiltersActions activeCities={cities} />
```

## State Management

The app uses Zustand for state management. Key state slices include:

- Selected city
- Search term
- Continent filter
- Sort order
- Temperature units

Example usage:

```typescript
const selectedCity = useAppStore(getSelectedCity);
const units = useAppStore(getUnits);
```

## Custom Hooks

### useWeather

Fetches and manages weather data for a city.

```typescript
const { data, isLoading, error } = useWeather({
  lat: city.coords.lat,
  lon: city.coords.lng,
  units: 'metric',
});
```

### useDebounce

Debounces a value to prevent excessive updates.

```typescript
const debouncedSearch = useDebounce(search, 500);
```

## API Integration

The app integrates with the OpenWeatherMap API to fetch weather data.

Endpoint: `https://api.openweathermap.org/data/2.5/onecall`

Required parameters:

- `lat`: City latitude
- `lon`: City longitude
- `units`: Temperature units (metric/imperial)
- `appid`: API key

## Error Handling

The app includes comprehensive error handling for:

- API failures
- Network issues
- Invalid data
- Navigation errors

## Testing

Run tests using:

```bash
npm test
```

The test suite includes:

- Unit tests for components
- Integration tests for API calls
- State management tests
- Custom hooks tests

## Best Practices

1. **Code Organization**

   - Components are modular and reusable
   - Custom hooks encapsulate complex logic
   - State management is centralized
   - Types are properly defined

2. **Performance**

   - Memoization for expensive computations
   - Debounced search
   - Optimized re-renders
   - Proper cleanup in effects

3. **Error Handling**
   - Comprehensive error states
   - User-friendly error messages
   - Error recovery mechanisms
   - Proper error logging

## License

This project is licensed under the MIT License.
