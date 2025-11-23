'use client';

import { ForecastDay, Units } from '@/types/weather';
import { getTemperature, formatDate } from '@/lib/utils/weatherHelpers';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import './TemperatureChart.css';

interface TemperatureChartProps {
  forecastDays: ForecastDay[];
  units: Units;
}

export default function TemperatureChart({
  forecastDays,
  units,
}: TemperatureChartProps) {
  const data = forecastDays.map((day) => ({
    date: formatDate(day.date),
    max: getTemperature(day.day.maxtemp_c, day.day.maxtemp_f, units.temperature),
    min: getTemperature(day.day.mintemp_c, day.day.mintemp_f, units.temperature),
    avg: getTemperature(day.day.avgtemp_c, day.day.avgtemp_f, units.temperature),
  }));

  const unit = units.temperature === 'celsius' ? '°C' : '°F';

  return (
    <div className="temperature-chart">
      <h3 className="chart-title">📈 Temperature Trend (10 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4ecdc4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4ecdc4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis
            dataKey="date"
            stroke="rgba(255, 255, 255, 0.8)"
            style={{ fontSize: '0.75rem' }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.8)"
            style={{ fontSize: '0.75rem' }}
            label={{
              value: `Temperature (${unit})`,
              angle: -90,
              position: 'insideLeft',
              style: { fill: 'rgba(255, 255, 255, 0.8)' },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: '#fff',
            }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number) => [`${value}${unit}`, '']}
          />
          <Area
            type="monotone"
            dataKey="max"
            stroke="#ff6b6b"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMax)"
            name="Max Temp"
          />
          <Area
            type="monotone"
            dataKey="min"
            stroke="#4ecdc4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorMin)"
            name="Min Temp"
          />
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#ffd93d"
            strokeWidth={2}
            dot={{ fill: '#ffd93d', r: 4 }}
            name="Avg Temp"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ff6b6b' }}></span>
          <span>Max Temperature</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#ffd93d' }}></span>
          <span>Average Temperature</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4ecdc4' }}></span>
          <span>Min Temperature</span>
        </div>
      </div>
    </div>
  );
}

