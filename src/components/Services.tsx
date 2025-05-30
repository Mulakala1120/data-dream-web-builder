
import React from "react";
import { Database, Server, BarChart3, GitBranch, Shield, ArrowUpRight, Terminal, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  technologies: string[];
  serviceId: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, technologies, serviceId }) => {
  const navigate = useNavigate();
  
  const handleServiceClick = () => {
    navigate(`/service-details/${serviceId}`);
  };
  
  return (
    <div className="data-card group cursor-pointer hover:shadow-lg transition-all border rounded-lg p-6 hover:border-dataBlue-300" onClick={handleServiceClick}>
      <div className="mb-4 text-dataBlue-500 group-hover:text-dataBlue-600 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="mt-auto">
        <h4 className="text-sm font-medium mb-2">Technologies:</h4>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-muted px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="link" size="sm" className="p-0">
          View technical details <ArrowUpRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
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
            End-to-end data engineering solutions designed for enterprise-scale requirements.
          </p>
        </div>

        <div className="data-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ServiceCard
            icon={<Database className="h-10 w-10" />}
            title="Data Integration & ETL"
            description="Build resilient data pipelines connecting disparate sources, with support for both batch processing and real-time streaming data integration scenarios."
            technologies={["Apache Kafka", "Spark", "Airflow", "DBT", "Fivetran", "Custom Connectors"]}
            serviceId="data-integration"
          />
          
          <ServiceCard
            icon={<Server className="h-10 w-10" />}
            title="Data Warehouse Design"
            description="Design and implement modern data warehouses with dimensional modeling, data vault approaches, or lakehouse architectures tailored to your analytics needs."
            technologies={["Snowflake", "BigQuery", "Redshift", "Databricks", "Synapse"]}
            serviceId="data-warehouse"
          />
          
          <ServiceCard
            icon={<BarChart3 className="h-10 w-10" />}
            title="Business Intelligence"
            description="Develop interactive dashboards and self-service analytics platforms that translate technical data into actionable business insights with minimal latency."
            technologies={["Tableau", "Power BI", "Looker", "Metabase", "Custom Solutions"]}
            serviceId="business-intelligence"
          />
          
          <ServiceCard
            icon={<GitBranch className="h-10 w-10" />}
            title="DataOps & MLOps"
            description="Implement CI/CD for data pipelines with automated testing, deployment, monitoring, and version control practices for both data assets and ML models."
            technologies={["GitHub Actions", "Jenkins", "Terraform", "Docker", "Kubernetes"]}
            serviceId="dataops-mlops"
          />
          
          <ServiceCard
            icon={<Shield className="h-10 w-10" />}
            title="Data Governance"
            description="Establish comprehensive data governance frameworks including data catalogs, quality monitoring, access controls, and compliance documentation."
            technologies={["Collibra", "Alation", "Great Expectations", "Immuta", "Custom Frameworks"]}
            serviceId="data-governance"
          />
          
          <ServiceCard
            icon={<Code className="h-10 w-10" />}
            title="Performance Optimization"
            description="Tune and optimize your data systems for maximum throughput, query performance, and cost-efficiency through indexing, partitioning, and cloud resource management."
            technologies={["Query Optimization", "Infrastructure Tuning", "Cost Analysis", "Caching Strategies"]}
            serviceId="performance-optimization"
          />
        </div>
        
        <div className="text-center">
          <Button size="lg" asChild className="mr-4">
            <Link to="/service-details/all">Explore Technical Details <Terminal className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#service-request">Request a Service <ArrowUpRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
