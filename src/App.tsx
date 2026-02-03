import { useState } from "react";
import { getLocationFromZip } from "./lib/zip";
import { getWeather } from "./lib/weather";
import { formatDayLabel, formatTemp } from "./lib/format";
import type { ZipLocation, WeatherData } from "./types/weather";
import WeatherIcon from "./components/WeatherIcon";
import { FiLoader, FiSearch } from "react-icons/fi";

function App() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState("");
  const [location, setLocation] = useState<ZipLocation | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [zipInput, setZipInput] = useState("");
  const [unit, setUnit] = useState<"c" | "f">("c");

  async function handleSearch(zip: string) {
    try {
      setStatus("loading");
      setError("");

      const loc = await getLocationFromZip(zip);
      const weatherData = await getWeather(loc.lat, loc.lon);

      setLocation(loc);
      setWeather(weatherData);
      setStatus("success");
    } catch (err: any) {
      const msg =
        err?.message === "ZIP_NOT_FOUND"
          ? "ZIP not found. Try another 5-digit ZIP."
          : "Something went wrong. Please try again.";

      setError(msg);
      setStatus("error");
      setLocation(null);
      setWeather(null);
    }
  }

  return (
    <div className="app">
      <div className="searchRow">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const zip = zipInput.trim();

            if (!/^\d{5}$/.test(zip)) {
              setError("Enter a valid 5-digit ZIP");
              setStatus("error");
              return;
            }

            handleSearch(zip);
          }}
        >
          <input
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            placeholder="Zip Code"
            maxLength={5}
            inputMode="numeric"
          />

          <button type="submit" disabled={status === "loading"} aria-label="Search">
              {status === "loading" ? <FiLoader className="spin" /> : <FiSearch size={18} />}
          </button>
        </form>
      </div>

      <div className="statusRow">
        {status === "error" && error && <div className="error">{error}</div>}
      </div>

      {status === "success" && location && weather && (
        <div className="card">
          <div className="cardTop">
            <div>
              <p className="location">
                {location.city}, {location.state}
              </p>
              <div className="tempRow">
                <span className="temp">{formatTemp(weather.currentTempC, unit)}</span>
              </div>
            </div>

            <div className="iconBig">
              <WeatherIcon code={weather.currentWeatherCode} size={96} />
            </div>
          </div>

          <div className="forecast">
            {weather.daily.slice(0, 5).map((day) => (
              <div className="dayCard" key={day.date}>
                <div className="dayIcon">
                  <WeatherIcon code={day.weatherCode} size={28} />
                </div>
                <div className="dayTemp">{formatTemp(day.tempMaxC, unit)}</div>
                <div className="dayLabel">{formatDayLabel(day.date)}</div>
              </div>
            ))}
          </div>
              <div className="toggleRow">
        <span>Fahrenheit</span>

        <button
          type="button"
          className={`pill ${unit === "c" ? "right" : "left"}`}
          onClick={() => setUnit((u) => (u === "c" ? "f" : "c"))}
          aria-label="Toggle unit"
        >
          <span className="dot" />
        </button>

        <span>Celsius</span>
      </div>
        </div>
        
      )}

  
    </div>
  );
}

export default App;
