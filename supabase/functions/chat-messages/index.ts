
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Create a Supabase client with the auth context of the function
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface ChatMessage {
  id?: string;
  sessionId: string;
  message: string;
  isUser: boolean;
  timestamp?: string;
}

interface AutoResponse {
  keywords: string[];
  response: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method === "GET") {
      // Retrieve chat session history
      const url = new URL(req.url);
      const sessionId = url.searchParams.get("sessionId");
      
      if (!sessionId) {
        return new Response(
          JSON.stringify({ error: "Session ID is required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      
      // In a real implementation, retrieve messages from the database
      // For now, return empty array as this is just a demo
      return new Response(JSON.stringify({ messages: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else if (req.method === "POST") {
      // Handle new user message and generate response
      const { message, sessionId }: { message: string, sessionId: string } = await req.json();
      
      if (!message || !sessionId) {
        return new Response(
          JSON.stringify({ error: "Message and session ID are required" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      
      // Auto-response system based on keywords
      const autoResponses: AutoResponse[] = [
        {
          keywords: ["pricing", "cost", "price", "package", "plan"],
          response: "Our data engineering services are customized based on your specific needs. We offer flexible pricing models including project-based, retainer, and outcome-based options. Would you like to schedule a consultation to discuss your requirements and get a tailored quote?"
        },
        {
          keywords: ["demo", "demonstration", "show", "preview"],
          response: "We'd be happy to provide a demonstration of our data engineering solutions. Our demos are personalized to your use case to show relevant capabilities. Could you share a bit about your data challenges so we can prepare the most relevant demo?"
        },
        {
          keywords: ["integration", "connect", "api", "source", "destination"],
          response: "We specialize in data integration across diverse sources and platforms. Our team has experience with all major databases, cloud providers, APIs, and streaming platforms. Which specific systems are you looking to integrate?"
        },
        {
          keywords: ["security", "compliance", "gdpr", "hipaa", "ccpa", "secure"],
          response: "Data security and compliance are foundational to our approach. We implement industry best practices and support compliance with GDPR, HIPAA, CCPA, and other regulations. Would you like to discuss your specific security requirements with our team?"
        }
      ];
      
      // Find matching response
      let botResponse = "Thank you for your message. A data engineering specialist will respond shortly. In the meantime, can you tell us more about your data challenges?";
      
      for (const autoResponse of autoResponses) {
        if (autoResponse.keywords.some(keyword => 
          message.toLowerCase().includes(keyword.toLowerCase())
        )) {
          botResponse = autoResponse.response;
          break;
        }
      }
      
      // In a real implementation, store messages in the database
      
      return new Response(JSON.stringify({ 
        response: botResponse,
        sessionId: sessionId
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in chat messages function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
