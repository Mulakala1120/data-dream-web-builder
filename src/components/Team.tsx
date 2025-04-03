
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Chief Data Architect",
    bio: "15+ years of experience designing enterprise data solutions for Fortune 500 companies. Specializes in data warehouse architecture and cloud migration.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Lead Data Engineer",
    bio: "Former Google engineer with deep expertise in distributed systems and real-time data processing frameworks. Apache Spark contributor.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    socialLinks: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Data Science Director",
    bio: "PhD in Computer Science with a focus on machine learning. Led data science teams at financial institutions implementing predictive analytics solutions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
      github: "#",
    },
  },
  {
    id: 4,
    name: "Olivia Rodriguez",
    role: "BI Solutions Architect",
    bio: "Expert in business intelligence tools and visualization. Certified in Tableau, Power BI, and Looker with 10+ years of consulting experience.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    socialLinks: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

const Team = () => {
  return (
    <section id="team" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our team of seasoned data professionals brings decades of combined experience
            across industries and technologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover h-full w-full"
                />
              </div>
              <CardHeader className="pb-2">
                <h3 className="font-bold text-xl">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </CardContent>
              <CardFooter className="flex justify-start gap-4 pt-0">
                {member.socialLinks.linkedin && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {member.socialLinks.twitter && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {member.socialLinks.github && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
