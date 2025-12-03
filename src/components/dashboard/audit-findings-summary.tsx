"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Search, Download, FileText } from "lucide-react";

import { AuditFinding } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface AuditFindingsSummaryProps {
  findings: AuditFinding[];
  onExportReport?: () => void;
  onSearchFindings?: () => void;
  onViewFinding?: (finding: AuditFinding) => void;
}

const AuditFindingsSummary: React.FC<AuditFindingsSummaryProps> = ({
  findings,
  onExportReport,
  onSearchFindings,
  onViewFinding
}) => {
  // Calculate findings statistics
  const totalFindings = findings.length;
  const criticalFindings = findings.filter(f => f.severity === 'critical').length;
  const highFindings = findings.filter(f => f.severity === 'high').length;
  const mediumFindings = findings.filter(f => f.severity === 'medium').length;
  const lowFindings = findings.filter(f => f.severity === 'low').length;

  const resolvedFindings = findings.filter(f => f.status === 'resolved').length;
  const inProgressFindings = findings.filter(f => f.status === 'in_progress').length;
  const openFindings = findings.filter(f => f.status === 'open').length;

  const resolutionRate = totalFindings > 0 ? (resolvedFindings / totalFindings) * 100 : 0;

  // Get recent findings
  const recentFindings = findings
    .sort((a, b) => new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime())
    .slice(0, 5);

  // Findings by framework
  const findingsByFramework = findings.reduce((acc, finding) => {
    acc[finding.framework] = (acc[finding.framework] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Findings by severity
  const severityDistribution = {
    critical: findings.filter(f => f.severity === 'critical').length,
    high: findings.filter(f => f.severity === 'high').length,
    medium: findings.filter(f => f.severity === 'medium').length,
    low: findings.filter(f => f.severity === 'low').length,
  };

  // Trend calculation (comparing last 30 days to previous 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

  const recentCriticalFindings = findings.filter(f =>
    f.severity === 'critical' && new Date(f.auditDate) >= thirtyDaysAgo
  ).length;

  const previousCriticalFindings = findings.filter(f =>
    f.severity === 'critical' &&
    new Date(f.auditDate) >= sixtyDaysAgo &&
    new Date(f.auditDate) < thirtyDaysAgo
  ).length;

  const criticalTrend = recentCriticalFindings - previousCriticalFindings;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'in_progress': return 'secondary';
      case 'open': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Audit Findings Summary
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {openFindings} Open
            </Badge>
            <Button size="sm" variant="outline" onClick={onExportReport}>
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
        <CardDescription>
          Comprehensive overview of audit findings and resolution status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Findings Overview */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{criticalFindings}</div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{highFindings}</div>
              <div className="text-xs text-muted-foreground">High</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{mediumFindings}</div>
              <div className="text-xs text-muted-foreground">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{lowFindings}</div>
              <div className="text-xs text-muted-foreground">Low</div>
            </div>
          </div>

          {/* Resolution Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Resolution Rate</h4>
              <span className="text-sm text-muted-foreground">{resolutionRate.toFixed(1)}%</span>
            </div>
            <Progress value={resolutionRate} className="h-2" />
          </div>
        </div>

        {/* Critical Alerts */}
        {criticalFindings > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-red-600 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Findings Alert
            </h4>
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  {criticalFindings} critical finding{criticalFindings !== 1 ? 's' : ''} require immediate attention
                </span>
                <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                  Review All
                </Button>
              </div>
              {criticalTrend > 0 && (
                <div className="flex items-center gap-2 text-xs text-red-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{criticalTrend} critical findings in the last 30 days</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Distribution */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Status Distribution</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Resolved</span>
              </div>
              <Badge variant="default">{resolvedFindings}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">In Progress</span>
              </div>
              <Badge variant="secondary">{inProgressFindings}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm">Open</span>
              </div>
              <Badge variant="outline">{openFindings}</Badge>
            </div>
          </div>
        </div>

        {/* Findings by Framework */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Findings by Framework</h4>
          <div className="space-y-2">
            {Object.entries(findingsByFramework).map(([framework, count]) => (
              <div key={framework} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <span className="text-sm capitalize">{framework.replace('_', ' ')}</span>
                <Badge variant="outline" className="text-xs">{count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Findings */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Recent Findings</h4>
            <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={onSearchFindings}>
              <Search className="h-3 w-3 mr-1" />
              Search
            </Button>
          </div>
          <div className="space-y-2">
            {recentFindings.length > 0 ? recentFindings.map((finding) => (
              <div
                key={finding.id}
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewFinding?.(finding)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityBadgeVariant(finding.severity)} className="text-xs">
                      {finding.severity}
                    </Badge>
                    <span className="text-sm font-medium">{finding.title}</span>
                  </div>
                  <Badge variant={getStatusBadgeVariant(finding.status)} className="text-xs">
                    {finding.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{finding.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{finding.projectName} • {finding.framework}</span>
                  <span>{new Date(finding.auditDate).toLocaleDateString()}</span>
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No findings recorded</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Critical Issues
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Open Items
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Resolved Items
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={onExportReport}>
              <Download className="h-3 w-3 mr-1" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {resolutionRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {criticalFindings}
              </div>
              <div className="text-xs text-muted-foreground">Critical Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {findings.filter(f => new Date(f.auditDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

AuditFindingsSummary.displayName = "AuditFindingsSummary";

export { AuditFindingsSummary };