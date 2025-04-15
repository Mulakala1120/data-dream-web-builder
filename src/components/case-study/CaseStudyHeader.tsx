
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock } from "lucide-react";

interface CaseStudyHeaderProps {
  industry: string;
  title: string;
  client: string;
  timeline: string;
  onBack: () => void;
}

export const CaseStudyHeader = ({
  industry,
  title,
  client,
  timeline,
  onBack,
}: CaseStudyHeaderProps) => {
  return (
    <div className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-6" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Portfolio
        </Button>
        
        <div className="mb-6">
          <Badge className="mb-2">{industry}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-xl text-muted-foreground">Client: {client}</p>
        </div>
        
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span>Project Timeline: {timeline}</span>
        </div>
      </div>
    </div>
  );
};
