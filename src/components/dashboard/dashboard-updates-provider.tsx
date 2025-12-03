"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { RealTimeUpdate } from "./real-time-updates";

interface DashboardUpdatesContextType {
  isConnected: boolean;
  updates: RealTimeUpdate[];
  lastUpdate: Date | null;
  connectionQuality: 'excellent' | 'good' | 'poor';
  subscribeToUpdates: (callback: (update: RealTimeUpdate) => void) => string;
  unsubscribeFromUpdates: (subscriptionId: string) => void;
  triggerManualUpdate: (type: string, data?: any) => void;
  clearUpdates: () => void;
}

const DashboardUpdatesContext = createContext<DashboardUpdatesContextType | undefined>(undefined);

interface DashboardUpdatesProviderProps {
  children: ReactNode;
  enabled?: boolean;
  updateInterval?: number; // milliseconds
  maxUpdates?: number;
}

export const DashboardUpdatesProvider: React.FC<DashboardUpdatesProviderProps> = ({
  children,
  enabled = true,
  updateInterval = 10000, // 10 seconds default
  maxUpdates = 100
}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [subscriptions, setSubscriptions] = useState<Map<string, (update: RealTimeUpdate) => void>>(new Map());

  // Generate mock real-time updates
  const generateMockUpdate = useCallback((type?: string): RealTimeUpdate => {
    const updateTypes: RealTimeUpdate['type'][] = ['compliance', 'audit', 'project', 'team', 'system'];
    const severityTypes: RealTimeUpdate['severity'][] = ['info', 'warning', 'error', 'success'];

    const updateType = type || updateTypes[Math.floor(Math.random() * updateTypes.length)];
    const severity = Math.random() > 0.8 ? severityTypes[Math.floor(Math.random() * severityTypes.length)] : 'info';

    const mockData = {
      compliance: {
        title: 'Compliance Update',
        messages: [
          'Customer Churn Prediction model passed compliance review',
          'Medical Diagnosis Assistant requires additional documentation',
          'Financial Fraud Detection system audit completed',
          'Customer Service Chatbot compliance evaluation pending'
        ]
      },
      audit: {
        title: 'Audit Activity',
        messages: [
          'New audit finding requires immediate attention',
          'Evidence collection completed for risk assessment',
          'Audit trail verification successful',
          'Compliance checkpoint validation in progress'
        ]
      },
      project: {
        title: 'Project Update',
        messages: [
          'Model performance threshold achieved',
          'Training data pipeline optimized',
          'New project milestone completed',
          'Resource allocation updated successfully'
        ]
      },
      team: {
        title: 'Team Activity',
        messages: [
          'Team member completed required training',
          'Collaboration request approved',
          'New team member onboarded successfully',
          'Skill assessment completed'
        ]
      },
      system: {
        title: 'System Update',
        messages: [
          'Automated monitoring system update completed',
          'Database optimization finished',
          'Security patch applied successfully',
          'Performance metrics recalculated'
        ]
      }
    };

    const selectedData = mockData[updateType];
    const message = selectedData.messages[Math.floor(Math.random() * selectedData.messages.length)];

    return {
      id: `update-${Date.now()}-${Math.random()}`,
      type: updateType,
      title: selectedData.title,
      message,
      timestamp: new Date(),
      severity
    };
  }, []);

  // Handle new updates
  const handleNewUpdate = useCallback((update: RealTimeUpdate) => {
    setUpdates(prev => {
      const newUpdates = [update, ...prev].slice(0, maxUpdates);
      return newUpdates;
    });
    setLastUpdate(new Date());

    // Notify all subscribers
    subscriptions.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }, [subscriptions, maxUpdates]);

  // Subscribe to updates
  const subscribeToUpdates = useCallback((callback: (update: RealTimeUpdate) => void): string => {
    const subscriptionId = `sub-${Date.now()}-${Math.random()}`;
    setSubscriptions(prev => new Map(prev).set(subscriptionId, callback));
    return subscriptionId;
  }, []);

  // Unsubscribe from updates
  const unsubscribeFromUpdates = useCallback((subscriptionId: string) => {
    setSubscriptions(prev => {
      const newMap = new Map(prev);
      newMap.delete(subscriptionId);
      return newMap;
    });
  }, []);

  // Trigger manual update
  const triggerManualUpdate = useCallback((type: string, data?: any) => {
    const update = generateMockUpdate(type);
    if (data) {
      update.data = data;
    }
    handleNewUpdate(update);
  }, [generateMockUpdate, handleNewUpdate]);

  // Clear all updates
  const clearUpdates = useCallback(() => {
    setUpdates([]);
    setLastUpdate(null);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    if (!enabled) {
      setIsConnected(false);
      return;
    }

    const connectionInterval = setInterval(() => {
      const random = Math.random();
      if (random > 0.98) { // 2% chance of disconnection
        setIsConnected(false);
        setConnectionQuality('poor');

        // Reconnect after 3 seconds
        setTimeout(() => {
          setIsConnected(true);
          setConnectionQuality('excellent');
        }, 3000);
      } else if (random > 0.95) { // 3% chance of quality degradation
        setConnectionQuality('good');
      } else {
        setConnectionQuality('excellent');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(connectionInterval);
  }, [enabled]);

  // Generate periodic updates
  useEffect(() => {
    if (!enabled || !isConnected) return;

    const updateInterval = setInterval(() => {
      // Random chance to generate an update
      if (Math.random() > 0.6) { // 40% chance of update
        const update = generateMockUpdate();
        handleNewUpdate(update);
      }
    }, updateInterval);

    return () => clearInterval(updateInterval);
  }, [enabled, isConnected, updateInterval, generateMockUpdate, handleNewUpdate]);

  // Cleanup subscriptions on unmount
  useEffect(() => {
    return () => {
      subscriptions.clear();
    };
  }, [subscriptions]);

  const contextValue: DashboardUpdatesContextType = {
    isConnected,
    updates,
    lastUpdate,
    connectionQuality,
    subscribeToUpdates,
    unsubscribeFromUpdates,
    triggerManualUpdate,
    clearUpdates
  };

  return (
    <DashboardUpdatesContext.Provider value={contextValue}>
      {children}
    </DashboardUpdatesContext.Provider>
  );
};

// Hook to use dashboard updates
export const useDashboardUpdates = () => {
  const context = useContext(DashboardUpdatesContext);
  if (context === undefined) {
    throw new Error('useDashboardUpdates must be used within a DashboardUpdatesProvider');
  }
  return context;
};

// Hook to subscribe to specific update types
export const useDashboardUpdatesByType = (
  types: RealTimeUpdate['type'][],
  callback: (update: RealTimeUpdate) => void
) => {
  const { subscribeToUpdates, unsubscribeFromUpdates } = useDashboardUpdates();

  useEffect(() => {
    const subscriptionId = subscribeToUpdates((update) => {
      if (types.includes(update.type)) {
        callback(update);
      }
    });

    return () => {
      unsubscribeFromUpdates(subscriptionId);
    };
  }, [subscribeToUpdates, unsubscribeFromUpdates, types, callback]);
};

// Hook to subscribe to specific severity levels
export const useDashboardUpdatesBySeverity = (
  severities: RealTimeUpdate['severity'][],
  callback: (update: RealTimeUpdate) => void
) => {
  const { subscribeToUpdates, unsubscribeFromUpdates } = useDashboardUpdates();

  useEffect(() => {
    const subscriptionId = subscribeToUpdates((update) => {
      if (severities.includes(update.severity)) {
        callback(update);
      }
    });

    return () => {
      unsubscribeFromUpdates(subscriptionId);
    };
  }, [subscribeToUpdates, unsubscribeFromUpdates, severities, callback]);
};

// Hook to get connection status with auto-reconnect
export const useDashboardConnection = () => {
  const { isConnected, connectionQuality, triggerManualUpdate } = useDashboardUpdates();

  const forceReconnect = useCallback(() => {
    triggerManualUpdate('system', { action: 'reconnect' });
  }, [triggerManualUpdate]);

  return {
    isConnected,
    connectionQuality,
    forceReconnect
  };
};