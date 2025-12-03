"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, Eye, TrendingUp, TrendingDown } from "lucide-react";

import {
  DashboardMetrics,
  ComplianceEvaluation,
  RiskAssessment,
  ComplianceFramework,
} from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface ComplianceRiskSummaryProps {
  metrics: DashboardMetrics;
  evaluations: ComplianceEvaluation[];
  riskAssessments: RiskAssessment[];
}

const ComplianceRiskSummary: React.FC<ComplianceRiskSummaryProps> = ({
  metrics,
  evaluations,
  riskAssessments
}) => {
  // Calculate risk distribution
  const riskDistribution = riskAssessments.reduce((acc, assessment) => {
    acc[assessment.overallRisk] = (acc[assessment.overallRisk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalRiskProjects = Object.values(riskDistribution).reduce((sum, count) => sum + count, 0);
  const highRiskCount = riskDistribution['high'] || 0;
  const criticalRiskCount = riskDistribution['critical'] || 0;

  // Calculate compliance scores
  const avgComplianceScore = evaluations.length > 0
    ? evaluations.reduce((sum, eval) => sum + eval.score, 0) / evaluations.length
    : 0;

  const compliantProjects = evaluations.filter(eval => eval.status === 'approved').length;
  const pendingEvaluations = evaluations.filter(eval => eval.status === 'in_progress').length;

  // Recent changes
  const recentCriticalChanges = riskAssessments.filter(assessment =>
    assessment.overallRisk === 'critical' &&
    new Date(assessment.lastAssessment) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Risk Assessment Summary
        </CardTitle>
        <CardDescription>
          Real-time monitoring of project risk levels and compliance status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Level Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Risk Distribution</h4>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {riskDistribution['low'] || 0}
              </div>
              <div className="text-xs text-muted-foreground">Low Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {riskDistribution['medium'] || 0}
              </div>
              <div className="text-xs text-muted-foreground">Medium Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {highRiskCount}
              </div>
              <div className="text-xs text-muted-foreground">High Risk</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {criticalRiskCount}
              </div>
              <div className="text-xs text-muted-foreground">Critical Risk</div>
            </div>
          </div>
        </div>

        {/* Overall Risk Trend */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Risk Trend</h4>
            <div className="flex items-center gap-1">
              {recentCriticalChanges > 0 ? (
                <>
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-500">+{recentCriticalChanges} critical</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">Improving</span>
                </>
              )}
            </div>
          </div>
          <Progress
            value={totalRiskProjects > 0 ? ((highRiskCount + criticalRiskCount) / totalRiskProjects) * 100 : 0}
            className="h-2"
          />
          <div className="text-xs text-muted-foreground text-right">
            {totalRiskProjects > 0 ? Math.round(((highRiskCount + criticalRiskCount) / totalRiskProjects) * 100) : 0}% high or critical risk
          </div>
        </div>

        {/* Compliance Status */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Compliance Status</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Score</span>
                <Badge variant={avgComplianceScore >= 85 ? "default" : avgComplianceScore >= 70 ? "secondary" : "destructive"}>
                  {avgComplianceScore.toFixed(1)}%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Compliant</span>
                <Badge variant="default">
                  {compliantProjects}/{evaluations.length}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">In Review</span>
                <Badge variant="secondary">
                  {pendingEvaluations}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Evaluations</span>
                <Badge variant="outline">
                  {evaluations.length}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            Priority Actions
          </h4>
          <div className="space-y-2">
            {criticalRiskCount > 0 && (
              <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950 rounded">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Critical Risk Projects</span>
                </div>
                <Badge variant="destructive">{criticalRiskCount}</Badge>
              </div>
            )}
            {pendingEvaluations > 0 && (
              <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Pending Evaluations</span>
                </div>
                <Badge variant="secondary">{pendingEvaluations}</Badge>
              </div>
            )}
            {avgComplianceScore < 70 && evaluations.length > 0 && (
              <div className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-950 rounded">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Low Compliance Score</span>
                </div>
                <Badge variant="outline">{avgComplianceScore.toFixed(1)}%</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">
                {metrics.activeComplianceFrameworks}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Active Frameworks</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">
                {evaluations.filter(eval => eval.status === 'approved').length}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Approved This Month</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ComplianceRiskSummary.displayName = "ComplianceRiskSummary";

export { ComplianceRiskSummary };