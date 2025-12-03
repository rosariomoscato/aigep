"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, Wifi, WifiOff, RefreshCw, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface RealTimeUpdate {
  id: string;
  type: 'compliance' | 'audit' | 'project' | 'team' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error' | 'success';
  data?: any;
}

interface RealTimeUpdatesProps {
  onStatusChange?: (isConnected: boolean) => void;
  onNotification?: (update: RealTimeUpdate) => void;
  enabled?: boolean;
}

const RealTimeUpdates: React.FC<RealTimeUpdatesProps> = ({
  onStatusChange,
  onNotification,
  enabled = true
}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [updateFrequency, setUpdateFrequency] = useState(0); // updates per minute
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  // Simulate WebSocket connection for real-time updates
  const connectWebSocket = useCallback(() => {
    setIsConnected(true);
    setConnectionQuality('excellent');
    onStatusChange?.(true);

    // Simulate periodic updates
    const interval = setInterval(() => {
      if (!enabled) return;

      // Simulate different types of real-time updates
      const updateTypes: RealTimeUpdate['type'][] = ['compliance', 'audit', 'project', 'team', 'system'];
      const severityTypes: RealTimeUpdate['severity'][] = ['info', 'warning', 'error', 'success'];

      const mockUpdate: RealTimeUpdate = {
        id: `update-${Date.now()}-${Math.random()}`,
        type: updateTypes[Math.floor(Math.random() * updateTypes.length)],
        title: generateMockTitle(),
        message: generateMockMessage(),
        timestamp: new Date(),
        severity: Math.random() > 0.7 ? severityTypes[Math.floor(Math.random() * severityTypes.length)] : 'info'
      };

      setUpdates(prev => {
        const newUpdates = [mockUpdate, ...prev].slice(0, 50); // Keep last 50 updates
        return newUpdates;
      });

      setLastUpdate(new Date());
      onNotification?.(mockUpdate);

      // Update frequency calculation
      setUpdateFrequency(prev => {
        const now = Date.now();
        const timeDiff = (now - prev) / 1000; // Convert to seconds
        return timeDiff > 0 ? Math.round(60 / timeDiff) : 0;
      });
    }, Math.random() * 10000 + 5000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, [enabled, onNotification, onStatusChange]);

  const disconnectWebSocket = useCallback(() => {
    setIsConnected(false);
    onStatusChange?.(false);

    // Attempt to reconnect after 3 seconds
    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, 3000);
  }, [connectWebSocket, onStatusChange]);

  // Simulate connection quality changes
  useEffect(() => {
    if (!isConnected) return;

    const qualityInterval = setInterval(() => {
      const random = Math.random();
      if (random > 0.95) {
        setConnectionQuality('poor');
      } else if (random > 0.85) {
        setConnectionQuality('good');
      } else {
        setConnectionQuality('excellent');
      }
    }, 30000); // Change quality every 30 seconds

    return () => clearInterval(qualityInterval);
  }, [isConnected]);

  // Initialize connection
  useEffect(() => {
    if (enabled) {
      const cleanup = connectWebSocket();
      return () => {
        cleanup?.();
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
      };
    }
  }, [enabled, connectWebSocket]);

  const generateMockTitle = (): string => {
    const titles = [
      'Compliance evaluation completed',
      'New audit finding reported',
      'Project milestone achieved',
      'Team member activity detected',
      'System performance update',
      'Risk assessment updated',
      'Documentation uploaded',
      'Review deadline approaching',
      'Model performance change detected',
      'Resource allocation modified'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const generateMockMessage = (): string => {
    const messages = [
      'Customer Churn Prediction model completed compliance review',
      'Financial Fraud Detection system flagged potential bias issue',
      'Medical Diagnosis Assistant achieved 95% accuracy milestone',
      'New evidence documents uploaded for audit review',
      'Team member completed required compliance training',
      'System resources optimized for improved performance',
      'Critical finding requires immediate attention',
      'Project timeline updated based on current progress',
      'Model drift detected in production environment',
      'Automated compliance check passed successfully'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getConnectionColor = () => {
    if (!isConnected) return 'text-red-500';
    switch (connectionQuality) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-yellow-500';
      case 'poor': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  const getConnectionIcon = () => {
    if (!isConnected) return <WifiOff className="h-4 w-4" />;
    return <Wifi className="h-4 w-4" />;
  };

  const getSeverityColor = (severity: RealTimeUpdate['severity']) => {
    switch (severity) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityBadgeVariant = (severity: RealTimeUpdate['severity']) => {
    switch (severity) {
      case 'success': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      case 'info': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: RealTimeUpdate['severity']) => {
    switch (severity) {
      case 'success': return <CheckCircle className="h-3 w-3" />;
      case 'warning': return <AlertTriangle className="h-3 w-3" />;
      case 'error': return <AlertTriangle className="h-3 w-3" />;
      case 'info': return <Info className="h-3 w-3" />;
      default: return <Info className="h-3 w-3" />;
    }
  };

  const formatTimeSinceLastUpdate = () => {
    const now = new Date();
    const diff = now.getTime() - lastUpdate.getTime();
    const seconds = Math.floor(diff / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const handleManualRefresh = () => {
    // Trigger manual refresh
    const manualUpdate: RealTimeUpdate = {
      id: `manual-${Date.now()}`,
      type: 'system',
      title: 'Manual refresh triggered',
      message: 'Dashboard data refreshed successfully',
      timestamp: new Date(),
      severity: 'success'
    };

    setUpdates(prev => [manualUpdate, ...prev].slice(0, 50));
    setLastUpdate(new Date());
    onNotification?.(manualUpdate);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            Real-Time Updates
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "destructive"} className="text-sm">
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
            <Button size="sm" variant="outline" onClick={handleManualRefresh}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Live monitoring of compliance and project activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={cn("flex items-center gap-2", getConnectionColor())}>
                {getConnectionIcon()}
                <span className="text-sm font-medium">
                  {isConnected ? `${connectionQuality.charAt(0).toUpperCase() + connectionQuality.slice(1)} Connection` : 'Disconnected'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Last update: {formatTimeSinceLastUpdate()}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Update Frequency:</div>
              <div className="text-sm font-medium">{updateFrequency}/min</div>
            </div>
          </div>

          {/* Connection Quality Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Connection Quality</h4>
              <span className={cn("text-sm font-medium", getConnectionColor())}>
                {connectionQuality.charAt(0).toUpperCase() + connectionQuality.slice(1)}
              </span>
            </div>
            <Progress
              value={
                connectionQuality === 'excellent' ? 100 :
                connectionQuality === 'good' ? 70 : 30
              }
              className="h-2"
            />
          </div>

          {/* Recent Updates */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Recent Updates</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {updates.length > 0 ? updates.slice(0, 10).map((update) => (
                <div key={update.id} className="flex items-start gap-3 p-2 bg-muted/20 rounded text-sm">
                  <div className={cn("mt-0.5", getSeverityColor(update.severity))}>
                    {getSeverityIcon(update.severity)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{update.title}</span>
                      <Badge variant={getSeverityBadgeVariant(update.severity)} className="text-xs">
                        {update.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{update.message}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="capitalize">{update.type}</span>
                      <span>{update.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No real-time updates yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Session Statistics</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {updates.length}
                </div>
                <div className="text-xs text-muted-foreground">Total Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {updates.filter(u => u.severity === 'success').length}
                </div>
                <div className="text-xs text-muted-foreground">Success Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {updates.filter(u => u.severity === 'warning').length}
                </div>
                <div className="text-xs text-muted-foreground">Warnings</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={handleManualRefresh}>
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh Data
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => setUpdates([])}>
                <Bell className="h-3 w-3 mr-1" />
                Clear Updates
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs">
                <Info className="h-3 w-3 mr-1" />
                View History
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs"
                onClick={() => isConnected ? disconnectWebSocket() : connectWebSocket()}
              >
                {getConnectionIcon()}
                {isConnected ? 'Disconnect' : 'Reconnect'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

RealTimeUpdates.displayName = "RealTimeUpdates";

export { RealTimeUpdates };