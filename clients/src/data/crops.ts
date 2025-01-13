import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/common/Navbar";
import { Footer } from "@/components/logincomponents/Footer";
import { cropData } from "../data/crops"; // Import crop data

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
    setIsLoading(true);
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
        setIsLoading(false);
      }
    }, 2000); // 2-second delay
  };

  const renderCropCard = () => {
    if (!predictedCrop) return null;

    const cropInfo = Object.values(cropData).flatMap((month) =>
      [...month.recommendedCrops, ...month.alternatives].find(
        (crop) => crop.name.toLowerCase() === predictedCrop.toLowerCase()
      )
    )[0];

    if (!cropInfo) {
      return (
        <p className="text-lg text-red-500">
          No detailed information available for the predicted crop.
        </p>
      );
    }

    return (
      <Card className="bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>{cropInfo.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img
            src={cropInfo.image}
            alt={cropInfo.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <p>{cropInfo.description}</p>
          <div>
            <h4 className="font-semibold">Growth Factors:</h4>
            <ul className="list-disc pl-5">
              <li>Soil Type: {cropInfo.growthFactors.soilType}</li>
              <li>Water Requirements: {cropInfo.growthFactors.waterRequirements}</li>
              <li>Temperature: {cropInfo.growthFactors.temperature}</li>
            </ul>
          </div>
          <p>
            Best Season(s): {cropInfo.season.join(", ")}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="container max-w-screen-xl mx-auto py-12 bg-black text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">
          Crop Prediction
        </h1>

        <div className="grid gap-8 lg:grid-cols-2 lg:max-w-5xl mx-auto">
          {/* Input Form */}
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Sliders for Input Parameters */}
              {/* Similar slider implementation as before */}
              {/* Add other input sliders here */}
              <Button
                onClick={handlePrediction}
                className="w-full bg-white text-black hover:bg-gray-300"
              >
                Generate Prediction
              </Button>
            </CardContent>
          </Card>

          {/* Prediction Result */}
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && <p>Loading...</p>}
              {!isLoading && predictedCrop && renderCropCard()}
              {!isLoading && !predictedCrop && (
                <p>No prediction available yet. Please input the data and generate prediction.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
