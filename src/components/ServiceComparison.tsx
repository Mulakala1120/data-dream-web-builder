
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ServiceTier {
  id: string;
  name: string;
  description: string;
  price: string;
  features: {
    name: string;
    included: boolean;
    tooltip?: string;
  }[];
  highlighted?: boolean;
  buttonText: string;
}

const serviceTiers: ServiceTier[] = [
  {
    id: "essential",
    name: "Essential",
    description: "Core data engineering capabilities for small teams and projects",
    price: "$5,000",
    features: [
      { name: "ETL Pipeline Setup", included: true, tooltip: "Setup of basic data extraction, transformation, and loading pipelines" },
      { name: "Data Quality Checks", included: true, tooltip: "Implementation of fundamental data quality validation rules" },
      { name: "Basic Reporting", included: true, tooltip: "Configuration of essential dashboards and reports" },
      { name: "Cloud Integration", included: true, tooltip: "Integration with a single cloud provider" },
      { name: "Schema Design", included: true, tooltip: "Design of efficient database schemas" },
      { name: "Automated Monitoring", included: false, tooltip: "Continuous monitoring of data pipelines and systems" },
      { name: "Advanced Analytics", included: false, tooltip: "Implementation of complex analytical models" },
      { name: "24/7 Support", included: false, tooltip: "Round-the-clock technical support" },
    ],
    buttonText: "Get Started",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Comprehensive data solutions for growing organizations",
    price: "$15,000",
    features: [
      { name: "ETL Pipeline Setup", included: true, tooltip: "Setup of advanced data extraction, transformation, and loading pipelines" },
      { name: "Data Quality Checks", included: true, tooltip: "Implementation of comprehensive data quality frameworks" },
      { name: "Basic Reporting", included: true, tooltip: "Creation of interactive dashboards and reports" },
      { name: "Cloud Integration", included: true, tooltip: "Integration with multiple cloud providers" },
      { name: "Schema Design", included: true, tooltip: "Advanced schema design with performance optimization" },
      { name: "Automated Monitoring", included: true, tooltip: "Continuous monitoring with alerting systems" },
      { name: "Advanced Analytics", included: false, tooltip: "Implementation of complex analytical models" },
      { name: "24/7 Support", included: false, tooltip: "Round-the-clock technical support" },
    ],
    highlighted: true,
    buttonText: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "End-to-end data engineering and analytics for large enterprises",
    price: "$30,000+",
    features: [
      { name: "ETL Pipeline Setup", included: true, tooltip: "Enterprise-grade ETL solutions with fault tolerance" },
      { name: "Data Quality Checks", included: true, tooltip: "Comprehensive data quality and governance frameworks" },
      { name: "Basic Reporting", included: true, tooltip: "Advanced reporting with custom visualizations" },
      { name: "Cloud Integration", included: true, tooltip: "Seamless multi-cloud and hybrid-cloud integration" },
      { name: "Schema Design", included: true, tooltip: "High-performance schema design with sharding strategies" },
      { name: "Automated Monitoring", included: true, tooltip: "AI-powered monitoring and predictive maintenance" },
      { name: "Advanced Analytics", included: true, tooltip: "Machine learning models and predictive analytics" },
      { name: "24/7 Support", included: true, tooltip: "Dedicated support team with guaranteed SLAs" },
    ],
    buttonText: "Contact Sales",
  },
];

const ServiceComparison = () => {
  return (
    <section id="service-comparison" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Service Level</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We offer flexible service packages designed to meet your specific data engineering needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceTiers.map((tier) => (
            <Card 
              key={tier.id} 
              className={`flex flex-col h-full ${tier.highlighted 
                ? 'border-primary shadow-lg' 
                : 'border-border'}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="min-h-[50px]">{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground ml-1">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground shrink-0 mr-2" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.name}
                      </span>
                      {feature.tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                              <HelpCircle className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={tier.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution? We offer tailored packages for unique requirements.
          </p>
          <Button size="lg" variant="outline">
            Request Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;
