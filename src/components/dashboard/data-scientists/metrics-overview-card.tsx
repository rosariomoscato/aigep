"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";

import {
  DashboardMetrics,
  Experiment,
  ModelPerformance,
  ResourceUtilization,
  TeamMember,
} from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface MetricsOverviewCardProps {
  project: DashboardMetrics;
}

const MetricsOverviewCard: React.FC<MetricsOverviewCardProps> = ({
  project
}) => {
  const accuracy = project.modelAccuracy || 0;
  const precision = project.modelPrecision || 0;
  const recall = project.modelRecall || 0;
  const f1Score = project.modelF1Score || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Model Performance</CardTitle>
        <CardDescription>Real-time monitoring of model accuracy and performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Accuracy</span>
                <Badge variant={accuracy >= 95 ? "default" : "secondary"} className="ml-2">
                  {accuracy.toFixed(1)}%
                </Badge>
                <Progress value={(accuracy / 100) * 100} className="ml-auto" />
              </div>
              <div>
                <span className="text-sm font-medium">Precision</span>
                <Badge variant={precision >= 0.95 ? "default" : "secondary"} className="ml-2">
                  {precision.toFixed(2)}%
                </Badge>
              </div>
              <div>
                <span className="text-sm font-medium">Recall</span>
                <Badge variant={recall >= 0.95 ? "default" : "secondary"} className="ml-2">
                  {recall.toFixed(2)}%
                </Badge>
              </div>
              <div>
                <span className="text-sm font-medium">F1 Score</span>
                <Badge variant={f1Score >= 0.9 ? "default" : "secondary"} className="ml-2">
                  {f1Score.toFixed(3)}
                </Badge>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Last updated: {project.lastActivity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

MetricsOverviewCard.displayName = "MetricsOverviewCard";

export { MetricsOverviewCard };