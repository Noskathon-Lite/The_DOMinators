import { ArrowRight, LineChart, Sprout, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import { DataVisualization } from '@/components/logincomponents/DataVisualization';
import { Card } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <div className=" bg-background">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6">
              Welcome to ClimateGrow
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ClimateGrow is an AI-powered online platform that predicts how climate change affects
              the growth of fruits and vegetables.
            </p>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <ImageCarousel />
        </section>

        {/* Data Visualization Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Data-Driven Insights
            </h2>
            <Card className="p-6">
              <DataVisualization />
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Machine Learning Models
                </h3>
                <p className="text-muted-foreground">
                  Using Kaggle datasets including historical crop yields, temperature variability,
                  and rainfall patterns, we build sophisticated ML models to predict future crop
                  yields under various climate scenarios.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Empirical Research
                </h3>
                <p className="text-muted-foreground">
                  Our ongoing data collection in Nepal advances our AI model's accuracy,
                  incorporating real-world agricultural conditions and climate impacts.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl max-w-3xl mx-auto">
              ClimateGrow aims to provide evidence-based strategies to help farmers and
              policymakers mitigate agricultural risks posed by climate change.
            </p>
          </div>
        </section>

        <Separator />
      </main>

      <Footer />
    </div>
    </div>
  );
}