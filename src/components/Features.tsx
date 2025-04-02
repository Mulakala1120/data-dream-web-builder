
import React from "react";
import { 
  BarChart3, 
  Clock, 
  Shield, 
  Zap,
  Layers,
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
      icon: <Zap className="h-6 w-6" />,
      title: "High Performance",
      description: "Our data pipelines are optimized for speed and efficiency, ensuring quick access to insights when you need them."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "We implement industry-standard security practices to keep your sensitive data protected at all times."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Transform raw data into actionable insights with our advanced analytics capabilities and dashboards."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Processing",
      description: "Process and analyze data in real-time to make informed decisions faster than your competitors."
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Scalable Architecture",
      description: "Our solutions grow with your business, from startups to enterprise-level data operations."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Predictive Capabilities",
      description: "Leverage machine learning models to predict trends and stay ahead of market changes."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our <span className="data-gradient">Key Features</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover what makes our data engineering solutions stand out from the rest.
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
