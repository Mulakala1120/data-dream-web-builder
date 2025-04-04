
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ServiceDetailsRequest {
  serviceId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const requestData: ServiceDetailsRequest = await req.json();
    const { serviceId } = requestData;

    if (!serviceId) {
      return new Response(
        JSON.stringify({ error: "Service ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Map service IDs to detailed information
    const serviceDetails = {
      "data-integration": {
        title: "Data Integration & ETL",
        description: "Our Data Integration & ETL services connect your disparate data sources into a unified system, enabling seamless data flow across your organization.",
        processDuration: "4-8 weeks",
        maintenanceSupport: "Ongoing with 24/7 monitoring",
        technologies: [
          { name: "Apache Kafka", use: "Real-time data streaming" },
          { name: "Apache Spark", use: "Large-scale data processing" },
          { name: "Apache Airflow", use: "Workflow orchestration" },
          { name: "dbt", use: "Data transformation" },
          { name: "Fivetran", use: "SaaS data integration" },
          { name: "Custom connectors", use: "Specialized system integration" }
        ],
        faqs: [
          { question: "How long does a typical ETL implementation take?", answer: "Most implementations take 4-8 weeks depending on complexity and number of data sources." },
          { question: "Can you handle both batch and streaming data?", answer: "Yes, we design solutions for both batch processing and real-time streaming requirements." }
        ],
        caseStudies: [
          { 
            title: "Financial Services Data Integration", 
            description: "Implemented real-time data pipeline for a major bank, reducing reporting latency from hours to seconds.",
            results: "78% reduction in data processing time, 99.99% uptime"
          }
        ]
      },
      "data-warehouse": {
        title: "Data Warehouse Design",
        description: "We design and implement scalable, high-performance data warehouses tailored to your organization's analytical needs.",
        processDuration: "8-12 weeks",
        maintenanceSupport: "Ongoing with quarterly optimization reviews",
        technologies: [
          { name: "Snowflake", use: "Cloud data warehouse" },
          { name: "Google BigQuery", use: "Serverless data warehouse" },
          { name: "Amazon Redshift", use: "Petabyte-scale data warehouse" },
          { name: "Databricks", use: "Lakehouse architecture" },
          { name: "Azure Synapse", use: "Integrated analytics service" }
        ],
        faqs: [
          { question: "Which data warehouse solution is best for my organization?", answer: "We evaluate your specific needs, data volumes, and existing infrastructure to recommend the optimal solution." },
          { question: "Can you migrate our existing data warehouse?", answer: "Yes, we specialize in modernizing legacy data warehouses with minimal disruption." }
        ],
        caseStudies: [
          { 
            title: "Retail Data Warehouse Modernization", 
            description: "Migrated a legacy on-premises data warehouse to Snowflake for a national retailer with 2000+ locations.",
            results: "90% reduction in query times, 65% decrease in TCO"
          }
        ]
      },
      "business-intelligence": {
        title: "Business Intelligence",
        description: "Our BI solutions transform complex data into intuitive dashboards and reports that drive informed decision-making across your organization.",
        processDuration: "6-10 weeks",
        maintenanceSupport: "Ongoing with monthly enhancement cycles",
        technologies: [
          { name: "Tableau", use: "Interactive visualizations" },
          { name: "Power BI", use: "Microsoft ecosystem integration" },
          { name: "Looker", use: "Enterprise analytics platform" },
          { name: "Metabase", use: "Self-service analytics" },
          { name: "Custom Solutions", use: "Specialized reporting needs" }
        ],
        faqs: [
          { question: "How do you ensure BI adoption across our organization?", answer: "We implement a combination of intuitive design, thorough training, and change management strategies." },
          { question: "Can you build both strategic and operational dashboards?", answer: "Yes, we design solutions for all levels, from C-suite strategic views to operational real-time monitoring." }
        ],
        caseStudies: [
          { 
            title: "Healthcare Analytics Platform", 
            description: "Developed an integrated BI solution for a hospital network, providing insights across patient care, operations, and finance.",
            results: "43% improvement in resource allocation, 28% reduction in patient wait times"
          }
        ]
      },
      "dataops-mlops": {
        title: "DataOps & MLOps",
        description: "We implement automated pipelines and practices to streamline the development, deployment, and maintenance of data and ML systems.",
        processDuration: "8-16 weeks",
        maintenanceSupport: "Ongoing with continuous improvement cycles",
        technologies: [
          { name: "GitHub Actions", use: "CI/CD automation" },
          { name: "Jenkins", use: "Pipeline orchestration" },
          { name: "Terraform", use: "Infrastructure as code" },
          { name: "Docker", use: "Containerization" },
          { name: "Kubernetes", use: "Container orchestration" }
        ],
        faqs: [
          { question: "How does DataOps improve our data quality?", answer: "By implementing automated testing, monitoring, and version control throughout the data lifecycle." },
          { question: "Can you integrate with our existing DevOps processes?", answer: "Yes, we adapt our approach to work with your current tools and practices." }
        ],
        caseStudies: [
          { 
            title: "Financial Services MLOps Implementation", 
            description: "Built an end-to-end MLOps platform for a credit risk team, enabling rapid model development and deployment.",
            results: "85% reduction in model deployment time, 40% improvement in model performance"
          }
        ]
      },
      "data-governance": {
        title: "Data Governance",
        description: "Our data governance frameworks ensure your data assets are reliable, secure, compliant, and accessible to the right people.",
        processDuration: "12-20 weeks",
        maintenanceSupport: "Ongoing with quarterly compliance reviews",
        technologies: [
          { name: "Collibra", use: "Data catalog and lineage" },
          { name: "Alation", use: "Data intelligence platform" },
          { name: "Great Expectations", use: "Data quality validation" },
          { name: "Immuta", use: "Data access control" },
          { name: "Custom Frameworks", use: "Organization-specific needs" }
        ],
        faqs: [
          { question: "How do you balance governance with data accessibility?", answer: "We design policies that protect sensitive data while enabling self-service for appropriate users." },
          { question: "Can you help with GDPR/CCPA/HIPAA compliance?", answer: "Yes, we implement governance frameworks aligned with relevant regulatory requirements." }
        ],
        caseStudies: [
          { 
            title: "Healthcare Data Governance Program", 
            description: "Implemented a comprehensive governance framework for a major healthcare provider, ensuring HIPAA compliance and data quality.",
            results: "100% regulatory compliance, 65% reduction in data quality incidents"
          }
        ]
      },
      "performance-optimization": {
        title: "Performance Optimization",
        description: "We tune and optimize your data systems for maximum throughput, query performance, and cost-efficiency.",
        processDuration: "4-8 weeks",
        maintenanceSupport: "Ongoing with monthly performance reviews",
        technologies: [
          { name: "Query Optimization", use: "SQL and database tuning" },
          { name: "Infrastructure Tuning", use: "Resource allocation optimization" },
          { name: "Cost Analysis", use: "Cloud spend optimization" },
          { name: "Caching Strategies", use: "Performance acceleration" }
        ],
        faqs: [
          { question: "How much performance improvement can we expect?", answer: "Most clients see 30-70% improvements in query times and throughput." },
          { question: "Will optimization require system downtime?", answer: "Most optimizations can be implemented with minimal or zero downtime." }
        ],
        caseStudies: [
          { 
            title: "E-commerce Database Optimization", 
            description: "Optimized database performance for a high-traffic e-commerce platform during peak season.",
            results: "75% reduction in response times, 40% decrease in infrastructure costs"
          }
        ]
      }
    };

    // Get the details for the requested service
    const details = serviceDetails[serviceId as keyof typeof serviceDetails];
    
    if (!details) {
      return new Response(
        JSON.stringify({ error: "Service not found" }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify(details),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error in service-details function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
