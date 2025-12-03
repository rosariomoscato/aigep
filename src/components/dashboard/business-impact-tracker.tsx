"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, DollarSign, Users, BarChart3, ArrowUp, ArrowDown, Minus, Calendar } from "lucide-react";

import { DashboardMetrics, BusinessImpact } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface BusinessImpactTrackerProps {
  metrics: DashboardMetrics;
  impacts: BusinessImpact[];
  onGenerateReport?: () => void;
  onViewImpact?: (impact: BusinessImpact) => void;
}

const BusinessImpactTracker: React.FC<BusinessImpactTrackerProps> = ({
  metrics,
  impacts,
  onGenerateReport,
  onViewImpact
}) => {
  // Calculate impact metrics
  const totalImpact = impacts.reduce((sum, impact) => sum + impact.impactScore, 0);
  const avgImpact = impacts.length > 0 ? totalImpact / impacts.length : 0;

  // Impact trends (compare current month to previous month)
  const currentMonthImpacts = impacts.filter(impact => {
    const impactDate = new Date(impact.measurementDate);
    const now = new Date();
    return impactDate.getMonth() === now.getMonth() && impactDate.getFullYear() === now.getFullYear();
  });

  const previousMonthImpacts = impacts.filter(impact => {
    const impactDate = new Date(impact.measurementDate);
    const now = new Date();
    const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    return impactDate.getMonth() === prevMonth && impactDate.getFullYear() === prevYear;
  });

  const currentMonthAvgImpact = currentMonthImpacts.length > 0
    ? currentMonthImpacts.reduce((sum, impact) => sum + impact.impactScore, 0) / currentMonthImpacts.length
    : 0;

  const previousMonthAvgImpact = previousMonthImpacts.length > 0
    ? previousMonthImpacts.reduce((sum, impact) => sum + impact.impactScore, 0) / previousMonthImpacts.length
    : 0;

  const monthlyTrend = currentMonthAvgImpact - previousMonthAvgImpact;

  // Group impacts by category
  const impactsByCategory = impacts.reduce((acc, impact) => {
    acc[impact.category] = (acc[impact.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate financial impact
  const totalRevenueImpact = impacts
    .filter(impact => impact.metric === 'revenue')
    .reduce((sum, impact) => sum + impact.impactScore * 100000, 0); // Convert to monetary value

  const totalCostSavings = impacts
    .filter(impact => impact.metric === 'cost_reduction')
    .reduce((sum, impact) => sum + impact.impactScore * 50000, 0); // Convert to monetary value

  // Get top performing impacts
  const topImpacts = impacts
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 5);

  // Recent impacts
  const recentImpacts = impacts
    .sort((a, b) => new Date(b.measurementDate).getTime() - new Date(a.measurementDate).getTime())
    .slice(0, 6);

  const getTrendIcon = (trend: number) => {
    if (trend > 0.05) return <ArrowUp className="h-3 w-3 text-green-500" />;
    if (trend < -0.05) return <ArrowDown className="h-3 w-3 text-red-500" />;
    return <Minus className="h-3 w-3 text-yellow-500" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0.05) return 'text-green-500';
    if (trend < -0.05) return 'text-red-500';
    return 'text-yellow-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'efficiency': return <BarChart3 className="h-4 w-4" />;
      case 'revenue': return <DollarSign className="h-4 w-4" />;
      case 'customer_satisfaction': return <Users className="h-4 w-4" />;
      case 'innovation': return <Target className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Business Impact Tracker
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {currentMonthImpacts.length} This Month
            </Badge>
            <Button size="sm" onClick={onGenerateReport}>
              <BarChart3 className="h-3 w-3 mr-1" />
              Report
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Measurable business outcomes and ROI metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Impact Overview */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(avgImpact * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {impacts.length}
              </div>
              <div className="text-xs text-muted-foreground">Total Metrics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(totalRevenueImpact)}
              </div>
              <div className="text-xs text-muted-foreground">Revenue Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formatCurrency(totalCostSavings)}
              </div>
              <div className="text-xs text-muted-foreground">Cost Savings</div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Monthly Trend</span>
              {getTrendIcon(monthlyTrend)}
            </div>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-medium", getTrendColor(monthlyTrend))}>
                {monthlyTrend > 0 ? '+' : ''}{(monthlyTrend * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        </div>

        {/* Impact Categories */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Impact Categories</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(impactsByCategory).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  <span className="text-sm capitalize">{category.replace('_', ' ')}</span>
                </div>
                <Badge variant="outline" className="text-xs">{count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Financial Summary</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Revenue Impact</span>
              </div>
              <span className="text-sm font-bold text-green-600">
                {formatCurrency(totalRevenueImpact)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950 rounded">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Cost Savings</span>
              </div>
              <span className="text-sm font-bold text-blue-600">
                {formatCurrency(totalCostSavings)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-950 rounded">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">Total Business Value</span>
              </div>
              <span className="text-sm font-bold text-purple-600">
                {formatCurrency(totalRevenueImpact + totalCostSavings)}
              </span>
            </div>
          </div>
        </div>

        {/* Top Performing Impacts */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Top Performing Impacts</h4>
          <div className="space-y-2">
            {topImpacts.length > 0 ? topImpacts.map((impact) => (
              <div
                key={impact.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewImpact?.(impact)}
              >
                <div className="flex items-center gap-3">
                  {getCategoryIcon(impact.category)}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{impact.projectName}</span>
                      <Badge variant="outline" className="text-xs">
                        {(impact.impactScore * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="capitalize">{impact.metric.replace('_', ' ')}</span>
                      <span className="capitalize">{impact.category.replace('_', ' ')}</span>
                      <span>{new Date(impact.measurementDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    {(impact.impactScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Impact Score
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                <TrendingUp className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-sm">No impact metrics recorded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Activity</h4>
          <div className="space-y-2">
            {recentImpacts.length > 0 ? recentImpacts.slice(0, 4).map((impact) => (
              <div key={impact.id} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(impact.category)}
                  <div>
                    <div className="text-sm font-medium">{impact.projectName}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(impact.measurementDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{(impact.impactScore * 100).toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {impact.metric.replace('_', ' ')}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                <Calendar className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={onGenerateReport}>
              <BarChart3 className="h-3 w-3 mr-1" />
              Generate Report
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Target className="h-3 w-3 mr-1" />
              Set KPIs
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Impact Analysis
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
              <div className="text-2xl font-bold text-green-600">
                {(avgImpact * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(totalRevenueImpact + totalCostSavings)}
              </div>
              <div className="text-xs text-muted-foreground">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {topImpacts.length}
              </div>
              <div className="text-xs text-muted-foreground">High Impact</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

BusinessImpactTracker.displayName = "BusinessImpactTracker";

export { BusinessImpactTracker };