import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherProps {
  weatherData: WeatherData;
}

const Weather: React.FC<WeatherProps> = ({ weatherData }) => {
  // Convert timestamp to readable time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="weather-info">
      <h2>{weatherData.name}, {weatherData.sys.country}</h2>
      <div className="weather-main">
        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
          alt={weatherData.weather[0].description}
        />
        <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
      </div>
      <p className="description">{weatherData.weather[0].description}</p>
      <div className="weather-details">
        <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind: {weatherData.wind.speed} m/s</p>
      </div>
      <div className="sun-info">
        <p>Sunrise: {formatTime(weatherData.sys.sunrise)}</p>
        <p>Sunset: {formatTime(weatherData.sys.sunset)}</p>
      </div>
    </div>
  );
};

export default Weather; 