"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";

import { ComplianceFramework } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface ComplianceCoverageChartProps {
  frameworks: ComplianceFramework[];
}

const ComplianceCoverageChart: React.FC<ComplianceCoverageChartProps> = ({
  frameworks
}) => {
  // Calculate coverage statistics
  const totalFrameworks = frameworks.length;
  const compliantFrameworks = frameworks.filter(f => f.status === 'compliant').length;
  const inProgressFrameworks = frameworks.filter(f => f.status === 'in_progress').length;
  const nonCompliantFrameworks = frameworks.filter(f => f.status === 'non_compliant').length;

  const overallCoverage = totalFrameworks > 0 ? (compliantFrameworks / totalFrameworks) * 100 : 0;

  // Group by framework type
  const frameworkTypes = frameworks.reduce((acc, framework) => {
    acc[framework.type] = acc[framework.type] || [];
    acc[framework.type].push(framework);
    return acc;
  }, {} as Record<string, ComplianceFramework[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Compliance Framework Coverage
        </CardTitle>
        <CardDescription>
          Compliance status across all implemented frameworks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Coverage */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Overall Compliance</h4>
            <Badge variant={overallCoverage >= 90 ? "default" : overallCoverage >= 70 ? "secondary" : "destructive"}>
              {overallCoverage.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={overallCoverage} className="h-3" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">{compliantFrameworks}</div>
              <div className="text-xs text-muted-foreground">Compliant</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">{inProgressFrameworks}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">{nonCompliantFrameworks}</div>
              <div className="text-xs text-muted-foreground">Non-Compliant</div>
            </div>
          </div>
        </div>

        {/* Framework Type Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Framework Coverage by Type</h4>
          <div className="space-y-3">
            {Object.entries(frameworkTypes).map(([type, frameworksOfType]) => {
              const typeCompliant = frameworksOfType.filter(f => f.status === 'compliant').length;
              const typeCoverage = frameworksOfType.length > 0 ? (typeCompliant / frameworksOfType.length) * 100 : 0;

              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {typeCompliant}/{frameworksOfType.length}
                    </Badge>
                  </div>
                  <Progress value={typeCoverage} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{typeCoverage.toFixed(1)}% compliant</span>
                    <span>Last updated: {frameworksOfType[0]?.lastUpdated || 'Unknown'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Compliance Activity</h4>
          <div className="space-y-2">
            {frameworks
              .filter(f => new Date(f.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
              .slice(0, 5)
              .map((framework) => (
                <div key={framework.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                  <div className="flex items-center gap-2">
                    {framework.status === 'compliant' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {framework.status === 'in_progress' && <Clock className="h-4 w-4 text-yellow-500" />}
                    {framework.status === 'non_compliant' && <XCircle className="h-4 w-4 text-red-500" />}
                    <span className="text-sm font-medium">{framework.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={framework.status === 'compliant' ? 'default' : framework.status === 'in_progress' ? 'secondary' : 'destructive'}
                      className="text-xs"
                    >
                      {framework.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(framework.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Required Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Required Actions</h4>
          <div className="space-y-2">
            {nonCompliantFrameworks > 0 && (
              <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950 rounded">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Address Non-Compliant Frameworks</span>
                </div>
                <Badge variant="destructive">{nonCompliantFrameworks}</Badge>
              </div>
            )}
            {inProgressFrameworks > 0 && (
              <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Complete In-Progress Reviews</span>
                </div>
                <Badge variant="secondary">{inProgressFrameworks}</Badge>
              </div>
            )}
            {overallCoverage < 100 && (
              <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950 rounded">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Improve Overall Coverage</span>
                </div>
                <Badge variant="outline">{(100 - overallCoverage).toFixed(1)}%</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {frameworks.filter(f => f.status === 'compliant' && f.appliesToML).length}
            </div>
            <div className="text-xs text-muted-foreground">ML Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {frameworks.filter(f => f.status === 'compliant' && f.appliesToLLM).length}
            </div>
            <div className="text-xs text-muted-foreground">LLM Compliant</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ComplianceCoverageChart.displayName = "ComplianceCoverageChart";

export { ComplianceCoverageChart };