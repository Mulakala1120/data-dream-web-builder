
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Database, Server, BarChart3 } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-background pt-16 pb-24">
      {/* Gradient Orbs (Decorative Elements) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-dataBlue-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-dataTeal-400/20 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Transforming <span className="data-gradient">Raw Data</span> into Valuable <span className="data-gradient">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              We design, implement, and maintain robust data pipelines and infrastructure that turn your data into a strategic asset.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#contact">Get Started <ChevronRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#services">Our Services</a>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">Trusted by innovative companies</p>
              <div className="flex flex-wrap gap-8 items-center">
                <div className="text-muted-foreground/70 font-semibold">ACME Inc.</div>
                <div className="text-muted-foreground/70 font-semibold">TechCorp</div>
                <div className="text-muted-foreground/70 font-semibold">DataSphere</div>
                <div className="text-muted-foreground/70 font-semibold">Analytica</div>
              </div>
            </div>
          </div>
          
          {/* Animated Visual Element */}
          <div className="relative h-[400px] md:h-[500px] hidden lg:block">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg border shadow-lg p-6 flex flex-col justify-center animate-float">
                <Database className="h-8 w-8 text-dataBlue-500 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Data Integration</h3>
                <p className="text-sm text-muted-foreground">Seamlessly connect all your data sources</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg border shadow-lg p-6 flex flex-col justify-center animate-float" style={{ animationDelay: "1.5s" }}>
                <Server className="h-8 w-8 text-dataTeal-500 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Data Warehouse</h3>
                <p className="text-sm text-muted-foreground">Scalable storage for all your business data</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-lg border shadow-lg p-6 flex flex-col justify-center animate-float" style={{ animationDelay: "2s" }}>
                <BarChart3 className="h-8 w-8 text-dataBlue-500 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Data Analysis</h3>
                <p className="text-sm text-muted-foreground">Extract actionable insights from your data</p>
              </div>
              
              <div className="relative bg-gradient-to-br from-dataBlue-500 to-dataTeal-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center animate-float" style={{ animationDelay: "0.5s" }}>
                <h3 className="font-semibold text-lg mb-1">Unleash Your Data Potential</h3>
                <p className="text-sm opacity-90">End-to-end data engineering solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
