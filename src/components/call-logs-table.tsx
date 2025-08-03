"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Search, Play, FileText, MessageSquare, Download } from "lucide-react";
import { motion } from "framer-motion";
import type { ProcessedCallData } from "../types/api";
import { formatDate, formatDuration } from "../utils/helpers";
import { TranscriptModal } from "./transcript-modal";
import { SummaryModal } from "./summary-modal";

interface CallLogsTableProps {
  data: ProcessedCallData[];
}

interface Call {
  name: string;
  recording: string;
  // Add other properties as needed
}

interface RecordingModalState {
  isOpen: boolean;
  call: Call | null;
}
export function CallLogsTable({ data }: CallLogsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [transcriptModal, setTranscriptModal] = useState<{
    isOpen: boolean;
    call: ProcessedCallData | null;
  }>({
    isOpen: false,
    call: null,
  });
  const [summaryModal, setSummaryModal] = useState<{
    isOpen: boolean;
    call: ProcessedCallData | null;
  }>({
    isOpen: false,
    call: null,
  });

  const [recordingModal, setRecordingModal] = useState<RecordingModalState>({
    isOpen: false,
    call: null,
  });

  const filteredData = data.filter(
    (call) =>
      call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.fitnessGoal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSegmentColor = (segment: string) => {
    switch (segment.toLowerCase()) {
      case "positive":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "negative":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    }
  };

  const getGoalColor = (goal: string) => {
    const colors = [
      "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "bg-green-500/10 text-green-600 border-green-500/20",
      "bg-orange-500/10 text-orange-600 border-orange-500/20",
    ];
    return colors[goal.length % colors.length];
  };

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Goal",
      "Segment",
      "Date",
      "Duration",
      "Status",
      "Recording",
      "Transcript",
      "Summary",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((call) =>
        [
          call.name,
          call.email,
          call.fitnessGoal,
          call.segment,
          formatDate(call.date),
          formatDuration(call.duration),
          call.status ? "Successful" : "Failed",
          call.recording,
          call.transcript,
          call.summary,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "call-logs.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="w-full"
    >
      {/* <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Call Logs</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button onClick={downloadCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] overflow-x-auto! w-full!">
            <div className="overflow-x-auto! w-max!">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky left-0 z-10 min-w-[150px]">
                      Name
                    </TableHead>
                    <TableHead className="min-w-[200px]">Email</TableHead>
                    <TableHead className="min-w-[120px]">Goal</TableHead>
                    <TableHead className="min-w-[100px]">Segment</TableHead>
                    <TableHead className="min-w-[100px]">Actions</TableHead>
                    <TableHead className="min-w-[150px]">Date</TableHead>
                    <TableHead className="min-w-[100px]">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((call, index) => (
                    <motion.tr
                      key={call.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group"
                    >
                      <TableCell className="sticky left-0 z-10 font-medium">
                        {call.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {call.email}
                      </TableCell>
                      <TableCell>
                        <Badge className={getGoalColor(call.fitnessGoal)}>
                          {call.fitnessGoal}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSegmentColor(call.segment)}>
                          {call.segment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setSummaryModal({ isOpen: true, call })
                            }
                            className="h-8 w-8 p-0"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setTranscriptModal({ isOpen: true, call })
                            }
                            className="h-8 w-8 p-0"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              window.open(call.recording, "_blank")
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(call.date)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDuration(call.duration)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card> */}

      <>
        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Call Logs</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search calls..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={downloadCSV} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto rounded-md border">
              <table className="min-w-[800px] w-full border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="sticky left-0  backdrop-blur-sm bg-background/60 border border-border z-10 p-2 text-left min-w-[100px]!">
                      Name
                    </th>
                    <th className="p-2 min-w-[200px] text-left">Email</th>
                    <th className="p-2 min-w-[150px] text-left">Goal</th>
                    <th className="p-2 min-w-[100px] text-left">Segment</th>
                    <th className="p-2 min-w-[150px] text-left">Actions</th>
                    <th className="p-2 min-w-[150px] text-left">Date</th>
                    <th className="p-2 min-w-[100px] text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((call, index) => (
                    <motion.tr
                      key={call.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group hover:bg-muted/50"
                    >
                      <td className="sticky left-0 backdrop-blur-sm bg-background/60 border border-border z-10 p-2 font-medium min-w-[100px]">
                        {call.name}
                      </td>
                      <td className="p-2 text-muted-foreground">
                        {call.email}
                      </td>
                      <td className="p-2">
                        <Badge className={getGoalColor(call.fitnessGoal)}>
                          {call.fitnessGoal}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge className={getSegmentColor(call.segment)}>
                          {call.segment}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setSummaryModal({ isOpen: true, call })
                            }
                            className="h-8 w-8 p-0"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setTranscriptModal({ isOpen: true, call })
                            }
                            className="h-8 w-8 p-0"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              setRecordingModal({ isOpen: true, call })
                            }
                            className="h-8 w-8 p-0"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-2 text-muted-foreground">
                        {formatDate(call.date)}
                      </td>
                      <td className="p-2 text-muted-foreground">
                        {formatDuration(call.duration)}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recording Modal */}
        <Dialog
          open={recordingModal.isOpen}
          onOpenChange={() => setRecordingModal({ isOpen: false, call: null })}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Recording: {recordingModal.call?.name || ""}
              </DialogTitle>
            </DialogHeader>
            {recordingModal.call && (
              <audio
                className="w-full mt-4 rounded-lg"
                controls
                src={recordingModal.call.recording}
              />
            )}
          </DialogContent>
        </Dialog>
      </>

      <TranscriptModal
        isOpen={transcriptModal.isOpen}
        onClose={() => setTranscriptModal({ isOpen: false, call: null })}
        transcript={transcriptModal.call?.transcript || ""}
        callerName={transcriptModal.call?.name || ""}
      />

      <SummaryModal
        isOpen={summaryModal.isOpen}
        onClose={() => setSummaryModal({ isOpen: false, call: null })}
        call={summaryModal.call}
      />
    </motion.div>
  );
}
