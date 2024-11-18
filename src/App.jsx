import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //const getBackgroundStyle = () => {
  ///   if (!weather) return { backgroundColor: "#f0f8ff" }; // Default
  ///   const temp = weather.main.temp;
  ///   if (temp <= 10) return { backgroundColor: "#89CFF0" }; // Cold
  ///   if (temp <= 25) return { backgroundColor: "#FFD700" }; // Mild
  //  return { backgroundColor: "#FF4500" }; // Hot
  /// };
  ///

  const getBackgroundStyle = () => {
    if (!weather) return { backgroundColor: "#f0f8ff", color: "#000000" }; // Default
    const temp = weather.main.temp;
    if (temp <= 10) return { backgroundColor: "#89CFF0", color: "#FFFFFF" }; // Cold
    if (temp <= 25) return { backgroundColor: "#FFD700", color: "#000000" }; // Mild
    return { backgroundColor: "#FF4500", color: "#FFFFFF" }; // Hot
  };

  async function SearchData() {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_WEATHER_API_KEY
        }`
      );
      const response = await result.json();
      console.log(response);

      if (response.cod !== 200) {
        setError(response.message || "City not found");
        setWeather(null);
        setLoading(false);
        return;
      }

      setWeather(response);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      SearchData();
    }
  };

  return (
    <div className="myapp" style={getBackgroundStyle()}>
      <div>
        <h1>Weather Update</h1>
        <input
          type="text"
          className="searchInput"
          placeholder="Enter the city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="City Name"
        />
        <button onClick={SearchData} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      {weather && !loading && (
        <>
          <div className="temp">
            <p>{weather.main.temp}°C</p>
            <p>{weather.name}</p>
          </div>
          <div className="description">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
          <div className="details">
            <div>
              <p>{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div>
              <p>{weather.wind.speed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
