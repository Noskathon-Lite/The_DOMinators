import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', yield: 4000 },
  { month: 'Feb', yield: 3000 },
  { month: 'Mar', yield: 2000 },
  { month: 'Apr', yield: 2780 },
  { month: 'May', yield: 1890 },
  { month: 'Jun', yield: 2390 },
];

export default function Dashboard() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Crops</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">2,745 kg/ha</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">25°C</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rainfall</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">150mm</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Crop Yield Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="yield" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}