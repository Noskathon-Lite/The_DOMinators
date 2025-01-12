import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Navbar from '@/components/common/Navbar';
import { Footer } from '@/components/logincomponents/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCropPrediction } from '@/store/cropSlice';


export default function Prediction() {
  const [temperature, setTemperature] = useState([25]);
  const [rainfall, setRainfall] = useState([150]);
  const [ph, setPh] = useState([6.5]);
  const [cropType, setCropType] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { predictionResult, loading, error } = useSelector((state) => state.crop); // Fetch prediction state from Redux

  const handlePrediction = async () => {
    if (!cropType) {
      alert("Please select a crop type");
      return;
    }

    // Dispatch the action to get the prediction result from the Redux store
    dispatch(fetchCropPrediction({
      cropType,
      temperature: temperature[0],
      rainfall: rainfall[0],
      ph: ph[0]
    }));
  };

  return (
    <div>
      <Navbar/>
      <div className="container max-w-screen-xl mx-auto py-12 bg-black text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Crop Yield Prediction</h1>
        
        <div className="grid gap-8 lg:grid-cols-2 lg:max-w-5xl mx-auto">
          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Crop Type</label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Temperature (°C): {temperature}°C</label>
                <Slider
                  value={temperature}
                  onValueChange={setTemperature}
                  min={0}
                  max={50}
                  step={1}
                  className="bg-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Rainfall (mm): {rainfall}mm</label>
                <Slider
                  value={rainfall}
                  onValueChange={setRainfall}
                  min={0}
                  max={500}
                  step={10}
                  className="bg-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Soil pH: {ph}</label>
                <Slider
                  value={ph}
                  onValueChange={setPh}
                  min={0}
                  max={14}
                  step={0.1}
                  className="bg-gray-700"
                />
              </div>

              <Button 
                className="w-full bg-white text-black hover:bg-gray-300" 
                onClick={handlePrediction}
                disabled={loading}
              >
                {loading ? 'Generating Prediction...' : 'Generate Prediction'}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {predictionResult ? (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Predicted Yield</p>
                      <p className="text-3xl font-bold">{predictionResult.predictedYield} kg/ha</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-400">Confidence Level</p>
                      <p className="text-3xl font-bold">{predictionResult.confidenceLevel}%</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-400">Recommendations</p>
                      <ul className="mt-2 space-y-2 text-sm text-gray-300">
                        {predictionResult.recommendations.map((recommendation: string, index: number) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p>No prediction available yet. Please input the data and generate prediction.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
