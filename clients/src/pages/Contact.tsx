import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Have questions about ClimateGrow? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
        </p>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input id="name" placeholder="Your name" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea id="message" placeholder="How can we help?" className="min-h-[150px]" />
          </div>
          
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  );
}