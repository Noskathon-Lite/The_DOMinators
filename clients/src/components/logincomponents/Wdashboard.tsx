import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';
import { WeatherForecast } from './types'; // Assuming you have this type file

// Interface for the weather data coming from OpenWeatherMap API
interface OpenWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    rain?: {
      '3h': number;
    };
  }>;
  city: {
    name: string;
    country: string;
  };
}

interface Props {
  lat: number;
  lon: number;
  apiKey: string;
}

export function WeatherDashboard({ lat, lon, apiKey }: Props) {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<'temperature' | 'humidity' | 'rain'>('temperature'); // To manage tab selection

  // Function to convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number) => (kelvin - 273.15).toFixed(1);

  // Function to process the raw weather data
  const processWeatherData = (list: any[]) => {
    return list.map((item) => ({
      date: format(new Date(item.dt_txt), 'MMM d, HH:mm'),
      temperature: Number(kelvinToCelsius(item.main.temp)),
      humidity: item.main.humidity,
      rain: item.rain?.['3h'] || 0,
    }));
  };

  // Fetch weather data from the OpenWeatherMap API
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );
        const data: OpenWeatherResponse = await response.json();
        if (data.cod === '200') {
          const processedData = processWeatherData(data.list);
          setWeatherData(processedData);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon, apiKey]);

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading weather data...</div>;
  }

  const data = weatherData;

  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Weather Forecast for {weatherData[0]?.date ? weatherData[0]?.date.split(' ')[0] : 'today'}
      </h2>

      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mr-4 ${selectedTab === 'temperature' ? 'bg-blue-500 text-white' : 'bg-blue-200'}`}
          onClick={() => setSelectedTab('temperature')}
        >
          Temperature
        </button>
        <button
          className={`px-4 py-2 mr-4 ${selectedTab === 'humidity' ? 'bg-green-500 text-white' : 'bg-green-200'}`}
          onClick={() => setSelectedTab('humidity')}
        >
          Humidity
        </button>
        <button
          className={`px-4 py-2 ${selectedTab === 'rain' ? 'bg-purple-500 text-white' : 'bg-purple-200'}`}
          onClick={() => setSelectedTab('rain')}
        >
          Rainfall
        </button>
      </div>

      {/* Chart for selected tab */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          {selectedTab === 'temperature' ? 'Temperature (°C)' : selectedTab === 'humidity' ? 'Humidity (%)' : 'Rainfall (mm)'}
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={70} />
            <YAxis
              label={{
                value: selectedTab === 'temperature'
                  ? 'Temperature (°C)'
                  : selectedTab === 'humidity'
                  ? 'Humidity (%)'
                  : 'Rainfall (mm)',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedTab}
              stroke={selectedTab === 'temperature' ? '#2196F3' : selectedTab === 'humidity' ? '#4CAF50' : '#9C27B0'}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Temperature Display */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Current Temperature (°C)</h3>
          <div className="text-3xl font-bold">
            {kelvinToCelsius(weatherData[0].temperature)}°C
          </div>
        </div>

        {/* Humidity Display */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Current Humidity (%)</h3>
          <div className="text-3xl font-bold">
            {weatherData[0].humidity}%
          </div>
        </div>

        {/* Rainfall Display */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Current Rainfall (mm)</h3>
          <div className="text-3xl font-bold">
            {weatherData[0].rain} mm
          </div>
        </div>
      </div>
    </div>
  );
}
