"use client";

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  BarChart3,
  PieChart,
  Target,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Filter,
  Search,
  ExternalLink,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ProjectPortfolio } from '@/lib/mock-data/dashboard-metrics';
import { cn } from '@/lib/utils';

interface ProjectPortfolioProps {
  projects: ProjectPortfolio[];
  title?: string;
  loading?: boolean;
  maxItems?: number;
  showFilters?: boolean;
  className?: string;
}

interface ProjectCardProps {
  project: ProjectPortfolio;
  compact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact = false }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'active':
        return <Activity className="h-4 w-4 text-blue-500" />;
      case 'in_review':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'archived':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 dark:text-green-400';
      case 'active':
        return 'text-blue-600 dark:text-blue-400';
      case 'in_review':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'rejected':
        return 'text-red-600 dark:text-red-400';
      case 'archived':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'active':
        return 'secondary';
      case 'in_review':
        return 'outline';
      case 'rejected':
        return 'destructive';
      case 'archived':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (compact) {
    return (
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {getStatusIcon(project.status)}
            <h3 className="font-semibold text-sm truncate">{project.name}</h3>
          </div>
          <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs">
            {project.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">ROI</p>
            <p className="font-semibold text-green-600">
              {project.roi.percentage.toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Revenue Impact</p>
            <p className="font-medium">
              {formatCurrency(project.businessImpact.revenue)}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Team Size</p>
            <p className="font-medium">{project.team.members}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Progress</p>
            <div className="flex items-center gap-2">
              <Progress value={project.timeline.progress} className="flex-1 h-1.5" />
              <span className="text-xs">{project.timeline.progress.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getStatusIcon(project.status)}
              <Badge variant={getStatusBadgeVariant(project.status)} className="text-xs">
                {project.status.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {project.category.toUpperCase()}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Business Impact */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Business Impact
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Revenue Impact</p>
              <p className="font-semibold text-sm">
                {formatCurrency(project.businessImpact.revenue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cost Savings</p>
              <p className="font-semibold text-sm text-green-600">
                {formatCurrency(project.businessImpact.costSavings)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Efficiency Gain</p>
              <p className="font-semibold text-sm">
                {project.businessImpact.efficiency.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Risk Reduction</p>
              <p className="font-semibold text-sm text-blue-600">
                {project.businessImpact.riskReduction.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* ROI */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Return on Investment
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">ROI Percentage</p>
              <p className="text-xl font-bold text-green-600">
                {project.roi.percentage.toFixed(0)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payback Period</p>
              <p className="font-semibold text-sm">
                {project.roi.paybackPeriod} months
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Investment</p>
              <p className="font-semibold text-sm">
                {formatCurrency(project.roi.investment)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Returns</p>
              <p className="font-semibold text-sm text-green-600">
                {formatCurrency(project.roi.returns)}
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team & Resources
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Team Size</p>
              <p className="font-semibold text-sm">{project.team.members} members</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">FTE</p>
              <p className="font-semibold text-sm">{project.team.fte.toFixed(1)} FTE</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Experience</p>
              <p className="font-semibold text-sm">{project.team.avgExperience.toFixed(1)} years</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly Cost</p>
              <p className="font-semibold text-sm">
                {formatCurrency(project.team.cost)}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline & Progress
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{project.timeline.progress.toFixed(0)}%</span>
            </div>
            <Progress value={project.timeline.progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Started: {new Date(project.timeline.startDate).toLocaleDateString()}</span>
              <span>
                Target: {new Date(project.timeline.plannedEndDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div>
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Key Performance Indicators
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">User Adoption</p>
              <div className="flex items-center gap-2">
                <Progress value={project.kpis.userAdoption} className="flex-1 h-1.5" />
                <span className="text-xs font-medium">{project.kpis.userAdoption.toFixed(0)}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Satisfaction</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(project.kpis.satisfactionScore)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="text-xs ml-1">{project.kpis.satisfactionScore.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Error Rate</p>
              <p className="font-semibold text-sm">
                {project.kpis.errorRate.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Availability</p>
              <p className="font-semibold text-sm text-green-600">
                {project.kpis.availability.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface PortfolioSummaryProps {
  projects: ProjectPortfolio[];
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ projects }) => {
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const avgROI = projects.reduce((sum, p) => sum + p.roi.percentage, 0) / totalProjects;
  const totalRevenue = projects.reduce((sum, p) => sum + p.businessImpact.revenue, 0);
  const totalSavings = projects.reduce((sum, p) => sum + p.businessImpact.costSavings, 0);
  const totalTeamMembers = projects.reduce((sum, p) => sum + p.team.members, 0);
  const avgProgress = projects.reduce((sum, p) => sum + p.timeline.progress, 0) / totalProjects;

  const summaryCards = [
    {
      title: 'Total Projects',
      value: totalProjects.toString(),
      subtitle: `${activeProjects} active`,
      icon: <PieChart className="h-5 w-5" />,
      trend: { value: 12, direction: 'up' as const }
    },
    {
      title: 'Average ROI',
      value: `${avgROI.toFixed(0)}%`,
      subtitle: 'Portfolio average',
      icon: <BarChart3 className="h-5 w-5" />,
      trend: { value: 8.5, direction: 'up' as const }
    },
    {
      title: 'Total Revenue',
      value: totalRevenue >= 1000000 ? `$${(totalRevenue / 1000000).toFixed(1)}M` : `$${totalRevenue.toFixed(0)}`,
      subtitle: 'Annual impact',
      icon: <DollarSign className="h-5 w-5" />,
      trend: { value: 15.3, direction: 'up' as const }
    },
    {
      title: 'Team Members',
      value: totalTeamMembers.toString(),
      subtitle: `${totalTeamMembers.toFixed(1)} FTE total`,
      icon: <Users className="h-5 w-5" />,
      trend: { value: -2.1, direction: 'down' as const }
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map((card, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {card.icon}
              </div>
              {card.trend && (
                <div className="flex items-center gap-1">
                  {card.trend.direction === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    card.trend.direction === 'up' ? "text-green-500" : "text-red-500"
                  )}>
                    {card.trend.value > 0 && '+'}{card.trend.value}%
                  </span>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold">{card.value}</h3>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const ProjectPortfolio: React.FC<ProjectPortfolioProps> = ({
  projects,
  title = "Project Portfolio",
  loading = false,
  maxItems = 10,
  showFilters = true,
  className
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [sortBy, setSortBy] = useState<'roi' | 'revenue' | 'progress' | 'name'>('roi');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProjects = projects
    .filter(project => filterStatus === 'all' || project.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return b.roi.percentage - a.roi.percentage;
        case 'revenue':
          return b.businessImpact.revenue - a.businessImpact.revenue;
        case 'progress':
          return b.timeline.progress - a.timeline.progress;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    })
    .slice(0, maxItems);

  const statusOptions = [
    { value: 'all', label: 'All Projects', count: projects.length },
    { value: 'active', label: 'Active', count: projects.filter(p => p.status === 'active').length },
    { value: 'in_review', label: 'In Review', count: projects.filter(p => p.status === 'in_review').length },
    { value: 'approved', label: 'Approved', count: projects.filter(p => p.status === 'approved').length },
    { value: 'archived', label: 'Archived', count: projects.filter(p => p.status === 'archived').length }
  ];

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              {title}
              <Badge variant="outline">{projects.length}</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Cards
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PortfolioSummary projects={projects} />
        </CardContent>
      </Card>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 border rounded-lg bg-muted/30">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filterStatus === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(option.value)}
                  disabled={option.count === 0}
                >
                  {option.label}
                  {option.count > 0 && (
                    <Badge variant="secondary" className="ml-1 px-1 text-xs">
                      {option.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="roi">ROI</option>
                <option value="revenue">Revenue</option>
                <option value="progress">Progress</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No projects found matching the current filters.</p>
          </CardContent>
        </Card>
      ) : (
        <div className={cn(
          "grid gap-6",
          viewMode === 'cards' ? "md:grid-cols-2 lg:grid-cols-3" : "gap-4"
        )}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              compact={viewMode === 'list'}
            />
          ))}
        </div>
      )}

      {filteredProjects.length > 0 && projects.length > maxItems && (
        <div className="mt-6 text-center">
          <Button variant="outline" size="lg">
            View All Projects ({projects.length})
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectPortfolio;