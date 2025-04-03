
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
  action?: string;
  email?: string;
}

interface ROICalculationResponse {
  timeReduction: number;
  costSavings: number;
  roiPercentage: number;
  annualSavings: number;
  paybackPeriod: number;
  recommendedApproach: string;
  nextSteps?: string[];
  reportUrl?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ROICalculationRequest = await req.json();
    const { dataVolume, currentEfficiency, serviceLevel, industry, companySize, action, email } = data;

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
    
    // Handle different actions
    let nextSteps = [];
    let reportUrl = "";
    
    if (action === "generate-report" && email) {
      // In a real implementation, this would send an email with the report
      nextSteps = [
        "Review your detailed ROI analysis report",
        "Schedule a consultation with our data engineering experts",
        "Explore our case studies for similar implementations in your industry"
      ];
      reportUrl = `https://example.com/reports/roi-${Date.now()}.pdf`;
      
      console.log(`Report requested by ${email} for ${industry || "unknown"} industry`);
    } else if (action === "next-steps") {
      // Custom next steps based on the calculation results
      if (roiPercentage > 200) {
        nextSteps = [
          "Schedule a comprehensive data assessment",
          "Set up a technical architecture planning session",
          "Develop a phased implementation roadmap"
        ];
      } else if (roiPercentage > 100) {
        nextSteps = [
          "Begin with a focused pilot project",
          "Identify your highest-impact data workflows",
          "Schedule a technical scoping workshop"
        ];
      } else {
        nextSteps = [
          "Start with a data maturity assessment",
          "Identify quick-win optimization opportunities",
          "Schedule an introductory consultation"
        ];
      }
    }
    
    const result: ROICalculationResponse = {
      timeReduction,
      costSavings,
      roiPercentage,
      annualSavings,
      paybackPeriod,
      recommendedApproach,
      nextSteps: nextSteps.length > 0 ? nextSteps : undefined,
      reportUrl: reportUrl || undefined
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
