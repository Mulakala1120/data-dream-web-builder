
import React from "react";
import { 
  Database, 
  Server, 
  GitBranch, 
  Code, 
  BarChart3,
  ArrowRight,
  Terminal
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CodeExample = ({ code }: { code: string }) => {
  return (
    <div className="bg-black rounded-md p-4 overflow-x-auto">
      <pre className="text-white text-xs font-mono whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const DataEngineeringSkills: React.FC = () => {
  const pythonEtlCode = `# Sample Python ETL code
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode

# Initialize Spark session
spark = SparkSession.builder \\
    .appName("Data Processing Pipeline") \\
    .config("spark.sql.warehouse.dir", "/warehouse") \\
    .enableHiveSupport() \\
    .getOrCreate()

# Extract data from source
raw_data = spark.read.json("s3://data-lake/raw/events/")

# Transform - clean and enrich data
transformed_df = raw_data \\
    .filter(col("event_type").isNotNull()) \\
    .withColumn("event_attributes", explode("attributes")) \\
    .withColumn("event_timestamp", 
        to_timestamp(col("timestamp"), "yyyy-MM-dd'T'HH:mm:ss")) \\
    .withColumn("processing_date", current_date())

# Load data to destination
transformed_df.write \\
    .partitionBy("processing_date") \\
    .mode("append") \\
    .parquet("s3://data-lake/processed/events/")`;

  const sqlCode = `-- Dimensional modeling example
CREATE TABLE dim_customer (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    email VARCHAR(100),
    segment VARCHAR(50),
    region VARCHAR(50),
    valid_from TIMESTAMP,
    valid_to TIMESTAMP,
    is_current BOOLEAN
);

CREATE TABLE fact_sales (
    sales_id INT PRIMARY KEY,
    customer_id INT REFERENCES dim_customer(customer_id),
    product_id INT REFERENCES dim_product(product_id),
    date_id INT REFERENCES dim_date(date_id),
    quantity INT,
    unit_price DECIMAL(10,2),
    total_amount DECIMAL(10,2)
);

-- Example of a query using a window function
SELECT 
    c.region,
    p.category,
    SUM(f.total_amount) as revenue,
    RANK() OVER (PARTITION BY c.region ORDER BY SUM(f.total_amount) DESC) as rank
FROM fact_sales f
JOIN dim_customer c ON f.customer_id = c.customer_id
JOIN dim_product p ON f.product_id = p.product_id
JOIN dim_date d ON f.date_id = d.date_id
WHERE d.year = 2023
GROUP BY c.region, p.category;`;

  const airflowCode = `# Example Airflow DAG
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'data_engineering',
    'depends_on_past': False,
    'start_date': datetime(2023, 1, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'daily_data_pipeline',
    default_args=default_args,
    description='Daily ETL pipeline for analytics',
    schedule_interval='0 2 * * *',
    catchup=False
)

wait_for_data = S3KeySensor(
    task_id='wait_for_raw_data',
    bucket_key='s3://data-lake/raw/{{ds}}/*.json',
    bucket_name=None,
    wildcard_match=True,
    timeout=60*60,
    poke_interval=300,
    dag=dag
)

process_data = PythonOperator(
    task_id='process_raw_data',
    python_callable=process_data_function,
    op_kwargs={'date': '{{ds}}'},
    dag=dag
)

load_to_warehouse = SnowflakeOperator(
    task_id='load_to_snowflake',
    snowflake_conn_id='snowflake_conn',
    sql="CALL analytics.load_processed_data('{{ds}}')",
    warehouse='compute_wh',
    database='analytics',
    role='ETL_ROLE',
    dag=dag
)

wait_for_data >> process_data >> load_to_warehouse`;

  return (
    <section id="data-engineering-skills" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Data Engineering <span className="data-gradient">Technical Skills</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expertise in building scalable, resilient data infrastructure with industry-leading tools and practices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <Code className="h-5 w-5 mr-2 text-dataBlue-500" />
                <CardTitle>ETL Pipeline Development</CardTitle>
              </div>
              <CardDescription>
                Building robust data pipelines with Python, Spark, and SQL to extract, transform, and load data at scale.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeExample code={pythonEtlCode} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/service-details/data-integration">
                  View ETL Solutions <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <Database className="h-5 w-5 mr-2 text-dataBlue-500" />
                <CardTitle>Data Modeling & SQL Expertise</CardTitle>
              </div>
              <CardDescription>
                Designing efficient dimensional models, data vaults, and writing optimized SQL for analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeExample code={sqlCode} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/service-details/data-warehouse">
                  Explore Data Modeling <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center mb-2">
                <GitBranch className="h-5 w-5 mr-2 text-dataBlue-500" />
                <CardTitle>Data Orchestration & Workflow Management</CardTitle>
              </div>
              <CardDescription>
                Creating reliable, monitored data workflows with Airflow, prefect, and other orchestration tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeExample code={airflowCode} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/service-details/dataops-mlops">
                  View Orchestration Solutions <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Terminal className="h-5 w-5 mr-2 text-dataBlue-500" />
                <CardTitle>Infrastructure as Code</CardTitle>
              </div>
              <CardDescription>
                Terraform, CloudFormation, and other IaC tools for reproducible infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Automated cloud resource provisioning</li>
                <li>Version-controlled infrastructure</li>
                <li>Multi-environment deployments</li>
                <li>CI/CD integration for infrastructure</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Server className="h-5 w-5 mr-2 text-dataBlue-500" />
                <CardTitle>Cloud Data Engineering</CardTitle>
              </div>
              <CardDescription>
                Expertise with AWS, Azure, and GCP data services for scalable solutions.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Data lakes (S3, ADLS, GCS)</li>
                <li>Managed services (Glue, Databricks)</li>
                <li>Serverless computing</li>
                <li>Cost optimization strategies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center mb-2">
                <BarChart3 className="h-5 w-5 mr-2 text-dataBlue-500" />
                <CardTitle>Data Quality & Testing</CardTitle>
              </div>
              <CardDescription>
                Ensuring data reliability through automated testing and validation.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Great Expectations implementation</li>
                <li>dbt test frameworks</li>
                <li>Data quality dashboards</li>
                <li>Automated validation pipelines</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/service-details/all">
              Explore All Technical Solutions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DataEngineeringSkills;
