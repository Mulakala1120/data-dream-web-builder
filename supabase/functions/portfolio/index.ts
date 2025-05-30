import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  industry: string;
  services: string[];
  results: string;
  icon: string;
  case_study_url?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const portfolioItems: PortfolioItem[] = [
      {
        id: 1,
        title: "Loan Processing Data Pipeline",
        description: "Engineered an enterprise-scale data pipeline for a leading financial institution, processing over 1M loan applications annually. Implemented real-time credit scoring and automated underwriting systems.",
        industry: "Financial Services",
        services: ["Data Pipeline Development", "Real-time Processing", "Credit Risk Analytics"],
        results: "Reduced loan processing time by 68% and improved risk assessment accuracy by 45%",
        icon: "CircleDollarSign",
        case_study_url: "/case-studies/loan-processing"
      },
      {
        id: 2,
        title: "Healthcare Data Integration",
        description: "Created a unified data platform connecting 12 disparate healthcare systems for a major hospital network.",
        industry: "Healthcare",
        services: ["Data Integration & ETL", "Data Governance"],
        results: "Improved patient data accessibility by 94% while ensuring HIPAA compliance",
        icon: "Database",
        case_study_url: "/case-studies/healthcare-integration"
      },
      {
        id: 3,
        title: "Retail Analytics Engine",
        description: "Built a scalable analytics infrastructure for a nationwide retailer with 2000+ locations.",
        industry: "Retail",
        services: ["DataOps & MLOps", "Performance Optimization"],
        results: "Increased inventory forecasting accuracy by 34% and reduced stockouts by 23%",
        icon: "LineChart",
        case_study_url: "/case-studies/retail-analytics"
      },
      {
        id: 4,
        title: "Manufacturing IoT Platform",
        description: "Engineered a real-time data processing pipeline for IoT sensors across 15 manufacturing facilities.",
        industry: "Manufacturing",
        services: ["Data Integration & ETL", "Performance Optimization"],
        results: "Reduced equipment downtime by 42% through predictive maintenance",
        icon: "ServerCog",
        case_study_url: "/case-studies/manufacturing-iot"
      },
      {
        id: 5,
        title: "E-commerce Recommendation Engine",
        description: "Implemented an ML-based recommendation system for a major e-commerce platform.",
        industry: "E-commerce",
        services: ["Machine Learning", "Data Integration"],
        results: "Increased average order value by 27% and improved user engagement metrics by 35%",
        icon: "ShoppingCart",
        case_study_url: "/case-studies/ecommerce-recommendations"
      },
      {
        id: 6,
        title: "Insurance Claims Analytics",
        description: "Built an end-to-end claims analytics platform for a global insurance provider.",
        industry: "Insurance",
        services: ["Data Warehouse Design", "Business Intelligence"],
        results: "Reduced fraudulent claims by 18% and accelerated processing time by 40%",
        icon: "Shield",
        case_study_url: "/case-studies/insurance-claims"
      }
    ];

    return new Response(JSON.stringify({ items: portfolioItems }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in portfolio function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
