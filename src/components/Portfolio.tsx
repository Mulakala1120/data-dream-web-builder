
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, Database, GitBranch, LineChart, ServerCog } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  industry: string;
  services: string[];
  results: string;
  icon: React.ReactNode;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Financial Analytics Platform",
    description: "Developed a comprehensive data warehouse and BI solution for a Fortune 500 financial institution.",
    industry: "Financial Services",
    services: ["Data Warehouse Design", "Business Intelligence"],
    results: "Reduced reporting time by 78% and enabled real-time financial decision-making",
    icon: <BarChart2 className="h-12 w-12 text-primary" />
  },
  {
    id: 2,
    title: "Healthcare Data Integration",
    description: "Created a unified data platform connecting 12 disparate healthcare systems for a major hospital network.",
    industry: "Healthcare",
    services: ["Data Integration & ETL", "Data Governance"],
    results: "Improved patient data accessibility by 94% while ensuring HIPAA compliance",
    icon: <Database className="h-12 w-12 text-primary" />
  },
  {
    id: 3,
    title: "Retail Analytics Engine",
    description: "Built a scalable analytics infrastructure for a nationwide retailer with 2000+ locations.",
    industry: "Retail",
    services: ["DataOps & MLOps", "Performance Optimization"],
    results: "Increased inventory forecasting accuracy by 34% and reduced stockouts by 23%",
    icon: <LineChart className="h-12 w-12 text-primary" />
  },
  {
    id: 4,
    title: "Manufacturing IoT Platform",
    description: "Engineered a real-time data processing pipeline for IoT sensors across 15 manufacturing facilities.",
    industry: "Manufacturing",
    services: ["Data Integration & ETL", "Performance Optimization"],
    results: "Reduced equipment downtime by 42% through predictive maintenance",
    icon: <ServerCog className="h-12 w-12 text-primary" />
  },
];

const Portfolio = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <div className="mb-4">{item.icon}</div>
                <CardTitle className="text-2xl">{item.title}</CardTitle>
                <CardDescription>
                  <Badge className="mr-2">{item.industry}</Badge>
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
                <Button variant="outline" className="w-full" size="sm">
                  View Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg">
            View All Case Studies <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
