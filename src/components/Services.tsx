
import React from "react";
import { Database, Server, BarChart3, GitBranch, Shield, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServiceCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="data-card group">
      <div className="mb-4 text-dataBlue-500 group-hover:text-dataBlue-600 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our <span className="data-gradient">Services</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive data engineering solutions to handle all your data needs, from ingestion to insights.
          </p>
        </div>

        <div className="data-grid mb-12">
          <ServiceCard
            icon={<Database className="h-10 w-10" />}
            title="Data Integration & ETL"
            description="We build robust data pipelines to collect, transform, and load data from diverse sources into your data warehouse."
          />
          
          <ServiceCard
            icon={<Server className="h-10 w-10" />}
            title="Data Warehouse Design"
            description="Architect scalable data warehouses optimized for analytics and business intelligence workloads."
          />
          
          <ServiceCard
            icon={<BarChart3 className="h-10 w-10" />}
            title="Business Intelligence"
            description="Create dashboards and reporting systems that translate complex data into actionable insights."
          />
          
          <ServiceCard
            icon={<GitBranch className="h-10 w-10" />}
            title="DataOps & MLOps"
            description="Implement automated workflows for continuous integration and delivery of data and ML solutions."
          />
          
          <ServiceCard
            icon={<Shield className="h-10 w-10" />}
            title="Data Governance"
            description="Establish processes and controls to ensure data quality, security, and regulatory compliance."
          />
          
          <ServiceCard
            icon={<ArrowUpRight className="h-10 w-10" />}
            title="Performance Optimization"
            description="Tune and optimize your data systems for maximum efficiency, speed, and cost-effectiveness."
          />
        </div>
        
        <div className="text-center">
          <Button size="lg" asChild>
            <a href="#contact">Discuss Your Project <ArrowUpRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
