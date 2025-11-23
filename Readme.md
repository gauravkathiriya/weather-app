# 🌦️ Weather App - Advanced Weather Forecast

A modern, feature-rich weather application built with Next.js, TypeScript, and WeatherAPI.com. This app provides comprehensive weather information including forecasts, air quality, UV index, and smart recommendations.

## ✨ Features

### Essential Features (MVP)
- ✅ **Real-Time Weather Data**: Current temperature, humidity, wind speed, and conditions
- ✅ **Location Search**: Search for any city globally with autocomplete suggestions
- ✅ **Geolocation Support**: Automatic weather fetching based on your current location
- ✅ **Hourly Forecast**: Scrollable view for the next 24 hours
- ✅ **Daily Forecast**: 10-day forecast with detailed information
- ✅ **Unit Conversion**: Toggle between Celsius/Fahrenheit and Metric/Imperial systems

### Visual & UI Enhancements
- ✅ **Dynamic Backgrounds**: Background changes based on weather condition and time of day
- ✅ **Glassmorphism UI**: Modern semi-transparent, frosted-glass card design
- ✅ **Dark/Light Mode**: Automatic switching based on system preference or manual toggle
- ✅ **Responsive Design**: Fully optimized for mobile and desktop devices

### Advanced Weather Data
- ✅ **Air Quality Index (AQI)**: Pollution levels with color-coded indicators
- ✅ **UV Index**: Current UV levels with recommendations for sun protection
- ✅ **Sunrise & Sunset Times**: Displayed for each day
- ✅ **Moon Phases**: Current phase and illumination percentage
- ✅ **Visibility & Pressure**: Detailed atmospheric conditions

### Interactive Elements
- ✅ **Temperature Charts**: Visual trend charts using Recharts showing temperature over 10 days
- ✅ **Activity Suitability Scores**: Ratings for running, cycling, picnic, and drying activities

### Smart Features
- ✅ **Clothing Recommendations**: Smart suggestions based on temperature and conditions
- ✅ **Activity Suitability**: Scores and recommendations for various outdoor activities
- ✅ **"Feels Like" Temperature**: More accurate temperature perception

### Technical Features
- ✅ **PWA Support**: Installable as a Progressive Web App with offline capabilities
- ✅ **Error Handling**: User-friendly error messages with dismiss functionality
- ✅ **Loading Skeletons**: Smooth loading states with shimmer animations
- ✅ **Optimized Performance**: Fast page loads and smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```
   
   Get your free API key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Building for Production

```bash
npm run build
npm start
```

## 🔧 Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **WeatherAPI.com**: Weather data provider
- **Recharts**: Beautiful charts for data visualization
- **next-pwa**: Progressive Web App support
- **CSS Modules**: Scoped styling

## 📱 PWA Installation

This app is installable as a Progressive Web App:

1. **On Desktop (Chrome/Edge)**:
   - Click the install icon in the address bar
   - Or go to Settings → Apps → Install this site as an app

2. **On Mobile**:
   - Open the app in your browser
   - Tap the menu (three dots) → "Add to Home Screen"

## 🎨 Features in Detail

### Dynamic Backgrounds
The background changes automatically based on:
- Current weather condition (sunny, rainy, cloudy, etc.)
- Time of day (day/night mode)
- Weather severity

### Glassmorphism Design
Modern UI with:
- Semi-transparent cards
- Backdrop blur effects
- Smooth transitions
- Elegant shadows

### Smart Recommendations
- **Clothing**: Based on temperature and weather conditions
- **Activities**: Suitability scores for various outdoor activities
- **UV Protection**: Recommendations based on UV index levels

## 📝 API Usage

This app uses the [WeatherAPI.com](https://www.weatherapi.com/) API, which provides:
- Current weather data
- Hourly forecasts
- Daily forecasts (up to 14 days)
- Air quality data
- Astronomy data (sunrise, sunset, moon phases)
- Search functionality for cities

The free tier includes:
- 1 million calls per month
- Real-time weather
- 3-day forecast
- History data
- Sports weather
- Time zone
- Astronomy

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for providing excellent weather data
- [Next.js](https://nextjs.org/) team for the amazing framework
- All contributors and users of this project

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ using Next.js and WeatherAPI.com
