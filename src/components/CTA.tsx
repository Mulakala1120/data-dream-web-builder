
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const CTA: React.FC = () => {
  const challenges = [
    "Building real-time data pipelines",
    "Migrating to cloud data platforms",
    "Implementing data governance",
    "Optimizing database performance",
    "Scaling analytics infrastructure"
  ];

  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Facing Data Engineering Challenges?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our team specializes in solving complex data problems. Let's discuss how we can help with:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 max-w-2xl mx-auto text-left">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-secondary" />
                <span>{challenge}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button size="lg" variant="secondary" className="font-medium" asChild>
              <a href="#contact">
                Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <a href="#services">Explore Our Solutions</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
