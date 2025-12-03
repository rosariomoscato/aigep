"use client";

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Clock,
  FileText,
  Shield,
  Users,
  Settings,
  Bell,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  User,
  FolderOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ActivityFeed as ActivityFeedType } from '@/lib/mock-data/dashboard-metrics';
import { cn } from '@/lib/utils';

interface ActivityFeedProps {
  activities: ActivityFeedType[];
  title?: string;
  maxItems?: number;
  loading?: false;
  showFilters?: boolean;
  className?: string;
}

interface ActivityItemProps {
  activity: ActivityFeedType;
  compact?: boolean;
}

const getActivityIcon = (type: ActivityFeedType['type']) => {
  switch (type) {
    case 'project_update':
      return <FolderOpen className="h-4 w-4" />;
    case 'compliance_review':
      return <Shield className="h-4 w-4" />;
    case 'audit_finding':
      return <FileText className="h-4 w-4" />;
    case 'team_change':
      return <Users className="h-4 w-4" />;
    case 'system_alert':
      return <Bell className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getPriorityIcon = (priority: ActivityFeedType['priority']) => {
  switch (priority) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'info':
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

const getPriorityColor = (priority: ActivityFeedType['priority']) => {
  switch (priority) {
    case 'success':
      return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
    case 'warning':
      return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
    case 'error':
      return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
    case 'info':
    default:
      return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
  }
};

const getPriorityBadgeVariant = (priority: ActivityFeedType['priority']) => {
  switch (priority) {
    case 'success':
      return 'default';
    case 'warning':
      return 'secondary';
    case 'error':
      return 'destructive';
    case 'info':
    default:
      return 'outline';
  }
};

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, compact = false }) => {
  const [expanded, setExpanded] = useState(false);

  const hasMetadata = Object.keys(activity.metadata).length > 0;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
        <div className={cn(
          "p-1.5 rounded-full",
          getPriorityColor(activity.priority)
        )}>
          {getPriorityIcon(activity.priority)}
        </div>
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-sm">{getActivityIcon(activity.type)}</span>
          <span className="text-sm font-medium truncate">{activity.title}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "border rounded-lg p-4 space-y-3 transition-all hover:shadow-sm",
      getPriorityColor(activity.priority)
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className={cn(
            "p-2 rounded-full mt-0.5",
            getPriorityColor(activity.priority)
          )}>
            {getPriorityIcon(activity.priority)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">
                {getActivityIcon(activity.type)}
              </span>
              <Badge variant={getPriorityBadgeVariant(activity.priority)} className="text-xs">
                {activity.priority}
              </Badge>
            </div>
            <h4 className="font-semibold text-sm leading-tight">{activity.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="whitespace-nowrap">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </span>
          </div>
          {activity.user && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{activity.user}</span>
            </div>
          )}
        </div>
      </div>

      {(activity.project || hasMetadata) && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {activity.project && (
            <>
              <FolderOpen className="h-3 w-3" />
              <span className="font-medium">{activity.project}</span>
            </>
          )}
          {activity.project && hasMetadata && <span>•</span>}
          {hasMetadata && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <span>Details</span>
              {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          )}
        </div>
      )}

      {expanded && hasMetadata && (
        <div className="pt-3 border-t border-border/50">
          <div className="space-y-2">
            {Object.entries(activity.metadata).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground capitalize">
                  {key.replace(/_/g, ' ')}:
                </span>
                <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                  {String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ActivityFeedSkeleton: React.FC<{ maxItems?: number }> = ({ maxItems = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: maxItems }, (_, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = "Recent Activity",
  maxItems = 10,
  loading = false,
  showFilters = true,
  className
}) => {
  const [filter, setFilter] = useState<ActivityFeedType['type'] | 'all'>('all');
  const [priority, setPriority] = useState<ActivityFeedType['priority'] | 'all'>('all');
  const [expanded, setExpanded] = useState(false);

  const filteredActivities = activities
    .filter(activity => filter === 'all' || activity.type === filter)
    .filter(activity => priority === 'all' || activity.priority === priority)
    .slice(0, expanded ? activities.length : maxItems);

  const activityTypes: Array<{ value: ActivityFeedType['type'] | 'all'; label: string; count: number }> = [
    { value: 'all', label: 'All', count: activities.length },
    { value: 'project_update', label: 'Projects', count: activities.filter(a => a.type === 'project_update').length },
    { value: 'compliance_review', label: 'Compliance', count: activities.filter(a => a.type === 'compliance_review').length },
    { value: 'audit_finding', label: 'Audits', count: activities.filter(a => a.type === 'audit_finding').length },
    { value: 'team_change', label: 'Team', count: activities.filter(a => a.type === 'team_change').length },
    { value: 'system_alert', label: 'System', count: activities.filter(a => a.type === 'system_alert').length }
  ];

  const priorityTypes: Array<{ value: ActivityFeedType['priority'] | 'all'; label: string; count: number }> = [
    { value: 'all', label: 'All', count: activities.length },
    { value: 'error', label: 'Errors', count: activities.filter(a => a.priority === 'error').length },
    { value: 'warning', label: 'Warnings', count: activities.filter(a => a.priority === 'warning').length },
    { value: 'success', label: 'Success', count: activities.filter(a => a.priority === 'success').length },
    { value: 'info', label: 'Info', count: activities.filter(a => a.priority === 'info').length }
  ];

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeedSkeleton maxItems={maxItems} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {title}
            <Badge variant="outline">{activities.length}</Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-xs"
          >
            {expanded ? 'Show Less' : 'Show All'}
          </Button>
        </div>
        {showFilters && (
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="flex flex-wrap gap-1">
              {activityTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={filter === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(type.value as any)}
                  className="text-xs h-7 px-2"
                >
                  {type.label}
                  {type.count > 0 && (
                    <Badge variant="secondary" className="ml-1 px-1 text-xs">
                      {type.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {priorityTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={priority === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriority(type.value as any)}
                  className="text-xs h-7 px-2"
                  disabled={type.count === 0}
                >
                  {type.label}
                  {type.count > 0 && (
                    <Badge variant="secondary" className="ml-1 px-1 text-xs">
                      {type.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {filteredActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No activities found matching the current filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredActivities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
              />
            ))}
          </div>
        )}
        {filteredActivities.length > 0 && activities.length > maxItems && !expanded && (
          <div className="pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpanded(true)}
              className="w-full"
            >
              Load More Activities
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;