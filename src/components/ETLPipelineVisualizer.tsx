
import React, { useState } from "react";
import { 
  Database, 
  Server, 
  ArrowRight, 
  BarChart3, 
  GitBranch,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ETLStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  status: "idle" | "processing" | "complete" | "error";
}

const ETLPipelineVisualizer = () => {
  const [stages, setStages] = useState<ETLStage[]>([
    {
      id: "extract",
      name: "Extract",
      icon: <Database className="h-8 w-8" />,
      description: "Extract data from multiple source systems",
      status: "idle"
    },
    {
      id: "transform",
      name: "Transform",
      icon: <RefreshCw className="h-8 w-8" />,
      description: "Clean, normalize, and transform data",
      status: "idle"
    },
    {
      id: "load",
      name: "Load",
      icon: <Server className="h-8 w-8" />,
      description: "Load processed data into target systems",
      status: "idle"
    },
    {
      id: "analyze",
      name: "Analyze",
      icon: <BarChart3 className="h-8 w-8" />,
      description: "Generate insights from processed data",
      status: "idle"
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [pipelineComplete, setPipelineComplete] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const runPipeline = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setPipelineComplete(false);
    setCurrentStage(0);
    
    // Reset all stages to idle
    setStages(stages.map(stage => ({
      ...stage,
      status: "idle"
    })));

    // Start the pipeline simulation
    processNextStage(0);
  };

  const processNextStage = (index: number) => {
    if (index >= stages.length) {
      setIsRunning(false);
      setPipelineComplete(true);
      setCurrentStage(-1);
      return;
    }

    setCurrentStage(index);
    
    // Update current stage to processing
    setStages(prevStages => 
      prevStages.map((stage, i) => 
        i === index ? { ...stage, status: "processing" } : stage
      )
    );

    // Simulate processing time (1-2 seconds)
    const processingTime = Math.random() * 1000 + 1000;
    
    setTimeout(() => {
      // Randomly determine if this stage had an error (10% chance)
      const hasError = Math.random() < 0.1;
      
      if (hasError && index < stages.length - 1) {
        setStages(prevStages => 
          prevStages.map((stage, i) => 
            i === index ? { ...stage, status: "error" } : stage
          )
        );
        setIsRunning(false);
        return;
      }
      
      // Update current stage to complete
      setStages(prevStages => 
        prevStages.map((stage, i) => 
          i === index ? { ...stage, status: "complete" } : stage
        )
      );
      
      // Process next stage
      setTimeout(() => {
        processNextStage(index + 1);
      }, 500);
    }, processingTime);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "idle":
        return null;
      case "processing":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Processing...</Badge>;
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setPipelineComplete(false);
    setCurrentStage(-1);
    setStages(stages.map(stage => ({
      ...stage,
      status: "idle"
    })));
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Interactive ETL Pipeline Demo</h3>
        <p className="text-muted-foreground">
          See how our data pipelines extract, transform, and load your data
        </p>
      </div>

      <div className="w-full overflow-x-auto pb-4">
        <div className="flex items-center justify-center gap-2 min-w-max">
          {stages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <div 
                className={`
                  relative p-4 rounded-md border cursor-pointer transition-all
                  ${stage.status === 'processing' ? 'border-yellow-400 bg-yellow-50' : ''}
                  ${stage.status === 'complete' ? 'border-green-400 bg-green-50' : ''}
                  ${stage.status === 'error' ? 'border-red-400 bg-red-50' : ''}
                  ${stage.status === 'idle' ? 'border-gray-200 hover:border-gray-400' : ''}
                  ${showDetails === stage.id ? 'ring-2 ring-primary' : ''}
                `}
                onClick={() => setShowDetails(showDetails === stage.id ? null : stage.id)}
              >
                <div className="flex flex-col items-center justify-center min-w-[120px]">
                  <div className="text-primary mb-2">{stage.icon}</div>
                  <span className="font-medium">{stage.name}</span>
                  <div className="h-6 mt-1">
                    {getStatusIcon(stage.status)}
                  </div>
                </div>
              </div>
              
              {index < stages.length - 1 && (
                <ArrowRight className={`h-6 w-6 mx-1 ${stage.status === 'complete' ? 'text-green-500' : 'text-gray-400'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {showDetails && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                {stages.find(s => s.id === showDetails)?.icon}
              </div>
              <div>
                <h4 className="font-semibold text-lg">
                  {stages.find(s => s.id === showDetails)?.name} Stage
                </h4>
                <p className="text-muted-foreground mt-1">
                  {stages.find(s => s.id === showDetails)?.description}
                </p>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showDetails === "extract" && (
                    <>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <Database className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">SQL Databases</div>
                          <div className="text-xs text-muted-foreground">PostgreSQL, MySQL, SQL Server</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <GitBranch className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">APIs</div>
                          <div className="text-xs text-muted-foreground">REST, GraphQL, SOAP</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <Lock className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Secure File Transfer</div>
                          <div className="text-xs text-muted-foreground">SFTP, S3, Azure Blob</div>
                        </div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <RefreshCw className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Streaming Sources</div>
                          <div className="text-xs text-muted-foreground">Kafka, Kinesis, Pub/Sub</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {showDetails === "transform" && (
                    <>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Data Cleansing</div>
                        <div className="text-xs text-muted-foreground">Removes duplicates and invalid data</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Schema Normalization</div>
                        <div className="text-xs text-muted-foreground">Converts schemas to consistent format</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Data Enrichment</div>
                        <div className="text-xs text-muted-foreground">Adds metadata and derived fields</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Aggregation</div>
                        <div className="text-xs text-muted-foreground">Creates summary and rollup data</div>
                      </div>
                    </>
                  )}
                  
                  {showDetails === "load" && (
                    <>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Data Warehouse</div>
                        <div className="text-xs text-muted-foreground">Snowflake, BigQuery, Redshift</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Data Lake</div>
                        <div className="text-xs text-muted-foreground">S3, Azure Data Lake, GCS</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Real-time Databases</div>
                        <div className="text-xs text-muted-foreground">Elasticsearch, MongoDB, Cassandra</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Feature Stores</div>
                        <div className="text-xs text-muted-foreground">For machine learning models</div>
                      </div>
                    </>
                  )}
                  
                  {showDetails === "analyze" && (
                    <>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Business Intelligence</div>
                        <div className="text-xs text-muted-foreground">Tableau, Power BI, Looker</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Data Science Notebooks</div>
                        <div className="text-xs text-muted-foreground">Python, R, SQL analyses</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">ML Model Training</div>
                        <div className="text-xs text-muted-foreground">Predictive analytics, forecasting</div>
                      </div>
                      <div className="p-3 rounded-md bg-muted/50 border flex items-center gap-3">
                        <div className="font-medium">Custom Applications</div>
                        <div className="text-xs text-muted-foreground">Embedded analytics in apps</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-4">
        <Button 
          variant={pipelineComplete ? "outline" : "default"}
          onClick={runPipeline} 
          disabled={isRunning}
        >
          {isRunning ? "Running Pipeline..." : (pipelineComplete ? "Pipeline Complete" : "Run ETL Pipeline")}
        </Button>
        
        {(isRunning || pipelineComplete) && (
          <Button variant="outline" onClick={resetPipeline}>
            Reset Pipeline
          </Button>
        )}
      </div>
    </div>
  );
};

export default ETLPipelineVisualizer;
