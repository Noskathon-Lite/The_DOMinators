import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/common/Navbar";
import { Footer } from "@/components/logincomponents/Footer";

export default function Prediction() {
  const [temperature, setTemperature] = useState([38]);
  const [rainfall, setRainfall] = useState([250]);
  const [humidity, setHumidity] = useState([68]);
  const [nitrogen, setNitrogen] = useState([34]);
  const [phosphorous, setPhosphorous] = useState([32]);
  const [potassium, setPotassium] = useState([64]);
  const [ph, setPh] = useState([6.5]);
  const [isLoading, setIsLoading] = useState(false);

  const [predictedCrop, setPredictedCrop] = useState<string | null>(null);

  const handlePrediction = async () => {
    setIsLoading(true); // Start loading state
    setTimeout(async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            N: nitrogen[0],
            P: phosphorous[0],
            K: potassium[0],
            temperature: temperature[0],
            humidity: humidity[0],
            ph: ph[0],
            rainfall: rainfall[0],
          }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert("Prediction failed: " + errorData.message);
          return;
        }
  
        const data = await response.json();
        setPredictedCrop(data.predicted_crop); // Set the predicted crop
      } catch (error) {
        alert("Error while connecting to the prediction API.");
      } finally {
        setIsLoading(false); // End loading state
      }
    }, 2000); // 2-second delay
  };
  
  return (
    <div>
      <Navbar />
      <div className="container max-w-screen-xl mx-auto py-12 bg-black text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Crop Prediction
        </h1>

        <div className="grid gap-8 lg:grid-cols-2 lg:max-w-5xl mx-auto">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nitrogen */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Nitrogen (N): {nitrogen} units
                </label>
                <Slider
                  value={nitrogen}
                  onValueChange={setNitrogen}
                  min={0}
                  max={100}
                  step={1}
                  className="bg-gray-700"
                />
              </div>

              {/* Phosphorous */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Phosphorous (P): {phosphorous} units
                </label>
                <Slider
                  value={phosphorous}
                  onValueChange={setPhosphorous}
                  min={0}
                  max={100}
                  step={1}
                  className="bg-gray-700"
                />
              </div>

              {/* Potassium */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Potassium (K): {potassium} units
                </label>
                <Slider
                  value={potassium}
                  onValueChange={setPotassium}
                  min={0}
                  max={100}
                  step={1}
                  className="bg-gray-700"
                />
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Temperature (°C): {temperature}°C
                </label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={50}
                  step={1}
                  className="bg-gray-700"
                />
              </div>

              {/* Humidity */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Humidity (%): {humidity}%
                </label>
                <Slider
                  value={humidity}
                  onValueChange={setHumidity}
                  min={0}
                  max={100}
                  step={1}
                  className="bg-gray-700"
                />
              </div>

              {/* pH */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Soil pH: {ph}
                </label>
                <Slider
                  value={ph}
                  onValueChange={setPh}
                  min={0}
                  max={14}
                  step={0.1}
                  className="bg-gray-700"
                />
              </div>

              {/* Rainfall */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Rainfall (mm): {rainfall}mm
                </label>
                <Slider
                  value={rainfall}
                  onValueChange={setRainfall}
                  min={0}
                  max={500}
                  step={10}
                  className="bg-gray-700"
                />
              </div>

              {/* Prediction Button */}
              <Button
                onClick={handlePrediction}
                className="w-full bg-white text-black hover:bg-gray-300"
              >
                Generate Prediction
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {
                  isLoading && <p>Loading...</p>
                }

                {predictedCrop ? (
                  <p className="text-3xl font-bold">
                    Predicted Crop: {predictedCrop}
                  </p>
                ) : (
                  <p>No prediction available yet. Please input the data and generate prediction.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
