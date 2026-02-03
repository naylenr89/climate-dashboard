import {
  WiDaySunny,
  WiCloud,
  WiCloudy,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

type Props = {
  code: number;
  size?: number;
};

function pickIcon(code: number) {
  // Basado en grupos típicos de Open-Meteo:
  // 0: clear
  // 1-3: partly cloudy to overcast
  // 45,48: fog
  // 51-57: drizzle
  // 61-67: rain
  // 71-77: snow
  // 80-82: rain showers
  // 95-99: thunderstorm

  if (code === 0) return WiDaySunny;
  if (code >= 1 && code <= 2) return WiCloud;
  if (code === 3) return WiCloudy;

  if (code === 45 || code === 48) return WiFog;

  if (code >= 51 && code <= 57) return WiShowers;
  if (code >= 61 && code <= 67) return WiRain;

  if (code >= 71 && code <= 77) return WiSnow;

  if (code >= 80 && code <= 82) return WiShowers;

  if (code >= 95 && code <= 99) return WiThunderstorm;

  return WiCloudy; // fallback
}

export default function WeatherIcon({ code, size = 56 }: Props) {
  const Icon = pickIcon(code);
  return <Icon size={size} />;
}
