"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, Clock, AlertTriangle, FolderOpen, Download, Eye } from "lucide-react";

import { AuditEvidence } from "@/lib/mock-data/dashboard-metrics";
import { cn } from "@/lib/utils";

interface EvidenceCollectionProps {
  evidence: AuditEvidence[];
  onUploadEvidence?: () => void;
  onViewEvidence?: (evidence: AuditEvidence) => void;
  onDownloadEvidence?: (evidence: AuditEvidence) => void;
}

const EvidenceCollection: React.FC<EvidenceCollectionProps> = ({
  evidence,
  onUploadEvidence,
  onViewEvidence,
  onDownloadEvidence
}) => {
  // Calculate evidence statistics
  const totalEvidence = evidence.length;
  const verifiedEvidence = evidence.filter(ev => ev.verified === 'verified').length;
  const pendingEvidence = evidence.filter(ev => ev.verified === 'pending').length;
  const rejectedEvidence = evidence.filter(ev => ev.verified === 'rejected').length;

  const verificationRate = totalEvidence > 0 ? (verifiedEvidence / totalEvidence) * 100 : 0;

  // Get recent evidence
  const recentEvidence = evidence
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, 6);

  // Evidence by type
  const evidenceByType = evidence.reduce((acc, ev) => {
    acc[ev.type] = (acc[ev.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Evidence by status
  const evidenceByStatus = {
    pending: evidence.filter(ev => ev.verified === 'pending').length,
    verified: evidence.filter(ev => ev.verified === 'verified').length,
    rejected: evidence.filter(ev => ev.verified === 'rejected').length,
  };

  // Large files (over 5MB)
  const largeFiles = evidence.filter(ev => ev.fileSize > 5 * 1024 * 1024).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'verified': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'documentation': return <FileText className="h-4 w-4" />;
      case 'code': return <FileText className="h-4 w-4" />;
      case 'model': return <FileText className="h-4 w-4" />;
      case 'test_results': return <FileText className="h-4 w-4" />;
      case 'compliance_report': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-blue-500" />
            Evidence Collection
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {pendingEvidence} Pending
            </Badge>
            <Button size="sm" onClick={onUploadEvidence}>
              <Upload className="h-3 w-3 mr-1" />
              Upload
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Audit evidence documents and verification status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Evidence Overview */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{verifiedEvidence}</div>
              <div className="text-xs text-muted-foreground">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingEvidence}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{rejectedEvidence}</div>
              <div className="text-xs text-muted-foreground">Rejected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalEvidence}</div>
              <div className="text-xs text-muted-foreground">Total Files</div>
            </div>
          </div>

          {/* Verification Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Verification Rate</h4>
              <span className="text-sm text-muted-foreground">{verificationRate.toFixed(1)}%</span>
            </div>
            <Progress value={verificationRate} className="h-2" />
          </div>
        </div>

        {/* Alerts */}
        {pendingEvidence > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-yellow-600">Pending Review</h4>
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  {pendingEvidence} evidence item{pendingEvidence !== 1 ? 's' : ''} pending verification
                </span>
              </div>
              <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-200">
                Review Now
              </Button>
            </div>
          </div>
        )}

        {/* Evidence Type Distribution */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Evidence by Type</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(evidenceByType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div className="flex items-center gap-2">
                  {getFileIcon(type)}
                  <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
                </div>
                <Badge variant="outline" className="text-xs">{count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Evidence */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Recent Uploads</h4>
          <div className="space-y-2">
            {recentEvidence.length > 0 ? recentEvidence.map((evidenceItem) => (
              <div
                key={evidenceItem.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(evidenceItem.type)}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{evidenceItem.fileName}</span>
                      <Badge variant={getStatusBadgeVariant(evidenceItem.verified)} className="text-xs">
                        {evidenceItem.verified}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{evidenceItem.projectName}</span>
                      <span>{formatFileSize(evidenceItem.fileSize)}</span>
                      <span>{new Date(evidenceItem.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => onViewEvidence?.(evidenceItem)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => onDownloadEvidence?.(evidenceItem)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-muted-foreground">
                <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No evidence uploaded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Storage Information */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Storage Usage</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Storage</div>
              <div className="text-lg font-bold">
                {formatFileSize(evidence.reduce((sum, ev) => sum + ev.fileSize, 0))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Large Files</div>
              <div className="text-lg font-bold text-orange-600">{largeFiles}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="h-8 text-xs" onClick={onUploadEvidence}>
              <Upload className="h-3 w-3 mr-1" />
              Upload Evidence
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Pending Review
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified Files
            </Button>
            <Button size="sm" variant="outline" className="h-8 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Rejected Items
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {verificationRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Verification Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {evidence.filter(ev => ev.verified === 'verified' && new Date(ev.uploadDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-xs text-muted-foreground">Verified This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {largeFiles}
              </div>
              <div className="text-xs text-muted-foreground">Large Files</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

EvidenceCollection.displayName = "EvidenceCollection";

export { EvidenceCollection };