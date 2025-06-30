import axios from 'axios';
import { WeatherData } from '../types/weather';

// Use environment variable if available, otherwise use a placeholder
const API_KEY = process.env.REACT_APP_API_KEY || 'YOUR_API_KEY';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 