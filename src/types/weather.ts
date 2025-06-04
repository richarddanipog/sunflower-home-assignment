export type TUnits = 'celsius' | 'fahrenheit';

export interface IWeatherParams {
  lat: number | undefined;
  lon: number | undefined;
  units: TUnits;
  days?: number;
  signal?: AbortSignal;
}

export interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface IWeatherForecast {
  dt: number;
  main: IWeatherMain;
  weather: IWeatherCondition[];
  clouds: { all: number };
  wind: IWeatherWind;
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
}

export interface IWeatherCity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface IWeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherForecast[];
  city: IWeatherCity;
}
