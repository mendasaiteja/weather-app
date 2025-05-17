import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBar.css';

export default function SearchBar({ updateInfo,darkMode}) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const API_KEY = "647f56b5afd57e948dce161b8f05db98";

  const handleChange = (e) => {
    setCity(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      // Geocoding
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoRes.json();
      if (!geoData.length) {
        throw new Error("City not found");
      }
      const { lat, lon } = geoData[0];

      // Weather data
      const data = await getWeatherInfo(lat, lon);
      updateInfo({ ...data, city });
      setCity("");
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    }
  };

  const getWeatherInfo = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Weather data not available");
      const data = await response.json();
      return {
        FeelsLike: data.main.feels_like,
        Humidity: data.main.humidity,
        Temperature: data.main.temp,
        TemperatureMaximum: data.main.temp_max,
        TemperatureMinimum: data.main.temp_min,
        Country: data.sys.country,
        Description: data.weather[0].description,
      };
    } catch (err) {
      throw new Error("No such place in API");
    }
  };

  return (
    <div className="box">
      <form onSubmit={handleSubmit} className={`form-container ${darkMode}`}>
        <TextField
          id="city"
          label="City"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
           sx={{
            input: {
              color: darkMode ? 'white' : 'black',
              backgroundColor: darkMode ? '#333' : 'white'
            },
            label: {
              color: darkMode ? 'white' : 'black',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: darkMode ? 'white' : 'black',
              },
              '&:hover fieldset': {
                borderColor: darkMode ? '#ddd' : 'black',
              },
              '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#90caf9' : 'blue',
              },
            },
          }}
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p className="error-text" style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  );
}
