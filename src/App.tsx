import { useState } from "react";
import { getLocationFromZip } from "./lib/zip";
import { getWeather } from "./lib/weather";
import { formatDayLabel, formatTemp } from "./lib/format";
import type { ZipLocation, WeatherData } from "./types/weather";


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
      const msg = err?.message === "ZIP_NOT_FOUND"
                    ? "ZIP not found. Try another 5-digit ZIP."
                    : "Something went wrong. Please try again.";

      setError(msg);
      setStatus("error");
      setLocation(null);
      setWeather(null);
    }
  }

  return (
    <div>
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
          placeholder="Enter ZIP code"
          maxLength={5}
        />

        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Loading..." : "Search"}
        </button>

        <div style={{ marginTop: 12 }}>
          <button type="button" onClick={() => setUnit("c")} disabled={unit === "c"}>
            °C
          </button>
          <button type="button" onClick={() => setUnit("f")} disabled={unit === "f"}>
            °F
          </button>
        </div>
      </form>

      {status === "error" && error && <p>{error}</p>}
      {status === "loading" && <p>Loading...</p>}

      {status === "success" && location && weather && (
        <div>
          <h2>
            {location.city}, {location.state}
          </h2>

          <p>{formatTemp(weather.currentTempC, unit)}</p>

          <ul>
            {weather.daily.slice(0, 5).map((day: any) => (
              <li key={day.date}>
                {formatDayLabel(day.date)}: {formatTemp(day.tempMinC, unit)} – {formatTemp(day.tempMaxC, unit)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
