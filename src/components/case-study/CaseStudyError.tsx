
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface CaseStudyErrorProps {
  onBack: () => void;
}

export const CaseStudyError = ({ onBack }: CaseStudyErrorProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Case Study Not Found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find the case study you're looking for.
          </p>
          <Button onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
