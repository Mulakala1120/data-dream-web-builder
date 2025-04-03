
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle2, ChevronRight, FileQuestion, HardDrive, LineChart, LucideIcon, ServerCog, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    value: number;
  }[];
}

interface MaturityLevel {
  level: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  score: [number, number]; // Min and max score range
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your organization's data storage strategy?",
    options: [
      { text: "Data is stored in multiple isolated systems with no central repository", value: 1 },
      { text: "We have started centralizing some data, but many silos still exist", value: 2 },
      { text: "Most of our data is in a central warehouse/lake, but integration is manual", value: 3 },
      { text: "We have a fully integrated data platform with automated pipelines", value: 4 },
      { text: "We have a modern, scalable architecture with data mesh/fabric principles", value: 5 },
    ],
  },
  {
    id: 2,
    text: "How does your organization handle data quality?",
    options: [
      { text: "Data quality is not systematically addressed", value: 1 },
      { text: "Quality issues are fixed reactively when problems occur", value: 2 },
      { text: "We have some data quality checks but they're not comprehensive", value: 3 },
      { text: "We have automated quality monitoring across most critical data", value: 4 },
      { text: "We have a robust quality framework with clear ownership and SLAs", value: 5 },
    ],
  },
  {
    id: 3,
    text: "How mature is your organization's approach to data governance?",
    options: [
      { text: "No formal governance processes exist", value: 1 },
      { text: "Basic policies exist but are inconsistently followed", value: 2 },
      { text: "We have defined roles and some documented processes", value: 3 },
      { text: "We have comprehensive governance with active stewardship", value: 4 },
      { text: "Governance is embedded in our culture with measurable outcomes", value: 5 },
    ],
  },
  {
    id: 4,
    text: "How does your organization leverage data for decision-making?",
    options: [
      { text: "Decisions are primarily based on intuition and experience", value: 1 },
      { text: "We use basic reporting but data isn't consistently reliable", value: 2 },
      { text: "Data informs operational decisions with standard dashboards", value: 3 },
      { text: "Advanced analytics inform strategic decisions company-wide", value: 4 },
      { text: "Data drives automated decisions and AI/ML applications", value: 5 },
    ],
  },
  {
    id: 5,
    text: "How would you describe your data engineering practices?",
    options: [
      { text: "Ad-hoc processes with manual interventions", value: 1 },
      { text: "Basic automation but limited documentation or testing", value: 2 },
      { text: "Standardized processes with some CI/CD implementation", value: 3 },
      { text: "Robust DevOps with version control and automated testing", value: 4 },
      { text: "Self-service capabilities with DataOps and MLOps practices", value: 5 },
    ],
  },
];

const maturityLevels: MaturityLevel[] = [
  {
    level: "Level 1",
    title: "Beginning",
    description: "Your organization is in the early stages of its data journey with significant opportunities for improvement in how data is collected, stored, and utilized.",
    icon: <HardDrive />,
    color: "#e11d48",
    score: [5, 11],
  },
  {
    level: "Level 2",
    title: "Developing",
    description: "You've started building a data foundation but still face challenges with silos, quality, and consistent governance practices.",
    icon: <ServerCog />,
    color: "#fb923c",
    score: [12, 17],
  },
  {
    level: "Level 3",
    title: "Established",
    description: "Your organization has solid data practices in place but has room to advance in areas like integration, automation, and analytics capabilities.",
    icon: <BarChart3 />,
    color: "#facc15",
    score: [18, 22],
  },
  {
    level: "Level 4",
    title: "Advanced",
    description: "You have mature data systems with good governance, quality controls, and analytics that actively inform business decisions.",
    icon: <LineChart />,
    color: "#22c55e",
    score: [23, 25],
  },
];

const DataMaturityAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<MaturityLevel | null>(null);
  const [score, setScore] = useState(0);
  
  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const totalScore = newAnswers.reduce((sum, value) => sum + value, 0);
      setScore(totalScore);
      
      const userLevel = maturityLevels.find(
        level => totalScore >= level.score[0] && totalScore <= level.score[1]
      );
      
      setResult(userLevel || maturityLevels[0]);
    }
  };
  
  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setScore(0);
  };

  return (
    <section id="assessment" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Data Maturity Assessment</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Evaluate your organization's current data capabilities and identify areas for improvement.
          </p>
        </div>
        
        <Card className="max-w-3xl mx-auto">
          {!result ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-center mb-4">
                  <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                  <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-32" />
                </div>
                <CardDescription className="text-lg font-medium">
                  {questions[currentQuestion].text}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 mb-2"
                      onClick={() => handleAnswer(option.value)}
                    >
                      {option.text}
                      <ChevronRight className="ml-auto h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div 
                    className="p-4 rounded-full" 
                    style={{ backgroundColor: `${result.color}20` }}
                  >
                    <div className="text-4xl" style={{ color: result.color }}>
                      {result.icon}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl">{result.title}</CardTitle>
                <CardDescription className="text-lg mt-2">
                  {result.level} Maturity ({score} out of 25 points)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center mb-6">{result.description}</p>
                
                <div className="mb-8">
                  <div className="relative h-2 bg-muted rounded-full mb-4">
                    {maturityLevels.map((level, i) => (
                      <div 
                        key={i}
                        className="absolute h-2 rounded-full" 
                        style={{ 
                          left: `${(level.score[0] - 5) * 5}%`, 
                          width: `${(level.score[1] - level.score[0] + 1) * 5}%`,
                          backgroundColor: level.color,
                        }}
                      />
                    ))}
                    <div 
                      className="absolute w-4 h-4 rounded-full bg-background border-2 top-1/2 -translate-y-1/2" 
                      style={{ 
                        left: `${(score - 5) * 5}%`,
                        borderColor: result.color,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Beginning</span>
                    <span>Developing</span>
                    <span>Established</span>
                    <span>Advanced</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-primary" />
                      Key Strengths
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {result.level === "Level 1" && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Recognition of data's importance to your organization</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Beginning steps toward systematic data management</span>
                          </li>
                        </>
                      )}
                      {result.level === "Level 2" && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Progress toward centralizing key data assets</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Emerging data quality awareness and practices</span>
                          </li>
                        </>
                      )}
                      {result.level === "Level 3" && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Well-defined data infrastructure and processes</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Good balance of governance and usability</span>
                          </li>
                        </>
                      )}
                      {result.level === "Level 4" && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Sophisticated data ecosystem with strong automation</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle2 className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Data-driven decision making embedded in culture</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold flex items-center">
                      <FileQuestion className="h-5 w-5 mr-2 text-primary" />
                      Recommended Next Steps
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {result.level === "Level 1" && (
                        <>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Develop a data strategy with clear objectives</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Create a centralized data repository for key datasets</span>
                          </li>
                        </>
                      )}
                      {result.level === "Level 2" && (
                        <>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Implement data quality monitoring frameworks</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Formalize data governance policies and roles</span>
                          </li>
                        </>
                      )}
                      {result.level === "Level 3" && (
                        <>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Advance analytics capabilities with predictive models</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Implement self-service capabilities for business users</span>
                          </li>
                        </>
                      )}
                      {result.level === "Level 4" && (
                        <>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Explore advanced AI/ML applications for your data</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-4 w-4 mr-2 shrink-0 text-primary mt-0.5" />
                            <span>Consider data mesh architecture for scaling capabilities</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" size="lg">
                  Download Full Assessment Report
                </Button>
                <Button variant="outline" onClick={resetAssessment}>
                  Retake Assessment
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};

export default DataMaturityAssessment;
