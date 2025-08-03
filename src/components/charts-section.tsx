"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import type { ProcessedCallData } from "../types/api";

interface ChartsSectionProps {
  data: ProcessedCallData[];
}

export function ChartsSection({ data }: ChartsSectionProps) {
  // Process data for charts
  const fitnessGoalData = data.reduce((acc, call) => {
    const goal = call.fitnessGoal || "Unknown";
    acc[goal] = (acc[goal] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(fitnessGoalData).map(([goal, count]) => ({
    goal,
    count,
  }));

  const sentimentData = data.reduce((acc, call) => {
    const segment = call.segment;
    acc[segment] = (acc[segment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(sentimentData).map(
    ([sentiment, count]) => ({
      sentiment,
      count,
      percentage: Math.round((count / data.length) * 100),
    })
  );

  // Daily call activity (last 7 days)
  const dailyActivity = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayData = data.filter((call) => {
      const callDate = new Date(call.date);
      return callDate.toDateString() === date.toDateString();
    });
    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      calls: dayData.length,
    };
  });

  // Performance metrics (mock data based on call success)
  // const performanceData = [
  //   {
  //     metric: "Empathy",
  //     value: Math.round(
  //       (data.filter((c) => c.segment === "Positive").length / data.length) *
  //         100
  //     ),
  //   },
  //   {
  //     metric: "Clarity",
  //     value: Math.round(
  //       (data.filter((c) => c.status).length / data.length) * 100
  //     ),
  //   },
  //   { metric: "Speed", value: Math.round(Math.random() * 30 + 70) },
  //   {
  //     metric: "Goal Achievement",
  //     value: Math.round(
  //       (data.filter((c) => c.status).length / data.length) * 100
  //     ),
  //   },
  // ];

  // Call duration trends
  const durationTrends = dailyActivity.map((day) => ({
    ...day,
    avgDuration:
      data
        .filter((call) => {
          const callDate = new Date(call.date);
          const dayDate = new Date();
          const dayIndex = dailyActivity.findIndex((d) => d.date === day.date);
          dayDate.setDate(dayDate.getDate() - (6 - dayIndex));
          return callDate.toDateString() === dayDate.toDateString();
        })
        .reduce((sum, call) => sum + Number.parseInt(call.duration), 0) /
      (day.calls || 1),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const chartConfig = {
    count: { label: "Count", color: "hsl(var(--chart-1))" },
    calls: { label: "Calls", color: "hsl(var(--chart-2))" },
    avgDuration: { label: "Avg Duration", color: "hsl(var(--chart-3))" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {/* Bar Chart - Fitness Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="xl:col-span-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>📊 Calls by Fitness Goal</CardTitle>
            <CardDescription>
              Distribution of calls across different fitness goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="goal" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--chart-1))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pie Chart - Sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>🟢 Sentiment Breakdown</CardTitle>
            <CardDescription>User sentiment distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-[300px] flex items-center justify-center! w-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ sentiment, percentage }) =>
                      `${sentiment}: ${percentage}%`
                    }
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Area Chart - Duration Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>📈 Call Duration Trends</CardTitle>
            <CardDescription>Average call duration over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={durationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="avgDuration"
                    stroke="var(--color-avgDuration)"
                    fill="var(--color-avgDuration)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Line Chart - Daily Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="xl:col-span-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>⏳ Daily Call Activity</CardTitle>
            <CardDescription>Calls per day over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="calls"
                    stroke="var(--color-calls)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
