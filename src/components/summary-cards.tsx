"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "./animated-counter";
import { Phone, Clock, DollarSign, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { ProcessedCallData } from "../types/api";
import { calculateTotalDuration } from "../utils/helpers";

interface SummaryCardsProps {
  data: ProcessedCallData[];
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const totalCalls = data.length;
  const totalDuration = calculateTotalDuration(data);
  // const AvgCalDuration = Number(calculateTotalDuration(data)) / data.length; // Assuming $2.5 per call
  const successfulCalls = data.filter((call) => call.status).length;

  const cards = [
    {
      title: "Total Calls",
      value: totalCalls,
      icon: Phone,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-500/20",
    },
    {
      title: "Total Duration",
      value: totalDuration,
      icon: Clock,
      color: "bg-green-500/10 text-green-600 dark:text-green-400  flex-1",
      iconBg: "bg-green-500/20",
      isString: true,
    },
    // {
    //   title: "Average Call Duration",
    //   value: AvgCalDuration,
    //   icon: DollarSign,
    //   color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    //   iconBg: "bg-purple-500/20",
    //   prefix: "$",
    // },
    {
      title: "Successful Conversations",
      value: successfulCalls,
      icon: CheckCircle,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 justify-center">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold text-center rounded-xl ${card.color}`}
              >
                {card.isString ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-2xl font-bold text-center!"
                  >
                    {card.value}
                  </motion.span>
                ) : (
                  <AnimatedCounter
                    value={typeof card.value === "number" ? card.value : 0}
                    // prefix={card.prefix}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
