
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";

const ROICalculator = () => {
  const [dataVolume, setDataVolume] = useState<number>(500);
  const [currentEfficiency, setCurrentEfficiency] = useState<number>(30);
  const [serviceLevel, setServiceLevel] = useState<string>("standard");
  const [results, setResults] = useState<{
    timeReduction: number;
    costSavings: number;
    roiPercentage: number;
  } | null>(null);

  const calculateROI = () => {
    let baseEfficiencyGain = 0;
    
    // Base efficiency gain depends on service level
    switch (serviceLevel) {
      case "basic":
        baseEfficiencyGain = 0.2; // 20% improvement
        break;
      case "standard":
        baseEfficiencyGain = 0.35; // 35% improvement
        break;
      case "premium":
        baseEfficiencyGain = 0.5; // 50% improvement
        break;
      case "enterprise":
        baseEfficiencyGain = 0.65; // 65% improvement
        break;
      default:
        baseEfficiencyGain = 0.35;
    }
    
    // Adjust based on current efficiency (lower current efficiency = more room for improvement)
    const efficiencyFactor = 1 - (currentEfficiency / 100);
    const adjustedEfficiencyGain = baseEfficiencyGain + (baseEfficiencyGain * efficiencyFactor);
    
    // Factor in data volume (larger volumes benefit more)
    const volumeFactor = Math.min(1.5, 0.8 + (dataVolume / 2000));
    
    // Calculate metrics
    const timeReduction = Math.round(adjustedEfficiencyGain * volumeFactor * 100);
    const hourlyCost = 150; // Assumed average hourly cost for data engineering work
    const monthlyHours = 160; // Assumed monthly hours spent on data management
    const costSavings = Math.round((timeReduction / 100) * hourlyCost * monthlyHours);
    
    // ROI calculation based on service level cost
    let serviceCost = 0;
    switch (serviceLevel) {
      case "basic":
        serviceCost = 10000;
        break;
      case "standard":
        serviceCost = 25000;
        break;
      case "premium":
        serviceCost = 50000;
        break;
      case "enterprise":
        serviceCost = 100000;
        break;
      default:
        serviceCost = 25000;
    }
    
    const annualSavings = costSavings * 12;
    const roiPercentage = Math.round((annualSavings - serviceCost) / serviceCost * 100);
    
    setResults({
      timeReduction,
      costSavings,
      roiPercentage,
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
              
              <Button 
                className="w-full" 
                onClick={calculateROI}
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate ROI
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
                  </div>
                  
                  <div className="text-center">
                    <Button variant="outline">Download Detailed Report</Button>
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
