import React from 'react';
import WeatherWidget from './weather/WeatherWidget'; // Import the WeatherWidget component
const App = () => {
  return (
    <div className="app">
      <center>
        <h1>Weather App</h1>
      </center>
      <WeatherWidget />
    
    </div>
  );
};

export default App;