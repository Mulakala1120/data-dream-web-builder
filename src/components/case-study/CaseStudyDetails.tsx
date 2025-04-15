
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CaseStudyDetailsProps {
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const CaseStudyDetails = ({
  challenge,
  solution,
  results,
  technologies,
  testimonial,
}: CaseStudyDetailsProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Challenge</h2>
            <p className="text-muted-foreground">{challenge}</p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p className="text-muted-foreground">{solution}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <ul className="space-y-3">
              {results.map((result, index) => (
                <li key={index} className="flex">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <div>
          <div className="bg-muted/50 rounded-lg p-6 mb-6">
            <h3 className="font-bold mb-3 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" /> Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
          
          {testimonial && (
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-bold mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary" /> Client Testimonial
              </h3>
              <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              <p className="font-medium">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          )}
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to discuss your project?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let's talk about how our data engineering expertise can help your organization achieve similar results.
        </p>
        <Button size="lg" asChild>
          <a href="#contact">Contact Us Today</a>
        </Button>
      </div>
    </div>
  );
};
