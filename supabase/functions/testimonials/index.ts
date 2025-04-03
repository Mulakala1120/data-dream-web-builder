
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar?: string;
  industry: string;
  rating: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get query parameters
    const url = new URL(req.url);
    const industry = url.searchParams.get("industry");
    const limit = parseInt(url.searchParams.get("limit") || "4");
    
    // Sample testimonials - in a production app, these would come from a database
    let testimonials: Testimonial[] = [
      {
        id: 1,
        name: "Emily Johnson",
        role: "CTO",
        company: "NexusFinance",
        testimonial: "The data warehouse solution implemented by this team completely transformed our reporting capabilities. What used to take days now happens in minutes, giving our analysts more time for value-added activities.",
        industry: "Financial Services",
        rating: 5
      },
      {
        id: 2,
        name: "Robert Chen",
        role: "VP of Data & Analytics",
        company: "HealthFirst Network",
        testimonial: "Their expertise in healthcare data integration helped us connect disparate systems across our hospital network. Patient data is now accessible securely across departments, improving care coordination significantly.",
        industry: "Healthcare",
        rating: 5
      },
      {
        id: 3,
        name: "Jessica Martinez",
        role: "Director of Supply Chain",
        company: "RetailGiant",
        testimonial: "The analytics engine they built for our inventory management has been a game-changer. Our stockouts are down, and we're now able to forecast seasonal demand with remarkable accuracy.",
        industry: "Retail",
        rating: 4
      },
      {
        id: 4,
        name: "Michael Thompson",
        role: "Head of Operations",
        company: "IndustrialTech Manufacturing",
        testimonial: "Implementing IoT data processing across our facilities has reduced equipment downtime significantly. Their team understood our specific manufacturing challenges and delivered a solution that exceeds expectations.",
        industry: "Manufacturing",
        rating: 5
      },
      {
        id: 5,
        name: "Sarah Williams",
        role: "Chief Digital Officer",
        company: "InsureWell",
        testimonial: "The fraud detection capabilities in our claims system have saved us millions. Their team's deep expertise in data engineering for insurance applications is unmatched in the industry.",
        industry: "Insurance",
        rating: 5
      },
      {
        id: 6,
        name: "David Rodriguez",
        role: "IT Director",
        company: "TechSolutions",
        testimonial: "Our data migration to the cloud was seamless and completed ahead of schedule. The performance optimizations they implemented reduced our infrastructure costs by 40%.",
        industry: "Technology",
        rating: 4
      }
    ];
    
    // Filter by industry if specified
    if (industry) {
      testimonials = testimonials.filter(testimonial => 
        testimonial.industry.toLowerCase() === industry.toLowerCase()
      );
    }
    
    // Apply limit
    testimonials = testimonials.slice(0, limit);

    return new Response(JSON.stringify({ testimonials }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in testimonials function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
