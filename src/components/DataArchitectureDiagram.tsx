
import React, { useState } from "react";
import { 
  Database, 
  Server, 
  Cloud,
  Layers,
  BarChart3,
  Users,
  Shield,
  GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DiagramNodeProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  position: string;
}

const DiagramNode: React.FC<DiagramNodeProps> = ({ 
  icon, 
  title, 
  description, 
  isActive, 
  onClick,
  position
}) => {
  return (
    <div 
      className={`
        absolute ${position} transform -translate-x-1/2 -translate-y-1/2
        w-[140px] p-3 rounded-lg cursor-pointer transition-all
        ${isActive ? 'bg-primary text-primary-foreground shadow-lg scale-110' : 'bg-card hover:bg-muted'}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`${isActive ? 'text-primary-foreground' : 'text-primary'} mb-2`}>
          {icon}
        </div>
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

const DataArchitectureDiagram = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  const nodes = [
    {
      id: "source",
      icon: <Database className="h-6 w-6" />,
      title: "Data Sources",
      description: "Databases, APIs, Files, Streams",
      position: "top-[20%] left-[20%]"
    },
    {
      id: "ingest",
      icon: <GitBranch className="h-6 w-6" />,
      title: "Data Ingestion",
      description: "ETL/ELT, CDC, Streaming",
      position: "top-[20%] left-[50%]"
    },
    {
      id: "storage",
      icon: <Cloud className="h-6 w-6" />,
      title: "Data Storage",
      description: "Lake, Warehouse, Lakehouse",
      position: "top-[20%] left-[80%]"
    },
    {
      id: "process",
      icon: <Layers className="h-6 w-6" />,
      title: "Processing Layer",
      description: "Spark, Databricks, Snowflake",
      position: "top-[50%] left-[35%]"
    },
    {
      id: "govern",
      icon: <Shield className="h-6 w-6" />,
      title: "Governance",
      description: "Security, Quality, Lineage",
      position: "top-[50%] left-[65%]"
    },
    {
      id: "serve",
      icon: <Server className="h-6 w-6" />,
      title: "Serving Layer",
      description: "APIs, Feature Stores, Views",
      position: "top-[80%] left-[35%]"
    },
    {
      id: "consume",
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Consumption",
      description: "BI, Notebooks, ML, Apps",
      position: "top-[80%] left-[65%]"
    },
    {
      id: "users",
      icon: <Users className="h-6 w-6" />,
      title: "End Users",
      description: "Analysts, Data Scientists, Business Users",
      position: "top-[80%] left-[80%]"
    }
  ];

  // Define the connections between nodes
  const connections = [
    { from: "source", to: "ingest" },
    { from: "ingest", to: "storage" },
    { from: "storage", to: "process" },
    { from: "storage", to: "govern" },
    { from: "process", to: "serve" },
    { from: "govern", to: "serve" },
    { from: "serve", to: "consume" },
    { from: "consume", to: "users" }
  ];

  const getNodeById = (id: string) => {
    return nodes.find(node => node.id === id);
  };

  const getNodePositionCoordinates = (positionStr: string) => {
    const topMatch = positionStr.match(/top-\[(\d+)%\]/);
    const leftMatch = positionStr.match(/left-\[(\d+)%\]/);
    
    return {
      top: topMatch ? parseInt(topMatch[1]) : 0,
      left: leftMatch ? parseInt(leftMatch[1]) : 0
    };
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2">Modern Data Architecture</h3>
        <p className="text-muted-foreground">
          Click on any component to explore our data engineering approach
        </p>
      </div>

      <div className="relative w-full" style={{ height: "500px" }}>
        {/* Draw SVG connections */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={activeNode ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
              />
            </marker>
          </defs>
          
          {connections.map((conn, index) => {
            const fromNode = getNodeById(conn.from);
            const toNode = getNodeById(conn.to);
            
            if (!fromNode || !toNode) return null;
            
            const fromPos = getNodePositionCoordinates(fromNode.position);
            const toPos = getNodePositionCoordinates(toNode.position);
            
            // Start and end points based on percentages of container size
            const x1 = `${fromPos.left}%`;
            const y1 = `${fromPos.top}%`;
            const x2 = `${toPos.left}%`;
            const y2 = `${toPos.top}%`;
            
            const isActive = activeNode === fromNode.id || activeNode === toNode.id;
            
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 1 : 0.5}
                strokeDasharray={isActive ? "none" : "4,4"}
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>
        
        {/* Render the nodes */}
        {nodes.map((node) => (
          <DiagramNode
            key={node.id}
            icon={node.icon}
            title={node.title}
            description={node.description}
            isActive={activeNode === node.id}
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            position={node.position}
          />
        ))}
      </div>
      
      <div className="max-w-2xl mx-auto">
        {activeNode && (
          <div className="p-4 bg-muted/50 rounded-lg border">
            <h4 className="font-semibold flex items-center gap-2">
              {getNodeById(activeNode)?.icon}
              {getNodeById(activeNode)?.title}
            </h4>
            
            <div className="mt-3 space-y-3">
              {activeNode === "source" && (
                <div>
                  <p className="mb-2">We integrate with all your data sources:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Relational databases (Oracle, MySQL, SQL Server, PostgreSQL)</li>
                    <li>NoSQL systems (MongoDB, Cassandra, DynamoDB)</li>
                    <li>SaaS platforms (Salesforce, HubSpot, Shopify)</li>
                    <li>APIs (REST, SOAP, GraphQL)</li>
                    <li>File systems (CSV, JSON, XML, Parquet, Avro)</li>
                    <li>Streaming sources (Kafka, Kinesis, Event Hubs)</li>
                  </ul>
                </div>
              )}
              
              {activeNode === "ingest" && (
                <div>
                  <p className="mb-2">Our data ingestion approaches:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Batch ETL processes for high-volume historical data</li>
                    <li>Real-time streaming for immediate data availability</li>
                    <li>Change Data Capture (CDC) for database replication</li>
                    <li>ELT patterns for cloud data warehouse optimization</li>
                    <li>Custom connectors for proprietary systems</li>
                  </ul>
                </div>
              )}
              
              {activeNode === "storage" && (
                <div>
                  <p className="mb-2">Flexible data storage solutions:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Data Lakes on S3, ADLS, or GCS for raw data</li>
                    <li>Cloud Data Warehouses (Snowflake, BigQuery, Redshift)</li>
                    <li>Lakehouse architectures with Delta Lake, Iceberg, or Hudi</li>
                    <li>Optimized storage formats (Parquet, ORC, Avro)</li>
                    <li>Multi-temperature data management (hot/warm/cold)</li>
                  </ul>
                </div>
              )}
              
              {activeNode === "process" && (
                <div>
                  <p className="mb-2">Data processing technologies:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Spark for large-scale distributed processing</li>
                    <li>Databricks for unified analytics</li>
                    <li>dbt for SQL-based transformations</li>
                    <li>Python and R for advanced analytics</li>
                    <li>Snowflake stored procedures for in-database processing</li>
                  </ul>
                </div>
              )}
              
              {activeNode === "govern" && (
                <div>
                  <p className="mb-2">Comprehensive data governance:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Data catalogs for metadata management</li>
                    <li>Data quality monitoring and validation</li>
                    <li>Lineage tracking across the entire pipeline</li>
                    <li>Access control and row-level security</li>
                    <li>Compliance with GDPR, CCPA, HIPAA, etc.</li>
                  </ul>
                </div>
              )}
              
              {activeNode === "serve" && (
                <div>
                  <p className="mb-2">Data serving approaches:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Semantic layers for business-friendly access</li>
                    <li>REST/GraphQL APIs for application integration</li>
                    <li>Feature stores for machine learning models</li>
                    <li>Materialized views for performance optimization</li>
                    <li>Real-time serving for low-latency use cases</li>
                  </ul>
                </div>
              )}
              
              {activeNode === "consume" && (
                <div>
                  <p className="mb-2">Data consumption methods:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Business Intelligence dashboards and reports</li>
                    <li>Data science notebooks for exploratory analysis</li>
                    <li>Machine learning model training and deployment</li>
                    <li>Self-service analytics platforms</li>
                    <li>Embedded analytics in custom applications</li>
                  </ul>
                </div>
              )}
              
              {activeNode === "users" && (
                <div>
                  <p className="mb-2">Supporting diverse user needs:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Business analysts with intuitive dashboards</li>
                    <li>Data scientists with powerful tools and clean data</li>
                    <li>Business users with self-service capabilities</li>
                    <li>Executives with clear KPI tracking</li>
                    <li>IT/Engineering with robust infrastructure</li>
                  </ul>
                </div>
              )}
              
              <Button className="mt-2">
                Learn more about our {getNodeById(activeNode)?.title} approach
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataArchitectureDiagram;
