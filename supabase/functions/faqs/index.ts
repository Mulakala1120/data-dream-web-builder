
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get query parameters
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    
    // Sample FAQs - in a production app, these would come from a database
    let faqs: FAQ[] = [
      {
        id: 1,
        question: "What is data engineering?",
        answer: "Data engineering is the practice of designing and building systems for collecting, storing, and analyzing data at scale. It involves developing the architecture that enables data generation, transformation, and organization to support advanced analytics, machine learning, and business intelligence.",
        category: "General"
      },
      {
        id: 2,
        question: "How long does a typical data engineering project take?",
        answer: "Project timelines vary based on complexity, scope, and specific requirements. Simple data integration projects might take 4-8 weeks, while comprehensive data warehouse implementations typically range from 3-6 months. Enterprise-scale data platforms may take 6-12 months to fully deploy. We provide detailed timelines during the discovery and planning phase.",
        category: "Process"
      },
      {
        id: 3,
        question: "Do you work with on-premises data systems or only cloud-based solutions?",
        answer: "We have expertise in both on-premises and cloud-based data systems. Our team can implement solutions in either environment or create hybrid architectures that leverage existing on-premises investments while introducing cloud capabilities. We're experienced with all major cloud providers (AWS, Azure, GCP) and traditional data platforms.",
        category: "Technical"
      },
      {
        id: 4,
        question: "How do you handle data security and compliance requirements?",
        answer: "Security and compliance are integrated throughout our development process. We implement industry best practices for data encryption, access controls, and audit logging. Our team has experience with major regulatory frameworks including GDPR, HIPAA, CCPA, and SOC 2. We work with your security team to ensure all implementations meet your compliance requirements.",
        category: "Security"
      },
      {
        id: 5,
        question: "What data warehouse technologies do you work with?",
        answer: "We have expertise across modern data warehouse platforms including Snowflake, Google BigQuery, Amazon Redshift, Azure Synapse, and Databricks, as well as traditional systems like Oracle, SQL Server, and Teradata. Our recommendations are based on your specific requirements, existing technology investments, and long-term data strategy.",
        category: "Technical"
      },
      {
        id: 6,
        question: "Do you provide ongoing support after project completion?",
        answer: "Yes, we offer flexible support options ranging from basic maintenance to fully managed data operations. Our support plans include monitoring, troubleshooting, optimization, and regular system updates. We also provide knowledge transfer and training to your internal teams to build self-sufficiency.",
        category: "Process"
      },
      {
        id: 7,
        question: "How do you price your data engineering services?",
        answer: "Our pricing models are flexible and can be structured as fixed-price projects, time and materials, or retainer-based engagements. We determine the appropriate model based on project complexity, scope definition, and your preferences. We provide detailed proposals with transparent pricing after an initial discovery process.",
        category: "Pricing"
      },
      {
        id: 8,
        question: "Can you help with our existing data quality issues?",
        answer: "Yes, we offer data quality assessment and remediation services. Our approach includes profiling existing data, identifying quality issues, implementing automated validation processes, and establishing governance procedures to maintain quality. We use specialized tools to detect and resolve inconsistencies, duplicates, and other common data problems.",
        category: "Technical"
      }
    ];
    
    // Filter by category if specified
    if (category) {
      faqs = faqs.filter(faq => faq.category.toLowerCase() === category.toLowerCase());
    }

    return new Response(JSON.stringify({ faqs }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in FAQs function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
