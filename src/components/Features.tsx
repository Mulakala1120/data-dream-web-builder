
import React from "react";
import { 
  Database, 
  Clock, 
  Shield, 
  Zap,
  BarChart3,
  LineChart 
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl bg-card hover:shadow-md transition-all">
      <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Integration",
      description: "Connect and synchronize data across multiple sources including SQL, NoSQL, APIs, and streaming platforms with our custom connectors and middleware solutions."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time ETL",
      description: "Transform raw data into analytics-ready formats with our high-performance ETL pipelines that handle both batch and streaming workloads with sub-second latency."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Governance",
      description: "Implement comprehensive data quality, security, and compliance frameworks that ensure regulatory adherence (GDPR, CCPA, HIPAA) while maintaining data lineage."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics Infrastructure",
      description: "Deploy scalable data lake and warehouse architectures on cloud platforms (AWS, Azure, GCP) optimized for both ad-hoc analysis and production ML workloads."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Data Orchestration",
      description: "Automate and monitor complex data workflows with fault-tolerant scheduling using industry-standard tools like Airflow, Prefect, or custom solutions."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Data Science Enablement",
      description: "Build feature stores and ML platforms that bridge the gap between data engineering and data science teams, accelerating model development cycles."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our <span className="data-gradient">Key Features</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-leading data engineering capabilities tailored to your enterprise requirements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
