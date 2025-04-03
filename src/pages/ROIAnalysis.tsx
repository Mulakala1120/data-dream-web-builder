
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Download, Mail, Calendar, ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ROIAnalysis = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(location.state?.results || null);
  const [nextSteps, setNextSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    if (!results) {
      navigate("/");
      return;
    }

    fetchNextSteps();
  }, [results, navigate]);

  const fetchNextSteps = async () => {
    setLoading(true);
    try {
      if (!results) return;

      const { data, error } = await supabase.functions.invoke("roi-calculator", {
        body: {
          dataVolume: location.state?.dataVolume || 500,
          currentEfficiency: location.state?.currentEfficiency || 30,
          serviceLevel: location.state?.serviceLevel || "standard",
          industry: location.state?.industry || "",
          action: "next-steps"
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.nextSteps) {
        setNextSteps(data.nextSteps);
      }
    } catch (error) {
      console.error("Error fetching next steps:", error);
      toast({
        title: "Error",
        description: "Unable to fetch next steps. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive the detailed report.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("roi-calculator", {
        body: {
          dataVolume: location.state?.dataVolume || 500,
          currentEfficiency: location.state?.currentEfficiency || 30,
          serviceLevel: location.state?.serviceLevel || "standard",
          industry: location.state?.industry || "",
          action: "generate-report",
          email
        }
      });
      
      if (error) {
        throw error;
      }
      
      setReportGenerated(true);
      toast({
        title: "Report Generated",
        description: "Your detailed ROI report has been sent to your email.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Unable to generate report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleConsultation = () => {
    toast({
      title: "Consultation Request Received",
      description: "Our team will contact you soon to schedule a consultation.",
    });
  };

  if (!results) {
    return null;
  }

  const chartData = [
    { name: 'Current Cost', value: results.annualSavings / (results.roiPercentage / 100) },
    { name: 'Savings', value: results.annualSavings },
  ];

  const timelineData = [
    { name: 'Month 1-3', savings: Math.round(results.annualSavings / 4) },
    { name: 'Month 4-6', savings: Math.round(results.annualSavings / 2) },
    { name: 'Month 7-9', savings: Math.round(results.annualSavings * 0.75) },
    { name: 'Month 10-12', savings: results.annualSavings },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Your ROI Analysis Results</CardTitle>
                  <CardDescription>
                    Based on your inputs, here's the projected return on investment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Annual Cost Savings</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Expected Savings Timeline</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={timelineData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Bar dataKey="savings" fill="#00C49F" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <h4 className="text-muted-foreground mb-2">Time Efficiency Gain</h4>
                      <p className="text-3xl font-bold text-primary">{results.timeReduction}%</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <h4 className="text-muted-foreground mb-2">Annual Savings</h4>
                      <p className="text-3xl font-bold text-primary">${results.annualSavings.toLocaleString()}</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <h4 className="text-muted-foreground mb-2">Payback Period</h4>
                      <p className="text-3xl font-bold text-primary">{results.paybackPeriod} months</p>
                    </div>
                  </div>

                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Recommended Approach</h4>
                    <p>{results.recommendedApproach}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>
                    Recommended actions to maximize your ROI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {nextSteps.map((step, index) => (
                        <div key={index} className="flex">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {index + 1}
                          </div>
                          <div className="ml-4">
                            <h4 className="text-base font-medium">{step}</h4>
                            <Button 
                              variant="link" 
                              className="px-0 text-sm text-muted-foreground" 
                              onClick={() => navigate("/service-request", { state: { preselectedStep: index } })}
                            >
                              Learn more <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Get Your Detailed Report</CardTitle>
                  <CardDescription>
                    Receive a comprehensive analysis of potential savings and implementation steps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!reportGenerated ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your.email@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={handleGenerateReport}
                        disabled={loading || !email}
                      >
                        {loading ? (
                          <span className="flex items-center">
                            <span className="animate-spin mr-2">⟳</span> Generating...
                          </span>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Generate Full Report
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-2">
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium">Report Sent!</h3>
                      <p className="text-muted-foreground mt-1">Check your email inbox for the detailed ROI analysis.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Expert Guidance?</CardTitle>
                  <CardDescription>
                    Schedule a consultation with our data engineering experts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Our team can provide personalized recommendations based on your specific needs and help you create an implementation plan.
                  </p>
                  <Separator />
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={handleScheduleConsultation}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Request a Consultation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleScheduleConsultation}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule a Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ROIAnalysis;
