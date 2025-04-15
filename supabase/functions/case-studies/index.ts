
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CaseStudyRequest {
  caseStudyId: string;
}

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
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // For this implementation, we'll use hard-coded case studies
    // In a production environment, this would come from a database
    const requestUrl = new URL(req.url);
    const caseStudyId = requestUrl.searchParams.get('id');

    if (!caseStudyId) {
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
        }
      },
      "healthcare-integration": {
        id: "healthcare-integration",
        title: "Healthcare Data Integration Platform",
        client: "Regional Hospital Network",
        industry: "Healthcare",
        challenge: "The client operated 12 separate healthcare facilities, each with their own siloed data systems. This fragmentation prevented a unified view of patient information, hindered coordinated care, and created compliance risks with HIPAA regulations.",
        solution: "We developed a comprehensive data integration platform that connected all 12 disparate systems while maintaining strict HIPAA compliance. The solution included a central data lake, real-time ETL processes, master patient indexing, and role-based access controls to ensure data security and privacy.",
        results: [
          "Improved patient data accessibility by 94%",
          "Reduced medical errors by 37% through better information sharing",
          "Decreased time spent on regulatory reporting by 68%",
          "Enhanced care coordination resulting in 23% shorter hospital stays",
          "100% HIPAA compliance with comprehensive audit trails"
        ],
        technologies: [
          "Azure Data Factory",
          "FHIR API",
          "HL7 Integration",
          "Azure Synapse",
          "PowerBI",
          "C#",
          "Databricks"
        ],
        timeline: "9 months",
        testimonial: {
          quote: "For the first time, our physicians have a complete view of patient history across all our facilities. This has transformed our ability to deliver coordinated care.",
          author: "Dr. Sarah Chen",
          role: "Chief Medical Information Officer"
        }
      },
      "retail-analytics": {
        id: "retail-analytics",
        title: "Enterprise Retail Analytics Engine",
        client: "National Retail Chain",
        industry: "Retail",
        challenge: "With over 2,000 locations nationwide, the client struggled with inconsistent inventory management, inaccurate demand forecasting, and an inability to optimize their supply chain. This resulted in frequent stockouts, excess inventory, and missed sales opportunities.",
        solution: "We built a scalable analytics infrastructure that integrated point-of-sale data, inventory systems, supplier information, and external factors like weather and local events. The solution included predictive models for demand forecasting, automated replenishment systems, and real-time dashboards for store managers and executives.",
        results: [
          "Increased inventory forecasting accuracy by 34%",
          "Reduced stockouts by 23% across all locations",
          "Decreased excess inventory by 28%, freeing up $12M in working capital",
          "Optimized store-level assortments resulting in 8% sales lift",
          "Improved supplier delivery compliance by 42%"
        ],
        technologies: [
          "Google BigQuery",
          "Looker",
          "TensorFlow",
          "Airflow",
          "Python",
          "Kubernetes",
          "React"
        ],
        timeline: "8 months",
        testimonial: {
          quote: "The analytics engine has transformed how we manage our business. We can now predict demand patterns we never saw before and respond to market changes much faster than our competitors.",
          author: "Michael Rodriguez",
          role: "VP of Supply Chain"
        }
      },
      "manufacturing-iot": {
        id: "manufacturing-iot",
        title: "Manufacturing IoT Data Platform",
        client: "Global Manufacturing Company",
        industry: "Manufacturing",
        challenge: "The client operated 15 manufacturing facilities equipped with thousands of sensors, but lacked the infrastructure to process and analyze this data effectively. Equipment failures were causing unexpected downtime, quality issues went undetected, and energy consumption was inefficient.",
        solution: "We engineered a real-time IoT data processing pipeline that collected, processed, and analyzed data from over 15,000 sensors across all facilities. The solution included anomaly detection algorithms, predictive maintenance models, and a digital twin visualization system for each manufacturing line.",
        results: [
          "Reduced equipment downtime by 42% through predictive maintenance",
          "Decreased energy consumption by 17% through optimization",
          "Improved product quality metrics by 28%",
          "Enhanced production throughput by 19% without additional equipment",
          "Achieved ROI within 9 months of deployment"
        ],
        technologies: [
          "Azure IoT Hub",
          "Apache Kafka",
          "Spark Streaming",
          "Time Series Insights",
          "Python",
          "Docker",
          "Power BI"
        ],
        timeline: "12 months",
        testimonial: {
          quote: "The IoT platform has given us visibility into our operations that we never thought possible. We're catching issues before they cause downtime and optimizing in ways we couldn't before.",
          author: "Thomas Lee",
          role: "Director of Manufacturing Operations"
        }
      },
      "ecommerce-recommendations": {
        id: "ecommerce-recommendations",
        title: "E-commerce Recommendation Engine",
        client: "Online Retail Platform",
        industry: "E-commerce",
        challenge: "The client's e-commerce platform offered thousands of products, but lacked personalization capabilities. Their static recommendation system had low engagement, and customers struggled to discover relevant products, resulting in lower conversion rates and reduced average order values.",
        solution: "We implemented a sophisticated machine learning-based recommendation system that analyzed browsing behavior, purchase history, and product characteristics. The solution included collaborative filtering algorithms, content-based recommendation models, and real-time personalization that adapted to user behavior within a session.",
        results: [
          "Increased average order value by 27%",
          "Improved user engagement metrics by 35%",
          "Boosted conversion rates by 18% for recommended products",
          "Reduced bounce rates by 22% through better content discovery",
          "Extended average session duration by 41%"
        ],
        technologies: [
          "TensorFlow",
          "Apache Spark MLlib",
          "Redis",
          "PostgreSQL",
          "Python",
          "AWS SageMaker",
          "React"
        ],
        timeline: "5 months",
        testimonial: {
          quote: "The recommendation engine has completely transformed our customer experience. Our shoppers are discovering products they love but would never have found on their own.",
          author: "Jessica Torres",
          role: "E-commerce Director"
        }
      },
      "insurance-claims": {
        id: "insurance-claims",
        title: "Insurance Claims Analytics Platform",
        client: "Global Insurance Provider",
        industry: "Insurance",
        challenge: "The client processed millions of claims annually with inconsistent workflows, limited fraud detection capabilities, and slow processing times. Their legacy systems couldn't provide actionable insights, and they had difficulty measuring adjuster performance across different claim types.",
        solution: "We built an end-to-end claims analytics platform that standardized data across all lines of business. The solution included real-time fraud detection models, intelligent claim routing based on complexity and adjuster expertise, and comprehensive dashboards for performance monitoring and process optimization.",
        results: [
          "Reduced fraudulent claims by 18%, saving $28M annually",
          "Accelerated claims processing time by 40%",
          "Improved adjuster productivity by 25% through specialized routing",
          "Decreased litigation rates by 12% through earlier risk identification",
          "Enhanced customer satisfaction scores by 31% due to faster resolution"
        ],
        technologies: [
          "Snowflake",
          "Databricks",
          "H2O.ai",
          "Tableau",
          "Python",
          "Azure Functions",
          "React"
        ],
        timeline: "10 months",
        testimonial: {
          quote: "This platform has given us unprecedented visibility into our claims operations. We're catching fraud we never would have detected before and processing legitimate claims faster than ever.",
          author: "Robert Chang",
          role: "Chief Claims Officer"
        }
      }
    };

    const caseStudy = caseStudies[caseStudyId];
    
    if (!caseStudy) {
      return new Response(
        JSON.stringify({ error: "Case study not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

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
