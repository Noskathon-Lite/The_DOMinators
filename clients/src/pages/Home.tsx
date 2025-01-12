import { ArrowRight, LineChart, Sprout, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="container">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Predict Crop Yields in a
              <span className="text-primary"> Changing Climate</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              AI-powered insights to help farmers, policymakers, and researchers understand and adapt to climate change impacts on agriculture.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Predictive Analytics</h3>
              <p className="text-muted-foreground">
                Advanced AI models predict crop yields based on climate data and historical trends.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Sprout className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Crop Insights</h3>
              <p className="text-muted-foreground">
                Detailed analysis of how different crops respond to changing climate conditions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Community Focus</h3>
              <p className="text-muted-foreground">
                Built with and for Nepalese farming communities to ensure practical impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}