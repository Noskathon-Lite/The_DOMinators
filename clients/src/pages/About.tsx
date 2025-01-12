export default function About() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">About ClimateGrow</h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-muted-foreground mb-8">
          ClimateGrow is an AI-powered platform dedicated to understanding and predicting the impact of climate change on agricultural productivity in Nepal.
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p>To empower farmers, policymakers, and researchers with data-driven insights for sustainable agriculture in a changing climate.</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Approach</h2>
            <p>We combine advanced AI models with local agricultural knowledge to provide accurate crop yield predictions and adaptation strategies.</p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Impact</h2>
            <p>Supporting Nepalese farming communities in making informed decisions about crop selection and agricultural practices.</p>
          </div>
        </div>
      </div>
    </div>
  );
}