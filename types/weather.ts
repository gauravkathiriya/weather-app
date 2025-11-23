// WeatherAPI.com Types
export interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  is_day: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  air_quality?: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    'us-epa-index': number;
    'gb-defra-index': number;
  };
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
    air_quality?: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      'us-epa-index': number;
      'gb-defra-index': number;
    };
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: number;
    is_sun_up: number;
  };
  hour: Array<{
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    is_day: number;
  }>;
}

export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface WeatherSearchResponse {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kph' | 'mph';
export type DistanceUnit = 'km' | 'miles';

export interface Units {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  distance: DistanceUnit;
}

// AQI Levels
export const AQI_LEVELS = {
  1: { label: 'Good', color: '#00e400', bgColor: 'rgba(0, 228, 0, 0.2)' },
  2: { label: 'Moderate', color: '#ffff00', bgColor: 'rgba(255, 255, 0, 0.2)' },
  3: { label: 'Unhealthy for Sensitive Groups', color: '#ff7e00', bgColor: 'rgba(255, 126, 0, 0.2)' },
  4: { label: 'Unhealthy', color: '#ff0000', bgColor: 'rgba(255, 0, 0, 0.2)' },
  5: { label: 'Very Unhealthy', color: '#8f3f97', bgColor: 'rgba(143, 63, 151, 0.2)' },
  6: { label: 'Hazardous', color: '#7e0023', bgColor: 'rgba(126, 0, 35, 0.2)' },
} as const;

// UV Index Levels
export const UV_LEVELS = {
  low: { max: 2, label: 'Low', color: '#00e400' },
  moderate: { max: 5, label: 'Moderate', color: '#ffff00' },
  high: { max: 7, label: 'High', color: '#ff7e00' },
  veryHigh: { max: 10, label: 'Very High', color: '#ff0000' },
  extreme: { max: Infinity, label: 'Extreme', color: '#8f3f97' },
} as const;

