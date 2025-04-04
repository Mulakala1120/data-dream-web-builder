
import React from "react";
import { 
  SearchCheck, 
  FileCode, 
  Database, 
  LineChart, 
  Repeat,
  Code,
  BarChart3,
  GitMerge,
  Server,
  GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProcessStep: React.FC<{
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  technicalDetails?: string[];
}> = ({ icon, number, title, description, technicalDetails }) => {
  return (
    <div className="relative flex">
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-dataBlue-500 to-dataTeal-500 text-white font-bold text-lg">
          {number}
        </div>
        {number < 5 && <div className="h-full w-0.5 bg-gray-200 mt-2"></div>}
      </div>
      <div className="pb-12">
        <div className="flex items-center mb-2">
          <div className="text-dataBlue-500 mr-2">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-2">
          {description}
        </p>
        {technicalDetails && (
          <div className="mt-2 bg-muted/50 p-2 rounded-md">
            <h4 className="text-xs font-semibold mb-1">Technical Focus:</h4>
            <ul className="text-xs space-y-1">
              {technicalDetails.map((detail, i) => (
                <li key={i} className="flex items-start">
                  <Code className="h-3 w-3 mr-1 mt-0.5 text-dataBlue-500" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Data Engineering <span className="data-gradient">Process</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a proven methodology to design, implement, and optimize your data engineering solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <ProcessStep
              icon={<SearchCheck className="h-6 w-6" />}
              number={1}
              title="Discover & Analyze"
              description="We start by understanding your business goals, current data landscape, and technical requirements to develop a strategic roadmap."
              technicalDetails={[
                "Data source analysis and cataloging",
                "Volume, velocity, variety assessment",
                "Schema discovery and documentation",
                "Data quality evaluation"
              ]}
            />
            
            <ProcessStep
              icon={<FileCode className="h-6 w-6" />}
              number={2}
              title="Design & Architect"
              description="Our experts design a scalable, efficient data architecture tailored to your specific needs and future growth plans."
              technicalDetails={[
                "Data modeling (dimensional, data vault)",
                "Pipeline architecture design",
                "Infrastructure as Code (IaC) planning",
                "Security and compliance architecture"
              ]}
            />
            
            <ProcessStep
              icon={<Database className="h-6 w-6" />}
              number={3}
              title="Build & Implement"
              description="We construct robust data pipelines, warehouses, and processing systems using industry-leading technologies and best practices."
              technicalDetails={[
                "ETL/ELT pipeline development",
                "Data warehouse/lake implementation",
                "Orchestration workflow setup",
                "API and service integration"
              ]}
            />
            
            <ProcessStep
              icon={<GitMerge className="h-6 w-6" />}
              number={4}
              title="Test & Deploy"
              description="Rigorous testing ensures your data solutions meet quality standards before deployment to production environments."
              technicalDetails={[
                "Automated data validation testing",
                "Performance benchmarking",
                "CI/CD pipeline implementation",
                "Blue/green deployment strategies"
              ]}
            />
            
            <ProcessStep
              icon={<Repeat className="h-6 w-6" />}
              number={5}
              title="Monitor & Optimize"
              description="Continuous monitoring and optimization keep your data systems performing at their best while adapting to changing requirements."
              technicalDetails={[
                "Real-time pipeline monitoring",
                "Cost optimization analysis",
                "Query performance tuning",
                "Automated alerting and error handling"
              ]}
            />
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            <div className="bg-gradient-to-br from-dataBlue-600 to-dataTeal-500 p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Data Engineering Excellence</h3>
              <p className="mb-6 opacity-90">
                Our proven methodology ensures successful outcomes for your data initiatives:
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white/30 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <span>Reduced time-to-insight by optimizing data pipelines</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white/30 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <span>Increased data reliability through automated testing and monitoring</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white/30 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <span>Scalable architecture that grows with your business needs</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white/30 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <span>Cost-effective implementation leveraging the right technologies</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white/30 flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    ✓
                  </div>
                  <span>Comprehensive knowledge transfer and documentation</span>
                </li>
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="font-semibold">Average client results:</div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-3xl font-bold">60%</p>
                    <p className="text-sm opacity-80">Faster data processing</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-3xl font-bold">45%</p>
                    <p className="text-sm opacity-80">Lower maintenance costs</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="bg-white text-dataBlue-600 hover:bg-white/90" asChild>
                    <Link to="/service-details/all">
                      View Technical Architecture <GitBranch className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
