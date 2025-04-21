
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

    //--- FULL CASE STUDIES FOR ALL PORTFOLIO ITEMS
    const caseStudies: Record<string, CaseStudy> = {
      "loan-processing": {
        id: "loan-processing",
        title: "Enterprise Loan Processing Data Pipeline",
        client: "Major Financial Institution",
        industry: "Financial Services",
        challenge:
          "The client was struggling with a manual loan application process that took an average of 14 days to complete. They needed a solution to streamline their workflow, improve accuracy in risk assessment, and reduce processing time while handling over 1 million applications annually.",
        solution:
          "We engineered an enterprise-scale data pipeline that automated the entire loan processing workflow. The solution included real-time credit scoring algorithms, automated document verification through OCR and machine learning, and an integrated underwriting system that could make decisions based on predefined risk models.",
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
      },

      "healthcare-integration": {
        id: "healthcare-integration",
        title: "Healthcare Data Integration Platform",
        client: "Leading Hospital Network",
        industry: "Healthcare",
        challenge:
          "A major hospital network had 12 disparate clinical, billing, and scheduling systems, hindering care collaboration and regulatory reporting. Data transfer delays and errors impacted patient outcomes and decision-making.",
        solution:
          "Built a unified data platform with nightly ETL jobs and event-driven microservices to integrate electronic medical records, laboratory results, and imaging data. Implemented data governance policies and auditing features to ensure compliance.",
        results: [
          "Unified 12 siloed systems for a single source of truth",
          "Improved patient data accessibility by 94%",
          "Automated compliance and audit reporting",
          "Cut data-related IT support requests by 71%"
        ],
        technologies: [
          "Microsoft Azure Data Factory",
          "HL7/FHIR APIs",
          "PostgreSQL",
          "Talend",
          "Python",
          "Power BI"
        ],
        timeline: "9 months",
        testimonial: {
          quote: "We can now provide coordinated, data-driven care with confidence. Our teams access the full patient record in seconds and audits are a breeze.",
          author: "Dr. Lisa Zheng",
          role: "Chief Medical Information Officer"
        },
        images: [
          "/images/healthcare-dashboard.png",
          "/images/hl7-integration-diagram.png"
        ]
      },

      "retail-analytics": {
        id: "retail-analytics",
        title: "Scalable Retail Analytics Engine",
        client: "Nationwide Retailer",
        industry: "Retail",
        challenge:
          "With over 2000 locations, the client struggled with disconnected POS systems and delays in inventory and sales analytics. Forecast errors resulted in frequent stockouts and excess inventory.",
        solution:
          "Built a centralized analytics engine to ingest POS, CRM, and logistics feeds in real time. Leveraged machine learning models for demand forecasting, and provided managers with custom dashboards and performance alerts.",
        results: [
          "Increased inventory forecasting accuracy by 34%",
          "Reduced stockouts by 23% across all locations",
          "Automated store-level report generation",
          "Helped optimize reorder schedules and promotions"
        ],
        technologies: [
          "Google BigQuery",
          "Python",
          "dbt",
          "scikit-learn",
          "Apache Airflow",
          "Tableau"
        ],
        timeline: "5 months",
        testimonial: {
          quote: "Our stores now make smarter inventory decisions every day. Out-of-stocks are down and our reporting speed is unreal.",
          author: "Maria Sanchez",
          role: "VP, Retail Analytics"
        },
        images: [
          "/images/retail-analytics-dashboard.png",
          "/images/forecasting-architecture.png"
        ]
      },

      "manufacturing-iot": {
        id: "manufacturing-iot",
        title: "Manufacturing IoT Data Platform",
        client: "Global Manufacturing Group",
        industry: "Manufacturing",
        challenge:
          "Fifteen factories used different sensor systems, making it impossible to get real-time views across production. Equipment failures caused unplanned downtime, costing millions per year.",
        solution:
          "Engineered a data processing pipeline for streaming IoT data from all facilities. Implemented predictive maintenance ML models and built a centralized dashboard for monitoring OEE (Overall Equipment Effectiveness).",
        results: [
          "Reduced equipment downtime by 42%",
          "Unified real-time supervision of 15 sites",
          "Automated fault detection and alerts for all critical machinery",
          "Improved throughput by optimizing line speed"
        ],
        technologies: [
          "AWS IoT Core",
          "Apache Kafka",
          "InfluxDB",
          "Grafana",
          "Node.js",
          "TensorFlow"
        ],
        timeline: "7 months",
        testimonial: {
          quote: "We've leapfrogged our digital transformation plans. Now, we fix problems before they cause big losses.",
          author: "Roland Becker",
          role: "Head of Manufacturing Innovation"
        },
        images: [
          "/images/iot-monitoring-dashboard.png",
          "/images/factory-sensor-network.png"
        ]
      },

      "ecommerce-recommendations": {
        id: "ecommerce-recommendations",
        title: "E-commerce Recommendation Engine",
        client: "Top E-commerce Platform",
        industry: "E-commerce",
        challenge:
          "Shoppers received generic product listings that didn't reflect their preferences, missing opportunities for upselling and increasing cart size. The business needed more personalized digital experience to drive conversions.",
        solution:
          "Implemented a real-time, ML-powered recommendation engine. Developed customer segments and personalized product feeds, utilizing collaborative filtering, session-based recommendations, and user affinity scores.",
        results: [
          "Increased average order value by 27%",
          "Improved user engagement metrics by 35%",
          "Boosted cross-sell rates on seasonal campaigns",
          "Reduced bounce rates and cart abandonment"
        ],
        technologies: [
          "AWS SageMaker",
          "Python",
          "Spark MLlib",
          "React",
          "AWS Lambda",
          "S3"
        ],
        timeline: "4 months",
        testimonial: {
          quote: "Our sales and engagement numbers speak for themselves. Customers love that their experience feels uniquely tailored!",
          author: "Erin Castillo",
          role: "Director of Product"
        },
        images: [
          "/images/ecommerce-algorithm.png",
          "/images/recommendation-dashboard.png"
        ]
      },

      "insurance-claims": {
        id: "insurance-claims",
        title: "Insurance Claims Analytics Platform",
        client: "Global Insurance Provider",
        industry: "Insurance",
        challenge:
          "Fraudulent claims and processing bottlenecks led to long payout cycles and lost revenue. The client needed advanced analytics to flag suspect claims and speed up workflows.",
        solution:
          "Developed an end-to-end analytics platform, integrating with legacy claim systems. Built fraud detection models using anomaly detection, automated document classification, and interactive BI reports for claims agents.",
        results: [
          "Reduced fraudulent claims by 18% within 6 months",
          "Accelerated claim processing time by 40%",
          "Enabled risk-based tiered assignment to adjuster teams",
          "Enhanced regulatory compliance and audit capabilities"
        ],
        technologies: [
          "Snowflake",
          "Azure ML",
          "Power BI",
          "Python",
          "dbt",
          "Docker"
        ],
        timeline: "6 months",
        testimonial: {
          quote: "We're now leading the industry in analytics-driven claims processing. The improvement in fraud detection justifies the whole investment.",
          author: "Jill Kennedy",
          role: "VP, Claims Operations"
        },
        images: [
          "/images/claims-fraud-detection.png",
          "/images/claims-analytics-dashboard.png"
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
