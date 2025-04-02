
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: "What is data engineering?",
      answer: "Data engineering is the practice of designing and building systems for collecting, storing, and analyzing data at scale. It encompasses the development of data pipelines, ETL processes, data warehouses, and infrastructure that support data analytics and machine learning."
    },
    {
      question: "How can data engineering benefit my business?",
      answer: "Data engineering enables businesses to make data-driven decisions by transforming raw data into actionable insights. Benefits include improved operational efficiency, better customer understanding, enhanced product development, and increased competitive advantage."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with a wide range of technologies including cloud platforms (AWS, Azure, GCP), data processing frameworks (Spark, Airflow), databases (SQL, NoSQL), and modern data stack tools (dbt, Snowflake, Fivetran). Our solutions are tailored to your specific needs and infrastructure."
    },
    {
      question: "How long does a typical data engineering project take?",
      answer: "Project timelines vary depending on complexity and scope. Small projects might take 4-6 weeks, while enterprise-level data transformations can span several months. We provide detailed timelines during our initial consultation based on your specific requirements."
    },
    {
      question: "How do you ensure data quality and security?",
      answer: "We implement robust data governance frameworks, automated testing, and monitoring solutions. Our security practices include encryption, access controls, and compliance with regulations like GDPR and CCPA. We believe quality and security are fundamental, not optional features."
    },
    {
      question: "Do you offer maintenance and support after project completion?",
      answer: "Yes, we provide ongoing maintenance and support packages to ensure your data systems continue to run optimally. This includes monitoring, troubleshooting, updates, and scaling as your data needs evolve."
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked <span className="data-gradient">Questions</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about our data engineering services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
