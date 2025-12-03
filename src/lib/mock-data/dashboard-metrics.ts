import { MockProject, mockProjects } from './projects';
import { MockUser, mockUsers } from './users';

// Dashboard Metrics Interfaces
export interface ProjectHealthMetrics {
  projectId: string;
  projectName: string;
  performance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1Score: number;
    latency: number; // ms
    throughput: number; // requests/second
  };
  dataQuality: {
    completeness: number;
    consistency: number;
    validity: number;
    drift: number;
  };
  resourceUsage: {
    cpu: number;
    memory: number;
    storage: number;
    cost: number;
  };
  trends: {
    accuracy: number[]; // last 7 days
    latency: number[]; // last 7 days
    errors: number[]; // last 7 days
  };
}

export interface MLExperiment {
  id: string;
  projectId: string;
  name: string;
  parameters: Record<string, any>;
  metrics: Record<string, number>;
  artifacts: string[];
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: number;
}

export interface ComplianceRiskAssessment {
  projectId: string;
  projectName: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  categories: {
    dataPrivacy: number;
    bias: number;
    transparency: number;
    accountability: number;
    safety: number;
  };
  issues: Array<{
    id: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    recommendation: string;
    status: 'open' | 'in_progress' | 'resolved';
  }>;
  lastAssessment: string;
  nextReview: string;
}

export interface ComplianceQueue {
  id: string;
  projectId: string;
  projectName: string;
  type: 'review' | 'certification' | 'audit' | 'investigation';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedBy: string;
  submittedAt: string;
  assignedTo?: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'requires_changes';
  dueDate: string;
  estimatedHours: number;
}

export interface AuditSchedule {
  id: string;
  projectId?: string;
  projectName?: string;
  type: 'internal' | 'external' | 'regulatory' | 'follow_up';
  title: string;
  description: string;
  auditor: string;
  scheduledDate: string;
  duration: number; // days
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scope: string[];
  deliverables: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface AuditFinding {
  id: string;
  auditId: string;
  projectId: string;
  projectName: string;
  category: 'compliance' | 'security' | 'performance' | 'documentation' | 'governance';
  severity: 'informational' | 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  evidence: string[];
  recommendation: string;
  status: 'open' | 'in_progress' | 'resolved' | 'accepted_risk';
  assignedTo?: string;
  dueDate: string;
  createdAt: string;
}

export interface ProjectPortfolio {
  id: string;
  name: string;
  category: 'ml' | 'llm';
  status: 'active' | 'in_review' | 'approved' | 'rejected' | 'archived';
  businessImpact: {
    revenue: number;
    costSavings: number;
    efficiency: number; // percentage
    riskReduction: number; // percentage
  };
  roi: {
    investment: number;
    returns: number;
    percentage: number;
    paybackPeriod: number; // months
  };
  team: {
    members: number;
    fte: number; // full-time equivalents
    avgExperience: number; // years
    cost: number; // monthly
  };
  timeline: {
    startDate: string;
    plannedEndDate: string;
    actualEndDate?: string;
    progress: number; // percentage
  };
  kpis: {
    userAdoption: number;
    satisfactionScore: number;
    errorRate: number;
    availability: number;
  };
}

export interface TeamPerformance {
  userId: string;
  userName: string;
  role: MockUser['role'];
  organization: string;
  metrics: {
    projectsCompleted: number;
    projectsActive: number;
    avgCompletionTime: number; // days
    qualityScore: number; // 1-100
    collaborationScore: number; // 1-100
    innovationIndex: number; // 1-100
  };
  skills: Array<{
    name: string;
    level: number; // 1-5
    endorsements: number;
  }>;
  contributions: {
    codeCommits: number;
    documentationEdits: number;
    reviewsCompleted: number;
    mentorshipHours: number;
  };
  availability: {
    utilization: number; // percentage
    upcomingLeave: string[];
    certifications: number;
    trainingHours: number;
  };
}

export interface ActivityFeed {
  id: string;
  type: 'project_update' | 'compliance_review' | 'audit_finding' | 'team_change' | 'system_alert';
  title: string;
  description: string;
  user?: string;
  project?: string;
  timestamp: string;
  priority: 'info' | 'warning' | 'error' | 'success';
  metadata: Record<string, any>;
}

// Mock Data Generation
export const generateProjectHealthMetrics = (): ProjectHealthMetrics[] => {
  return mockProjects.map(project => ({
    projectId: project.id,
    projectName: project.name,
    performance: {
      accuracy: 85 + Math.random() * 14,
      precision: 82 + Math.random() * 17,
      recall: 80 + Math.random() * 19,
      f1Score: 83 + Math.random() * 16,
      latency: 50 + Math.random() * 200,
      throughput: 100 + Math.random() * 900
    },
    dataQuality: {
      completeness: 90 + Math.random() * 9,
      consistency: 85 + Math.random() * 14,
      validity: 88 + Math.random() * 11,
      drift: Math.random() * 5
    },
    resourceUsage: {
      cpu: 30 + Math.random() * 60,
      memory: 40 + Math.random() * 50,
      storage: 20 + Math.random() * 70,
      cost: 100 + Math.random() * 900
    },
    trends: {
      accuracy: Array.from({ length: 7 }, () => 85 + Math.random() * 14),
      latency: Array.from({ length: 7 }, () => 50 + Math.random() * 200),
      errors: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20))
    }
  }));
};

export const generateMLExperiments = (): MLExperiment[] => {
  const experiments: MLExperiment[] = [];
  const activeProjects = mockProjects.filter(p => p.status === 'active' || p.status === 'in_review');

  activeProjects.forEach(project => {
    const experimentCount = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < experimentCount; i++) {
      experiments.push({
        id: `exp-${project.id}-${i}`,
        projectId: project.id,
        name: `Experiment ${i + 1}: ${project.type === 'llm' ? 'Fine-tuning' : 'Hyperparameter Optimization'}`,
        parameters: {
          learning_rate: Math.random() * 0.1,
          batch_size: [16, 32, 64, 128][Math.floor(Math.random() * 4)],
          epochs: Math.floor(Math.random() * 100) + 10,
          ...project.type === 'llm' && {
            temperature: Math.random() * 2,
            max_tokens: Math.floor(Math.random() * 2000) + 500
          }
        },
        metrics: {
          accuracy: 80 + Math.random() * 19,
          loss: Math.random() * 0.5,
          val_accuracy: 78 + Math.random() * 21,
          val_loss: Math.random() * 0.6
        },
        artifacts: [
          `model_checkpoint_${i}.pkl`,
          `training_log_${i}.json`,
          `evaluation_report_${i}.html`
        ],
        status: ['running', 'completed', 'failed', 'cancelled'][Math.floor(Math.random() * 4)] as MLExperiment['status'],
        startTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString() : undefined,
        duration: Math.floor(Math.random() * 24) + 1
      });
    }
  });

  return experiments;
};

export const generateComplianceRiskAssessments = (): ComplianceRiskAssessment[] => {
  return mockProjects.map(project => ({
    projectId: project.id,
    projectName: project.name,
    riskScore: project.complianceScore,
    riskLevel: project.riskLevel,
    categories: {
      dataPrivacy: 60 + Math.random() * 40,
      bias: 70 + Math.random() * 30,
      transparency: 65 + Math.random() * 35,
      accountability: 75 + Math.random() * 25,
      safety: 80 + Math.random() * 20
    },
    issues: Array.from({ length: Math.floor(Math.random() * 5) }, (_, i) => ({
      id: `issue-${project.id}-${i}`,
      category: ['dataPrivacy', 'bias', 'transparency', 'accountability', 'safety'][Math.floor(Math.random() * 5)],
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
      description: `Issue ${i + 1}: ${project.riskLevel === 'high' ? 'Critical' : 'Minor'} compliance concern identified during review`,
      recommendation: `Recommendation ${i + 1}: Implement enhanced monitoring and documentation`,
      status: ['open', 'in_progress', 'resolved'][Math.floor(Math.random() * 3)] as any
    })),
    lastAssessment: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    nextReview: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
  }));
};

export const generateComplianceQueue = (): ComplianceQueue[] => {
  const queue: ComplianceQueue[] = [];
  const projectsNeedingReview = mockProjects.filter(p => p.status === 'in_review' || p.complianceStatus === 'under-review');

  projectsNeedingReview.forEach(project => {
    queue.push({
      id: `queue-${project.id}`,
      projectId: project.id,
      projectName: project.name,
      type: ['review', 'certification', 'audit', 'investigation'][Math.floor(Math.random() * 4)] as any,
      priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)] as any,
      submittedBy: project.team.owner,
      submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: Math.random() > 0.3 ? mockUsers.filter(u => u.role === 'compliance_officer')[Math.floor(Math.random() * 3)]?.id : undefined,
      status: ['pending', 'in_review', 'approved', 'rejected', 'requires_changes'][Math.floor(Math.random() * 5)] as any,
      dueDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedHours: Math.floor(Math.random() * 40) + 5
    });
  });

  return queue;
};

export const generateAuditSchedules = (): AuditSchedule[] => {
  return [
    {
      id: 'audit-001',
      projectId: 'proj-001',
      projectName: 'Customer Churn Prediction Model',
      type: 'internal',
      title: 'Q4 2024 Internal ML Governance Audit',
      description: 'Quarterly review of ML model governance, documentation, and compliance procedures',
      auditor: 'Amanda Foster',
      scheduledDate: '2024-12-15T00:00:00Z',
      duration: 3,
      status: 'scheduled',
      scope: ['Model Performance', 'Data Privacy', 'Documentation', 'Monitoring'],
      deliverables: ['Audit Report', 'Compliance Checklist', 'Recommendations'],
      riskLevel: 'medium'
    },
    {
      id: 'audit-002',
      projectId: 'proj-003',
      projectName: 'Financial Fraud Detection System',
      type: 'regulatory',
      title: 'Financial Regulatory Compliance Audit',
      description: 'Annual regulatory audit for financial AI systems per banking regulations',
      auditor: 'External Auditor - PwC',
      scheduledDate: '2025-01-10T00:00:00Z',
      duration: 5,
      status: 'scheduled',
      scope: ['Data Security', 'Model Explainability', 'Fairness Testing', 'Audit Trail'],
      deliverables: ['Regulatory Compliance Report', 'Risk Assessment', 'Corrective Action Plan'],
      riskLevel: 'high'
    },
    {
      id: 'audit-003',
      projectId: 'proj-002',
      projectName: 'Medical Diagnosis Assistant',
      type: 'external',
      title: 'Medical AI Safety Certification Audit',
      description: 'Third-party audit for medical AI safety certification',
      auditor: 'Healthcare AI Safety Board',
      scheduledDate: '2024-12-20T00:00:00Z',
      duration: 4,
      status: 'in_progress',
      scope: ['Clinical Validation', 'Patient Safety', 'Data Protection', 'Emergency Procedures'],
      deliverables: ['Safety Certification', 'Clinical Validation Report', 'Risk Mitigation Plan'],
      riskLevel: 'high'
    }
  ];
};

export const generateAuditFindings = (): AuditFinding[] => {
  return [
    {
      id: 'finding-001',
      auditId: 'audit-001',
      projectId: 'proj-001',
      projectName: 'Customer Churn Prediction Model',
      category: 'documentation',
      severity: 'medium',
      title: 'Incomplete Model Documentation',
      description: 'Model documentation lacks detailed preprocessing steps and feature engineering explanations',
      evidence: ['Documentation Review', 'Code Analysis'],
      recommendation: 'Update documentation to include comprehensive preprocessing pipeline and feature importance analysis',
      status: 'open',
      assignedTo: 'user-001',
      dueDate: '2024-12-30T00:00:00Z',
      createdAt: '2024-11-15T10:00:00Z'
    },
    {
      id: 'finding-002',
      auditId: 'audit-002',
      projectId: 'proj-003',
      projectName: 'Financial Fraud Detection System',
      category: 'compliance',
      severity: 'high',
      title: 'Insufficient Bias Testing',
      description: 'Model bias testing does not cover all protected attributes as required by regulations',
      evidence: ['Bias Assessment Report', 'Regulatory Requirements'],
      recommendation: 'Implement comprehensive bias testing framework with all protected attributes',
      status: 'in_progress',
      assignedTo: 'user-006',
      dueDate: '2024-12-25T00:00:00Z',
      createdAt: '2024-11-10T14:30:00Z'
    }
  ];
};

export const generateProjectPortfolio = (): ProjectPortfolio[] => {
  return mockProjects.map(project => ({
    id: project.id,
    name: project.name,
    category: project.type,
    status: project.status,
    businessImpact: {
      revenue: Math.floor(Math.random() * 1000000) + 100000,
      costSavings: Math.floor(Math.random() * 500000) + 50000,
      efficiency: 15 + Math.random() * 85,
      riskReduction: 20 + Math.random() * 80
    },
    roi: {
      investment: Math.floor(Math.random() * 200000) + 50000,
      returns: Math.floor(Math.random() * 800000) + 100000,
      percentage: 150 + Math.random() * 850,
      paybackPeriod: Math.floor(Math.random() * 18) + 3
    },
    team: {
      members: project.team.members.length,
      fte: project.team.members.length * 0.8,
      avgExperience: 3 + Math.random() * 7,
      cost: project.team.members.length * (8000 + Math.random() * 7000)
    },
    timeline: {
      startDate: project.createdAt.toISOString(),
      plannedEndDate: new Date(project.createdAt.getTime() + (90 + Math.random() * 180) * 24 * 60 * 60 * 1000).toISOString(),
      actualEndDate: project.status === 'archived' ? new Date(project.updatedAt).toISOString() : undefined,
      progress: project.status === 'archived' ? 100 : 40 + Math.random() * 60
    },
    kpis: {
      userAdoption: 60 + Math.random() * 40,
      satisfactionScore: 3 + Math.random() * 2,
      errorRate: Math.random() * 5,
      availability: 95 + Math.random() * 4.9
    }
  }));
};

export const generateTeamPerformance = (): TeamPerformance[] => {
  return mockUsers.map(user => {
    const userProjects = mockProjects.filter(p => p.team.members.some(m => m.id === user.id));

    return {
      userId: user.id,
      userName: user.name,
      role: user.role,
      organization: user.organization,
      metrics: {
        projectsCompleted: userProjects.filter(p => ['approved', 'archived'].includes(p.status)).length,
        projectsActive: userProjects.filter(p => ['active', 'in_review'].includes(p.status)).length,
        avgCompletionTime: 45 + Math.random() * 60,
        qualityScore: 75 + Math.random() * 25,
        collaborationScore: 70 + Math.random() * 30,
        innovationIndex: 60 + Math.random() * 40
      },
      skills: [
        { name: user.role === 'data_scientist' ? 'Machine Learning' : user.role === 'compliance_officer' ? 'Risk Assessment' : 'Project Management', level: 3 + Math.random() * 2, endorsements: Math.floor(Math.random() * 20) },
        { name: 'Python', level: 3 + Math.random() * 2, endorsements: Math.floor(Math.random() * 15) },
        { name: 'Communication', level: 3 + Math.random() * 2, endorsements: Math.floor(Math.random() * 25) },
        { name: 'Problem Solving', level: 3 + Math.random() * 2, endorsements: Math.floor(Math.random() * 18) }
      ],
      contributions: {
        codeCommits: Math.floor(Math.random() * 500) + 50,
        documentationEdits: Math.floor(Math.random() * 100) + 10,
        reviewsCompleted: Math.floor(Math.random() * 50) + 5,
        mentorshipHours: Math.floor(Math.random() * 40) + 5
      },
      availability: {
        utilization: 70 + Math.random() * 25,
        upcomingLeave: [
          new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        ],
        certifications: Math.floor(Math.random() * 5) + 1,
        trainingHours: Math.floor(Math.random() * 100) + 20
      }
    };
  });
};

export const generateActivityFeed = (): ActivityFeed[] => {
  const activities: ActivityFeed[] = [];

  // Project updates
  mockProjects.slice(0, 3).forEach(project => {
    activities.push({
      id: `activity-project-${project.id}`,
      type: 'project_update',
      title: `Project "${project.name}" Updated`,
      description: `Status changed to ${project.status}`,
      project: project.name,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      priority: project.status === 'approved' ? 'success' : project.status === 'rejected' ? 'error' : 'info',
      metadata: { projectId: project.id, status: project.status }
    });
  });

  // Compliance reviews
  activities.push({
    id: 'activity-compliance-001',
    type: 'compliance_review',
    title: 'Compliance Review Required',
    description: 'New project requires compliance review',
    project: 'Financial Fraud Detection System',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    priority: 'warning',
    metadata: { projectId: 'proj-003', dueDate: '2024-12-15' }
  });

  // Audit findings
  activities.push({
    id: 'activity-audit-001',
    type: 'audit_finding',
    title: 'New Audit Finding',
    description: 'Medium severity finding identified during internal audit',
    project: 'Customer Churn Prediction Model',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    priority: 'error',
    metadata: { findingId: 'finding-001', severity: 'medium' }
  });

  // Team changes
  activities.push({
    id: 'activity-team-001',
    type: 'team_change',
    title: 'New Team Member',
    description: 'Jennifer Liu joined Medical AI Solutions project',
    user: 'Jennifer Liu',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    priority: 'success',
    metadata: { userId: 'user-015', role: 'admin' }
  });

  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Export all generated data
export const dashboardMetrics = {
  projectHealth: generateProjectHealthMetrics(),
  experiments: generateMLExperiments(),
  complianceRisks: generateComplianceRiskAssessments(),
  complianceQueue: generateComplianceQueue(),
  auditSchedules: generateAuditSchedules(),
  auditFindings: generateAuditFindings(),
  projectPortfolio: generateProjectPortfolio(),
  teamPerformance: generateTeamPerformance(),
  activityFeed: generateActivityFeed()
};

// Helper functions for filtering data by role
export const getDataScientistDashboard = () => ({
  projectHealth: dashboardMetrics.projectHealth,
  experiments: dashboardMetrics.experiments.filter(e => e.status === 'running'),
  projects: mockProjects.filter(p => p.team.members.some(m => ['user-001', 'user-002', 'user-004', 'user-006', 'user-007', 'user-009', 'user-011'].includes(m.id))),
  teamPerformance: dashboardMetrics.teamPerformance.filter(t => t.role === 'data_scientist'),
  recentActivity: dashboardMetrics.activityFeed.slice(0, 5)
});

export const getComplianceOfficerDashboard = () => ({
  complianceRisks: dashboardMetrics.complianceRisks.sort((a, b) => b.riskScore - a.riskScore),
  complianceQueue: dashboardMetrics.complianceQueue.filter(q => q.status === 'pending'),
  auditFindings: dashboardMetrics.auditFindings.filter(f => f.status === 'open'),
  projects: mockProjects.filter(p => p.complianceStatus === 'under-review'),
  recentActivity: dashboardMetrics.activityFeed.filter(a => ['compliance_review', 'audit_finding'].includes(a.type))
});

export const getAuditorDashboard = () => ({
  auditSchedules: dashboardMetrics.auditSchedules.filter(a => a.status === 'scheduled'),
  auditFindings: dashboardMetrics.auditFindings,
  projects: mockProjects,
  recentActivity: dashboardMetrics.activityFeed.filter(a => ['audit_finding'].includes(a.type))
});

export const getProductManagerDashboard = () => ({
  projectPortfolio: dashboardMetrics.projectPortfolio.sort((a, b) => b.roi.percentage - a.roi.percentage),
  teamPerformance: dashboardMetrics.teamPerformance,
  businessMetrics: {
    totalProjects: mockProjects.length,
    activeProjects: mockProjects.filter(p => p.status === 'active').length,
    avgROI: dashboardMetrics.projectPortfolio.reduce((sum, p) => sum + p.roi.percentage, 0) / dashboardMetrics.projectPortfolio.length,
    totalValue: dashboardMetrics.projectPortfolio.reduce((sum, p) => sum + p.businessImpact.revenue, 0)
  },
  recentActivity: dashboardMetrics.activityFeed
});