
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, Database, GitBranch, LineChart, ServerCog, ShoppingCart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  industry: string;
  services: string[];
  results: string;
  icon: string;
  case_study_url?: string;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "BarChart2": return <BarChart2 className="h-12 w-12 text-primary" />;
    case "Database": return <Database className="h-12 w-12 text-primary" />;
    case "LineChart": return <LineChart className="h-12 w-12 text-primary" />;
    case "ServerCog": return <ServerCog className="h-12 w-12 text-primary" />;
    case "ShoppingCart": return <ShoppingCart className="h-12 w-12 text-primary" />;
    case "Shield": return <Shield className="h-12 w-12 text-primary" />;
    default: return <Database className="h-12 w-12 text-primary" />;
  }
};

const Portfolio = () => {
  const [visibleItems, setVisibleItems] = useState<number>(4);
  
  // Fetch portfolio items from the edge function
  const { data, isLoading, error } = useQuery({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("portfolio");
      if (error) throw error;
      return data.items as PortfolioItem[];
    }
  });

  const portfolioItems = data || [];
  
  const showMore = () => {
    setVisibleItems(prevCount => Math.min(prevCount + 4, portfolioItems.length));
  };

  return (
    <section id="portfolio" className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Success Stories</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore how we've helped organizations transform their data infrastructure and
            achieve meaningful business outcomes.
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 my-8">
            <p>Error loading portfolio items. Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioItems.slice(0, visibleItems).map((item) => (
                <Card key={item.id} className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="mb-4">{getIconComponent(item.icon)}</div>
                    <CardTitle className="text-2xl">{item.title}</CardTitle>
                    <CardDescription>
                      <span className="mr-2">{item.industry}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Services Provided:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.services.map((service) => (
                          <Badge key={service} variant="outline">{service}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Results:</h4>
                      <p className="text-primary font-medium">{item.results}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm" asChild>
                      <a href={item.case_study_url || "#"}>
                        View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {visibleItems < portfolioItems.length && (
              <div className="text-center mt-12">
                <Button size="lg" onClick={showMore}>
                  View More Case Studies <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
