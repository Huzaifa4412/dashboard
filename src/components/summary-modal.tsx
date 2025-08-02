"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProcessedCallData } from "../types/api";
import { formatDate, formatDuration } from "../utils/helpers";

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: ProcessedCallData | null;
}

export function SummaryModal({ isOpen, onClose, call }: SummaryModalProps) {
  if (!call) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Call Summary - {call.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Call Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <p className="text-sm font-medium">{formatDate(call.date)}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Duration:
                  </span>
                  <p className="text-sm font-medium">
                    {formatDuration(call.duration)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge
                    variant={call.status ? "default" : "destructive"}
                    className="ml-2"
                  >
                    {call.status ? "Successful" : "Failed"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">User Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <p className="text-sm font-medium">{call.email}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Goal:</span>
                  <p className="text-sm font-medium">{call.fitnessGoal}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    Segment:
                  </span>
                  <Badge className={getSegmentColor(call.segment)}>
                    {call.segment}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{call.summary}</p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
