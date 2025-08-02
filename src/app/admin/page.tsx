// import TableData from "@/components/table-11";

// export default function AdminDashboard() {
//   return (
//     <div className="container">
//       <TableData />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SummaryCards } from "@/components/summary-cards";
import { ChartsSection } from "@/components/charts-section";
import { CallLogsTable } from "@/components/call-logs-table";
import { LoadingDashboard } from "@/components/loading";
import { ErrorDisplay } from "@/components/error-display";
import { fetchCallData } from "@/services/api";
import type { ProcessedCallData } from "@/types/api";

export default function Dashboard() {
  const [data, setData] = useState<ProcessedCallData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const callData = await fetchCallData();
      setData(callData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <LoadingDashboard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <ErrorDisplay error={error} onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Call Assistant Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive analytics and insights for your AI-powered fitness
            consultations
          </p>
        </motion.div>

        {/* Summary Cards */}
        <SummaryCards data={data} />

        {/* Charts Section */}
        <ChartsSection data={data} />

        {/* Call Logs Table */}
        <CallLogsTable data={data} />
      </div>
    </div>
  );
}
