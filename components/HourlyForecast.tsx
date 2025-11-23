'use client';

import { ForecastDay, Units } from '@/types/weather';
import { getTemperature, formatTime } from '@/lib/utils/weatherHelpers';
import './HourlyForecast.css';

interface HourlyForecastProps {
  forecastDay: ForecastDay;
  units: Units;
}

export default function HourlyForecast({ forecastDay, units }: HourlyForecastProps) {
  const currentHour = new Date().getHours();
  const upcomingHours = forecastDay.hour.filter((hour) => {
    const hourDate = new Date(hour.time);
    return hourDate.getHours() >= currentHour;
  }).slice(0, 24);

  if (upcomingHours.length === 0) {
    return null;
  }

  return (
    <div className="hourly-forecast glass-card">
      <h2 className="forecast-title">⏰ Hourly Forecast</h2>
      <div className="hourly-scroll">
        {upcomingHours.map((hour, index) => {
          const temp = getTemperature(hour.temp_c, hour.temp_f, units.temperature);
          const time = formatTime(hour.time);
          const isCurrentHour = index === 0;

          return (
            <div
              key={hour.time_epoch}
              className={`hour-item ${isCurrentHour ? 'current-hour' : ''}`}
            >
              <div className="hour-time">{index === 0 ? 'Now' : time.split(' ')[0]}</div>
              <img
                src={hour.condition.icon.replace('64x64', '128x128')}
                alt={hour.condition.text}
                className="hour-icon"
              />
              <div className="hour-temp">{temp}°</div>
              <div className="hour-precip">
                {hour.chance_of_rain > 0 && `💧 ${hour.chance_of_rain}%`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

