/*import React, { useState, useEffect } from 'react';
import './Weatherapi.css'; // Import the CSS file for styling

const WeatherWidget = () => {
  const [city, setCity] = useState('London');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '7f8cd0e5f37e7c84ebda7806217724fe'; 
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('No Data found');
        const data = await response.json();
        setForecast(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const groupByDay = (data) => {
    const grouped = {};
    data.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = {
          tempMin: entry.main.temp,
          tempMax: entry.main.temp,
          description: entry.weather[0].description,
          icon: entry.weather[0].icon,
        };
      } else {
        grouped[date].tempMin = Math.min(grouped[date].tempMin, entry.main.temp);
        grouped[date].tempMax = Math.max(grouped[date].tempMax, entry.main.temp);
      }
    });
    return grouped;
  };

  const renderForecast = () => {
    if (!forecast || !forecast.list) return null;
    
    // Group data by day
    const groupedData = groupByDay(forecast.list);
    
    return (
      <div className="forecast-info">
        {Object.keys(groupedData).map((date, index) => (
          <div key={index} className="forecast-day">
            <h3>{date}</h3>
            <p>{groupedData[date].description}</p>
            <p>Temperature: {groupedData[date].tempMin}°C - {groupedData[date].tempMax}°C</p>
            <img
              src={`https://openweathermap.org/img/w/${groupedData[date].icon}.png`}
              alt="Weather icon"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="weather-widget">
      <form>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          aria-label="City input"
        />
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      {renderForecast()}
    </div>
  );
};

export default WeatherWidget;*/

import React, { useState, useEffect } from 'react';
import './Weatherapi.css'; // Import the CSS file for styling

const WeatherWidget = () => {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '7f8cd0e5f37e7c84ebda7806217724fe'; 
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="weather-widget">
      <form>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          aria-label="City input"
        />
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;



