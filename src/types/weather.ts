export type ZipLocation = {
  city: string;
  state: string;
  lat: number;
  lon: number;
};

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
