"use client";

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  AlertTriangle,
  Shield,
  Clock,
  User,
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Eye,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ComplianceRiskAssessment, ComplianceQueue } from '@/lib/mock-data/dashboard-metrics';
import { cn } from '@/lib/utils';

interface RiskAssessmentProps {
  risks: ComplianceRiskAssessment[];
  queue?: ComplianceQueue[];
  title?: string;
  loading?: boolean;
  maxItems?: number;
  showQueue?: boolean;
  className?: string;
}

interface RiskScoreCardProps {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  subtitle?: string;
  trend?: number;
}

const RiskScoreCard: React.FC<RiskScoreCardProps> = ({
  score,
  level,
  title,
  subtitle,
  trend
}) => {
  const getScoreColor = (score: number, level: string) => {
    if (level === 'critical') return 'text-red-600 dark:text-red-400';
    if (level === 'high') return 'text-orange-600 dark:text-orange-400';
    if (level === 'medium') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getProgressColor = (score: number, level: string) => {
    if (level === 'critical') return 'bg-red-500';
    if (level === 'high') return 'bg-orange-500';
    if (level === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Poor';
    return 'Critical';
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold" style={{ color: `hsl(${120 - score * 1.2}, 70%, 50%)` }}>
                {score}
              </span>
              <div className="text-right">
                <Badge
                  variant={level === 'critical' ? 'destructive' : level === 'high' ? 'secondary' : 'default'}
                  className="mb-1"
                >
                  {level.toUpperCase()}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {getScoreLabel(score)}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Compliance Score</span>
                <span>{score}%</span>
              </div>
              <Progress
                value={score}
                className="h-2"
              />
            </div>

            {trend !== undefined && (
              <div className="flex items-center gap-2 text-sm">
                {trend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : trend < 0 ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : null}
                <span className={cn(
                  "font-medium",
                  trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-muted-foreground"
                )}>
                  {trend > 0 ? '+' : ''}{trend}% from last month
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RiskCategoryProps {
  category: string;
  score: number;
  issues: number;
}

const RiskCategory: React.FC<RiskCategoryProps> = ({ category, score, issues }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dataPrivacy':
        return <Shield className="h-4 w-4" />;
      case 'bias':
        return <AlertTriangle className="h-4 w-4" />;
      case 'transparency':
        return <Eye className="h-4 w-4" />;
      case 'accountability':
        return <User className="h-4 w-4" />;
      case 'safety':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted">
          {getCategoryIcon(category)}
        </div>
        <div>
          <p className="font-medium text-sm capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</p>
          <p className="text-xs text-muted-foreground">
            {issues} {issues === 1 ? 'issue' : 'issues'}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("font-semibold text-lg", getScoreColor(score))}>
          {score}%
        </p>
        <Progress value={score} className="w-16 h-1.5" />
      </div>
    </div>
  );
};

interface ComplianceIssueProps {
  issue: ComplianceRiskAssessment['issues'][0];
  projectName: string;
}

const ComplianceIssue: React.FC<ComplianceIssueProps> = ({ issue, projectName }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'secondary';
      case 'medium':
        return 'outline';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:bg-muted/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon(issue.status)}
            <Badge variant={getSeverityVariant(issue.severity)}>
              {issue.severity.toUpperCase()}
            </Badge>
            <span className="text-xs text-muted-foreground capitalize">
              {issue.category}
            </span>
          </div>
          <h4 className="font-medium text-sm leading-tight mb-1">
            {issue.description}
          </h4>
          <p className="text-xs text-muted-foreground mb-2">
            {issue.recommendation}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium">{projectName}</span>
            <Badge variant="outline" className="text-xs">
              {issue.status.replace('_', ' ')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

interface QueueItemProps {
  item: ComplianceQueue;
}

const QueueItem: React.FC<QueueItemProps> = ({ item }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <FileText className="h-4 w-4" />;
      case 'certification':
        return <CheckCircle className="h-4 w-4" />;
      case 'audit':
        return <Eye className="h-4 w-4" />;
      case 'investigation':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'in_review':
        return 'text-blue-600';
      case 'requires_changes':
        return 'text-yellow-600';
      case 'pending':
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="p-2 rounded-lg bg-muted">
          {getTypeIcon(item.type)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate">{item.projectName}</p>
          <p className="text-xs text-muted-foreground capitalize">{item.type.replace('_', ' ')}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <Badge
            variant="outline"
            className={cn("text-xs", getPriorityColor(item.priority))}
          >
            {item.priority}
          </Badge>
          <p className={cn("text-xs font-medium mt-1", getStatusColor(item.status))}>
            {item.status.replace('_', ' ')}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(item.dueDate), { addSuffix: true })}</span>
          </div>
          <p className="text-xs text-muted-foreground">{item.estimatedHours}h</p>
        </div>
      </div>
    </div>
  );
};

export const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  risks,
  queue = [],
  title = "Risk Assessment",
  loading = false,
  maxItems = 5,
  showQueue = true,
  className
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'issues' | 'queue'>('overview');

  const overallScore = Math.round(
    risks.reduce((sum, risk) => sum + risk.riskScore, 0) / risks.length
  );

  const overallLevel: 'low' | 'medium' | 'high' | 'critical' =
    overallScore >= 80 ? 'low' :
    overallScore >= 60 ? 'medium' :
    overallScore >= 40 ? 'high' : 'critical';

  const allIssues = risks.flatMap(risk =>
    risk.issues.map(issue => ({
      ...issue,
      projectName: risk.projectName
    }))
  );

  const openIssues = allIssues.filter(issue => issue.status === 'open').slice(0, maxItems);
  const pendingQueue = queue.filter(item => ['pending', 'in_review'].includes(item.status)).slice(0, maxItems);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <div className="space-y-3">
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {title}
            <Badge variant="outline">{risks.length} projects</Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Risk Score */}
          <RiskScoreCard
            score={overallScore}
            level={overallLevel}
            title="Overall Risk Assessment"
            subtitle={`Based on ${risks.length} active projects`}
            trend={-2.3} // Mock trend data
          />

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === 'overview'
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors relative",
                activeTab === 'issues'
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Issues
              {openIssues.length > 0 && (
                <Badge variant="destructive" className="ml-2 px-1.5 py-0 text-xs">
                  {openIssues.length}
                </Badge>
              )}
            </button>
            {showQueue && (
              <button
                onClick={() => setActiveTab('queue')}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 transition-colors relative",
                  activeTab === 'queue'
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Queue
                {pendingQueue.length > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
                    {pendingQueue.length}
                  </Badge>
                )}
              </button>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Risk Categories */}
              <div>
                <h3 className="font-medium mb-3">Risk Categories</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {Object.entries({
                    dataPrivacy: Math.round(risks.reduce((sum, r) => sum + r.categories.dataPrivacy, 0) / risks.length),
                    bias: Math.round(risks.reduce((sum, r) => sum + r.categories.bias, 0) / risks.length),
                    transparency: Math.round(risks.reduce((sum, r) => sum + r.categories.transparency, 0) / risks.length),
                    accountability: Math.round(risks.reduce((sum, r) => sum + r.categories.accountability, 0) / risks.length),
                    safety: Math.round(risks.reduce((sum, r) => sum + r.categories.safety, 0) / risks.length)
                  }).map(([category, score]) => ({
                    category,
                    score,
                    issues: allIssues.filter(issue => issue.category === category && issue.status === 'open').length
                  })).map((item, index) => (
                    <RiskCategory key={index} {...item} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'issues' && (
            <div className="space-y-3">
              {openIssues.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No open compliance issues found.</p>
                </div>
              ) : (
                openIssues.map((issue, index) => (
                  <ComplianceIssue key={index} issue={issue} projectName={issue.projectName} />
                ))
              )}
              {openIssues.length > 0 && allIssues.length > maxItems && (
                <Button variant="outline" className="w-full">
                  View All Issues ({allIssues.length})
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}

          {activeTab === 'queue' && showQueue && (
            <div className="space-y-3">
              {pendingQueue.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No items in the compliance queue.</p>
                </div>
              ) : (
                pendingQueue.map((item, index) => (
                  <QueueItem key={index} item={item} />
                ))
              )}
              {pendingQueue.length > 0 && queue.length > maxItems && (
                <Button variant="outline" className="w-full">
                  View All Queue Items ({queue.length})
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskAssessment;