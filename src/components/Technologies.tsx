
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Technology {
  id: number;
  name: string;
  category: string;
  logo: string;
  description: string;
}

const technologies: Technology[] = [
  // Data Storage & Processing
  {
    id: 1,
    name: "Amazon Redshift",
    category: "storage",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png",
    description: "Petabyte-scale data warehouse service in the cloud",
  },
  {
    id: 2,
    name: "Snowflake",
    category: "storage",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Snowflake_Logo.svg/1280px-Snowflake_Logo.svg.png",
    description: "Cloud data platform for all your data and data workloads",
  },
  {
    id: 3,
    name: "Google BigQuery",
    category: "storage",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    description: "Serverless, highly scalable, and cost-effective cloud data warehouse",
  },
  
  // ETL & Data Integration
  {
    id: 4,
    name: "Apache Spark",
    category: "etl",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/1200px-Apache_Spark_logo.svg.png",
    description: "Unified analytics engine for large-scale data processing",
  },
  {
    id: 5,
    name: "Fivetran",
    category: "etl",
    logo: "https://www.fivetran.com/hubfs/Fivetran-Social-Meta-Icon.png",
    description: "Automated data integration",
  },
  {
    id: 6,
    name: "Databricks",
    category: "etl",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png",
    description: "Unified data analytics platform",
  },
  
  // Visualization & BI
  {
    id: 7,
    name: "Tableau",
    category: "bi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Tableau_Logo.png/1200px-Tableau_Logo.png",
    description: "Visual analytics platform",
  },
  {
    id: 8,
    name: "Power BI",
    category: "bi",
    logo: "https://powerbi.microsoft.com/pictures/shared/social/social-default-image.png",
    description: "Business analytics service by Microsoft",
  },
  {
    id: 9,
    name: "Looker",
    category: "bi",
    logo: "https://seeklogo.com/images/L/looker-logo-F1AE995C05-seeklogo.com.png",
    description: "Business intelligence and analytics platform",
  },
  
  // MLOps & DataOps
  {
    id: 10,
    name: "Airflow",
    category: "ops",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/AirflowLogo.png/1200px-AirflowLogo.png",
    description: "Platform to programmatically author, schedule and monitor workflows",
  },
  {
    id: 11,
    name: "dbt",
    category: "ops",
    logo: "https://seeklogo.com/images/D/dbt-logo-500AB0BAA7-seeklogo.com.png",
    description: "Transform your data in your warehouse",
  },
  {
    id: 12,
    name: "MLflow",
    category: "ops",
    logo: "https://www.mlflow.org/docs/latest/_static/MLflow-logo-final-black.png",
    description: "Platform to manage the ML lifecycle",
  },
];

const Technologies = () => {
  return (
    <section id="technologies" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies We Work With</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We leverage industry-leading technologies to build robust and scalable data solutions.
          </p>
        </div>
        
        <Tabs defaultValue="storage" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="storage">Data Storage</TabsTrigger>
              <TabsTrigger value="etl">ETL & Integration</TabsTrigger>
              <TabsTrigger value="bi">Visualization & BI</TabsTrigger>
              <TabsTrigger value="ops">DataOps & MLOps</TabsTrigger>
            </TabsList>
          </div>
          
          {["storage", "etl", "bi", "ops"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {technologies
                  .filter((tech) => tech.category === category)
                  .map((tech) => (
                    <Card key={tech.id} className="overflow-hidden hover:shadow-md transition-all">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-16 flex items-center justify-center mb-4">
                          <img 
                            src={tech.logo} 
                            alt={tech.name} 
                            className="max-h-full max-w-[150px] object-contain" 
                          />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
                        <p className="text-muted-foreground text-sm">{tech.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Technologies;
