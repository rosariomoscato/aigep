"use client";

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Brain,
  Shield,
  Eye,
  Target,
  Users,
  TrendingUp,
  AlertTriangle,
  FileText,
  Settings,
  RefreshCw,
  Download,
  Bell,
  Calendar,
  Clock,
  Star,
  Award,
  Zap,
  GitBranch,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import ActivityFeed from '@/components/dashboard/activity-feed';
import MetricsCard, {
  PerformanceMetricsCard,
  BusinessMetricsCard,
  ComplianceMetricsCard
} from '@/components/dashboard/metrics-card';
import ProjectPortfolio from '@/components/dashboard/project-portfolio';
import RiskAssessment from '@/components/dashboard/risk-assessment';
import TeamPerformance from '@/components/dashboard/team-performance';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getDataScientistDashboard,
  getComplianceOfficerDashboard,
  getAuditorDashboard,
  getProductManagerDashboard
} from '@/lib/mock-data/dashboard-metrics';
import { MockUser, getCurrentUser } from '@/lib/mock-data/users';
import { cn } from '@/lib/utils';
import { DashboardUpdatesProvider } from '@/components/dashboard/dashboard-updates-provider';
import { RealTimeUpdates } from '@/components/dashboard/real-time-updates';
import { useDashboardUpdates } from '@/components/dashboard/dashboard-updates-provider';

// Import dashboard components

// Icons

interface DashboardContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
}

const DashboardContent: React.FC<DashboardContentProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);

  useEffect(() => {
    // In a real app, this would fetch user data from API
    const initializeDashboard = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = getCurrentUser();
        setCurrentUser(mockUser);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
        setLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  if (loading || !currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </div>

          {/* Dashboard Content Skeleton */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get role-specific dashboard data
  const roleData = (() => {
    switch (currentUser.role) {
      case 'data_scientist':
        return getDataScientistDashboard();
      case 'compliance_officer':
        return getComplianceOfficerDashboard();
      case 'auditor':
        return getAuditorDashboard();
      case 'product_manager':
        return getProductManagerDashboard();
      default:
        return getDataScientistDashboard(); // Default fallback
    }
  })();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'data_scientist':
        return <Brain className="h-5 w-5" />;
      case 'compliance_officer':
        return <Shield className="h-5 w-5" />;
      case 'auditor':
        return <Eye className="h-5 w-5" />;
      case 'product_manager':
        return <Target className="h-5 w-5" />;
      case 'admin':
        return <Settings className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'data_scientist':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950';
      case 'compliance_officer':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950';
      case 'auditor':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950';
      case 'product_manager':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950';
      case 'admin':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'data_scientist':
        return 'Data Scientist Dashboard';
      case 'compliance_officer':
        return 'Compliance Officer Dashboard';
      case 'auditor':
        return 'Auditor Dashboard';
      case 'product_manager':
        return 'Product Manager Dashboard';
      case 'admin':
        return 'Administrator Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'data_scientist':
        return 'Monitor project health, model performance, and ML experiments';
      case 'compliance_officer':
        return 'Manage risk assessments, compliance reviews, and audit findings';
      case 'auditor':
        return 'Track audit schedules, findings, and evidence collection';
      case 'product_manager':
        return 'Oversee project portfolio, business impact, and team resources';
      case 'admin':
        return 'System administration and overview of all platform activities';
      default:
        return 'Welcome to your personalized dashboard';
    }
  };

  // Render role-specific dashboard content
  const renderRoleSpecificContent = () => {
    switch (currentUser.role) {
      case 'data_scientist':
        return (
          <>
            {/* Performance Metrics */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {roleData.projectHealth.length > 0 && (
                  <PerformanceMetricsCard
                    title="Project Performance"
                    metrics={{
                      accuracy: roleData.projectHealth[0].performance.accuracy,
                      precision: roleData.projectHealth[0].performance.precision,
                      recall: roleData.projectHealth[0].performance.recall,
                      f1Score: roleData.projectHealth[0].performance.f1Score,
                      latency: roleData.projectHealth[0].performance.latency,
                      throughput: roleData.projectHealth[0].performance.throughput
                    }}
                    loading={refreshing}
                  />
                )}
              </div>

              {/* Data Quality Metrics */}
              <div className="space-y-6">
                {roleData.projectHealth.length > 0 && (
                  <MetricsCard
                    title="Data Quality"
                    description="Current data quality metrics"
                    metrics={[
                      {
                        label: 'Completeness',
                        value: roleData.projectHealth[0].dataQuality.completeness.toFixed(1),
                        unit: '%',
                        status: roleData.projectHealth[0].dataQuality.completeness >= 95 ? 'good' : 'warning'
                      },
                      {
                        label: 'Consistency',
                        value: roleData.projectHealth[0].dataQuality.consistency.toFixed(1),
                        unit: '%',
                        status: roleData.projectHealth[0].dataQuality.consistency >= 90 ? 'good' : 'warning'
                      },
                      {
                        label: 'Data Drift',
                        value: roleData.projectHealth[0].dataQuality.drift.toFixed(2),
                        unit: '%',
                        status: roleData.projectHealth[0].dataQuality.drift <= 2 ? 'good' : 'warning'
                      }
                    ]}
                    loading={refreshing}
                  />
                )}
              </div>
            </div>

            {/* ML Experiments and Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Recent Experiments
                    <Badge variant="outline">{roleData.experiments.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {roleData.experiments.slice(0, 5).map((experiment) => (
                      <div key={experiment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">{experiment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {experiment.status} • {experiment.duration || 'Running'} {experiment.duration && 'hours'}
                          </p>
                        </div>
                        <Badge
                          variant={
                            experiment.status === 'completed' ? 'default' :
                            experiment.status === 'running' ? 'secondary' :
                            experiment.status === 'failed' ? 'destructive' : 'outline'
                          }
                        >
                          {experiment.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <ActivityFeed
                activities={roleData.recentActivity}
                title="Recent Activity"
                maxItems={5}
                loading={refreshing}
              />
            </div>
          </>
        );

      case 'compliance_officer':
        return (
          <>
            {/* Risk Assessment Overview */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RiskAssessment
                  risks={roleData.complianceRisks}
                  queue={roleData.complianceQueue}
                  loading={refreshing}
                  maxItems={3}
                />
              </div>

              {/* Compliance Queue Status */}
              <div className="space-y-6">
                <MetricsCard
                  title="Compliance Queue"
                  description="Items requiring review"
                  metrics={[
                    {
                      label: 'Pending Reviews',
                      value: roleData.complianceQueue.filter(q => q.status === 'pending').length,
                      status: 'warning'
                    },
                    {
                      label: 'In Progress',
                      value: roleData.complianceQueue.filter(q => q.status === 'in_review').length,
                      status: 'info'
                    },
                    {
                      label: 'Overdue Items',
                      value: roleData.complianceQueue.filter(q => new Date(q.dueDate) < new Date()).length,
                      status: 'error'
                    }
                  ]}
                  loading={refreshing}
                />
              </div>
            </div>

            {/* Recent Audit Findings */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Recent Audit Findings
                    <Badge variant="destructive">{roleData.auditFindings.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {roleData.auditFindings.slice(0, 4).map((finding) => (
                      <div key={finding.id} className="border rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {finding.severity === 'critical' ? <XCircle className="h-4 w-4 text-red-500" /> :
                             finding.severity === 'high' ? <AlertCircle className="h-4 w-4 text-orange-500" /> :
                             <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                            <Badge
                              variant={
                                finding.severity === 'critical' ? 'destructive' :
                                finding.severity === 'high' ? 'secondary' : 'outline'
                              }
                            >
                              {finding.severity}
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {finding.category}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-1">{finding.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{finding.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{finding.projectName}</span>
                          <span>Due: {new Date(finding.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <ActivityFeed
                activities={roleData.recentActivity}
                title="Compliance Activity"
                maxItems={5}
                loading={refreshing}
              />
            </div>
          </>
        );

      case 'auditor':
        return (
          <>
            {/* Audit Schedule */}
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Scheduled Audits
                      <Badge variant="outline">{roleData.auditSchedules.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roleData.auditSchedules.map((audit) => (
                        <div key={audit.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{audit.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{audit.description}</p>
                            </div>
                            <Badge
                              variant={
                                audit.status === 'completed' ? 'default' :
                                audit.status === 'in_progress' ? 'secondary' : 'outline'
                              }
                            >
                              {audit.status.replace('_', ' ')}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Auditor</p>
                              <p className="font-medium">{audit.auditor}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Scheduled Date</p>
                              <p className="font-medium">{new Date(audit.scheduledDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Duration</p>
                              <p className="font-medium">{audit.duration} days</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Risk Level</p>
                              <Badge
                                variant={
                                  audit.riskLevel === 'critical' ? 'destructive' :
                                  audit.riskLevel === 'high' ? 'secondary' : 'outline'
                                }
                                className="text-xs"
                              >
                                {audit.riskLevel}
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-2">Scope:</p>
                            <div className="flex flex-wrap gap-1">
                              {audit.scope.map((item, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Audit Statistics */}
              <div className="space-y-6">
                <MetricsCard
                  title="Audit Statistics"
                  description="Current audit status"
                  metrics={[
                    {
                      label: 'Scheduled',
                      value: roleData.auditSchedules.filter(a => a.status === 'scheduled').length,
                      status: 'info'
                    },
                    {
                      label: 'In Progress',
                      value: roleData.auditSchedules.filter(a => a.status === 'in_progress').length,
                      status: 'warning'
                    },
                    {
                      label: 'Completed',
                      value: roleData.auditSchedules.filter(a => a.status === 'completed').length,
                      status: 'good'
                    },
                    {
                      label: 'High Risk',
                      value: roleData.auditSchedules.filter(a => a.riskLevel === 'high' || a.riskLevel === 'critical').length,
                      status: 'error'
                    }
                  ]}
                  loading={refreshing}
                />
              </div>
            </div>

            {/* Audit Findings */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    All Audit Findings
                    <Badge variant="destructive">{roleData.auditFindings.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {roleData.auditFindings.map((finding) => (
                      <div key={finding.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {finding.severity === 'critical' ? <XCircle className="h-4 w-4 text-red-500" /> :
                             finding.severity === 'high' ? <AlertCircle className="h-4 w-4 text-orange-500" /> :
                             finding.severity === 'medium' ? <AlertTriangle className="h-4 w-4 text-yellow-500" /> :
                             <CheckCircle className="h-4 w-4 text-green-500" />}
                            <Badge
                              variant={
                                finding.severity === 'critical' ? 'destructive' :
                                finding.severity === 'high' ? 'secondary' :
                                finding.severity === 'medium' ? 'outline' : 'default'
                              }
                            >
                              {finding.severity}
                            </Badge>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {finding.category}
                          </Badge>
                        </div>
                        <h4 className="font-semibold mb-1">{finding.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{finding.description}</p>
                        <p className="text-sm mb-2"><strong>Recommendation:</strong> {finding.recommendation}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Project: {finding.projectName}</span>
                          <span>Created: {new Date(finding.createdAt).toLocaleDateString()}</span>
                          <span>Due: {new Date(finding.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        );

      case 'product_manager':
        return (
          <>
            {/* Business Metrics Overview */}
            <div className="grid gap-6 lg:grid-cols-4">
              <BusinessMetricsCard
                title="Business Impact"
                metrics={roleData.businessMetrics}
                loading={refreshing}
              />
              <MetricsCard
                title="Portfolio Overview"
                description="Project portfolio status"
                metrics={[
                  {
                    label: 'Total Projects',
                    value: roleData.businessMetrics.totalProjects,
                    status: 'info'
                  },
                  {
                    label: 'Active Projects',
                    value: roleData.businessMetrics.activeProjects,
                    status: 'good'
                  },
                  {
                    label: 'Average ROI',
                    value: `${roleData.businessMetrics.avgROI.toFixed(0)}%`,
                    status: roleData.businessMetrics.avgROI >= 200 ? 'good' : 'warning'
                  },
                  {
                    label: 'Total Value',
                    value: `$${(roleData.businessMetrics.totalValue / 1000000).toFixed(1)}M`,
                    status: 'success'
                  }
                ]}
                loading={refreshing}
              />
            </div>

            {/* Project Portfolio */}
            <div className="mt-6">
              <ProjectPortfolio
                projects={roleData.projectPortfolio}
                loading={refreshing}
                maxItems={6}
                viewMode="cards"
              />
            </div>

            {/* Team Performance */}
            <div className="mt-6">
              <TeamPerformance
                teamMembers={roleData.teamPerformance}
                loading={refreshing}
                maxItems={8}
                viewMode="cards"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-12">
            <Settings className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Role Configuration Required</h2>
            <p className="text-muted-foreground">Your dashboard view is being configured. Please check back later.</p>
          </div>
        );
    }
  };

  return (
    <DashboardUpdatesProvider enabled={true}>
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-xl">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{getRoleTitle(currentUser.role!)}</h1>
                <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full", getRoleColor(currentUser.role!))}>
                  {getRoleIcon(currentUser.role!)}
                  <span className="text-sm font-medium capitalize">
                    {currentUser.role?.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mb-1">
                {getRoleDescription(currentUser.role!)}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{currentUser.name}</span>
                <span>•</span>
                <span>{currentUser.organization}</span>
                <span>•</span>
                <span>{currentUser.lastActive}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("h-4 w-4 mr-2", refreshing && "animate-spin")} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard
            title="Active Projects"
            description="Currently active"
            metrics={[
              {
                label: 'In Progress',
                value: roleData.projects.filter(p => p.status === 'active').length,
                status: 'good'
              }
            ]}
            variant="compact"
            icon={<Activity className="h-5 w-5" />}
            loading={refreshing}
          />
          <MetricsCard
            title="Pending Reviews"
            description="Awaiting approval"
            metrics={[
              {
                label: 'Review Queue',
                value: roleData.projects.filter(p => p.status === 'in_review').length,
                status: roleData.projects.filter(p => p.status === 'in_review').length > 0 ? 'warning' : 'good'
              }
            ]}
            variant="compact"
            icon={<Clock className="h-5 w-5" />}
            loading={refreshing}
          />
          <MetricsCard
            title="Compliance Score"
            description="Average compliance"
            metrics={[
              {
                label: 'Current Score',
                value: Math.round(roleData.projects.reduce((sum, p) => sum + p.complianceScore, 0) / roleData.projects.length),
                unit: '%',
                status: 'good'
              }
            ]}
            variant="compact"
            icon={<Shield className="h-5 w-5" />}
            loading={refreshing}
          />
          <MetricsCard
            title="Team Members"
            description="Active team size"
            metrics={[
              {
                label: 'Total Members',
                value: roleData.teamPerformance.length,
                status: 'info'
              }
            ]}
            variant="compact"
            icon={<Users className="h-5 w-5" />}
            loading={refreshing}
          />
        </div>

        {/* Role-Specific Content */}
        <div className="space-y-6">
          {renderRoleSpecificContent()}
        </div>

        {/* Activity Feed - Universal */}
        <ActivityFeed
          activities={roleData.recentActivity}
          title="Platform Activity"
          maxItems={8}
          loading={refreshing}
          showFilters={true}
        />
        </div>

        {/* Real-Time Updates Panel - Always Visible */}
        <div className="mt-8">
          <RealTimeUpdates
            onStatusChange={(isConnected) => {
              // Handle connection status changes
              console.log('Dashboard connection status:', isConnected);
            }}
            onNotification={(update) => {
              // Handle new real-time updates
              console.log('New dashboard update:', update);
            }}
            enabled={true}
          />
        </div>
      </div>
    </DashboardUpdatesProvider>
  );
};

export default DashboardContent;