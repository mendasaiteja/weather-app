import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import SearchBar from "./SearchBar";
import Info from "./Info";

export default function WeatherApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [background, setBackground] = useState('default');
  const [weatherInfo, setWeatherInfo] = useState({
    city: 'Delhi',
    FeelsLike: 35.55,
    Humidity: 35,
    Temperature: 34.83,
    TemperatureMaximum: 34.83,
    TemperatureMinimum: 34.83,
    Country: 'IN',
    Description: 'overcast clouds'
  });

  const updateInfo = (res) => {
    setWeatherInfo(res);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (weatherInfo.Description.includes('rain')) {
      setBackground('rainy');
    } else if (weatherInfo.Temperature < 20) {
      setBackground('cold');
    } else if (weatherInfo.Temperature > 25) {
      setBackground('hot');
    } else {
      setBackground('default');
    }
  }, [weatherInfo]);

  return (
    <div className={`weather-app ${darkMode ? `dark ${background}` : background}`} style={{ textAlign: 'center' }}>
      <div className="header">
        <h1>Weather App</h1>
        <button
          onClick={toggleDarkMode}
          className="theme-toggle"
          style={{ color: darkMode ? 'white' : 'black' }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

      </div>
      <SearchBar updateInfo={updateInfo} darkMode={darkMode} />
      <Info info={weatherInfo} />
    </div>
  );
}
