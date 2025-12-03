"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Briefcase, TrendingUp, Users, Calendar, Target, CheckCircle, Clock, AlertTriangle } from "lucide-react";

import { DashboardMetrics, ProjectPortfolio } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface ProjectPortfolioCardProps {
  metrics: DashboardMetrics;
  portfolio: ProjectPortfolio[];
  onPortfolioOptimization?: () => void;
  onViewProject?: (projectId: string) => void;
}

const ProjectPortfolioCard: React.FC<ProjectPortfolioCardProps> = ({
  metrics,
  portfolio,
  onPortfolioOptimization,
  onViewProject
}) => {
  // Calculate portfolio statistics
  const totalProjects = portfolio.length;
  const activeProjects = portfolio.filter(p => p.status === 'active').length;
  const completedProjects = portfolio.filter(p => p.status === 'completed').length;
  const onHoldProjects = portfolio.filter(p => p.status === 'on_hold').length;
  const cancelledProjects = portfolio.filter(p => p.status === 'cancelled').length;

  const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

  // Calculate ROI and business impact
  const totalBudget = portfolio.reduce((sum, p) => sum + p.budget, 0);
  const totalValue = portfolio.reduce((sum, p) => sum + p.businessValue, 0);
  const averageROI = totalBudget > 0 ? ((totalValue - totalBudget) / totalBudget) * 100 : 0;

  // Project by business priority
  const projectsByPriority = portfolio.reduce((acc, project) => {
    acc[project.businessPriority] = (acc[project.businessPriority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Projects by business unit
  const projectsByBusinessUnit = portfolio.reduce((acc, project) => {
    acc[project.businessUnit] = (acc[project.businessUnit] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get top performing projects
  const topPerformingProjects = portfolio
    .filter(p => p.businessImpact > 0.8)
    .sort((a, b) => b.businessImpact - a.businessImpact)
    .slice(0, 5);

  // Projects at risk
  const riskProjects = portfolio.filter(p => p.businessImpact < 0.3);
  const delayedProjects = portfolio.filter(p => new Date(p.expectedCompletion) < new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'completed': return 'text-blue-500';
      case 'on_hold': return 'text-yellow-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'on_hold': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            Project Portfolio
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {activeProjects} Active
            </Badge>
            <Button size="sm" onClick={onPortfolioOptimization}>
              <TrendingUp className="h-3 w-3 mr-1" />
              Optimize
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Business impact and portfolio performance overview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portfolio Overview */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{activeProjects}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedProjects}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{onHoldProjects}</div>
              <div className="text-xs text-muted-foreground">On Hold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{averageROI.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Avg ROI</div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Completion Rate</h4>
              <span className="text-sm text-muted-foreground">{completionRate.toFixed(1)}%</span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>
        </div>

        {/* Risk Alerts */}
        {(riskProjects.length > 0 || delayedProjects.length > 0) && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-orange-600">Portfolio Risks</h4>
            <div className="space-y-2">
              {delayedProjects.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      {delayedProjects.length} project{delayedProjects.length !== 1 ? 's' : ''} behind schedule
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="text-orange-600 border-orange-200">
                    Review Schedule
                  </Button>
                </div>
              )}
              {riskProjects.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      {riskProjects.length} project{riskProjects.length !== 1 ? 's' : ''} at risk
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-200">
                    Risk Assessment
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Business Priority Distribution */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Projects by Priority</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(projectsByPriority).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm capitalize">{priority} Priority</span>
                </div>
                <Badge variant={getPriorityBadgeVariant(priority)} className="text-xs">{count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Business Unit Distribution */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Projects by Business Unit</h4>
          <div className="space-y-2">
            {Object.entries(projectsByBusinessUnit).map(([unit, count]) => (
              <div key={unit} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-sm capitalize">{unit.replace('_', ' ')}</span>
                </div>
                <Badge variant="outline" className="text-xs">{count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Projects */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Top Performing Projects</h4>
          <div className="space-y-2">
            {topPerformingProjects.length > 0 ? topPerformingProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewProject?.(project.id)}
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="h-4 w-4 text-blue-500" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{project.name}</span>
                      <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs">
                        {project.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{project.businessUnit.replace('_', ' ')}</span>
                      <span>{project.businessPriority} priority</span>
                      <span>{(project.businessImpact * 100).toFixed(1)}% impact</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    +{((project.businessValue - project.budget) / project.budget * 100).toFixed(1)}% ROI
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${(project.businessValue / 1000000).toFixed(1)}M value
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                <TrendingUp className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-sm">No high-performing projects yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Financial Overview */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Financial Overview</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Budget</div>
              <div className="text-lg font-bold">
                ${(totalBudget / 1000000).toFixed(1)}M
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Expected Value</div>
              <div className="text-lg font-bold text-green-600">
                ${(totalValue / 1000000).toFixed(1)}M
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Portfolio Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={onPortfolioOptimization}>
              <TrendingUp className="h-3 w-3 mr-1" />
              Optimize Portfolio
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Risk Analysis
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Target className="h-3 w-3 mr-1" />
              Priority Review
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
                {completionRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {averageROI.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Average ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {portfolio.filter(p => p.businessImpact > 0.7).length}
              </div>
              <div className="text-xs text-muted-foreground">High Impact</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ProjectPortfolioCard.displayName = "ProjectPortfolioCard";

export { ProjectPortfolioCard };