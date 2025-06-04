import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../utils/weather';
import type { IWeatherParams } from '../types/weather';

export function useWeather({ lat, lon, units }: IWeatherParams) {
  const enabledRequest =
    lat !== null && lat !== undefined && lon !== null && lon !== undefined;

  return useQuery({
    queryKey: ['weather', lat, lon, units],
    queryFn: () => fetchWeather({ lat, lon, units }),
    enabled: enabledRequest,
  });
}
