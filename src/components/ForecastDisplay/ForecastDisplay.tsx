import React from 'react';
import type { IWeatherForecast } from '../../types/weather';
import { getWeatherIconUrl } from '../../utils/weather';
import styles from './ForecastDisplay.module.css';

interface ForecastDisplayProps {
  dailyForecasts: Record<string, IWeatherForecast>;
  displayUnits: string;
}

const ForecastDisplay: React.FC<ForecastDisplayProps> = ({
  dailyForecasts,
  displayUnits,
}) => {
  return (
    <div className={styles.forecastSection}>
      <h2 className={styles.forecastTitle}>Forecast (next days)</h2>
      <div className={styles.forecastCards}>
        {Object.entries(dailyForecasts).map(([date, forecast]) => (
          <div key={date} className={styles.forecastCard}>
            <div>
              <b>{date}</b>
            </div>
            <div>
              <img
                src={getWeatherIconUrl(forecast.weather[0].icon)}
                alt={forecast.weather[0].description}
                className={styles.weatherIcon}
              />
            </div>
            <div>
              Max: {Math.round(forecast.main.temp_max)} {displayUnits}
            </div>
            <div>
              Min: {Math.round(forecast.main.temp_min)} {displayUnits}
            </div>
            <div>Status: {forecast.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
