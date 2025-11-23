'use client';

import { WeatherData, Units } from '@/types/weather';
import { getAQIInfo, getUVInfo, getDistance } from '@/lib/utils/weatherHelpers';
import TemperatureChart from './TemperatureChart';
import './WeatherDetails.css';

interface WeatherDetailsProps {
  weatherData: WeatherData;
  units: Units;
}

export default function WeatherDetails({ weatherData, units }: WeatherDetailsProps) {
  const { current, forecast } = weatherData;
  const aqiInfo = getAQIInfo(
    current.air_quality?.['us-epa-index'] ||
    current.air_quality?.['gb-defra-index'] ||
    undefined
  );
  const uvInfo = getUVInfo(current.uv);
  const visibility = getDistance(current.vis_km, current.vis_miles, units.distance);

  return (
    <div className="weather-details glass-card">
      <h2 className="forecast-title">📊 Advanced Weather Data</h2>

      <div className="details-grid">
        {/* Air Quality Index */}
        {current.air_quality && (
          <div className="detail-card aqi-card">
            <div className="detail-card-header">
              <h3>🌬️ Air Quality Index</h3>
              {aqiInfo && (
                <span
                  className="aqi-badge"
                  style={{
                    backgroundColor: aqiInfo.bgColor,
                    color: aqiInfo.color,
                  }}
                >
                  {aqiInfo.label}
                </span>
              )}
            </div>
            <div className="aqi-details">
              <div className="aqi-item">
                <span className="aqi-label">PM2.5</span>
                <span className="aqi-value">{current.air_quality.pm2_5.toFixed(1)}</span>
              </div>
              <div className="aqi-item">
                <span className="aqi-label">PM10</span>
                <span className="aqi-value">{current.air_quality.pm10.toFixed(1)}</span>
              </div>
              <div className="aqi-item">
                <span className="aqi-label">O3</span>
                <span className="aqi-value">{current.air_quality.o3.toFixed(1)}</span>
              </div>
              <div className="aqi-item">
                <span className="aqi-label">NO2</span>
                <span className="aqi-value">{current.air_quality.no2.toFixed(1)}</span>
              </div>
            </div>
          </div>
        )}

        {/* UV Index */}
        <div className="detail-card uv-card">
          <div className="detail-card-header">
            <h3>☀️ UV Index</h3>
            <span
              className="uv-badge"
              style={{
                color: uvInfo.color,
              }}
            >
              {uvInfo.label} ({current.uv})
            </span>
          </div>
          <div className="uv-bar">
            <div
              className="uv-fill"
              style={{
                width: `${Math.min((current.uv / 11) * 100, 100)}%`,
                backgroundColor: uvInfo.color,
              }}
            />
          </div>
          <p className="uv-recommendation">
            {current.uv <= 2
              ? 'Low risk. Protection not required.'
              : current.uv <= 5
              ? 'Moderate risk. Seek shade during midday hours.'
              : current.uv <= 7
              ? 'High risk. Protection required. Avoid midday sun.'
              : current.uv <= 10
              ? 'Very high risk. Extra protection needed.'
              : 'Extreme risk. Avoid sun exposure.'}
          </p>
        </div>

        {/* Visibility */}
        <div className="detail-card">
          <div className="detail-card-header">
            <h3>👁️ Visibility</h3>
          </div>
          <div className="detail-value-large">
            {visibility} {units.distance === 'km' ? 'km' : 'miles'}
          </div>
        </div>

        {/* Pressure */}
        <div className="detail-card">
          <div className="detail-card-header">
            <h3>📊 Pressure</h3>
          </div>
          <div className="detail-value-large">
            {units.distance === 'km'
              ? `${current.pressure_mb} mb`
              : `${current.pressure_in.toFixed(2)} in`}
          </div>
        </div>

        {/* Dew Point */}
        <div className="detail-card">
          <div className="detail-card-header">
            <h3>💧 Dew Point</h3>
          </div>
          <div className="detail-value-large">
            {units.temperature === 'celsius'
              ? `${forecast.forecastday[0].hour[0].dewpoint_c.toFixed(1)}°C`
              : `${forecast.forecastday[0].hour[0].dewpoint_f.toFixed(1)}°F`}
          </div>
        </div>

        {/* Wind Direction */}
        <div className="detail-card">
          <div className="detail-card-header">
            <h3>🧭 Wind Direction</h3>
          </div>
          <div className="wind-direction">
            <div
              className="wind-arrow"
              style={{
                transform: `rotate(${current.wind_degree}deg)`,
              }}
            >
              ➤
            </div>
            <span className="wind-dir-text">{current.wind_dir}</span>
          </div>
        </div>
      </div>

      {/* Temperature Chart */}
      <div className="chart-container">
        <TemperatureChart forecastDays={forecast.forecastday} units={units} />
      </div>
    </div>
  );
}

