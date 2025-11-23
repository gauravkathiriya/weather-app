'use client';

import { ForecastDay, Units } from '@/types/weather';
import { getTemperature, formatDate, getMoonPhaseEmoji } from '@/lib/utils/weatherHelpers';
import './DailyForecast.css';

interface DailyForecastProps {
  forecastDays: ForecastDay[];
  units: Units;
}

export default function DailyForecast({ forecastDays, units }: DailyForecastProps) {
  return (
    <div className="daily-forecast glass-card">
      <h2 className="forecast-title">📅 10-Day Forecast</h2>
      <div className="forecast-list">
        {forecastDays.map((day, index) => {
          const maxTemp = getTemperature(
            day.day.maxtemp_c,
            day.day.maxtemp_f,
            units.temperature
          );
          const minTemp = getTemperature(
            day.day.mintemp_c,
            day.day.mintemp_f,
            units.temperature
          );
          const date = index === 0 ? 'Today' : formatDate(day.date);
          const moonEmoji = getMoonPhaseEmoji(day.astro.moon_phase);

          return (
            <div key={day.date_epoch} className="forecast-day">
              <div className="day-header">
                <div className="day-date">
                  <span className="date-text">{date}</span>
                  {index === 0 && <span className="today-badge">Today</span>}
                </div>
                <div className="day-moon">
                  <span className="moon-phase">{moonEmoji}</span>
                  <span className="moon-text">{day.astro.moon_phase}</span>
                </div>
              </div>

              <div className="day-main">
                <div className="day-condition">
                  <img
                    src={day.day.condition.icon.replace('64x64', '128x128')}
                    alt={day.day.condition.text}
                    className="day-icon"
                  />
                  <span className="day-desc">{day.day.condition.text}</span>
                </div>

                <div className="day-temps">
                  <span className="day-max">{maxTemp}°</span>
                  <span className="day-min">{minTemp}°</span>
                </div>
              </div>

              <div className="day-details">
                <div className="detail-item">
                  <span className="detail-label">🌅 Sunrise</span>
                  <span className="detail-value">{day.astro.sunrise}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🌇 Sunset</span>
                  <span className="detail-value">{day.astro.sunset}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">💧 Rain</span>
                  <span className="detail-value">{day.day.totalprecip_mm}mm</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">💨 Wind</span>
                  <span className="detail-value">
                    {units.windSpeed === 'kph'
                      ? `${day.day.maxwind_kph} km/h`
                      : `${day.day.maxwind_mph} mph`}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">☀️ UV</span>
                  <span className="detail-value">{day.day.uv}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🌙 Moon</span>
                  <span className="detail-value">{day.astro.moon_illumination}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

