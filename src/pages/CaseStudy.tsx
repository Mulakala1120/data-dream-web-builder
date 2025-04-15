
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Clock, Award, Zap, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  timeline: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  images?: string[];
}

const CaseStudy = () => {
  const { caseStudyId } = useParams<{ caseStudyId: string }>();
  const navigate = useNavigate();
  
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ["caseStudy", caseStudyId],
    queryFn: async () => {
      console.log(`Fetching case study with ID: ${caseStudyId}`);
      const { data, error } = await supabase.functions.invoke("case-studies", {
        query: { id: caseStudyId }
      });
      
      if (error) {
        console.error("Error fetching case study:", error);
        throw new Error(error.message || "Failed to fetch case study");
      }
      
      return data as CaseStudy;
    },
    retry: 1,
    onError: (err) => {
      console.error("Case study fetch error:", err);
      toast({
        title: "Error",
        description: "Failed to load case study details. Please try again later.",
        variant: "destructive"
      });
    }
  });

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12 px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
            <p className="text-muted-foreground mb-8">
              We couldn't find the case study you're looking for.
            </p>
            <Button onClick={goBack}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={goBack}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Button>
            
            <div className="mb-6">
              <Badge className="mb-2">{caseStudy.industry}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{caseStudy.title}</h1>
              <p className="text-xl text-muted-foreground">Client: {caseStudy.client}</p>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              <span>Project Timeline: {caseStudy.timeline}</span>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Challenge</h2>
                <p className="text-muted-foreground">{caseStudy.challenge}</p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Solution</h2>
                <p className="text-muted-foreground">{caseStudy.solution}</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-4">Results</h2>
                <ul className="space-y-3">
                  {caseStudy.results.map((result, index) => (
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
                  {caseStudy.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              
              {caseStudy.testimonial && (
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-bold mb-3 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-primary" /> Client Testimonial
                  </h3>
                  <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
                    "{caseStudy.testimonial.quote}"
                  </blockquote>
                  <p className="font-medium">{caseStudy.testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{caseStudy.testimonial.role}</p>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
