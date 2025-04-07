
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ServiceRequest from "@/components/ServiceRequest";
import Portfolio from "@/components/Portfolio";
import Team from "@/components/Team";
import Technologies from "@/components/Technologies";
import ROICalculator from "@/components/ROICalculator";
import Blog from "@/components/Blog";
import ServiceComparison from "@/components/ServiceComparison";
import DataMaturityAssessment from "@/components/DataMaturityAssessment";
import LiveChat from "@/components/LiveChat";
import BusinessGrowthCalculator from "@/components/BusinessGrowthCalculator";
import DataEngineeringSkills from "@/components/DataEngineeringSkills";
import { useIsMobile } from "@/hooks/use-mobile";
import { ErrorBoundary } from "react-error-boundary";

// Simple fallback component for error states
const ComponentErrorFallback = ({ componentName }: { componentName: string }) => (
  <div className="p-4 my-2 border border-red-200 rounded bg-red-50 text-center">
    <p className="text-red-700">Component {componentName} failed to load.</p>
    <p className="text-sm text-red-500">Please refresh the page to try again.</p>
  </div>
);

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Hero" />}>
          <Hero />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="About" />}>
          <About />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Services" />}>
          <Services />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="DataEngineeringSkills" />}>
          <DataEngineeringSkills />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Features" />}>
          <Features />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="BusinessGrowthCalculator" />}>
          <BusinessGrowthCalculator />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Process" />}>
          <Process />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Portfolio" />}>
          <Portfolio />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Team" />}>
          <Team />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Technologies" />}>
          <Technologies />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="ROICalculator" />}>
          <ROICalculator />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="ServiceRequest" />}>
          <ServiceRequest />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="ServiceComparison" />}>
          <ServiceComparison />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Testimonials" />}>
          <Testimonials />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Blog" />}>
          <Blog />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="DataMaturityAssessment" />}>
          <DataMaturityAssessment />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="FAQ" />}>
          <FAQ />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="CTA" />}>
          <CTA />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={<ComponentErrorFallback componentName="Contact" />}>
          <Contact />
        </ErrorBoundary>
      </main>
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Index;
