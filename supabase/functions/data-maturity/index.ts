
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AssessmentResponse {
  id: number;
  answer: string;
}

interface AssessmentResult {
  score: number;
  level: string;
  summary: string;
  recommendations: string[];
  nextSteps: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responses }: { responses: AssessmentResponse[] } = await req.json();
    
    // Process assessment responses
    // In a real implementation, this would have a more sophisticated scoring algorithm
    let totalScore = 0;
    
    // Sample scoring logic (simplified)
    responses.forEach(response => {
      // Convert answers to scores based on your scoring system
      // This is a simplified example
      if (response.answer === "advanced") {
        totalScore += 4;
      } else if (response.answer === "intermediate") {
        totalScore += 3;
      } else if (response.answer === "basic") {
        totalScore += 2;
      } else if (response.answer === "minimal") {
        totalScore += 1;
      } else {
        totalScore += 0;
      }
    });
    
    // Maximum possible score would be 4 * number of questions
    const maxPossibleScore = responses.length * 4;
    const percentageScore = (totalScore / maxPossibleScore) * 100;
    
    // Determine maturity level
    let level = "";
    let summary = "";
    let recommendations: string[] = [];
    let nextSteps: string[] = [];
    
    if (percentageScore >= 85) {
      level = "Advanced";
      summary = "Your organization demonstrates sophisticated data capabilities with mature processes and governance.";
      recommendations = [
        "Focus on innovation and cutting-edge data science applications",
        "Explore advanced AI and machine learning implementations",
        "Consider developing proprietary data solutions"
      ];
      nextSteps = [
        "Schedule an advanced data strategy consultation",
        "Explore our DataOps & MLOps solutions",
        "Attend our executive data leadership workshop"
      ];
    } else if (percentageScore >= 70) {
      level = "Progressive";
      summary = "Your organization has established good data practices but has room for optimization and scaling.";
      recommendations = [
        "Streamline data pipelines for greater efficiency",
        "Enhance data governance frameworks",
        "Improve cross-functional data access"
      ];
      nextSteps = [
        "Book a data pipeline optimization consultation",
        "Explore our Performance Optimization services",
        "Download our data governance whitepaper"
      ];
    } else if (percentageScore >= 50) {
      level = "Developing";
      summary = "Your organization has begun implementing data systems but lacks comprehensive strategies and tools.";
      recommendations = [
        "Establish centralized data warehousing",
        "Implement standardized data quality processes",
        "Develop formal data policies and procedures"
      ];
      nextSteps = [
        "Schedule a data warehouse design consultation",
        "Explore our Data Integration & ETL services",
        "Sign up for our data fundamentals webinar series"
      ];
    } else {
      level = "Emerging";
      summary = "Your organization is in the early stages of data maturity with significant opportunities for improvement.";
      recommendations = [
        "Create a foundational data strategy",
        "Consolidate disparate data sources",
        "Establish basic data literacy across teams"
      ];
      nextSteps = [
        "Book an introductory data assessment meeting",
        "Request our data foundation starter guide",
        "Explore our Business Intelligence solutions"
      ];
    }
    
    const result: AssessmentResult = {
      score: Math.round(percentageScore),
      level,
      summary,
      recommendations,
      nextSteps
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in data maturity assessment function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
