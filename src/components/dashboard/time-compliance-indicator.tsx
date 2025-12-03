"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Calendar, CheckCircle, AlertTriangle, TrendingUp, BarChart3, Target, Hourglass } from "lucide-react";

import { DashboardMetrics, TimeToCompliance } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface TimeToComplianceIndicatorProps {
  metrics: DashboardMetrics;
  complianceData: TimeToCompliance[];
  onOptimizeTimeline?: () => void;
  onViewTimeline?: (compliance: TimeToCompliance) => void;
}

const TimeToComplianceIndicator: React.FC<TimeToComplianceIndicatorProps> = ({
  metrics,
  complianceData,
  onOptimizeTimeline,
  onViewTimeline
}) => {
  // Calculate compliance time metrics
  const avgTimeToCompliance = complianceData.length > 0
    ? complianceData.reduce((sum, data) => sum + data.daysToCompliance, 0) / complianceData.length
    : 0;

  const avgReviewTime = complianceData.length > 0
    ? complianceData.reduce((sum, data) => sum + data.reviewTimeDays, 0) / complianceData.length
    : 0;

  // Calculate trends (compare recent to older data)
  const recentComplianceData = complianceData.filter(data =>
    new Date(data.lastUpdate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );

  const olderComplianceData = complianceData.filter(data =>
    new Date(data.lastUpdate) <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) &&
    new Date(data.lastUpdate) > new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
  );

  const recentAvgTime = recentComplianceData.length > 0
    ? recentComplianceData.reduce((sum, data) => sum + data.daysToCompliance, 0) / recentComplianceData.length
    : 0;

  const olderAvgTime = olderComplianceData.length > 0
    ? olderComplianceData.reduce((sum, data) => sum + data.daysToCompliance, 0) / olderComplianceData.length
    : 0;

  const timeTrend = recentAvgTime - olderAvgTime;

  // Compliance efficiency calculation
  const onTimeCompliance = complianceData.filter(data => data.currentStatus === 'compliant').length;
  const complianceRate = complianceData.length > 0 ? (onTimeCompliance / complianceData.length) * 100 : 0;

  // Bottleneck analysis
  const bottlenecks = complianceData.filter(data => data.bottlenecks && data.bottlenecks.length > 0);

  // Framework breakdown
  const frameworkBreakdown = complianceData.reduce((acc, data) => {
    if (!acc[data.framework]) {
      acc[data.framework] = { totalTime: 0, count: 0, avgTime: 0 };
    }
    acc[data.framework].totalTime += data.daysToCompliance;
    acc[data.framework].count += 1;
    acc[data.framework].avgTime = acc[data.framework].totalTime / acc[data.framework].count;
    return acc;
  }, {} as Record<string, { totalTime: number; count: number; avgTime: number }>);

  // Recent compliance activities
  const recentActivities = complianceData
    .sort((a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-500';
      case 'in_progress': return 'text-blue-500';
      case 'pending': return 'text-yellow-500';
      case 'overdue': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'compliant': return 'default';
      case 'in_progress': return 'secondary';
      case 'pending': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend < -2) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (trend > 2) return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
    return <BarChart3 className="h-3 w-3 text-yellow-500" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend < -2) return 'text-green-500';
    if (trend > 2) return 'text-red-500';
    return 'text-yellow-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hourglass className="h-5 w-5 text-orange-500" />
            Time to Compliance
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {Math.round(avgTimeToCompliance)} days avg
            </Badge>
            <Button size="sm" onClick={onOptimizeTimeline}>
              <Target className="h-3 w-3 mr-1" />
              Optimize
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Compliance timeline analysis and efficiency metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeline Overview */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(avgTimeToCompliance)}
              </div>
              <div className="text-xs text-muted-foreground">Avg Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(avgReviewTime)}
              </div>
              <div className="text-xs text-muted-foreground">Review Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {complianceRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">On-Time Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(avgTimeToCompliance - avgReviewTime)}
              </div>
              <div className="text-xs text-muted-foreground">Processing</div>
            </div>
          </div>

          {/* Timeline Trend */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Timeline Trend</span>
              {getTrendIcon(timeTrend)}
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-medium", getTrendColor(timeTrend))}>
                {timeTrend > 0 ? '+' : ''}{Math.round(timeTrend)} days
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        </div>

        {/* Bottleneck Analysis */}
        {bottlenecks.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-orange-600">Process Bottlenecks</h4>
            <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  {bottlenecks.length} compliance item{bottlenecks.length !== 1 ? 's' : ''} experiencing delays
                </span>
                <Button size="sm" variant="outline" className="text-orange-600 border-orange-200">
                  Analyze
                </Button>
              </div>
              <div className="space-y-1">
                {bottlenecks.slice(0, 2).map((item, index) => (
                  <div key={index} className="text-xs text-orange-600">
                    • {item.bottlenecks?.slice(0, 1).join(', ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Framework Performance */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Framework Performance</h4>
          <div className="space-y-2">
            {Object.entries(frameworkBreakdown).map(([framework, data]) => (
              <div key={framework} className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm capitalize">{framework.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{Math.round(data.avgTime)} days</span>
                    <Badge variant="outline" className="text-xs">{data.count} items</Badge>
                  </div>
                </div>
                <Progress value={(data.avgTime / 60) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Compliance Activities</h4>
          <div className="space-y-2">
            {recentActivities.length > 0 ? recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewTimeline?.(activity)}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{activity.projectName}</span>
                      <Badge variant={getStatusBadgeVariant(activity.currentStatus)} className="text-xs">
                        {activity.currentStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{activity.framework.replace('_', ' ')}</span>
                      <span>Stage: {activity.currentStage}</span>
                      <span>{Math.round(activity.progress)}% complete</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {Math.round(activity.daysToCompliance)} days
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.lastUpdate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                <Clock className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-sm">No recent compliance activities</p>
              </div>
            )}
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Efficiency Analysis</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Review Efficiency</div>
              <div className="text-lg font-bold text-green-600">
                {avgTimeToCompliance > 0 ? ((avgTimeToCompliance - avgReviewTime) / avgTimeToCompliance * 100).toFixed(1) : 0}%
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">On-Time Delivery</div>
              <div className="text-lg font-bold text-blue-600">
                {complianceRate.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={onOptimizeTimeline}>
              <Target className="h-3 w-3 mr-1" />
              Optimize Timeline
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Bottleneck Analysis
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <BarChart3 className="h-3 w-3 mr-1" />
              Performance Report
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Timeline View
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(avgTimeToCompliance)}
              </div>
              <div className="text-xs text-muted-foreground">Avg Days</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {complianceRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">On-Time Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {bottlenecks.length}
              </div>
              <div className="text-xs text-muted-foreground">Bottlenecks</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

TimeToComplianceIndicator.displayName = "TimeToComplianceIndicator";

export { TimeToComplianceIndicator };