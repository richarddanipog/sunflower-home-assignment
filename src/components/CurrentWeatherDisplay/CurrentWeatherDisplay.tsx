import React from 'react';
import type { IWeatherForecast } from '../../types/weather';
import { getWeatherIconUrl } from '../../utils/weather';
import styles from './CurrentWeatherDisplay.module.css';

interface CurrentWeatherDisplayProps {
  currentWeather: IWeatherForecast;
  displayUnits: string;
}

const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({
  currentWeather,
  displayUnits,
}) => {
  return (
    <div className={styles.currentWeather} data-testid="current-weather">
      <div className={styles.weatherStatus}>
        <h2>Current Weather</h2>
        <img
          src={getWeatherIconUrl(currentWeather.weather[0].icon)}
          alt={currentWeather.weather[0].description}
          className={styles.weatherIcon}
        />
      </div>
      <div>
        <b>Status:</b> {currentWeather.weather[0].description}
      </div>
      <div>
        <b>Temperature:</b> {Math.round(currentWeather.main.temp)}{' '}
        {displayUnits}
      </div>
      <div>
        <b>Feels like:</b> {Math.round(currentWeather.main.feels_like)}{' '}
        {displayUnits}
      </div>
      <div>
        <b>Wind:</b> {Math.round(currentWeather.wind.speed)} km/h, direction{' '}
        {currentWeather.wind.deg}°
      </div>
      <div>
        <b>Humidity:</b> {currentWeather.main.humidity}%
      </div>
      <div>
        <b>Time:</b> {new Date(currentWeather.dt * 1000).toLocaleString()}
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
