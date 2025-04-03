
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Database, FileText, Share2 } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Data Mesh Architecture in Enterprise",
    excerpt: "Explore how decentralized data ownership is transforming how organizations manage and leverage their data assets.",
    date: "April 2, 2025",
    readTime: "8 min read",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2834&q=80",
    author: {
      name: "Alex Morgan",
      title: "Chief Data Architect",
      avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
  },
  {
    id: 2,
    title: "Optimizing Snowflake Performance: Advanced Techniques",
    excerpt: "Learn proven strategies to improve query performance and optimize costs in your Snowflake data warehouse.",
    date: "March 28, 2025",
    readTime: "12 min read",
    category: "Performance",
    image: "https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    author: {
      name: "Sarah Chen",
      title: "Lead Data Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    },
  },
  {
    id: 3,
    title: "Building a Modern Data Stack: A Step-by-Step Guide",
    excerpt: "A comprehensive guide to assembling the ideal data stack for your organization's specific needs and goals.",
    date: "March 15, 2025",
    readTime: "15 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80",
    author: {
      name: "Marcus Johnson",
      title: "Data Science Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Expert perspectives on data engineering trends, best practices, and innovations.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" size="lg">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <Badge>{post.category}</Badge>
                  <div className="text-xs text-muted-foreground">{post.date}</div>
                </div>
                <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                <CardDescription className="flex items-center text-xs">
                  <FileText className="h-3 w-3 mr-1" /> {post.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow">
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="h-8 w-8 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium leading-none">{post.author.name}</p>
                    <p className="text-xs text-muted-foreground">{post.author.title}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <Database className="h-10 w-10 mb-4" />
              <CardTitle>Whitepapers</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                In-depth research and analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Download our comprehensive guides on data architecture, governance, and strategy.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">Browse Whitepapers</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-secondary text-secondary-foreground">
            <CardHeader>
              <BarChart className="h-10 w-10 mb-4" />
              <CardTitle>Webinars</CardTitle>
              <CardDescription className="text-secondary-foreground/80">
                Live and on-demand sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Join our experts for deep dives into data engineering topics and live Q&A.</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full bg-white text-secondary">View Schedule</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 mb-4" />
              <CardTitle>Case Studies</CardTitle>
              <CardDescription>
                Real-world success stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Explore detailed case studies showcasing our solutions across various industries.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Read Case Studies</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Blog;
