'use client';

import { WeatherData, Units } from '@/types/weather';
import {
  getTemperature,
  getClothingRecommendation,
  getActivitySuitability,
} from '@/lib/utils/weatherHelpers';
import './WeatherCard.css';

interface WeatherCardProps {
  weatherData: WeatherData;
  units: Units;
}

export default function WeatherCard({ weatherData, units }: WeatherCardProps) {
  const { current, location } = weatherData;
  const temp = getTemperature(
    current.temp_c,
    current.temp_f,
    units.temperature
  );
  const feelsLike = getTemperature(
    current.feelslike_c,
    current.feelslike_f,
    units.temperature
  );
  const clothingRecs = getClothingRecommendation(
    temp,
    units.temperature,
    current.condition.text
  );
  const activities = getActivitySuitability(weatherData);

  return (
    <div className="weather-card glass-card">
      <div className="weather-header">
        <div>
          <h2 className="location-name">
            {location.name}, {location.country}
          </h2>
          <p className="location-time">{location.localtime}</p>
        </div>
        <img
          src={current.condition.icon.replace('64x64', '128x128')}
          alt={current.condition.text}
          className="weather-icon-large"
        />
      </div>

      <div className="weather-main">
        <div className="temperature-display">
          <span className="temperature-value">{temp}°</span>
          <span className="temperature-unit">
            {units.temperature === 'celsius' ? 'C' : 'F'}
          </span>
        </div>
        <p className="weather-description">{current.condition.text}</p>
        <p className="feels-like">Feels like {feelsLike}°</p>
      </div>

      <div className="weather-stats">
        <div className="stat-item">
          <span className="stat-label">💧 Humidity</span>
          <span className="stat-value">{current.humidity}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">💨 Wind</span>
          <span className="stat-value">
            {units.windSpeed === 'kph'
              ? `${current.wind_kph} km/h`
              : `${current.wind_mph} mph`}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">☁️ Cloud</span>
          <span className="stat-value">{current.cloud}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">👁️ Visibility</span>
          <span className="stat-value">
            {units.distance === 'km'
              ? `${current.vis_km} km`
              : `${current.vis_miles} miles`}
          </span>
        </div>
      </div>

      {clothingRecs.length > 0 && (
        <div className="clothing-recommendations">
          <h3>👔 Clothing Recommendations</h3>
          <div className="recommendations-list">
            {clothingRecs.map((rec, index) => (
              <span key={index} className="recommendation-tag">
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="activity-suitability">
        <h3>🏃 Activity Suitability</h3>
        <div className="activities-grid">
          <div className="activity-item">
            <span className="activity-name">Running</span>
            <div className="activity-bar">
              <div
                className="activity-fill"
                style={{ width: `${activities.running.score}%` }}
              />
            </div>
            <span className="activity-score">{activities.running.score}%</span>
          </div>
          <div className="activity-item">
            <span className="activity-name">Cycling</span>
            <div className="activity-bar">
              <div
                className="activity-fill"
                style={{ width: `${activities.cycling.score}%` }}
              />
            </div>
            <span className="activity-score">{activities.cycling.score}%</span>
          </div>
          <div className="activity-item">
            <span className="activity-name">Picnic</span>
            <div className="activity-bar">
              <div
                className="activity-fill"
                style={{ width: `${activities.picnic.score}%` }}
              />
            </div>
            <span className="activity-score">{activities.picnic.score}%</span>
          </div>
          <div className="activity-item">
            <span className="activity-name">Drying</span>
            <div className="activity-bar">
              <div
                className="activity-fill"
                style={{ width: `${activities.drying.score}%` }}
              />
            </div>
            <span className="activity-score">{activities.drying.score}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

