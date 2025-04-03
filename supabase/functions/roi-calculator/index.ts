
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ROICalculationRequest {
  dataVolume: number;
  currentEfficiency: number;
  serviceLevel: string;
  industry?: string;
  companySize?: string;
}

interface ROICalculationResponse {
  timeReduction: number;
  costSavings: number;
  roiPercentage: number;
  annualSavings: number;
  paybackPeriod: number;
  recommendedApproach: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ROICalculationRequest = await req.json();
    const { dataVolume, currentEfficiency, serviceLevel, industry, companySize } = data;

    // Advanced ROI calculation with industry-specific adjustments
    let baseEfficiencyGain = 0;
    let serviceCost = 0;
    
    // Base efficiency gain depends on service level
    switch (serviceLevel) {
      case "basic":
        baseEfficiencyGain = 0.2; // 20% improvement
        serviceCost = 10000;
        break;
      case "standard":
        baseEfficiencyGain = 0.35; // 35% improvement
        serviceCost = 25000;
        break;
      case "premium":
        baseEfficiencyGain = 0.5; // 50% improvement
        serviceCost = 50000;
        break;
      case "enterprise":
        baseEfficiencyGain = 0.65; // 65% improvement
        serviceCost = 100000;
        break;
      default:
        baseEfficiencyGain = 0.35;
        serviceCost = 25000;
    }
    
    // Industry adjustment factor
    let industryFactor = 1.0;
    if (industry) {
      switch (industry) {
        case "finance": industryFactor = 1.2; break;
        case "healthcare": industryFactor = 1.15; break;
        case "retail": industryFactor = 1.1; break;
        case "manufacturing": industryFactor = 1.05; break;
        default: industryFactor = 1.0;
      }
    }
    
    // Adjust based on current efficiency (lower current efficiency = more room for improvement)
    const efficiencyFactor = 1 - (currentEfficiency / 100);
    const adjustedEfficiencyGain = baseEfficiencyGain + (baseEfficiencyGain * efficiencyFactor);
    
    // Factor in data volume (larger volumes benefit more)
    const volumeFactor = Math.min(1.5, 0.8 + (dataVolume / 2000));
    
    // Calculate metrics with industry adjustment
    const timeReduction = Math.round(adjustedEfficiencyGain * volumeFactor * industryFactor * 100);
    const hourlyCost = 150; // Assumed average hourly cost for data engineering work
    const monthlyHours = 160; // Assumed monthly hours spent on data management
    const costSavings = Math.round((timeReduction / 100) * hourlyCost * monthlyHours);
    const annualSavings = costSavings * 12;
    const roiPercentage = Math.round((annualSavings - serviceCost) / serviceCost * 100);
    const paybackPeriod = Math.round((serviceCost / annualSavings) * 12); // In months
    
    // Determine recommended approach based on inputs
    let recommendedApproach = "";
    if (dataVolume > 1000 && currentEfficiency < 40) {
      recommendedApproach = "Complete data infrastructure overhaul with cloud migration";
    } else if (dataVolume > 500 && currentEfficiency < 60) {
      recommendedApproach = "Targeted modernization of key data pipelines with hybrid architecture";
    } else if (currentEfficiency < 70) {
      recommendedApproach = "Incremental optimization with focused performance enhancements";
    } else {
      recommendedApproach = "Fine-tuning and governance improvements for existing systems";
    }
    
    const result: ROICalculationResponse = {
      timeReduction,
      costSavings,
      roiPercentage,
      annualSavings,
      paybackPeriod,
      recommendedApproach
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in ROI calculator function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
