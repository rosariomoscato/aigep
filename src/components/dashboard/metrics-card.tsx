"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, Clock, Users, Shield, BarChart3, Calendar, Activity, PieChart, Download, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatValue = (value: string | number, unit?: string) => {
    if (typeof value === 'number') {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(value);
    }
    return `${value}${unit || ''}`;
  };

  if (loading) {
    return (
      <Card className={cn(
        "animate-pulse",
        variant === 'compact' && "p-4",
        variant === 'detailed' && "p-6"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">
                {title}
              </h3>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-2 bg-gray-100 rounded-full animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {title}
            </h3>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <div className={cn(
          "space-y-4",
          variant === 'compact' && "grid grid-cols-3 gap-4",
          variant === 'detailed' && "space-y-4"
        )}>
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "flex items-center justify-between p-4 border rounded-lg",
                index === metrics.length - 1 && "border-b-0"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(metric.status)}
                  <div className="text-sm font-medium text-muted-foreground ml-2">
                    {metric.label}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-foreground">
                    {formatValue(metric.value, metric.unit)}
                  </div>
                  {metric.trend && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {getTrendIcon(metric.trend)}
                      <span className="text-xs">
                        {Math.abs(metric.trend.value)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Last updated
          </div>
          <div className="text-right">
            Real-time
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Simple default export for dashboard components
export { MetricsCard } from './metrics-card';