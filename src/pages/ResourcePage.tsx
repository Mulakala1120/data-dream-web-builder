
import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, FileText, Share2 } from "lucide-react";

interface ResourcePageProps {
  type?: string;
}

const ResourcePage: React.FC<ResourcePageProps> = ({ type: propType }) => {
  const { resourceType } = useParams<{ resourceType: string }>();
  const type = propType || resourceType;
  
  let pageTitle = "Resources";
  let pageDescription = "Explore our collection of resources";
  
  switch (type) {
    case "blog":
      pageTitle = "All Articles";
      pageDescription = "Expert perspectives on data engineering trends, best practices, and innovations";
      break;
    case "whitepapers":
      pageTitle = "Whitepapers";
      pageDescription = "In-depth research and analysis on data engineering topics";
      break;
    case "webinars":
      pageTitle = "Webinars";
      pageDescription = "Live and on-demand sessions with our data experts";
      break;
    case "case-studies":
      pageTitle = "Case Studies";
      pageDescription = "Real-world success stories from our clients";
      break;
    default:
      break;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle}</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {pageDescription}
            </p>
          </div>
          
          {type === "blog" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card key="data-mesh-architecture" className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all group">
                <Link to="/blog/data-mesh-architecture" className="block h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2834&q=80" 
                      alt="The Future of Data Mesh Architecture in Enterprise" 
                      className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <Badge>Architecture</Badge>
                      <div className="text-xs text-muted-foreground">April 2, 2025</div>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      The Future of Data Mesh Architecture in Enterprise
                    </CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <FileText className="h-3 w-3 mr-1" /> 8 min read
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-muted-foreground text-sm">
                      Explore how decentralized data ownership is transforming how organizations manage and leverage their data assets.
                    </p>
                  </CardContent>
                </Link>
              </Card>
              
              <Card key="snowflake-optimization" className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all group">
                <Link to="/blog/snowflake-optimization" className="block h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                      alt="Optimizing Snowflake Performance" 
                      className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <Badge>Performance</Badge>
                      <div className="text-xs text-muted-foreground">March 28, 2025</div>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      Optimizing Snowflake Performance: Advanced Techniques
                    </CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <FileText className="h-3 w-3 mr-1" /> 12 min read
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-muted-foreground text-sm">
                      Learn proven strategies to improve query performance and optimize costs in your Snowflake data warehouse.
                    </p>
                  </CardContent>
                </Link>
              </Card>
              
              <Card key="modern-data-stack" className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all group">
                <Link to="/blog/modern-data-stack" className="block h-full flex flex-col">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80" 
                      alt="Building a Modern Data Stack" 
                      className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <Badge>Strategy</Badge>
                      <div className="text-xs text-muted-foreground">March 15, 2025</div>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      Building a Modern Data Stack: A Step-by-Step Guide
                    </CardTitle>
                    <CardDescription className="flex items-center text-xs">
                      <FileText className="h-3 w-3 mr-1" /> 15 min read
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-muted-foreground text-sm">
                      A comprehensive guide to assembling the ideal data stack for your organization's specific needs and goals.
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          )}
          
          {type === "whitepapers" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Data Governance in the Age of AI</CardTitle>
                  <CardDescription>Comprehensive framework for managing data governance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This whitepaper explores the challenges and best practices for maintaining data governance
                    in organizations increasingly using AI and machine learning.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Badge variant="outline" className="mr-2">32 pages</Badge>
                    <span>Published: January 2025</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Download Whitepaper</Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Real-time Data Processing Architectures</CardTitle>
                  <CardDescription>Designing for sub-second latency at scale</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how to design, implement and maintain real-time data processing systems
                    that can handle millions of events per second with minimal latency.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Badge variant="outline" className="mr-2">48 pages</Badge>
                    <span>Published: February 2025</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Download Whitepaper</Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {type === "webinars" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Advanced dbt Techniques for Data Engineers</CardTitle>
                  <CardDescription>Live webinar with Q&A session</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Join our expert panel as they discuss advanced modeling techniques in dbt,
                    including handling slowly changing dimensions, testing strategies, and optimization.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Badge variant="outline" className="mr-2">90 minutes</Badge>
                    <span>April 15, 2025 at 11:00 AM EST</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Register Now</Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Building a Modern DataOps Practice</CardTitle>
                  <CardDescription>On-demand webinar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how to implement DataOps practices that improve collaboration between
                    data engineers, scientists, and analysts while ensuring data quality and reliability.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Badge variant="outline" className="mr-2">60 minutes</Badge>
                    <span>Originally aired: March 10, 2025</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Watch Recording</Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {type === "case-studies" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>Financial Services Data Transformation</CardTitle>
                  <CardDescription>How a global bank modernized their data infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This case study details how we helped a Fortune 500 financial institution migrate
                    from legacy systems to a cloud-native data platform, resulting in 70% faster analytics.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Badge variant="outline">Financial Services</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Read Case Study <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </Card>
              
              <Card className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>E-commerce Real-time Analytics Platform</CardTitle>
                  <CardDescription>Building streaming capabilities for personalized shopping</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Learn how we implemented a real-time analytics platform for a major e-commerce
                    retailer, enabling personalized recommendations and dynamic pricing.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Badge variant="outline">E-commerce</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Read Case Study <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResourcePage;
