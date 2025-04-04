
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Calculator, BarChart, PieChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BusinessGrowthCalculator = () => {
  const [initialRevenue, setInitialRevenue] = useState<number>(10000);
  const [growthRate, setGrowthRate] = useState<number>(15);
  const [timeframe, setTimeframe] = useState<number>(5);
  const [chartData, setChartData] = useState<Array<{year: string; revenue: number}>>([]);

  // Recalculate chart data when inputs change
  useEffect(() => {
    const newData = [];
    for (let i = 0; i <= timeframe; i++) {
      const revenue = initialRevenue * Math.pow((1 + growthRate / 100), i);
      newData.push({
        year: `Year ${i}`,
        revenue: Math.round(revenue)
      });
    }
    setChartData(newData);
  }, [initialRevenue, growthRate, timeframe]);

  const totalGrowth = chartData.length > 0 
    ? Math.round(((chartData[chartData.length - 1].revenue - initialRevenue) / initialRevenue) * 100) 
    : 0;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Year,Revenue\n" 
      + chartData.map(item => `${item.year},${item.revenue}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "business_growth_projection.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            <span className="data-gradient">Business Growth</span> Calculator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visualize your business growth trajectory and see the impact of data-driven decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-1 shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Input Parameters
              </CardTitle>
              <CardDescription>
                Adjust these values to see different growth scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Initial Revenue</label>
                  <span className="text-sm font-bold">{formatCurrency(initialRevenue)}</span>
                </div>
                <Slider 
                  value={[initialRevenue]} 
                  onValueChange={(values) => setInitialRevenue(values[0])} 
                  min={1000} 
                  max={500000} 
                  step={1000}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Annual Growth Rate</label>
                  <span className="text-sm font-bold">{growthRate}%</span>
                </div>
                <Slider 
                  value={[growthRate]} 
                  onValueChange={(values) => setGrowthRate(values[0])} 
                  min={1} 
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Projection Timeframe</label>
                  <span className="text-sm font-bold">{timeframe} years</span>
                </div>
                <Slider 
                  value={[timeframe]} 
                  onValueChange={(values) => setTimeframe(values[0])} 
                  min={1} 
                  max={10}
                  step={1}
                  className="mt-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={downloadCSV} className="w-full">
                <Download className="mr-2 h-4 w-4" /> Export Projection
              </Button>
            </CardFooter>
          </Card>

          <Card className="col-span-1 lg:col-span-2 shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Revenue Growth Projection
                </CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {totalGrowth}% Total Growth
                </Badge>
              </div>
              <CardDescription>
                Projected revenue over the next {timeframe} years based on {growthRate}% annual growth
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value) => [`${formatCurrency(value as number)}`, "Revenue"]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Final Value: <span className="font-bold text-foreground">{formatCurrency(chartData[chartData.length - 1]?.revenue || 0)}</span>
                </span>
              </div>
              <Button variant="default" className="ml-auto">
                <BarChart className="mr-2 h-4 w-4" /> Get Data Strategy
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-10 max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">
            This calculator helps visualize potential business growth, but real-world results require proper data strategy and implementation. Let our experts help you achieve these projections.
          </p>
          <Button size="lg" className="bg-primary text-white">
            Schedule a Growth Strategy Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BusinessGrowthCalculator;
