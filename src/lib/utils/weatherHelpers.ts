import { WeatherData, Units, AQI_LEVELS, UV_LEVELS } from '@/types/weather';

// Get temperature with unit
export const getTemperature = (
  tempC: number,
  tempF: number,
  unit: Units['temperature']
): number => {
  return unit === 'celsius' ? Math.round(tempC) : Math.round(tempF);
};

// Get wind speed with unit
export const getWindSpeed = (
  kph: number,
  mph: number,
  unit: Units['windSpeed']
): number => {
  return unit === 'kph' ? Math.round(kph) : Math.round(mph);
};

// Get distance with unit
export const getDistance = (
  km: number,
  miles: number,
  unit: Units['distance']
): number => {
  return unit === 'km' ? Math.round(km) : Math.round(miles);
};

// Get AQI level and info
export const getAQIInfo = (aqiIndex?: number) => {
  if (!aqiIndex) return null;
  const level = Math.min(Math.max(Math.ceil(aqiIndex), 1), 6) as keyof typeof AQI_LEVELS;
  return AQI_LEVELS[level];
};

// Get UV level and info
export const getUVInfo = (uv: number) => {
  if (uv <= UV_LEVELS.low.max) return UV_LEVELS.low;
  if (uv <= UV_LEVELS.moderate.max) return UV_LEVELS.moderate;
  if (uv <= UV_LEVELS.high.max) return UV_LEVELS.high;
  if (uv <= UV_LEVELS.veryHigh.max) return UV_LEVELS.veryHigh;
  return UV_LEVELS.extreme;
};

// Get weather condition for background
export const getWeatherCondition = (weatherData: WeatherData): string => {
  const condition = weatherData.current.condition.text.toLowerCase();
  const code = weatherData.current.condition.code;
  const isDay = weatherData.current.is_day === 1;

  // Weather codes for weatherapi.com
  if (code === 1000) return isDay ? 'sunny' : 'clear-night';
  if (code >= 1003 && code <= 1006) return 'cloudy';
  if (code >= 1063 && code <= 1201) return 'rainy';
  if (code >= 1204 && code <= 1264) return 'snowy';
  if (code >= 1273 && code <= 1279) return 'stormy';
  if (code >= 1282) return 'stormy';
  if (condition.includes('fog') || condition.includes('mist')) return 'foggy';
  
  return isDay ? 'partly-cloudy' : 'cloudy-night';
};

// Get background gradient based on weather and time
export const getBackgroundGradient = (weatherData: WeatherData): string => {
  const condition = getWeatherCondition(weatherData);
  const hour = new Date(weatherData.location.localtime).getHours();
  const isDay = hour >= 6 && hour < 20;

  const gradients: Record<string, string> = {
    sunny: isDay
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
      : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    'clear-night': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    cloudy: isDay
      ? 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)'
      : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    'partly-cloudy': isDay
      ? 'linear-gradient(135deg, #87CEEB 0%, #4169E1 100%)'
      : 'linear-gradient(135deg, #1a1a2e 0%, #2c3e50 100%)',
    'cloudy-night': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    rainy: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #2c3e50 100%)',
    snowy: 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 50%, #9e9e9e 100%)',
    stormy: 'linear-gradient(135deg, #232526 0%, #414345 50%, #1a1a2e 100%)',
    foggy: 'linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)',
  };

  return gradients[condition] || gradients.cloudy;
};

// Clothing recommendation
export const getClothingRecommendation = (
  temp: number,
  unit: Units['temperature'],
  condition: string
): string[] => {
  const tempC = unit === 'celsius' ? temp : ((temp - 32) * 5) / 9;
  const recommendations: string[] = [];
  const conditionLower = condition.toLowerCase();

  // Temperature-based recommendations
  if (tempC >= 25) {
    recommendations.push('Light clothing');
    recommendations.push('Shorts/T-shirt');
  } else if (tempC >= 15) {
    recommendations.push('T-shirt/Shirt');
    recommendations.push('Light jacket optional');
  } else if (tempC >= 5) {
    recommendations.push('Sweater/Jacket');
    recommendations.push('Long pants');
  } else {
    recommendations.push('Warm coat');
    recommendations.push('Gloves and hat');
    recommendations.push('Multiple layers');
  }

  // Weather condition-based recommendations
  if (conditionLower.includes('rain')) {
    recommendations.push('☂️ Umbrella');
    recommendations.push('Waterproof jacket');
  }
  if (conditionLower.includes('snow')) {
    recommendations.push('Winter boots');
    recommendations.push('Warm layers');
  }
  if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
    recommendations.push('☀️ Sunscreen');
    recommendations.push('Sunglasses');
  }

  return recommendations;
};

// Activity suitability
export const getActivitySuitability = (weatherData: WeatherData): {
  running: { score: number; message: string };
  cycling: { score: number; message: string };
  picnic: { score: number; message: string };
  drying: { score: number; message: string };
} => {
  const condition = weatherData.current.condition.text.toLowerCase();
  const tempC = weatherData.current.temp_c;
  const windKph = weatherData.current.wind_kph;
  const humidity = weatherData.current.humidity;
  const precip = weatherData.current.precip_mm;

  const getScore = (
    tempCheck: boolean,
    windCheck: boolean,
    precipCheck: boolean,
    conditionCheck: boolean
  ): { score: number; message: string } => {
    let score = 50;
    if (tempCheck) score += 20;
    if (windCheck) score += 10;
    if (precipCheck) score += 20;
    if (conditionCheck) score += 10;

    let message = '';
    if (score >= 80) message = 'Excellent conditions';
    else if (score >= 60) message = 'Good conditions';
    else if (score >= 40) message = 'Fair conditions';
    else message = 'Poor conditions';

    return { score: Math.min(score, 100), message };
  };

  return {
    running: getScore(
      tempC >= 10 && tempC <= 25,
      windKph < 30,
      precip === 0,
      !condition.includes('rain') && !condition.includes('snow')
    ),
    cycling: getScore(
      tempC >= 5 && tempC <= 30,
      windKph < 25,
      precip === 0,
      !condition.includes('rain') && !condition.includes('snow')
    ),
    picnic: getScore(
      tempC >= 15 && tempC <= 28,
      windKph < 20,
      precip === 0,
      !condition.includes('rain')
    ),
    drying: getScore(
      tempC > 10,
      windKph > 5 && windKph < 25,
      precip === 0,
      !condition.includes('rain') && humidity < 70
    ),
  };
};

// Format time
export const formatTime = (timeString: string): string => {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

// Get moon phase emoji
export const getMoonPhaseEmoji = (phase: string): string => {
  const phases: Record<string, string> = {
    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full Moon': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘',
  };
  return phases[phase] || '🌙';
};

