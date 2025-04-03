
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ROICalculationResponse {
  timeReduction: number;
  costSavings: number;
  roiPercentage: number;
  annualSavings: number;
  paybackPeriod: number;
  recommendedApproach: string;
}

const ROICalculator = () => {
  const { toast } = useToast();
  const [dataVolume, setDataVolume] = useState<number>(500);
  const [currentEfficiency, setCurrentEfficiency] = useState<number>(30);
  const [serviceLevel, setServiceLevel] = useState<string>("standard");
  const [industry, setIndustry] = useState<string>("");
  const [companySize, setCompanySize] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [results, setResults] = useState<ROICalculationResponse | null>(null);

  const calculateROI = async () => {
    setIsCalculating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("roi-calculator", {
        body: {
          dataVolume,
          currentEfficiency,
          serviceLevel,
          industry,
          companySize
        }
      });
      
      if (error) {
        throw error;
      }
      
      setResults(data as ROICalculationResponse);
    } catch (error) {
      console.error("Error calculating ROI:", error);
      toast({
        title: "Calculation Error",
        description: "Unable to calculate ROI. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your detailed ROI report has been sent to your email.",
    });
  };

  return (
    <section id="roi-calculator" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your ROI</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Estimate the potential return on investment from implementing our data engineering solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Input Your Data</CardTitle>
              <CardDescription>
                Provide details about your current data environment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="data-volume">Monthly Data Volume (GB)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="data-volume" 
                    min={50} 
                    max={2000} 
                    step={50} 
                    value={[dataVolume]} 
                    onValueChange={(value) => setDataVolume(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{dataVolume} GB</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="current-efficiency">Current Data Efficiency (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="current-efficiency" 
                    min={10} 
                    max={90} 
                    step={5} 
                    value={[currentEfficiency]} 
                    onValueChange={(value) => setCurrentEfficiency(value[0])}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{currentEfficiency}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="service-level">Service Level</Label>
                <Select value={serviceLevel} onValueChange={setServiceLevel}>
                  <SelectTrigger id="service-level">
                    <SelectValue placeholder="Select service level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry (Optional)</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="finance">Financial Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full" 
                onClick={calculateROI}
                size="lg"
                disabled={isCalculating}
              >
                {isCalculating ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span> Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculate ROI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card className={results ? "bg-muted/40" : ""}>
            <CardHeader>
              <CardTitle>Estimated Results</CardTitle>
              <CardDescription>
                See the potential impact on your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {results ? (
                <>
                  <div className="text-center p-6 space-y-8">
                    <div>
                      <p className="text-muted-foreground mb-2">Time Efficiency Improvement</p>
                      <p className="text-4xl font-bold text-primary">{results.timeReduction}%</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground mb-2">Monthly Cost Savings</p>
                      <p className="text-4xl font-bold text-primary">${results.costSavings.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-muted-foreground mb-2">First-Year ROI</p>
                      <p className="text-4xl font-bold text-primary">{results.roiPercentage}%</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-2">Payback Period</p>
                      <p className="text-2xl font-bold text-primary">{results.paybackPeriod} months</p>
                    </div>
                    
                    <div className="bg-background/70 p-4 rounded-lg">
                      <p className="text-muted-foreground mb-2">Recommended Approach</p>
                      <p className="text-primary">{results.recommendedApproach}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Button variant="outline" onClick={handleDownloadReport}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Detailed Report
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Fill in the form and click "Calculate ROI" to see your potential savings and return on investment.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
