
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ServiceInquiryRequest {
  name: string;
  email: string;
  company?: string;
  serviceId: string;
  message?: string;
  phone?: string;
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

    const requestData: ServiceInquiryRequest = await req.json();
    
    // Validate required fields
    if (!requestData.name || !requestData.email || !requestData.serviceId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Save inquiry to database
    const { data, error } = await supabase
      .from('service_requests')
      .insert({
        contact_name: requestData.name,
        email: requestData.email,
        company_name: requestData.company || null,
        service_type: requestData.serviceId,
        project_description: requestData.message || null,
        phone: requestData.phone || null,
        status: 'new'
      })
      .select('id')
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    // Get service name for response
    let serviceName = "";
    switch (requestData.serviceId) {
      case "essential": serviceName = "Essential"; break;
      case "professional": serviceName = "Professional"; break;
      case "enterprise": serviceName = "Enterprise"; break;
      case "custom": serviceName = "Custom"; break;
      default: serviceName = requestData.serviceId;
    }

    // In a real implementation, you might want to send an email notification here

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: `Your inquiry for our ${serviceName} service has been received`,
        inquiryId: data.id,
        nextSteps: [
          "Our team will review your inquiry",
          "We'll reach out to you within 24 hours",
          "We'll schedule a consultation to discuss your needs in detail"
        ]
      }),
      { 
        status: 200, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  } catch (error) {
    console.error("Error in service-inquiries function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
