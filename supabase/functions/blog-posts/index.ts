
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
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
    const limit = parseInt(url.searchParams.get("limit") || "3");
    
    // Sample blog posts - in a production app, these would come from a database
    let blogPosts: BlogPost[] = [
      {
        id: 1,
        title: "Best Practices for Real-time Data Pipeline Architecture",
        excerpt: "Learn how to design scalable, fault-tolerant data pipelines for processing streaming data with minimal latency.",
        author: "Sarah Chen",
        date: "2025-03-15",
        category: "Data Engineering",
        readTime: "8 min read",
        slug: "real-time-data-pipeline-architecture"
      },
      {
        id: 2,
        title: "The Future of Data Mesh: Decentralized Data Architecture",
        excerpt: "Explore how data mesh architecture is transforming enterprise data management with domain-oriented ownership.",
        author: "Michael Rodriguez",
        date: "2025-03-01",
        category: "Data Architecture",
        readTime: "12 min read",
        slug: "future-of-data-mesh"
      },
      {
        id: 3,
        title: "Implementing Zero-ETL: The Next Evolution in Data Integration",
        excerpt: "Discover how zero-ETL approaches are eliminating traditional data movement for faster insights.",
        author: "Priya Patel",
        date: "2025-02-22",
        category: "Data Integration",
        readTime: "10 min read",
        slug: "implementing-zero-etl"
      },
      {
        id: 4,
        title: "Data Governance in the Age of AI: New Challenges",
        excerpt: "Understand the evolving landscape of data governance as AI adoption accelerates across industries.",
        author: "David Thompson",
        date: "2025-02-15",
        category: "Data Governance",
        readTime: "9 min read",
        slug: "data-governance-ai-challenges"
      },
      {
        id: 5,
        title: "Cloud Data Warehouse Performance Tuning: Advanced Techniques",
        excerpt: "Master the art of optimizing query performance in modern cloud data warehouses.",
        author: "Jennifer Wu",
        date: "2025-02-08",
        category: "Performance Optimization",
        readTime: "11 min read",
        slug: "cloud-data-warehouse-performance"
      },
      {
        id: 6,
        title: "DataOps vs MLOps: Understanding the Differences",
        excerpt: "Clarify the distinctions and overlaps between DataOps and MLOps methodologies.",
        author: "Carlos Mendez",
        date: "2025-01-28",
        category: "DataOps",
        readTime: "7 min read",
        slug: "dataops-vs-mlops"
      }
    ];
    
    // Filter by category if specified
    if (category) {
      blogPosts = blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }
    
    // Apply limit
    blogPosts = blogPosts.slice(0, limit);

    return new Response(JSON.stringify({ posts: blogPosts }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in blog posts function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
