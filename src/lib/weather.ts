// src/lib/weather.ts

export type DailyForecast = {
  date: string;
  tempMaxC: number;
  tempMinC: number;
  weatherCode: number;
};

export type WeatherData = {
  currentTempC: number;
  currentWeatherCode: number;
  daily: DailyForecast[];
};

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&temperature_unit=celsius` +
    `&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("WEATHER_FETCH_FAILED");
  }

  const data = await response.json();

  const daily: DailyForecast[] = data.daily.time.map(
    (date: string, index: number) => ({
      date,
      tempMaxC: data.daily.temperature_2m_max[index],
      tempMinC: data.daily.temperature_2m_min[index],
      weatherCode: data.daily.weather_code[index],
    })
  );

  return {
    currentTempC: data.current.temperature_2m,
    currentWeatherCode: data.current.weather_code,
    daily,
  };
}
