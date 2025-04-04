
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const CTA: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  const challenges = [
    "Building real-time data pipelines",
    "Migrating to cloud data platforms",
    "Implementing data governance",
    "Optimizing database performance",
    "Scaling analytics infrastructure"
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubscribing(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);
      
      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already Subscribed",
            description: "This email is already subscribed to our newsletter.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Subscribed!",
          description: "You're now subscribed to our newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Subscription Error",
        description: "There was a problem subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Facing Data Engineering Challenges?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Our team specializes in solving complex data problems. Let's discuss how we can help with:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8 max-w-2xl mx-auto text-left">
            {challenges.map((challenge, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-secondary" />
                <span>{challenge}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button size="lg" variant="secondary" className="font-medium" asChild>
              <Link to="#contact">
                Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="#services">Explore Our Solutions</Link>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Button size="lg" variant="secondary" className="font-medium" asChild>
              <Link to="/roi-analysis">
                Calculate Your ROI <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <Link to="#service-request">Request a Service</Link>
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-xl font-semibold mb-4">Stay Updated with Data Engineering Insights</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-md border bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>
              <Button 
                type="submit" 
                variant="secondary" 
                className="whitespace-nowrap"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : (
                  <>
                    Subscribe <Mail className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
