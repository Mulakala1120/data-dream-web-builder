
import React from "react";
import { 
  Database, 
  Clock, 
  Shield, 
  Zap,
  BarChart3,
  LineChart,
  Server,
  GitBranch,
  Layers,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  techStack?: string[];
  link?: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, techStack, link }) => {
  const isMobile = useIsMobile();

  return (
    <div className="p-4 md:p-6 rounded-xl bg-card hover:shadow-md transition-all border border-transparent hover:border-dataBlue-200">
      <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {techStack && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Tech Stack:</h4>
          <div className="flex flex-wrap gap-1">
            {techStack.map((tech, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-muted rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {link && (
        <div className="mt-4">
          <Button variant="link" asChild className="p-0 w-full justify-start">
            <Link to={link}>
              Learn more <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

const Features: React.FC = () => {
  const isMobile = useIsMobile();
  
  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Integration",
      description: "Connect and synchronize data across multiple sources including SQL, NoSQL, APIs, and streaming platforms with our custom connectors and middleware solutions.",
      techStack: ["Apache Kafka", "Airbyte", "NiFi", "REST APIs", "JDBC/ODBC"],
      link: "/service-details/data-integration"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time ETL",
      description: "Transform raw data into analytics-ready formats with our high-performance ETL pipelines that handle both batch and streaming workloads with sub-second latency.",
      techStack: ["Spark Streaming", "Flink", "Kafka Streams", "Beam"],
      link: "/service-details/real-time-etl"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Governance",
      description: "Implement comprehensive data quality, security, and compliance frameworks that ensure regulatory adherence (GDPR, CCPA, HIPAA) while maintaining data lineage.",
      techStack: ["Collibra", "dbt", "Great Expectations", "Apache Atlas"],
      link: "/service-details/data-governance"
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Analytics Infrastructure",
      description: "Deploy scalable data lake and warehouse architectures on cloud platforms (AWS, Azure, GCP) optimized for both ad-hoc analysis and production ML workloads.",
      techStack: ["Snowflake", "BigQuery", "Redshift", "Delta Lake", "Iceberg"],
      link: "/service-details/data-warehouse"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Data Orchestration",
      description: "Automate and monitor complex data workflows with fault-tolerant scheduling using industry-standard tools like Airflow, Prefect, or custom solutions.",
      techStack: ["Airflow", "Prefect", "Dagster", "dbt Core"],
      link: "/service-details/data-orchestration"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Data Science Enablement",
      description: "Build feature stores and ML platforms that bridge the gap between data engineering and data science teams, accelerating model development cycles.",
      techStack: ["Feature Store", "MLflow", "Kubeflow", "TensorFlow"],
      link: "/service-details/data-science"
    }
  ];

  return (
    <section id="features" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Our <span className="data-gradient">Key Features</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Industry-leading data engineering capabilities tailored to your enterprise requirements.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description}
              techStack={feature.techStack}
              link={feature.link}
            />
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <Button asChild size={isMobile ? "default" : "lg"} className="w-full sm:w-auto">
            <Link to="/service-details/all">
              Explore Technical Architecture <GitBranch className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
