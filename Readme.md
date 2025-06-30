# Weather App

A modern React weather application that displays current weather conditions for any city in the world or for your current location.

## Features

- Search for weather by city name
- Get weather for your current location
- Display current temperature, weather conditions, humidity, wind speed, and more
- Responsive design for desktop and mobile devices
- Error handling for invalid searches and API issues

## Technologies Used

- React 19
- TypeScript
- OpenWeatherMap API
- Axios for API requests
- CSS for styling

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- OpenWeatherMap API key - [Get one for free here](https://openweathermap.org/api)

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies
```
npm install
```

3. Create a `.env` file in the root directory and add your API key
```
REACT_APP_API_KEY=your_openweathermap_api_key_here
```

4. Start the development server
```
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Using the App

- Type a city name in the search box and press Enter or click the Search button
- Click the "Use My Location" button to get weather for your current location
- The weather information will display below the search box

## Building for Production

```
npm run build
```

This will create a `build` folder with optimized production files.

## Notes

- The free tier of OpenWeatherMap API has usage limitations
- For production use, consider upgrading to a paid plan if you expect high traffic
- HTTPS is required for using the geolocation feature in production
