
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { CaseStudyLoading } from "@/components/case-study/CaseStudyLoading";
import { CaseStudyError } from "@/components/case-study/CaseStudyError";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { CaseStudyDetails } from "@/components/case-study/CaseStudyDetails";

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  timeline: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  images?: string[];
}

const CaseStudy = () => {
  const { caseStudyId } = useParams<{ caseStudyId: string }>();
  const navigate = useNavigate();
  
  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ["caseStudy", caseStudyId],
    queryFn: async () => {
      console.log(`Fetching case study with ID: ${caseStudyId}`);
      const { data, error } = await supabase.functions.invoke("case-studies", {
        body: { id: caseStudyId }
      });
      
      if (error) {
        console.error("Error fetching case study:", error);
        throw error;
      }
      
      return data as CaseStudy;
    },
    retry: 1
  });

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <CaseStudyLoading />;
  }

  if (error || !caseStudy) {
    return <CaseStudyError onBack={goBack} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <CaseStudyHeader
          industry={caseStudy.industry}
          title={caseStudy.title}
          client={caseStudy.client}
          timeline={caseStudy.timeline}
          onBack={goBack}
        />
        <CaseStudyDetails
          challenge={caseStudy.challenge}
          solution={caseStudy.solution}
          results={caseStudy.results}
          technologies={caseStudy.technologies}
          testimonial={caseStudy.testimonial}
        />
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudy;
