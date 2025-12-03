"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, User, CheckCircle, AlertTriangle, MapPin, Plus, Filter } from "lucide-react";

import { AuditSchedule, AuditFinding } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface AuditScheduleProps {
  audits: AuditSchedule[];
  findings: AuditFinding[];
  onScheduleAudit?: () => void;
  onFilterAudits?: (status: string) => void;
  onViewAudit?: (audit: AuditSchedule) => void;
}

const AuditScheduleComponent: React.FC<AuditScheduleProps> = ({
  audits,
  findings,
  onScheduleAudit,
  onFilterAudits,
  onViewAudit
}) => {
  // Calculate audit statistics
  const totalAudits = audits.length;
  const completedAudits = audits.filter(audit => audit.status === 'completed').length;
  const inProgressAudits = audits.filter(audit => audit.status === 'in_progress').length;
  const scheduledAudits = audits.filter(audit => audit.status === 'scheduled').length;
  const overdueAudits = audits.filter(audit => audit.status === 'overdue').length;

  const completionRate = totalAudits > 0 ? (completedAudits / totalAudits) * 100 : 0;

  // Get upcoming audits
  const upcomingAudits = audits
    .filter(audit => audit.status === 'scheduled' || audit.status === 'in_progress')
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  // Get recent findings
  const recentFindings = findings
    .sort((a, b) => new Date(b.auditDate).getTime() - new Date(a.auditDate).getTime())
    .slice(0, 3);

  // Calculate critical findings
  const criticalFindings = findings.filter(finding => finding.severity === 'critical').length;
  const highSeverityFindings = findings.filter(finding => finding.severity === 'high').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-blue-500';
      case 'scheduled': return 'text-yellow-500';
      case 'overdue': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in_progress': return 'secondary';
      case 'scheduled': return 'outline';
      case 'overdue': return 'destructive';
      default: return 'outline';
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

  const getDaysUntilAudit = (scheduledDate: string) => {
    const days = Math.ceil((new Date(scheduledDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Audit Schedule
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {inProgressAudits} Active
            </Badge>
            <Button size="sm" onClick={onScheduleAudit}>
              <Plus className="h-3 w-3 mr-1" />
              Schedule
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Upcoming audits and ongoing compliance reviews
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Audit Overview */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedAudits}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{inProgressAudits}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{scheduledAudits}</div>
              <div className="text-xs text-muted-foreground">Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{overdueAudits}</div>
              <div className="text-xs text-muted-foreground">Overdue</div>
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

        {/* Critical Alerts */}
        {(overdueAudits > 0 || criticalFindings > 0) && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-red-600">Critical Alerts</h4>
            <div className="space-y-2">
              {overdueAudits > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">
                      {overdueAudits} overdue audit{overdueAudits !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                    Review Now
                  </Button>
                </div>
              )}
              {criticalFindings > 0 && (
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700 dark:text-red-300">
                      {criticalFindings} critical finding{criticalFindings !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                    View Findings
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upcoming Audits */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Upcoming Audits</h4>
            <Button size="sm" variant="ghost" className="h-6 text-xs">
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
          </div>
          <div className="space-y-2">
            {upcomingAudits.length > 0 ? upcomingAudits.map((audit) => {
              const daysUntil = getDaysUntilAudit(audit.scheduledDate);
              return (
                <div
                  key={audit.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onViewAudit?.(audit)}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className={cn("h-4 w-4", getStatusColor(audit.status))} />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{audit.projectName}</span>
                        <Badge variant={getStatusBadgeVariant(audit.status)} className="text-xs">
                          {audit.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {audit.scope}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {audit.auditorName}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {audit.status === 'scheduled' && daysUntil >= 0 ? `${daysUntil}d` : 'Active'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(audit.scheduledDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="text-center py-6 text-muted-foreground">
                <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No upcoming audits scheduled</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Findings */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Findings</h4>
          <div className="space-y-2">
            {recentFindings.length > 0 ? recentFindings.map((finding) => (
              <div key={finding.id} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityBadgeVariant(finding.severity)} className="text-xs">
                      {finding.severity}
                    </Badge>
                    <span className="text-sm font-medium">{finding.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(finding.auditDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{finding.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {finding.projectName} • {finding.framework}
                  </span>
                  <Badge variant={finding.status === 'resolved' ? 'default' : 'secondary'} className="text-xs">
                    {finding.status}
                  </Badge>
                </div>
              </div>
            )) : (
              <div className="text-center py-4 text-muted-foreground">
                <CheckCircle className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-sm">No recent findings</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Schedule Audit
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Overdue Items
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Critical Findings
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Resolved Items
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {criticalFindings}
              </div>
              <div className="text-xs text-muted-foreground">Critical Findings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {highSeverityFindings}
              </div>
              <div className="text-xs text-muted-foreground">High Severity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {findings.filter(f => f.status === 'resolved').length}
              </div>
              <div className="text-xs text-muted-foreground">Resolved This Month</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

AuditScheduleComponent.displayName = "AuditSchedule";

export { AuditScheduleComponent };