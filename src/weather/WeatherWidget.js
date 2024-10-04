

//finalone
import React, { useState, useEffect } from 'react';
import './Weatherapi.css'; // Import the CSS file for styling

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState('today');

  const API_KEY = '7f8cd0e5f37e7c84ebda7806217724fe';
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return;
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
  }, [city, URL]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const groupByDay = (data) => {
    const grouped = {};
    data.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = {
          date,
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

  const getBackgroundColor = (description) => {
    switch (description) {
      case 'light rain':
        return '#a0d1e6'; // light blue for rain
      case 'overcast clouds':
        return '#b0b0b0'; // gray for overcast
      case 'few clouds':
        return '#87ceeb'; // sky blue for few clouds
      default:
        return '#87cefa'; // sky blue as default
    }
  };

  const renderForecast = () => {
    if (!forecast || !forecast.list) return null;

    const groupedData = groupByDay(forecast.list);
    const forecastItems = Object.values(groupedData).map((dayData, index) => {
      const backgroundColor = getBackgroundColor(dayData.description);

      return (
        <div
          key={index}
          className="forecast-item"
          style={{ backgroundColor }}
        >
          <h3>{dayData.date}</h3>
          <p>{dayData.description}</p>
          <p>Temperature: {dayData.tempMin}°C - {dayData.tempMax}°C</p>
         
        </div>
      );
    });

    return (
      <div className="forecast-container">
        {forecastItems}
      </div>
    );
  };

  return (
    <div className="weather-widget">
      <div className="content">
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
    </div>
  );
};

export default WeatherWidget;

