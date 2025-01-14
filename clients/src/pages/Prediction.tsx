import React, { useEffect, useState } from "react";


import type { WeatherForecast, CropRecommendationInput, CropRecommendation } from "./types";
import { Cloud, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/common/Navbar";
import { Footer } from "@/components/logincomponents/Footer";
import { WeatherDashboard } from "@/components/logincomponents/Wdashboard";
 const api='aa5353c3143331890ace358e11b2e067';
 const lat=44.34;
 const lon=10.99;
const getMockRecommendation = (data: CropRecommendationInput): CropRecommendation => {
  if (data.soilPh < 6) {
    return { recommendedCrop: "Rice", confidence: 0.85 };
  } else if (data.temperature > 25 && data.humidity > 70) {
    return { recommendedCrop: "Cotton", confidence: 0.92 };
  } else if (data.nitrogen > 40 && data.phosphorus > 30) {
    return { recommendedCrop: "Wheat", confidence: 0.78 };
  } else {
    return { recommendedCrop: "Maize", confidence: 0.88 };
  }
};

export default function Prediction() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const [recommendation, setRecommendation] = useState<CropRecommendation | null>(null);
  const [temperature, setTemperature] = useState([38]);
  const [rainfall, setRainfall] = useState([250]);
  const [humidity, setHumidity] = useState([68]);
  const [nitrogen, setNitrogen] = useState([34]);
  const [phosphorous, setPhosphorous] = useState([32]);
  const [potassium, setPotassium] = useState([64]);
  const [ph, setPh] = useState([6.5]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const mockData: WeatherForecast[] = Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          temperature: Math.random() * 30 + 10,
          humidity: Math.random() * 100,
          rainfall: Math.random() * 50,
        }));
        setForecasts(mockData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
      }
    };

    fetchWeatherData();
  }, []);

  const handlePrediction = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const data: CropRecommendationInput = {
          nitrogen: nitrogen[0],
          phosphorus: phosphorous[0],
          potassium: potassium[0],
          temperature: temperature[0],
          humidity: humidity[0],
          soilPh: ph[0],
          rainfall: rainfall[0],
        };
  
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const result = await response.json();
        
        // Map the API response to the CropRecommendation type
        setRecommendation({
          recommendedCrop: result.predicted_crop,  // Extracted from API response
          confidence: 0.9,  // Placeholder confidence as API response does not have it
        });
      } catch (error) {
        console.error("Prediction API call failed, using mock data", error);
        const mockResult = getMockRecommendation({
          nitrogen: nitrogen[0],
          phosphorus: phosphorous[0],
          potassium: potassium[0],
          temperature: temperature[0],
          humidity: humidity[0],
          soilPh: ph[0],
          rainfall: rainfall[0],
        });
        setRecommendation(mockResult);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };
  

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-green-200 to-white text-white">
      <Navbar />
      <div className="container max-w-screen-xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Crop Prediction</h1>

        <WeatherDashboard lat={lat} apiKey={api} lon={lon} />

        <div className="grid gap-8 lg:grid-cols-2 lg:max-w-5xl mx-auto mt-10">
          <Card className="bg-gray-800 text-black">
            <CardHeader>
              <CardTitle className="text-white">Input Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Nitrogen (N): {nitrogen}</label>
                <Slider value={nitrogen} onValueChange={setNitrogen} min={0} max={100} step={1} className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Phosphorous (P): {phosphorous}</label>
                <Slider value={phosphorous} onValueChange={setPhosphorous} min={0} max={100} step={1} className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Potassium (K): {potassium}</label>
                <Slider value={potassium} onValueChange={setPotassium} min={0} max={100} step={1} className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Temperature (°C): {temperature}°C</label>
                <Slider value={temperature} onValueChange={setTemperature} min={0} max={50} step={1} className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Humidity (%): {humidity}%</label>
                <Slider value={humidity} onValueChange={setHumidity} min={0} max={100} step={1} className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Soil pH: {ph}</label>
                <Slider value={ph} onValueChange={setPh} min={0} max={14} step={0.1} className="bg-gray-700" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Rainfall (mm): {rainfall}mm</label>
                <Slider value={rainfall} onValueChange={setRainfall} min={0} max={500} step={10} className="bg-gray-700" />
              </div>
              <Button onClick={handlePrediction} className="w-full">
                {isLoading ? "Predicting..." : "Get Recommendation"}
              </Button>
            </CardContent>
          </Card>

          {recommendation && (
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Recommendation Result</h2>
              <p className="text-lg">
                Recommended Crop: <span className="font-semibold">{recommendation.recommendedCrop}</span>
              </p>
              <p className="text-lg">
                Confidence: <span className="font-semibold">{(recommendation.confidence * 100).toFixed(2)}%</span>
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )}