import axios from 'axios';
import { WeatherData, WeatherSearchResponse } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Get weather by city name
export const getWeatherByCity = async (
  city: string,
  days: number = 10
): Promise<WeatherData> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    throw new Error('Weather API key is not configured. Please set NEXT_PUBLIC_WEATHER_API_KEY in your .env.local file');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=no`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('City not found. Please try a different city name.');
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('Invalid API key. Please check your WeatherAPI.com API key.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};

// Get weather by coordinates
export const getWeatherByCoordinates = async (
  lat: number,
  lon: number,
  days: number = 10
): Promise<WeatherData> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    throw new Error('Weather API key is not configured. Please set NEXT_PUBLIC_WEATHER_API_KEY in your .env.local file');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&aqi=yes&alerts=no`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('Location not found. Please try again.');
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error('Invalid API key. Please check your WeatherAPI.com API key.');
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};

// Search for cities
export const searchCities = async (query: string): Promise<WeatherSearchResponse[]> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    return [];
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

