"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface MetricItem {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
  status?: 'good' | 'warning' | 'error' | 'info';
  description?: string;
}

interface MetricsCardProps {
  title: string;
  description?: string;
  metrics: MetricItem[];
  icon?: React.ReactNode;
  variant?: 'default' | 'compact' | 'detailed';
  loading?: boolean;
  className?: string;
}

const MetricValue: React.FC<{ metric: MetricItem; variant?: 'default' | 'compact' | 'detailed' }> = ({
  metric,
  variant = 'default'
}) => {
  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status?: 'good' | 'warning' | 'error' | 'info') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status?: 'good' | 'warning' | 'error' | 'info') => {
    switch (status) {
      case 'good':
        return 'text-green-600 dark:text-green-400';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-foreground';
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon(metric.status)}
          <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("font-semibold", getStatusColor(metric.status))}>
            {metric.value}
            {metric.unit && <span className="text-xs font-normal text-muted-foreground ml-1">{metric.unit}</span>}
          </span>
          {metric.trend && getTrendIcon(metric.trend.direction)}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "space-y-2",
      variant === 'detailed' && "p-3 rounded-lg bg-muted/50"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getStatusIcon(metric.status)}
          <span className="text-sm font-medium text-muted-foreground">{metric.label}</span>
        </div>
        {metric.trend && (
          <div className="flex items-center gap-1">
            {getTrendIcon(metric.trend.direction)}
            <span className={cn(
              "text-xs font-medium",
              metric.trend.direction === 'up' ? "text-green-500" :
              metric.trend.direction === 'down' ? "text-red-500" : "text-gray-500"
            )}>
              {metric.trend.value > 0 && '+'}{metric.trend.value}%
            </span>
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-2xl font-bold", getStatusColor(metric.status))}>
          {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
        </span>
        {metric.unit && (
          <span className="text-sm text-muted-foreground">{metric.unit}</span>
        )}
      </div>
      {metric.description && (
        <p className="text-xs text-muted-foreground">{metric.description}</p>
      )}
    </div>
  );
};

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  description,
  metrics,
  icon,
  variant = 'default',
  loading = false,
  className
}) => {
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center gap-2">
            {icon && <Skeleton className="h-8 w-8 rounded-lg" />}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              {description && <Skeleton className="h-4 w-48" />}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
          {metrics.some(m => m.status) && (
            <Badge
              variant={
                metrics.some(m => m.status === 'error') ? "destructive" :
                metrics.some(m => m.status === 'warning') ? "secondary" :
                metrics.some(m => m.status === 'good') ? "default" : "outline"
              }
            >
              {metrics.some(m => m.status === 'error') ? "Issues" :
               metrics.some(m => m.status === 'warning') ? "Warning" :
               metrics.some(m => m.status === 'good') ? "Healthy" : "Info"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "space-y-4",
          variant === 'compact' && "space-y-3",
          variant === 'detailed' && "space-y-4"
        )}>
          {metrics.map((metric, index) => (
            <MetricValue
              key={index}
              metric={metric}
              variant={variant}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Specialized metric cards for common dashboard use cases
export const PerformanceMetricsCard: React.FC<{
  title: string;
  metrics: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number;
    throughput: number;
  };
  loading?: boolean;
}> = ({ title, metrics, loading }) => {
  const metricItems: MetricItem[] = [
    {
      label: 'Accuracy',
      value: metrics.accuracy.toFixed(1),
      unit: '%',
      status: metrics.accuracy >= 90 ? 'good' : metrics.accuracy >= 80 ? 'warning' : 'error',
      trend: { value: 2.3, direction: 'up' }
    },
    {
      label: 'Precision',
      value: metrics.precision.toFixed(1),
      unit: '%',
      status: metrics.precision >= 88 ? 'good' : metrics.precision >= 75 ? 'warning' : 'error'
    },
    {
      label: 'Recall',
      value: metrics.recall.toFixed(1),
      unit: '%',
      status: metrics.recall >= 85 ? 'good' : metrics.recall >= 70 ? 'warning' : 'error'
    },
    {
      label: 'F1 Score',
      value: metrics.f1Score.toFixed(2),
      status: metrics.f1Score >= 0.85 ? 'good' : metrics.f1Score >= 0.75 ? 'warning' : 'error'
    },
    {
      label: 'Latency',
      value: metrics.latency.toFixed(0),
      unit: 'ms',
      status: metrics.latency <= 100 ? 'good' : metrics.latency <= 200 ? 'warning' : 'error',
      trend: { value: -5.2, direction: 'down' }
    },
    {
      label: 'Throughput',
      value: metrics.throughput.toFixed(0),
      unit: 'req/s',
      status: metrics.throughput >= 500 ? 'good' : metrics.throughput >= 200 ? 'warning' : 'error'
    }
  ];

  return (
    <MetricsCard
      title={title}
      description="Model performance metrics"
      metrics={metricItems}
      variant="compact"
      loading={loading}
    />
  );
};

export const BusinessMetricsCard: React.FC<{
  title: string;
  metrics: {
    revenue: number;
    costSavings: number;
    efficiency: number;
    riskReduction: number;
    roi: number;
  };
  loading?: boolean;
}> = ({ title, metrics, loading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const metricItems: MetricItem[] = [
    {
      label: 'Revenue Impact',
      value: formatCurrency(metrics.revenue),
      status: metrics.revenue >= 500000 ? 'good' : metrics.revenue >= 100000 ? 'warning' : 'info'
    },
    {
      label: 'Cost Savings',
      value: formatCurrency(metrics.costSavings),
      status: metrics.costSavings >= 100000 ? 'good' : metrics.costSavings >= 50000 ? 'warning' : 'info'
    },
    {
      label: 'Efficiency Gain',
      value: metrics.efficiency.toFixed(1),
      unit: '%',
      status: metrics.efficiency >= 50 ? 'good' : metrics.efficiency >= 25 ? 'warning' : 'error'
    },
    {
      label: 'Risk Reduction',
      value: metrics.riskReduction.toFixed(1),
      unit: '%',
      status: metrics.riskReduction >= 40 ? 'good' : metrics.riskReduction >= 20 ? 'warning' : 'info'
    },
    {
      label: 'ROI',
      value: metrics.roi.toFixed(0),
      unit: '%',
      status: metrics.roi >= 300 ? 'good' : metrics.roi >= 150 ? 'warning' : 'error',
      trend: { value: 15.7, direction: 'up' }
    }
  ];

  return (
    <MetricsCard
      title={title}
      description="Business impact and ROI metrics"
      metrics={metricItems}
      loading={loading}
    />
  );
};

export const ComplianceMetricsCard: React.FC<{
  title: string;
  metrics: {
    score: number;
    issues: number;
    pendingReviews: number;
    nextReview: string;
  };
  loading?: boolean;
}> = ({ title, metrics, loading }) => {
  const metricItems: MetricItem[] = [
    {
      label: 'Compliance Score',
      value: metrics.score,
      unit: '%',
      status: metrics.score >= 90 ? 'good' : metrics.score >= 75 ? 'warning' : 'error',
      description: 'Overall compliance rating'
    },
    {
      label: 'Open Issues',
      value: metrics.issues,
      status: metrics.issues === 0 ? 'good' : metrics.issues <= 3 ? 'warning' : 'error',
      description: 'Issues requiring attention'
    },
    {
      label: 'Pending Reviews',
      value: metrics.pendingReviews,
      status: metrics.pendingReviews === 0 ? 'good' : metrics.pendingReviews <= 2 ? 'warning' : 'error'
    },
    {
      label: 'Next Review',
      value: new Date(metrics.nextReview).toLocaleDateString(),
      status: 'info',
      description: 'Next scheduled compliance review'
    }
  ];

  return (
    <MetricsCard
      title={title}
      description="Compliance and risk metrics"
      metrics={metricItems}
      loading={loading}
    />
  );
};