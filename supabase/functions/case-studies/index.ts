
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const id = requestData.id;
    
    console.log(`Processing request for case study ID: ${id}`);

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Case study ID is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const caseStudies: Record<string, CaseStudy> = {
      "loan-processing": {
        id: "loan-processing",
        title: "Enterprise Loan Processing Data Pipeline",
        client: "Major Financial Institution",
        industry: "Financial Services",
        challenge: "The client was struggling with a manual loan application process that took an average of 14 days to complete. They needed a solution to streamline their workflow, improve accuracy in risk assessment, and reduce processing time while handling over 1 million applications annually.",
        solution: "We engineered an enterprise-scale data pipeline that automated the entire loan processing workflow. The solution included real-time credit scoring algorithms, automated document verification through OCR and machine learning, and an integrated underwriting system that could make decisions based on predefined risk models.",
        results: [
          "Reduced loan processing time from 14 days to 4.5 days (68% improvement)",
          "Improved risk assessment accuracy by 45%",
          "Increased application throughput by 300% without adding staff",
          "Decreased manual review requirements by 72%",
          "Reduced operational costs by $4.2 million annually"
        ],
        technologies: [
          "Apache Kafka",
          "Snowflake",
          "Apache Spark",
          "TensorFlow",
          "Python",
          "Docker",
          "Kubernetes"
        ],
        timeline: "6 months",
        testimonial: {
          quote: "The data pipeline revolutionized our loan processing capabilities. What used to take weeks now takes days, and our risk models are more accurate than ever before.",
          author: "James Wilson",
          role: "Chief Credit Officer"
        },
        images: [
          "/images/loan-processing-architecture.png",
          "/images/loan-processing-dashboard.png"
        ]
      }
    };

    const caseStudy = caseStudies[id];
    
    if (!caseStudy) {
      console.error(`Case study not found for ID: ${id}`);
      return new Response(
        JSON.stringify({ error: "Case study not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Successfully found case study: ${caseStudy.title}`);
    return new Response(
      JSON.stringify(caseStudy),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in case-studies function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
