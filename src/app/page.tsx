"use client";

import { useState, useEffect, useCallback } from "react";
import { WeatherData, Units } from "@/types/weather";
import {
  getWeatherByCity,
  getWeatherByCoordinates,
} from "@/lib/services/weatherService";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import WeatherDetails from "@/components/WeatherDetails";
import UnitToggle from "@/components/UnitToggle";
import ThemeToggle from "@/components/ThemeToggle";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import Navigation from "@/components/Navigation";
import { getBackgroundGradient } from "@/lib/utils/weatherHelpers";
import "./page.css";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    windSpeed: "kph",
    distance: "km",
  });
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // Update theme when changed
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await getWeatherByCity(query);
      setWeather(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserLocation = useCallback(() => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const data = await getWeatherByCoordinates(latitude, longitude);
          setWeather(data);
        } catch (err: any) {
          setError(err.message || "Error fetching weather for your location");
          setWeather(null);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Location access denied. Please search for a city manually.");
        setLoading(false);
      }
    );
  }, []);

  // Try to get user's location weather when component mounts
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const toggleUnits = () => {
    setUnits((prev) => ({
      temperature: prev.temperature === "celsius" ? "fahrenheit" : "celsius",
      windSpeed: prev.windSpeed === "kph" ? "mph" : "kph",
      distance: prev.distance === "km" ? "miles" : "km",
    }));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const backgroundGradient = weather
    ? getBackgroundGradient(weather)
    : "linear-gradient(to bottom, #87CEEB, #4169E1)";

  return (
    <main className="main-container" style={{ background: backgroundGradient }}>
      <div className="container">
        <header className="header">
          <h1>🌦️ Weather App</h1>
          <div className="header-controls">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <UnitToggle units={units} onToggle={toggleUnits} />
          </div>
        </header>

        <Navigation />

        <SearchBar onSearch={handleSearch} />

        <button
          className="location-btn"
          onClick={getUserLocation}
          disabled={loading}
        >
          📍 Use My Location
        </button>

        {loading && <LoadingSkeleton />}

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError("")} />
        )}

        {weather && !loading && (
          <>
            <WeatherCard weatherData={weather} units={units} />
            <HourlyForecast
              forecastDay={weather.forecast.forecastday[0]}
              units={units}
            />
            <DailyForecast
              forecastDays={weather.forecast.forecastday}
              units={units}
            />
            <WeatherDetails weatherData={weather} units={units} />
          </>
        )}

        <footer className="info-footer">
          <p>Data provided by WeatherAPI.com</p>
          <p>
            Search for any city in the world to get current weather and
            forecasts
          </p>
        </footer>
      </div>
    </main>
  );
}
