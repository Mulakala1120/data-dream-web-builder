
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const serviceDetails = location.state?.serviceDetails || {
    id: serviceId || "custom",
    name: serviceId === "custom" ? "Custom Solution" : "Service Package",
    description: "Tell us about your specific requirements",
    price: "Custom pricing"
  };

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
          serviceId: serviceDetails.id
        }
      });
      
      if (error) throw error;
      
      setNextSteps(data.nextSteps || []);
      setSubmitted(true);
      
      toast({
        title: "Inquiry Submitted!",
        description: data.message || "Thank you for your interest. We'll be in touch soon.",
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">
                {serviceDetails.name} Service
              </h1>
              <p className="text-muted-foreground mb-6">
                {serviceDetails.description}
              </p>
              
              {!submitted ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Request Information</CardTitle>
                    <CardDescription>
                      Fill out the form below to learn more about our {serviceDetails.name} service
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
                          placeholder="Tell us about your project needs and requirements"
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
                        `Request ${serviceDetails.name} Service Information`
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
                      Thank you for your interest in our {serviceDetails.name} service
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
            
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Service Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Service Level</h3>
                      <p className="text-2xl font-bold text-primary">{serviceDetails.name}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">Pricing</h3>
                      <p>{serviceDetails.price}</p>
                    </div>
                    
                    {serviceDetails.features && (
                      <div>
                        <h3 className="font-semibold mb-2">Included Features</h3>
                        <ul className="space-y-2">
                          {serviceDetails.features.filter(f => f.included).map((feature, idx) => (
                            <li key={idx} className="flex">
                              <Check className="h-5 w-5 text-green-500 mr-2" />
                              {feature.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                        <p className="text-muted-foreground">Our data engineers have years of industry experience</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Customized Solutions</h4>
                        <p className="text-muted-foreground">Tailored to your specific business requirements</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Ongoing Support</h4>
                        <p className="text-muted-foreground">We're with you every step of the way</p>
                      </div>
                    </li>
                  </ul>
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

export default ServiceDetails;
