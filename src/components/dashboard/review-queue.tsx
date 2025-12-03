"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, User, Calendar, AlertTriangle, FileText, ArrowRight, Filter } from "lucide-react";

import { ComplianceEvaluation } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface ReviewQueueProps {
  evaluations: ComplianceEvaluation[];
  onFilter?: (status: string) => void;
  onViewEvaluation?: (evaluation: ComplianceEvaluation) => void;
}

const ReviewQueue: React.FC<ReviewQueueProps> = ({
  evaluations,
  onFilter,
  onViewEvaluation
}) => {
  // Filter evaluations for review queue
  const reviewQueue = evaluations.filter(eval =>
    eval.status === 'pending_review' || eval.status === 'in_progress'
  );

  // Categorize by priority
  const highPriorityEvaluations = reviewQueue.filter(eval => eval.priority === 'high');
  const mediumPriorityEvaluations = reviewQueue.filter(eval => eval.priority === 'medium');
  const lowPriorityEvaluations = reviewQueue.filter(eval => eval.priority === 'low');

  // Calculate statistics
  const totalReviewQueue = reviewQueue.length;
  const overdueEvaluations = reviewQueue.filter(eval => {
    const daysSinceSubmission = (new Date().getTime() - new Date(eval.evaluationDate).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceSubmission > 5; // Consider overdue after 5 days
  }).length;

  // Get recent evaluations
  const recentEvaluations = reviewQueue
    .sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime())
    .slice(0, 6);

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            Review Queue
          </div>
          <Badge variant="secondary" className="text-sm">
            {totalReviewQueue} Pending
          </Badge>
        </CardTitle>
        <CardDescription>
          Compliance evaluations pending review and approval
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Queue Statistics */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{highPriorityEvaluations.length}</div>
              <div className="text-xs text-muted-foreground">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{mediumPriorityEvaluations.length}</div>
              <div className="text-xs text-muted-foreground">Medium Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{lowPriorityEvaluations.length}</div>
              <div className="text-xs text-muted-foreground">Low Priority</div>
            </div>
          </div>

          {overdueEvaluations > 0 && (
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  {overdueEvaluations} overdue evaluation{overdueEvaluations !== 1 ? 's' : ''}
                </span>
              </div>
              <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                Review Now
              </Button>
            </div>
          )}
        </div>

        {/* Priority Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Priority Breakdown</h4>
          <div className="space-y-2">
            {highPriorityEvaluations.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>High Priority</span>
                  <Badge variant="destructive">{highPriorityEvaluations.length}</Badge>
                </div>
                <Progress value={totalReviewQueue > 0 ? (highPriorityEvaluations.length / totalReviewQueue) * 100 : 0} className="h-2" />
              </div>
            )}
            {mediumPriorityEvaluations.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Medium Priority</span>
                  <Badge variant="secondary">{mediumPriorityEvaluations.length}</Badge>
                </div>
                <Progress value={totalReviewQueue > 0 ? (mediumPriorityEvaluations.length / totalReviewQueue) * 100 : 0} className="h-2" />
              </div>
            )}
            {lowPriorityEvaluations.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Low Priority</span>
                  <Badge variant="outline">{lowPriorityEvaluations.length}</Badge>
                </div>
                <Progress value={totalReviewQueue > 0 ? (lowPriorityEvaluations.length / totalReviewQueue) * 100 : 0} className="h-2" />
              </div>
            )}
          </div>
        </div>

        {/* Recent Evaluations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Recent Submissions</h4>
            <Button size="sm" variant="ghost" className="h-6 text-xs">
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
          </div>
          <div className="space-y-2">
            {recentEvaluations.length > 0 ? recentEvaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewEvaluation?.(evaluation)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{evaluation.projectName}</span>
                      <Badge variant={getPriorityBadgeVariant(evaluation.priority)} className="text-xs">
                        {evaluation.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {evaluation.evaluatorName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(evaluation.evaluationDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-sm font-medium">{evaluation.score.toFixed(1)}%</div>
                    <div className="text-xs text-muted-foreground">{evaluation.framework}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No pending evaluations in the queue</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Review Oldest
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              High Priority
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <User className="h-3 w-3 mr-1" />
              My Assignments
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <FileText className="h-3 w-3 mr-1" />
              All Pending
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {evaluations.filter(eval => eval.status === 'approved').length}
              </div>
              <div className="text-xs text-muted-foreground">Approved This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {evaluations.length > 0 ? (evaluations.filter(eval => eval.status === 'approved').length / evaluations.length * 100).toFixed(1) : 0}%
              </div>
              <div className="text-xs text-muted-foreground">Approval Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

ReviewQueue.displayName = "ReviewQueue";

export { ReviewQueue };