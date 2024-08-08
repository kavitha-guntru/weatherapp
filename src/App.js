import React from 'react';
import WeatherWidget from './weather/WeatherWidget'; // Import the WeatherWidget component


const App = () => {
  return (
    <div className="app">
      <h1>Weather App</h1>
      <WeatherWidget />
    </div>
  );
};

export default App;