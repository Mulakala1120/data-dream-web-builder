
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <ServiceRequest />
        <Portfolio />
        <Features />
        <Team />
        <Technologies />
        <Process />
        <ROICalculator />
        <ServiceComparison />
        <Testimonials />
        <Blog />
        <DataMaturityAssessment />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Index;
