
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Loader2, Database, Server, BarChart3, GitBranch, Shield, ArrowUpRight, Code } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ETLPipelineVisualizer from "@/components/ETLPipelineVisualizer";
import DataArchitectureDiagram from "@/components/DataArchitectureDiagram";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServiceDetails = () => {
  const { serviceId = 'all' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Handle the 'all' service ID case with default content
        if (serviceId === 'all') {
          setServiceDetails({
            title: "All Data Engineering Services",
            description: "Comprehensive overview of our full range of data engineering solutions designed to meet enterprise-scale requirements.",
            processDuration: "Variable based on service",
            maintenanceSupport: "Custom support plans available",
            technologies: [
              { name: "Apache Kafka", use: "Real-time data streaming" },
              { name: "Apache Spark", use: "Large-scale data processing" },
              { name: "Snowflake", use: "Cloud data warehouse" },
              { name: "Tableau", use: "Business intelligence" },
              { name: "GitHub Actions", use: "CI/CD automation" },
              { name: "Collibra", use: "Data governance" }
            ],
            faqs: [
              { question: "What services are most popular for startups?", answer: "Data Integration & ETL and Data Warehouse Design are common starting points for companies building their data infrastructure." },
              { question: "Do you offer combined service packages?", answer: "Yes, we offer custom packages that integrate multiple services for a comprehensive data solution." }
            ],
            caseStudies: [
              { 
                title: "Enterprise Data Transformation", 
                description: "End-to-end data platform implementation for a Fortune 500 company, spanning all our service categories.",
                results: "85% reduction in reporting time, 40% decrease in data infrastructure costs"
              }
            ]
          });
          setLoading(false);
          return;
        }
        
        // For specific service details, make the API call
        const { data, error } = await supabase.functions.invoke("service-details", {
          body: { serviceId }
        });
        
        if (error) throw error;
        setServiceDetails(data);
      } catch (error) {
        console.error("Error fetching service details:", error);
        setError("Failed to load service details. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load service details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchServiceDetails();
  }, [serviceId, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("service-inquiries", {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          serviceId: serviceId
        }
      });
      
      if (error) throw error;
      
      setNextSteps(data?.nextSteps || []);
      setSubmitted(true);
      
      toast({
        title: "Inquiry Submitted!",
        description: data?.message || "Thank you for your interest. We'll be in touch soon.",
      });
      
    } catch (error) {
      console.error("Error submitting service inquiry:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render the appropriate service icon
  const getServiceIcon = () => {
    switch (serviceId) {
      case "data-integration":
        return <Database className="h-10 w-10 text-primary" />;
      case "data-warehouse":
        return <Server className="h-10 w-10 text-primary" />;
      case "business-intelligence":
        return <BarChart3 className="h-10 w-10 text-primary" />;
      case "dataops-mlops":
        return <GitBranch className="h-10 w-10 text-primary" />;
      case "data-governance":
        return <Shield className="h-10 w-10 text-primary" />;
      case "performance-optimization":
        return <Code className="h-10 w-10 text-primary" />;
      default:
        return <Database className="h-10 w-10 text-primary" />;
    }
  };

  // Determine if we show the interactive ETL pipeline
  const showEtlPipeline = serviceId === "data-integration" || serviceId === "dataops-mlops";
  
  // Determine if we show the data architecture diagram
  const showArchitectureDiagram = serviceId === "data-warehouse" || serviceId === "data-governance";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-8 flex items-center" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading service details...</span>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">Error Loading Service</h2>
              <p className="text-muted-foreground mb-4">
                {error}
              </p>
              <Button onClick={() => navigate("/")}>
                Return to Home
              </Button>
            </div>
          ) : serviceDetails ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    {getServiceIcon()}
                    <div>
                      <h1 className="text-3xl font-bold">
                        {serviceDetails.title}
                      </h1>
                      <p className="text-muted-foreground mt-2">
                        {serviceDetails.description}
                      </p>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" className="mb-8">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="technical">Technical Details</TabsTrigger>
                      <TabsTrigger value="casestudies">Case Studies</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="pt-4">
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-muted/50 rounded-lg border">
                          <h3 className="font-medium mb-2">Process Duration</h3>
                          <p className="text-lg font-semibold text-primary">
                            {serviceDetails.processDuration}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-muted/50 rounded-lg border">
                          <h3 className="font-medium mb-2">Support & Maintenance</h3>
                          <p className="text-lg font-semibold text-primary">
                            {serviceDetails.maintenanceSupport}
                          </p>
                        </div>
                      </div>
                      
                      {serviceDetails.technologies && (
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold mb-3">Technologies We Use</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {serviceDetails.technologies.map((tech: any, idx: number) => (
                              <div key={idx} className="flex items-start p-3 bg-card rounded-lg border hover:shadow-sm transition-shadow">
                                <div className="mr-3 mt-1 p-1.5 bg-primary/10 rounded-md">
                                  {getServiceIcon()}
                                </div>
                                <div>
                                  <h4 className="font-medium">{tech.name}</h4>
                                  <p className="text-sm text-muted-foreground">{tech.use}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {serviceDetails.faqs && (
                        <div>
                          <h3 className="text-xl font-semibold mb-3">Frequently Asked Questions</h3>
                          <div className="space-y-4">
                            {serviceDetails.faqs.map((faq: any, idx: number) => (
                              <div key={idx} className="p-4 bg-muted/50 rounded-lg border">
                                <h4 className="font-medium mb-2">{faq.question}</h4>
                                <p className="text-muted-foreground">{faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="technical" className="pt-4">
                      {showEtlPipeline && (
                        <Card className="mb-8">
                          <CardContent className="pt-6">
                            <ETLPipelineVisualizer />
                          </CardContent>
                        </Card>
                      )}
                      
                      {showArchitectureDiagram && (
                        <Card className="mb-8">
                          <CardContent className="pt-6">
                            <DataArchitectureDiagram />
                          </CardContent>
                        </Card>
                      )}
                      
                      {serviceId === "business-intelligence" && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold">Business Intelligence Architecture</h3>
                          <div className="p-4 bg-muted/50 rounded-lg border">
                            <p className="mb-4">Our BI implementation follows a multi-layer approach:</p>
                            <ol className="list-decimal pl-5 space-y-3">
                              <li>
                                <strong>Data Foundation Layer</strong>
                                <p className="text-muted-foreground">Curated datasets optimized for analytics in star/snowflake schemas</p>
                              </li>
                              <li>
                                <strong>Semantic Layer</strong>
                                <p className="text-muted-foreground">Business-friendly naming, calculated metrics, and dimension hierarchies</p>
                              </li>
                              <li>
                                <strong>Visualization Layer</strong>
                                <p className="text-muted-foreground">Interactive dashboards, reports, and self-service analytics tools</p>
                              </li>
                              <li>
                                <strong>Distribution Layer</strong>
                                <p className="text-muted-foreground">Automated delivery through email, embedded analytics, and portals</p>
                              </li>
                            </ol>
                          </div>
                          
                          <Button className="mt-2">
                            Schedule a BI Demo Session
                          </Button>
                        </div>
                      )}
                      
                      {serviceId === "performance-optimization" && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold">Performance Optimization Approach</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted/50 rounded-lg border">
                              <h4 className="font-medium mb-2">Query Optimization</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>SQL query restructuring</li>
                                <li>Appropriate indexing strategies</li>
                                <li>Materialized views creation</li>
                                <li>Advanced SQL patterns implementation</li>
                                <li>Query plan analysis and improvement</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg border">
                              <h4 className="font-medium mb-2">Infrastructure Tuning</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>Resource allocation optimization</li>
                                <li>Warehouse sizing and auto-scaling</li>
                                <li>Concurrency management</li>
                                <li>Cache optimization strategies</li>
                                <li>Cluster configuration tuning</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg border">
                              <h4 className="font-medium mb-2">Data Modeling Optimization</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>Partitioning and clustering</li>
                                <li>Appropriate compression methods</li>
                                <li>Denormalization where beneficial</li>
                                <li>Optimized data types selection</li>
                                <li>Incremental processing patterns</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-muted/50 rounded-lg border">
                              <h4 className="font-medium mb-2">Cost Management</h4>
                              <ul className="list-disc pl-5 space-y-1 text-sm">
                                <li>Query cost analysis and reduction</li>
                                <li>Storage optimization techniques</li>
                                <li>Compute resource scheduling</li>
                                <li>Data lifecycle management</li>
                                <li>Cloud resource monitoring</li>
                              </ul>
                            </div>
                          </div>
                          
                          <Button className="mt-2">
                            Request Performance Assessment
                          </Button>
                        </div>
                      )}
                      
                      {serviceId === "all" && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold">Technical Capabilities Overview</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle>Data Integration & ETL</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>Real-time streaming pipelines</li>
                                  <li>Batch processing optimization</li>
                                  <li>Custom connector development</li>
                                  <li>Cross-platform data synchronization</li>
                                </ul>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle>Data Warehouse Design</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>Dimensional modeling expertise</li>
                                  <li>Data vault implementation</li>
                                  <li>Lakehouse architectures</li>
                                  <li>Query performance optimization</li>
                                </ul>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle>DataOps & MLOps</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>CI/CD pipeline implementation</li>
                                  <li>Automated testing frameworks</li>
                                  <li>Version control for data assets</li>
                                  <li>Containerized deployments</li>
                                </ul>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle>Data Governance</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <ul className="list-disc pl-5 space-y-1">
                                  <li>Metadata management systems</li>
                                  <li>Data quality monitoring</li>
                                  <li>Access control implementation</li>
                                  <li>Regulatory compliance frameworks</li>
                                </ul>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="casestudies" className="pt-4">
                      {serviceDetails.caseStudies && (
                        <div className="space-y-6">
                          {serviceDetails.caseStudies.map((caseStudy: any, idx: number) => (
                            <Card key={idx}>
                              <CardHeader>
                                <CardTitle>{caseStudy.title}</CardTitle>
                                <CardDescription>{caseStudy.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="p-3 bg-primary/10 rounded-lg text-center">
                                  <h4 className="font-medium mb-1">Results Achieved</h4>
                                  <p className="text-lg font-bold text-primary">{caseStudy.results}</p>
                                </div>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" className="w-full">
                                  Download Full Case Study <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <h3 className="font-medium mb-2">Need a similar solution?</h3>
                        <p className="text-muted-foreground mb-4">
                          We've helped companies across various industries with their data engineering challenges.
                          Contact us to learn how we can apply these proven solutions to your business.
                        </p>
                        <Button onClick={() => window.location.href = '#service-form'}>
                          Request a Consultation
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div id="service-form">
                    {!submitted ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>Request Information</CardTitle>
                          <CardDescription>
                            Fill out the form below to learn more about our {serviceDetails.title} service
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form id="serviceForm" onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name*</Label>
                                <Input
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  required
                                  placeholder="Your name"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="email">Email Address*</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                  placeholder="your.email@example.com"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                  id="company"
                                  name="company"
                                  value={formData.company}
                                  onChange={handleChange}
                                  placeholder="Your company"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="Your phone number"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="message">Message</Label>
                              <Textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={`Tell us about your ${serviceDetails.title.toLowerCase()} needs and requirements`}
                                rows={4}
                              />
                            </div>
                          </form>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            form="serviceForm" 
                            type="submit" 
                            className="w-full" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              `Request ${serviceDetails.title} Service Information`
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-green-600 flex items-center">
                            <Check className="mr-2 h-5 w-5" />
                            Inquiry Received
                          </CardTitle>
                          <CardDescription>
                            Thank you for your interest in our {serviceDetails.title} service
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <p>
                              We've received your inquiry and our team will get back to you shortly at {formData.email}.
                            </p>
                            
                            {nextSteps.length > 0 && (
                              <div>
                                <h3 className="font-medium mb-2">Next Steps</h3>
                                <ul className="space-y-2">
                                  {nextSteps.map((step, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold mr-2 mt-0.5">
                                        {index + 1}
                                      </span>
                                      {step}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                          <Button 
                            variant="outline"
                            className="w-full sm:w-auto"
                            onClick={() => navigate("/")}
                          >
                            Return to Home
                          </Button>
                          <Button
                            className="w-full sm:w-auto"
                            onClick={() => navigate("/roi-analysis")}
                          >
                            Calculate ROI
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                  </div>
                </div>
                
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Service Level</h3>
                          <p className="text-2xl font-bold text-primary">{serviceDetails.title}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">Technologies Used</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {serviceDetails.technologies && serviceDetails.technologies.map((tech: any, idx: number) => (
                              <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold">Service Timeline</h3>
                          <p className="mt-1">{serviceDetails.processDuration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Why Choose Our Services?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        <li className="flex">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium">Expert Team</h4>
                            <p className="text-muted-foreground">Certified data engineers with deep technical expertise</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium">Proven Methodology</h4>
                            <p className="text-muted-foreground">Systematic approach refined through hundreds of implementations</p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium">Ongoing Support</h4>
                            <p className="text-muted-foreground">Continuous monitoring and optimization of your data systems</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Ready to Get Started?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        Our team is ready to help you implement {serviceDetails.title} for your organization.
                      </p>
                      <Button 
                        className="w-full" 
                        onClick={() => window.location.href = '#service-form'}
                      >
                        Request a Consultation
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The requested service information could not be found.
              </p>
              <Button onClick={() => navigate("/")}>
                Return to Home
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
