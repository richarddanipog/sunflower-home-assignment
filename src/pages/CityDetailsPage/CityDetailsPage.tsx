import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { useWeather } from '../../hooks/useWeather';
import { useEffect } from 'react';
import type { IWeatherData } from '../../types/weather';
import styles from './CityDetailsPage.module.css';
import { getSelectedCity, getUnits } from '../../store/appSelectors';
import CurrentWeatherDisplay from '../../components/CurrentWeatherDisplay/CurrentWeatherDisplay';
import ForecastDisplay from '../../components/ForecastDisplay/ForecastDisplay';

const CityDetailsPage = () => {
  const navigate = useNavigate();
  const { cityName } = useParams<{ cityName: string }>();
  const units = useAppStore(getUnits);
  const selectedCity = useAppStore(getSelectedCity);

  useEffect(() => {
    if (!selectedCity) {
      navigate('/');
    }
  }, [selectedCity, navigate]);

  const {
    data: weather,
    isLoading,
    error,
  } = useWeather({
    lat: selectedCity?.coords.lat,
    lon: selectedCity?.coords.lng,
    units,
  });

  const weatherData = weather as IWeatherData | null;
  const displayUnits = units === 'celsius' ? '°C' : '°F';

  const goBack = () => {
    navigate(-1);
  };

  const currentWeather = weatherData?.list[0];

  // group forecasts by day
  const dailyForecasts = weatherData?.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = forecast;
    } else {
      // if multiple forecasts on the same day, take the one closest to midday
      const existingForecastTime = new Date(acc[date].dt * 1000).getHours();
      const newForecastTime = new Date(forecast.dt * 1000).getHours();
      if (
        Math.abs(newForecastTime - 12) < Math.abs(existingForecastTime - 12)
      ) {
        acc[date] = forecast;
      }
    }
    return acc;
  }, {} as Record<string, (typeof weatherData.list)[0]>);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={goBack}>
        Back
      </button>
      {selectedCity?.image && (
        <img
          src={selectedCity.image}
          alt={cityName + ' city'}
          className={styles.cityImage}
        />
      )}
      <h1 className={styles.cityTitle}>Details for {cityName}</h1>
      <p className={styles.units}>Units: {displayUnits}</p>
      {selectedCity && (
        <div className={styles.infoSection} data-testid="city-info">
          <div>
            <b>Coordinates:</b> {selectedCity.coords.lat},{' '}
            {selectedCity.coords.lng}
          </div>
        </div>
      )}

      {isLoading && <p>Loading weather...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {currentWeather && (
        <CurrentWeatherDisplay
          currentWeather={currentWeather}
          displayUnits={displayUnits}
        />
      )}

      {dailyForecasts && Object.keys(dailyForecasts).length > 0 && (
        <ForecastDisplay
          dailyForecasts={dailyForecasts}
          displayUnits={displayUnits}
        />
      )}
    </div>
  );
};

export default CityDetailsPage;
