import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import { WeatherData } from './types/weather';
import { getWeatherByCity, getWeatherByCoordinates } from './services/weatherService';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError('');
      
      const data = await getWeatherByCity(query);
      setWeather(data);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Invalid API key. Please check your OpenWeatherMap API key.');
      } else {
        setError('City not found. Please try again with a valid city name.');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getUserLocation = () => {
    setLoading(true);
    setError('');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeather(data);
          setLoading(false);
        } catch (err: any) {
          setError('Error fetching weather for your location');
          setWeather(null);
          setLoading(false);
        }
      },
      (err) => {
        setError('Location access denied. Please search for a city manually.');
        setLoading(false);
      }
    );
  };

  // Try to get user's location weather when component mounts
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        <button className="location-btn" onClick={getUserLocation}>
          Use My Location
        </button>
        
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        
        {weather && <Weather weatherData={weather} />}
        
        <div className="info-footer">
          <p>Data provided by OpenWeatherMap API</p>
          <p>Search for any city in the world to get current weather</p>
        </div>
      </header>
    </div>
  );
}

export default App;
