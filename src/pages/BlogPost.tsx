
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blogPost", postId],
    queryFn: async () => {
      // This would normally fetch from a real API
      // For demo purposes, we're mocking the response
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For a real implementation, you would fetch from Supabase:
      // const { data, error } = await supabase.functions.invoke("blog-post-details", {
      //   body: { postId },
      // });
      // if (error) throw error;
      // return data;
      
      // Sample data based on postId
      const samplePosts: Record<string, BlogPostData> = {
        "data-mesh-architecture": {
          id: "data-mesh-architecture",
          title: "The Future of Data Mesh Architecture in Enterprise",
          content: `
            <p class="text-lg mb-6">The data mesh architecture is revolutionizing how enterprises organize and manage their data assets. Unlike traditional centralized approaches, data mesh promotes a decentralized model where domain teams take ownership of their data products.</p>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Key Principles of Data Mesh</h2>
            <p class="mb-4">Data mesh architecture is built on four fundamental principles:</p>
            <ol class="list-decimal pl-6 mb-6 space-y-2">
              <li><strong>Domain-oriented ownership</strong>: Treating data as a product owned by domain teams</li>
              <li><strong>Data as a product</strong>: Ensuring data is usable, valuable, and accessible</li>
              <li><strong>Self-serve data platform</strong>: Enabling teams to provision and manage their own infrastructure</li>
              <li><strong>Federated computational governance</strong>: Balancing local autonomy with global standards</li>
            </ol>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Implementation Challenges</h2>
            <p class="mb-6">While data mesh offers significant advantages, enterprises face several challenges during implementation:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Defining clear domain boundaries and data product ownership</li>
              <li>Building a self-service platform that balances flexibility with governance</li>
              <li>Managing the organizational change required for decentralized data ownership</li>
              <li>Ensuring consistent data quality across distributed domains</li>
              <li>Establishing interoperability between domain data products</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Case Study: Financial Services Transformation</h2>
            <p class="mb-6">A global financial institution implemented data mesh to overcome the limitations of their centralized data lake. By transitioning to domain-oriented data products, they achieved:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>60% reduction in time-to-market for new data products</li>
              <li>Improved data quality through clear ownership and accountability</li>
              <li>Enhanced compliance through federated governance</li>
              <li>Greater innovation from empowered domain teams</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Future Outlook</h2>
            <p class="mb-6">The data mesh paradigm continues to evolve. We anticipate several key developments in the coming years:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Mature tooling specifically designed for data mesh architectures</li>
              <li>Enhanced integration between data mesh and AI/ML workflows</li>
              <li>Standardized patterns for cross-domain data product discovery and usage</li>
              <li>Industry-specific data mesh reference architectures</li>
            </ul>
            
            <p class="text-lg mt-10">The journey to a fully realized data mesh architecture requires both technical expertise and organizational alignment. As enterprises increasingly recognize the limitations of centralized data approaches, data mesh offers a compelling alternative that balances autonomy with governance while accelerating value delivery.</p>
          `,
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2834&q=80",
          date: "April 2, 2025",
          readTime: "8 min read",
          category: "Architecture",
          author: {
            name: "Alex Morgan",
            title: "Chief Data Architect",
            avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          },
        },
        "snowflake-optimization": {
          id: "snowflake-optimization",
          title: "Optimizing Snowflake Performance: Advanced Techniques",
          content: `
            <p class="text-lg mb-6">Snowflake has emerged as a leading cloud data platform, but maximizing its performance requires careful consideration of its unique architecture and pricing model. This article explores advanced techniques for optimizing both query performance and cost efficiency.</p>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Understanding Snowflake's Architecture</h2>
            <p class="mb-6">Before diving into optimization techniques, it's essential to understand Snowflake's key architectural components:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Virtual warehouses</strong>: Compute resources that execute SQL queries</li>
              <li><strong>Micro-partitions</strong>: Small, columnar storage units (50-500MB)</li>
              <li><strong>Data clustering</strong>: How data is physically organized within tables</li>
              <li><strong>Result caching</strong>: Automatic caching of query results</li>
              <li><strong>Materialized views</strong>: Pre-computed query results that are automatically maintained</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Query Performance Optimization</h2>
            <p class="mb-4">To improve query performance in Snowflake, consider these advanced techniques:</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">1. Optimizing Clustering Keys</h3>
            <p class="mb-4">Effective clustering can dramatically improve query performance by reducing the amount of data scanned. When selecting clustering keys:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Choose columns with high cardinality but not too high (100-10,000 distinct values)</li>
              <li>Select columns frequently used in WHERE clauses and JOIN conditions</li>
              <li>Regularly monitor clustering using SYSTEM$CLUSTERING_INFORMATION</li>
              <li>Consider multi-column clustering keys for complex query patterns</li>
            </ul>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">2. Query Tuning Techniques</h3>
            <p class="mb-4">Beyond structural optimizations, these query-level techniques can yield significant performance improvements:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Leverage Snowflake's pushdown optimization by filtering early in queries</li>
              <li>Use approximate functions like APPROX_COUNT_DISTINCT for large datasets</li>
              <li>Implement QUALIFY instead of nested subqueries for window functions</li>
              <li>Prefer INNER JOINs over LEFT JOINs when possible</li>
              <li>Analyze query profiles to identify bottlenecks in execution plans</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Cost Optimization Strategies</h2>
            <p class="mb-4">Snowflake's consumption-based pricing model requires careful management of resources:</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">1. Warehouse Optimization</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Implement auto-suspension and auto-scaling based on workload patterns</li>
              <li>Separate warehouses for different workload types (ETL vs. reporting)</li>
              <li>Schedule resource-intensive operations during off-peak hours</li>
              <li>Use resource monitors to set spending limits and prevent cost overruns</li>
            </ul>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">2. Storage Optimization</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Implement time travel and fail-safe retention periods based on actual recovery needs</li>
              <li>Regularly purge or archive historical data using transient tables where appropriate</li>
              <li>Leverage zero-copy cloning for development and testing environments</li>
              <li>Use column-level compression options for large text fields</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Monitoring and Continuous Optimization</h2>
            <p class="mb-4">Establish a robust monitoring framework using:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>ACCOUNT_USAGE and INFORMATION_SCHEMA views for comprehensive metrics</li>
              <li>Query history analysis to identify optimization opportunities</li>
              <li>Regular review of warehouse utilization and sizing</li>
              <li>Automated alerting for unexpected cost spikes or performance degradation</li>
            </ul>
            
            <p class="text-lg mt-10">By implementing these advanced optimization techniques, organizations can achieve the optimal balance of performance and cost-efficiency in their Snowflake environment. Remember that optimization is an ongoing process that should evolve with your data volumes, query patterns, and business requirements.</p>
          `,
          image: "https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
          date: "March 28, 2025",
          readTime: "12 min read",
          category: "Performance",
          author: {
            name: "Sarah Chen",
            title: "Lead Data Engineer",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
          },
        },
        "modern-data-stack": {
          id: "modern-data-stack",
          title: "Building a Modern Data Stack: A Step-by-Step Guide",
          content: `
            <p class="text-lg mb-6">The modern data stack represents a significant evolution in data architecture, emphasizing cloud-native, specialized tools that integrate seamlessly. This guide walks through the process of building a modern data stack that's tailored to your organization's specific needs.</p>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 1: Assess Your Current Data Landscape</h2>
            <p class="mb-4">Before selecting tools, thoroughly evaluate your existing environment:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Inventory data sources (internal systems, external APIs, third-party applications)</li>
              <li>Document current data volumes, velocity, and variety</li>
              <li>Identify primary use cases (analytics, ML, operational insights)</li>
              <li>Understand technical capabilities of your team</li>
              <li>Catalog existing pain points and bottlenecks</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 2: Data Ingestion and Integration</h2>
            <p class="mb-4">Select tools to efficiently move data from source systems into your central repository:</p>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Option Analysis</h3>
            <div class="overflow-x-auto mb-6">
              <table class="min-w-full border-collapse">
                <thead>
                  <tr class="bg-muted/50">
                    <th class="border p-2 text-left">Tool Category</th>
                    <th class="border p-2 text-left">Best For</th>
                    <th class="border p-2 text-left">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-2">ELT Platforms</td>
                    <td class="border p-2">Comprehensive coverage of common data sources with minimal configuration</td>
                    <td class="border p-2">Fivetran, Airbyte, Stitch</td>
                  </tr>
                  <tr>
                    <td class="border p-2">ETL/Data Pipeline Tools</td>
                    <td class="border p-2">Complex transformations or custom integrations</td>
                    <td class="border p-2">Matillion, Apache Airflow, Prefect</td>
                  </tr>
                  <tr>
                    <td class="border p-2">Streaming Data Tools</td>
                    <td class="border p-2">Real-time data integration scenarios</td>
                    <td class="border p-2">Kafka, Confluent Cloud, AWS Kinesis</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 class="text-xl font-semibold mt-6 mb-3">Implementation Considerations</h3>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Prioritize sources based on business impact and technical complexity</li>
              <li>Establish consistent schema management and data validation practices</li>
              <li>Implement proper error handling and monitoring from the start</li>
              <li>Document metadata and lineage for all integrated data</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 3: Data Storage and Warehousing</h2>
            <p class="mb-4">Select the core repository where your transformed data will reside:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Cloud Data Warehouses</strong>: Snowflake, BigQuery, Redshift</li>
              <li><strong>Data Lakes</strong>: Databricks Delta Lake, Amazon S3 with Athena, Azure Data Lake</li>
              <li><strong>Lakehouse Architectures</strong>: Combining warehouse performance with lake flexibility</li>
            </ul>
            <p class="mb-6">Key decision factors include:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Expected query patterns and performance requirements</li>
              <li>Data volume and growth projections</li>
              <li>Need for unstructured data support</li>
              <li>Budget considerations and pricing models</li>
              <li>Existing team expertise and learning curve</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 4: Data Transformation</h2>
            <p class="mb-4">Implement systematic approaches to transform raw data into analytics-ready formats:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Data Build Tool (dbt)</strong>: Industry standard for SQL-based transformations</li>
              <li><strong>Python-based frameworks</strong>: For complex transformations (e.g., Pandas, PySpark)</li>
              <li><strong>Warehouse-native features</strong>: Stored procedures, UDFs</li>
            </ul>
            <p class="mb-6">Best practices include:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Implementing modular transformation layers (bronze/silver/gold or raw/staging/mart)</li>
              <li>Establishing testing frameworks for data quality</li>
              <li>Version controlling all transformation code</li>
              <li>Documenting business logic and assumptions</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 5: Data Orchestration</h2>
            <p class="mb-4">Set up systems to schedule, monitor, and manage data workflows:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Workflow managers</strong>: Airflow, Prefect, Dagster</li>
              <li><strong>Native scheduler tools</strong>: dbt Cloud, Fivetran schedules</li>
              <li><strong>Cloud-native services</strong>: AWS Step Functions, Azure Data Factory</li>
            </ul>
            <p class="mb-6">Focus on:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Dependency management between pipelines</li>
              <li>Failure handling and retry logic</li>
              <li>Notification systems for pipeline issues</li>
              <li>Monitoring execution time and resource utilization</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 6: Data Quality and Observability</h2>
            <p class="mb-4">Implement mechanisms to ensure trustworthy data:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Data quality tools</strong>: Great Expectations, dbt tests, Soda</li>
              <li><strong>Observability platforms</strong>: Monte Carlo, Bigeye, Datadog</li>
              <li><strong>Lineage solutions</strong>: OpenLineage, Atlan, Metaphor</li>
            </ul>
            <p class="mb-6">Key aspects:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Anomaly detection for data freshness, volume, and distribution</li>
              <li>Schema change monitoring</li>
              <li>End-to-end lineage tracking</li>
              <li>Impact analysis capabilities</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 7: Analytics and Consumption Layer</h2>
            <p class="mb-4">Provide tools for end-users to derive value from the data:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>BI platforms</strong>: Tableau, Looker, Power BI</li>
              <li><strong>Data exploration tools</strong>: Mode, Hex, Observable</li>
              <li><strong>Self-service analytics</strong>: ThoughtSpot, Sigma</li>
            </ul>
            <p class="mb-6">Implementation considerations:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>User training and documentation</li>
              <li>Semantic layer development</li>
              <li>Performance optimization for interactive analytics</li>
              <li>Access control and security</li>
            </ul>
            
            <h2 class="text-2xl font-bold mt-10 mb-4">Step 8: Governance and Security</h2>
            <p class="mb-4">Establish frameworks to maintain compliance and protect sensitive information:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Data catalogs</strong>: Alation, Collibra, Atlan</li>
              <li><strong>Access control</strong>: Immuta, Privacera</li>
              <li><strong>Security monitoring</strong>: Audit logs, vulnerability scanning</li>
            </ul>
            <p class="mb-6">Key focus areas:</p>
            <ul class="list-disc pl-6 mb-6 space-y-2">
              <li>Classification of sensitive data</li>
              <li>Role-based access control implementation</li>
              <li>Data retention and purging policies</li>
              <li>Compliance documentation</li>
            </ul>
            
            <p class="text-lg mt-10">Building a modern data stack is an iterative process that evolves with your organization's needs. Start with the core components, establish solid foundations in governance and quality, and gradually expand capabilities. Most importantly, align technical decisions with business outcomes to ensure your modern data stack delivers tangible value to the organization.</p>
          `,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80",
          date: "March 15, 2025",
          readTime: "15 min read",
          category: "Strategy",
          author: {
            name: "Marcus Johnson",
            title: "Data Science Director",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          },
        }
      };
      
      const post = samplePosts[postId as string];
      if (!post) throw new Error("Blog post not found");
      
      return post;
    }
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/#blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Insights
            </Link>
          </Button>
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex gap-4 items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-[300px] w-full" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blog Post</h2>
              <p className="text-muted-foreground mb-6">Sorry, we couldn't load this blog post. It may have been moved or deleted.</p>
              <Button asChild>
                <Link to="/#blog">Return to Blog</Link>
              </Button>
            </div>
          ) : post ? (
            <article className="max-w-4xl mx-auto">
              <header className="mb-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                
                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-8">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <Badge>{post.category}</Badge>
                </div>
                
                <div className="flex items-center gap-3 mb-8">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.title}</p>
                  </div>
                </div>
                
                <div className="aspect-[2/1] overflow-hidden rounded-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </header>
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="flex justify-center mt-16">
                <Button variant="outline" size="lg" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share this article
                </Button>
              </div>
            </article>
          ) : (
            <div className="py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
              <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been moved.</p>
              <Button asChild>
                <Link to="/#blog">Browse Other Articles</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
