"use client";

import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  GitCommit,
  FileText,
  Eye,
  MessageCircle,
  Calendar,
  BarChart3,
  Target,
  Zap,
  Shield,
  Settings,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { TeamPerformance as TeamPerformanceType } from '@/lib/mock-data/dashboard-metrics';
import { MockUser, mockUsers } from '@/lib/mock-data/users';
import { cn } from '@/lib/utils';

interface TeamPerformanceProps {
  teamMembers: TeamPerformanceType[];
  title?: string;
  loading?: boolean;
  maxItems?: number;
  showFilters?: boolean;
  viewMode?: 'cards' | 'table' | 'leaderboard';
  className?: string;
}

interface TeamMemberCardProps {
  member: TeamPerformanceType;
  user?: MockUser;
  compact?: boolean;
  viewMode?: 'cards' | 'table' | 'leaderboard';
  rank?: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  user,
  compact = false,
  viewMode = 'cards',
  rank
}) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'data_scientist':
        return <BarChart3 className="h-4 w-4" />;
      case 'compliance_officer':
        return <Shield className="h-4 w-4" />;
      case 'auditor':
        return <Eye className="h-4 w-4" />;
      case 'product_manager':
        return <Target className="h-4 w-4" />;
      case 'admin':
        return <Settings className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
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

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 75) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSkillStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-3 w-3",
          i < level ? "text-yellow-400 fill-current" : "text-gray-300"
        )}
      />
    ));
  };

  const formatInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Table view (compact)
  if (viewMode === 'table') {
    return (
      <tr className="border-b hover:bg-muted/30 transition-colors">
        <td className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-xs">
                {formatInitials(member.userName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{member.userName}</p>
              <p className="text-xs text-muted-foreground">{member.organization}</p>
            </div>
          </div>
        </td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            <div className={cn("p-1 rounded", getRoleColor(member.role))}>
              {getRoleIcon(member.role)}
            </div>
            <span className="text-sm capitalize">{member.role.replace('_', ' ')}</span>
          </div>
        </td>
        <td className="p-3">
          <div className="text-center">
            <p className="font-semibold text-sm">{member.metrics.projectsActive}</p>
            <p className="text-xs text-muted-foreground">
              {member.metrics.projectsCompleted} completed
            </p>
          </div>
        </td>
        <td className="p-3">
          <div className="text-center">
            <p className={cn("font-semibold text-sm", getPerformanceColor(member.metrics.qualityScore))}>
              {member.metrics.qualityScore.toFixed(0)}
            </p>
          </div>
        </td>
        <td className="p-3">
          <div className="text-center">
            <p className={cn("font-semibold text-sm", getPerformanceColor(member.metrics.collaborationScore))}>
              {member.metrics.collaborationScore.toFixed(0)}
            </p>
          </div>
        </td>
        <td className="p-3">
          <div className="text-center">
            <p className={cn("font-semibold text-sm", getPerformanceColor(member.metrics.utilization))}>
              {member.metrics.utilization.toFixed(0)}%
            </p>
          </div>
        </td>
        <td className="p-3">
          <div className="flex items-center gap-2 justify-end">
            <Badge variant="outline" className="text-xs">
              {member.contributions.codeCommits} commits
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  // Leaderboard view
  if (viewMode === 'leaderboard') {
    return (
      <div className={cn(
        "flex items-center gap-4 p-4 rounded-lg border transition-all hover:shadow-md",
        rank === 1 && "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
        rank === 2 && "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950",
        rank === 3 && "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950"
      )}>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
          {rank}
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>
            {formatInitials(member.userName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{member.userName}</h3>
            <Badge variant="outline" className="text-xs">
              {member.role.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{member.organization}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            {member.metrics.innovationIndex.toFixed(0)}
          </p>
          <p className="text-xs text-muted-foreground">Innovation Score</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">
            {member.metrics.projectsCompleted}
          </p>
          <p className="text-xs text-muted-foreground">Projects</p>
        </div>
        {rank <= 3 && (
          <Award className={cn(
            "h-6 w-6",
            rank === 1 ? "text-yellow-500" :
            rank === 2 ? "text-gray-500" : "text-orange-500"
          )} />
        )}
      </div>
    );
  }

  // Card view (default)
  if (compact) {
    return (
      <Card className="transition-all hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="text-sm">
                {formatInitials(member.userName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm truncate">{member.userName}</h3>
              <div className="flex items-center gap-2">
                <div className={cn("p-1 rounded", getRoleColor(member.role))}>
                  {getRoleIcon(member.role)}
                </div>
                <span className="text-xs text-muted-foreground capitalize">
                  {member.role.replace('_', ' ')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className={cn("text-lg font-bold", getPerformanceColor(member.metrics.innovationIndex))}>
                {member.metrics.innovationIndex.toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground">Score</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Active Projects</p>
              <p className="font-semibold">{member.metrics.projectsActive}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="font-semibold">{member.metrics.projectsCompleted}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Quality</p>
              <div className="flex items-center gap-2">
                <Progress value={member.metrics.qualityScore} className="flex-1 h-1.5" />
                <span className="text-xs font-medium">{member.metrics.qualityScore.toFixed(0)}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Collaboration</p>
              <div className="flex items-center gap-2">
                <Progress value={member.metrics.collaborationScore} className="flex-1 h-1.5" />
                <span className="text-xs font-medium">{member.metrics.collaborationScore.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {formatInitials(member.userName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{member.userName}</h3>
              <div className="flex items-center gap-2">
                <div className={cn("p-1 rounded", getRoleColor(member.role))}>
                  {getRoleIcon(member.role)}
                </div>
                <span className="text-sm text-muted-foreground capitalize">
                  {member.role.replace('_', ' ')}
                </span>
                <Badge variant="outline" className="text-xs">
                  {member.organization}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Performance Metrics */}
        <div>
          <h4 className="font-medium text-sm mb-3">Performance Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Innovation Index</p>
              <p className={cn("text-xl font-bold", getPerformanceColor(member.metrics.innovationIndex))}>
                {member.metrics.innovationIndex.toFixed(0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Quality Score</p>
              <div className="flex items-center gap-2">
                <Progress value={member.metrics.qualityScore} className="flex-1 h-2" />
                <span className="font-semibold">{member.metrics.qualityScore.toFixed(0)}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Collaboration</p>
              <div className="flex items-center gap-2">
                <Progress value={member.metrics.collaborationScore} className="flex-1 h-2" />
                <span className="font-semibold">{member.metrics.collaborationScore.toFixed(0)}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Completion</p>
              <p className="font-semibold">{member.metrics.avgCompletionTime.toFixed(0)} days</p>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div>
          <h4 className="font-medium text-sm mb-3">Project Statistics</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-blue-600">{member.metrics.projectsActive}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            <div>
              <p className="text-xl font-bold text-green-600">{member.metrics.projectsCompleted}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-xl font-bold text-purple-600">{member.metrics.avgCompletionTime.toFixed(0)}d</p>
              <p className="text-xs text-muted-foreground">Avg Time</p>
            </div>
          </div>
        </div>

        {/* Top Skills */}
        <div>
          <h4 className="font-medium text-sm mb-3">Top Skills</h4>
          <div className="space-y-2">
            {member.skills.slice(0, 3).map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-sm font-medium truncate">{skill.name}</span>
                  <div className="flex">{getSkillStars(skill.level)}</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {skill.endorsements}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Contributions */}
        <div>
          <h4 className="font-medium text-sm mb-3">Recent Contributions</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{member.contributions.codeCommits}</span>
              <span className="text-xs text-muted-foreground">commits</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{member.contributions.documentationEdits}</span>
              <span className="text-xs text-muted-foreground">docs</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{member.contributions.reviewsCompleted}</span>
              <span className="text-xs text-muted-foreground">reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{member.contributions.mentorshipHours}h</span>
              <span className="text-xs text-muted-foreground">mentorship</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="font-medium text-sm mb-3">Availability & Development</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Utilization Rate</span>
              <span className={cn("font-medium", getPerformanceColor(member.metrics.utilization))}>
                {member.metrics.utilization.toFixed(0)}%
              </span>
            </div>
            <Progress value={member.metrics.utilization} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{member.availability.certifications} certifications</span>
              <span>{member.availability.trainingHours}h training</span>
            </div>
            {member.availability.upcomingLeave.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Leave: {member.availability.upcomingLeave[0]}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TeamSummaryProps {
  teamMembers: TeamPerformanceType[];
}

const TeamSummary: React.FC<TeamSummaryProps> = ({ teamMembers }) => {
  const totalMembers = teamMembers.length;
  const activeProjects = teamMembers.reduce((sum, m) => sum + m.metrics.projectsActive, 0);
  const completedProjects = teamMembers.reduce((sum, m) => sum + m.metrics.projectsCompleted, 0);
  const avgQualityScore = teamMembers.reduce((sum, m) => sum + m.metrics.qualityScore, 0) / totalMembers;
  const avgCollaborationScore = teamMembers.reduce((sum, m) => sum + m.metrics.collaborationScore, 0) / totalMembers;
  const totalCommits = teamMembers.reduce((sum, m) => sum + m.contributions.codeCommits, 0);
  const totalMentorship = teamMembers.reduce((sum, m) => sum + m.contributions.mentorshipHours, 0);

  const roleDistribution = teamMembers.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const summaryCards = [
    {
      title: 'Team Members',
      value: totalMembers.toString(),
      subtitle: `${Object.keys(roleDistribution).length} roles`,
      icon: <Users className="h-5 w-5" />,
      trend: { value: 8, direction: 'up' as const }
    },
    {
      title: 'Active Projects',
      value: activeProjects.toString(),
      subtitle: `${completedProjects} completed`,
      icon: <Target className="h-5 w-5" />,
      trend: { value: 15, direction: 'up' as const }
    },
    {
      title: 'Avg Quality Score',
      value: avgQualityScore.toFixed(0),
      subtitle: 'Team average',
      icon: <Star className="h-5 w-5" />,
      trend: { value: 5.2, direction: 'up' as const }
    },
    {
      title: 'Total Contributions',
      value: totalCommits.toString(),
      subtitle: `${totalMentorship}h mentorship`,
      icon: <GitCommit className="h-5 w-5" />,
      trend: { value: 12.7, direction: 'up' as const }
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
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">
                    +{card.trend.value}%
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

export const TeamPerformance: React.FC<TeamPerformanceProps> = ({
  teamMembers,
  title = "Team Performance",
  loading = false,
  maxItems = 12,
  showFilters = true,
  viewMode = 'cards',
  className
}) => {
  const [currentViewMode, setCurrentViewMode] = useState<typeof viewMode>(viewMode);
  const [sortBy, setSortBy] = useState<'innovation' | 'projects' | 'quality' | 'collaboration'>('innovation');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredTeamMembers = teamMembers
    .filter(member => filterRole === 'all' || member.role === filterRole)
    .sort((a, b) => {
      switch (sortBy) {
        case 'innovation':
          return b.metrics.innovationIndex - a.metrics.innovationIndex;
        case 'projects':
          return b.metrics.projectsCompleted - a.metrics.projectsCompleted;
        case 'quality':
          return b.metrics.qualityScore - a.metrics.qualityScore;
        case 'collaboration':
          return b.metrics.collaborationScore - a.metrics.collaborationScore;
        default:
          return 0;
      }
    })
    .slice(0, maxItems);

  const roleOptions = [
    { value: 'all', label: 'All Roles', count: teamMembers.length },
    { value: 'data_scientist', label: 'Data Scientists', count: teamMembers.filter(m => m.role === 'data_scientist').length },
    { value: 'compliance_officer', label: 'Compliance Officers', count: teamMembers.filter(m => m.role === 'compliance_officer').length },
    { value: 'auditor', label: 'Auditors', count: teamMembers.filter(m => m.role === 'auditor').length },
    { value: 'product_manager', label: 'Product Managers', count: teamMembers.filter(m => m.role === 'product_manager').length }
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
            <div className={cn(
              "grid gap-4",
              currentViewMode === 'table' ? '' : "md:grid-cols-2 lg:grid-cols-3"
            )}>
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className={cn("h-64", currentViewMode === 'table' && "h-16")} />
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
              <Users className="h-5 w-5" />
              {title}
              <Badge variant="outline">{teamMembers.length} members</Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={currentViewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentViewMode('cards')}
              >
                Cards
              </Button>
              <Button
                variant={currentViewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentViewMode('table')}
              >
                Table
              </Button>
              <Button
                variant={currentViewMode === 'leaderboard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentViewMode('leaderboard')}
              >
                Leaderboard
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TeamSummary teamMembers={teamMembers} />
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
              {roleOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filterRole === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterRole(option.value)}
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
                <option value="innovation">Innovation Score</option>
                <option value="projects">Projects Completed</option>
                <option value="quality">Quality Score</option>
                <option value="collaboration">Collaboration Score</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Team Members */}
      {filteredTeamMembers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No team members found matching the current filters.</p>
          </CardContent>
        </Card>
      ) : currentViewMode === 'table' ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium">Team Member</th>
                  <th className="text-left p-3 font-medium">Role</th>
                  <th className="text-center p-3 font-medium">Projects</th>
                  <th className="text-center p-3 font-medium">Quality</th>
                  <th className="text-center p-3 font-medium">Collaboration</th>
                  <th className="text-center p-3 font-medium">Utilization</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeamMembers.map((member) => (
                  <TeamMemberCard
                    key={member.userId}
                    member={member}
                    user={mockUsers.find(u => u.id === member.userId)}
                    viewMode="table"
                  />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className={cn(
          "grid gap-4",
          currentViewMode === 'cards' ? "md:grid-cols-2 lg:grid-cols-3" : "gap-3"
        )}>
          {filteredTeamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.userId}
              member={member}
              user={mockUsers.find(u => u.id === member.userId)}
              viewMode={currentViewMode}
              rank={currentViewMode === 'leaderboard' ? index + 1 : undefined}
            />
          ))}
        </div>
      )}

      {filteredTeamMembers.length > 0 && teamMembers.length > maxItems && (
        <div className="mt-6 text-center">
          <Button variant="outline" size="lg">
            View All Team Members ({teamMembers.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default TeamPerformance;