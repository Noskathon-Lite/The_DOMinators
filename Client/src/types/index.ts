export interface Crop {
  id: string;
  name: string;
  image: string;
  description: string;
  growthFactors: {
    soilType: string;
    waterRequirements: string;
    temperature: string;
  };
  season: string[];
}

export interface MonthData {
  recommendedCrops: Crop[];
  alternatives: Crop[];
  customerPreferences: {
    trending: string[];
    marketDemand: 'high' | 'medium' | 'low';
  };
}