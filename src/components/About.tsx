
import React from "react";
import { CheckCircle } from "lucide-react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Our <span className="data-gradient">Data Engineering</span> Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We specialize in designing, building, and optimizing the systems that collect, store, and process your organization's data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-semibold mb-6">Why Choose Our Data Engineering Services?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-dataBlue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-lg">Scalable Data Infrastructure</h4>
                  <p className="text-muted-foreground">Build systems that grow with your business and handle increasing data volumes efficiently.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-dataBlue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-lg">Real-time Data Processing</h4>
                  <p className="text-muted-foreground">Access insights as they happen with streaming data architectures and real-time analytics.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-dataBlue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-lg">Data Quality & Governance</h4>
                  <p className="text-muted-foreground">Ensure your data is accurate, consistent, and compliant with industry regulations.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-dataBlue-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-lg">Cloud-Native Solutions</h4>
                  <p className="text-muted-foreground">Leverage the power of AWS, Azure, and GCP for flexible, cost-effective data infrastructure.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              {/* Abstract data flow visualization */}
              <div className="aspect-video bg-gradient-to-br from-dataBlue-600 to-dataTeal-500 p-8 flex items-center justify-center">
                <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div 
                      key={index} 
                      className="bg-white/20 rounded animate-pulse-slow"
                      style={{ 
                        animationDelay: `${index * 0.2}s`,
                        opacity: Math.random() * 0.5 + 0.3
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h4 className="text-xl font-bold">Data Engineering Excellence</h4>
                  <p className="text-sm opacity-90">Building resilient, scalable data pipelines</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4 shadow border">
                <p className="text-4xl font-bold text-dataBlue-600">98%</p>
                <p className="text-sm text-muted-foreground">Data pipeline reliability</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow border">
                <p className="text-4xl font-bold text-dataTeal-500">3x</p>
                <p className="text-sm text-muted-foreground">Faster data processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
