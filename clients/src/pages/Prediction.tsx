import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function Prediction() {
  const [temperature, setTemperature] = useState([25]);
  const [rainfall, setRainfall] = useState([150]);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Crop Yield Prediction</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Crop Type</label>
              <Select>
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
              <label className="text-sm font-medium">Temperature (°C): {temperature}°C</label>
              <Slider
                value={temperature}
                onValueChange={setTemperature}
                min={0}
                max={50}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rainfall (mm): {rainfall}mm</label>
              <Slider
                value={rainfall}
                onValueChange={setRainfall}
                min={0}
                max={500}
                step={10}
              />
            </div>

            <Button className="w-full">Generate Prediction</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predicted Yield</p>
                <p className="text-3xl font-bold">2,500 kg/ha</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Confidence Level</p>
                <p className="text-3xl font-bold">85%</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Recommendations</p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>Consider irrigation during dry spells</li>
                  <li>Monitor soil moisture levels</li>
                  <li>Plan for potential temperature variations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}