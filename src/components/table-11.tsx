"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Play,
  FileText,
  Calendar,
  User,
  Mail,
  Target,
  Clock,
  Phone,
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  Activity,
  Moon,
  Sun,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Types
interface CallEntry {
  id: number;
  callerName: string;
  callerEmail: string;
  transcript: string;
  summary: string;
  callDate: string;
  fitnessGoal: string;
  callRecording: string;
  disconnectedBy: string;
  callDuration: string;
  callStatus: boolean;
  userSegment: "Positive" | "Neutral" | "Negative";
}

// Theme Context
const ThemeContext = React.createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({
  isDark: false,
  toggleTheme: () => {},
});

// ShadCN UI Components with theme support
const Badge = ({ children, variant = "default", className = "" }: any) => {
  const { isDark } = React.useContext(ThemeContext);
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants = {
    default: isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800",
    positive: isDark
      ? "bg-green-900/50 text-green-400 border border-green-800"
      : "bg-green-100 text-green-800",
    neutral: isDark
      ? "bg-yellow-900/50 text-yellow-400 border border-yellow-800"
      : "bg-yellow-100 text-yellow-800",
    negative: isDark
      ? "bg-red-900/50 text-red-400 border border-red-800"
      : "bg-red-100 text-red-800",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: any) => {
  const { isDark } = React.useContext(ThemeContext);
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

  const variants = {
    default: isDark
      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl"
      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    outline: isDark
      ? "border border-gray-700 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 backdrop-blur-sm"
      : "border border-gray-300 bg-white/80 text-gray-700 hover:bg-gray-50 backdrop-blur-sm",
    ghost: isDark
      ? "text-gray-300 hover:bg-gray-800/50 hover:text-white"
      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    secondary: isDark
      ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
      : "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }: any) => {
  const { isDark } = React.useContext(ThemeContext);
  const baseClasses = `flex h-10 w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50`;
  const themeClasses = isDark
    ? "border-gray-700 bg-gray-800/50 text-gray-200 placeholder:text-gray-400 backdrop-blur-sm"
    : "border-gray-300 bg-white/80 text-gray-900 backdrop-blur-sm";

  return (
    <input
      className={`${baseClasses} ${themeClasses} ${className}`}
      {...props}
    />
  );
};

const Card = ({ children, className = "" }: any) => {
  const { isDark } = React.useContext(ThemeContext);
  const baseClasses =
    "rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl";
  const themeClasses = isDark
    ? "border-gray-800 bg-gray-900/50 backdrop-blur-sm"
    : "border-gray-200 bg-white/80 backdrop-blur-sm";

  return (
    <div className={`${baseClasses} ${themeClasses} ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }: any) => {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className = "" }: any) => {
  const { isDark } = React.useContext(ThemeContext);
  return (
    <h3
      className={`text-xl font-semibold ${
        isDark ? "text-gray-100" : "text-gray-900"
      } ${className}`}
    >
      {children}
    </h3>
  );
};

const CardContent = ({ children, className = "" }: any) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

const Dialog = ({ open, onOpenChange, children }: any) => {
  const { isDark } = React.useContext(ThemeContext);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto ${
              isDark
                ? "bg-gray-900 border border-gray-800"
                : "bg-white border border-gray-200"
            }`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DialogContent = ({ children, className = "" }: any) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

const DialogHeader = ({ children }: any) => {
  return <div className="mb-4">{children}</div>;
};

const DialogTitle = ({ children, className = "" }: any) => {
  const { isDark } = React.useContext(ThemeContext);
  return (
    <h2
      className={`text-lg font-semibold ${
        isDark ? "text-gray-100" : "text-gray-900"
      } ${className}`}
    >
      {children}
    </h2>
  );
};

// Main Dashboard Component
export default function ClientCallDashboard() {
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState<CallEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCall, setSelectedCall] = useState<CallEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiJbwFycjuw2KCoVkuEPrwjrxaiIrb6wpKbK_cYpoutSN_UFIoJF1hiZ8P7IKMKsh7igiqwq9gfG0wabgXnu9PemKC4UgkQW_BY6EfzA_wj7Osrshx3rQs9q_c3ttl7wBmTSk3hxvZ2v-s56tvk4IVgwXXJ0A3tg7lesa_-yRFk5EUu2rj1BGkl2L3qFfc-_W7HMV1ohJOEYk2b_0oeE3natkLHJVjVevnk3ffnDw0jjMbou13JebdlWsye-_uPLOAtGJX8Z-ENFlfQTmY1wRv8jd0MibIH72uGnUF9&lib=MeV5S9pyOlPbhncapkNh6FVHPcoHe_pe8"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();

        if (result && result.data && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchCalls();
  }, []);

  const refreshData = () => {
    const fetchCalls = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiJbwFycjuw2KCoVkuEPrwjrxaiIrb6wpKbK_cYpoutSN_UFIoJF1hiZ8P7IKMKsh7igiqwq9gfG0wabgXnu9PemKC4UgkQW_BY6EfzA_wj7Osrshx3rQs9q_c3ttl7wBmTSk3hxvZ2v-s56tvk4IVgwXXJ0A3tg7lesa_-yRFk5EUu2rj1BGkl2L3qFfc-_W7HMV1ohJOEYk2b_0oeE3natkLHJVjVevnk3ffnDw0jjMbou13JebdlWsye-_uPLOAtGJX8Z-ENFlfQTmY1wRv8jd0MibIH72uGnUF9&lib=MeV5S9pyOlPbhncapkNh6FVHPcoHe_pe8"
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();

        if (result && result.data && Array.isArray(result.data)) {
          setData(result.data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchCalls();
  };

  // Filter data based on search
  const filteredData = data.filter(
    (call) =>
      call.callerName?.toLowerCase().includes(search.toLowerCase()) ||
      call.fitnessGoal?.toLowerCase().includes(search.toLowerCase()) ||
      call.callerEmail?.toLowerCase().includes(search.toLowerCase())
  );

  // Analytics calculations
  const totalCalls = data.length;
  const completedCalls = data.filter((call) => call.callStatus).length;
  const completionRate =
    totalCalls > 0 ? Math.round((completedCalls / totalCalls) * 100) : 0;

  const segmentData = [
    {
      name: "Positive",
      value: data.filter((call) => call.userSegment === "Positive").length,
      color: isDark ? "#10b981" : "#059669",
    },
    {
      name: "Neutral",
      value: data.filter((call) => call.userSegment === "Neutral").length,
      color: isDark ? "#f59e0b" : "#d97706",
    },
    {
      name: "Negative",
      value: data.filter((call) => call.userSegment === "Negative").length,
      color: isDark ? "#ef4444" : "#dc2626",
    },
  ];

  const goalData = data.reduce((acc: any, call) => {
    if (call.fitnessGoal) {
      acc[call.fitnessGoal] = (acc[call.fitnessGoal] || 0) + 1;
    }
    return acc;
  }, {});

  const goalChartData = Object.entries(goalData).map(([goal, count]) => ({
    goal,
    count,
  }));

  // Daily calls chart data
  const dailyCallsData = data.reduce((acc: any, call) => {
    if (call.callDate) {
      const date = new Date(call.callDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const dailyChartData = Object.entries(dailyCallsData)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .slice(-7) // Last 7 days
    .map(([date, calls]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      calls,
    }));

  // Calculate average duration
  const avgDuration =
    data.length > 0
      ? data.reduce((acc, call) => {
          if (call.callDuration) {
            const [minutes, seconds] = call.callDuration.split(":").map(Number);
            return acc + (minutes * 60 + seconds);
          }
          return acc;
        }, 0) / data.length
      : 0;

  const avgDurationFormatted = `${Math.floor(avgDuration / 60)}:${(
    avgDuration % 60
  )
    .toFixed(0)
    .padStart(2, "0")}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSegmentBadge = (segment: string) => {
    const variants = {
      Positive: "positive",
      Neutral: "neutral",
      Negative: "negative",
    };
    return (
      <Badge variant={variants[segment as keyof typeof variants]}>
        {segment}
      </Badge>
    );
  };

  const openTranscriptDialog = (call: CallEntry) => {
    setSelectedCall(call);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <div
          className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
            isDark ? "bg-gray-950" : "bg-gray-50"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Loading dashboard...
            </p>
          </motion.div>
        </div>
      </ThemeContext.Provider>
    );
  }

  if (error) {
    return (
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <div
          className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
            isDark ? "bg-gray-950" : "bg-gray-50"
          }`}
        >
          <Card className="p-8 text-center max-w-md">
            <div className="text-red-500 mb-4">
              <Activity className="h-12 w-12 mx-auto mb-2" />
            </div>
            <h3
              className={`text-lg font-semibold mb-2 ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Connection Error
            </h3>
            <p
              className={`text-sm mb-4 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {error}
            </p>
            <Button onClick={refreshData} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </Card>
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDark
            ? "bg-gray-950"
            : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
        }`}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-b backdrop-blur-sm sticky top-0 z-40 transition-colors duration-300 ${
            isDark
              ? "bg-gray-900/80 border-gray-800"
              : "bg-white/80 border-gray-200"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1
                      className={`text-2xl font-bold ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Client Call Dashboard
                    </h1>
                    <p
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-600"
                      } mt-1`}
                    >
                      AI Call Assistant Analytics
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full"
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshData}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Total Calls
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {totalCalls}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Completion Rate
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {completionRate}%
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Positive Sentiment
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {segmentData.find((s) => s.name === "Positive")?.value ||
                        0}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Avg Duration
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {avgDurationFormatted}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            {/* Daily Calls Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Daily Call Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyChartData}>
                    <defs>
                      <linearGradient
                        id="callsGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="date"
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      fontSize={12}
                    />
                    <YAxis
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="calls"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#callsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sentiment Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Sentiment Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={segmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {segmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Fitness Goals Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Fitness Goals Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={goalChartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={isDark ? "#374151" : "#e5e7eb"}
                    />
                    <XAxis
                      dataKey="goal"
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      stroke={isDark ? "#9ca3af" : "#6b7280"}
                      fontSize={12}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? "#1f2937" : "#ffffff",
                        border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, email, or fitness goal..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Calls Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Calls ({filteredData.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead
                      className={`border-b transition-colors ${
                        isDark
                          ? "bg-gray-800/50 border-gray-700"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <tr>
                        <th
                          className={`sticky left-0 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider z-10 ${
                            isDark
                              ? "bg-gray-800/50 text-gray-300"
                              : "bg-gray-50 text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Caller
                          </div>
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email
                          </div>
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Goal
                          </div>
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date
                          </div>
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          Sentiment
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Duration
                          </div>
                        </th>
                        <th
                          className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                            isDark ? "text-gray-300" : "text-gray-500"
                          }`}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <AnimatePresence>
                        {filteredData.map((call, index) => (
                          <motion.tr
                            key={call.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                              isDark ? "text-gray-300" : "text-gray-900"
                            }`}
                          >
                            <td
                              className={`sticky left-0 px-6 py-4 whitespace-nowrap z-10 border-r ${
                                isDark
                                  ? "bg-gray-900/50 border-gray-700"
                                  : "bg-white border-gray-200"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-white ${
                                    call.userSegment === "Positive"
                                      ? "bg-green-500"
                                      : call.userSegment === "Neutral"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                >
                                  {call.callerName
                                    ? call.callerName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                    : "N/A"}
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {call.callerName || "Unknown"}
                                  </div>
                                  <div
                                    className={`text-sm ${
                                      isDark ? "text-gray-400" : "text-gray-500"
                                    }`}
                                  >
                                    ID: {call.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                {call.callerEmail || "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                {call.fitnessGoal || "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                {call.callDate
                                  ? formatDate(call.callDate)
                                  : "N/A"}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {call.userSegment ? (
                                getSegmentBadge(call.userSegment)
                              ) : (
                                <Badge>Unknown</Badge>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                {call.callDuration || "N/A"}
                              </div>
                              <div
                                className={`text-xs ${
                                  isDark ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {call.callStatus ? (
                                  <span className="text-green-500">
                                    ✓ Completed
                                  </span>
                                ) : (
                                  <span className="text-red-500">
                                    ✗ Incomplete
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openTranscriptDialog(call)}
                                  className="flex items-center gap-1"
                                >
                                  <FileText className="h-3 w-3" />
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    call.callRecording &&
                                    window.open(call.callRecording, "_blank")
                                  }
                                  className="flex items-center gap-1"
                                  disabled={!call.callRecording}
                                >
                                  <Play className="h-3 w-3" />
                                  Play
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {filteredData.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div
                      className={`text-6xl mb-4 ${
                        isDark ? "text-gray-600" : "text-gray-300"
                      }`}
                    >
                      📞
                    </div>
                    <p
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {data.length === 0
                        ? "No call data available."
                        : "No calls found matching your search."}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transcript Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {selectedCall && (
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Call Details - {selectedCall.callerName || "Unknown"}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Call Details Grid */}
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ${
                    isDark ? "bg-gray-800/50" : "bg-gray-50"
                  }`}
                >
                  <div>
                    <label
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Date:
                    </label>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {selectedCall.callDate
                        ? formatDate(selectedCall.callDate)
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Duration:
                    </label>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {selectedCall.callDuration || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Goal:
                    </label>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {selectedCall.fitnessGoal || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Sentiment:
                    </label>
                    <div className="mt-1">
                      {selectedCall.userSegment ? (
                        getSegmentBadge(selectedCall.userSegment)
                      ) : (
                        <Badge>Unknown</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Disconnected By:
                    </label>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {selectedCall.disconnectedBy || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Status:
                    </label>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {selectedCall.callStatus ? (
                        <span className="text-green-500">✓ Completed</span>
                      ) : (
                        <span className="text-red-500">✗ Incomplete</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4
                    className={`font-medium mb-2 ${
                      isDark ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    AI Summary
                  </h4>
                  <div
                    className={`p-4 rounded-lg ${
                      isDark
                        ? "bg-blue-900/30 border border-blue-800"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <p
                      className={`${
                        isDark ? "text-blue-100" : "text-blue-900"
                      }`}
                    >
                      {selectedCall.summary || "No summary available"}
                    </p>
                  </div>
                </div>

                {/* Transcript */}
                <div>
                  <h4
                    className={`font-medium mb-2 ${
                      isDark ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Full Transcript
                  </h4>
                  <div
                    className={`max-h-80 overflow-y-auto p-4 rounded-lg border ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <p
                      className={`leading-relaxed whitespace-pre-wrap ${
                        isDark ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {selectedCall.transcript || "No transcript available"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className={`flex justify-end gap-3 pt-4 border-t ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <Button
                    variant="outline"
                    onClick={() =>
                      selectedCall.callRecording &&
                      window.open(selectedCall.callRecording, "_blank")
                    }
                    className="flex items-center gap-2"
                    disabled={!selectedCall.callRecording}
                  >
                    <Play className="h-4 w-4" />
                    Play Recording
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </ThemeContext.Provider>
  );
}
