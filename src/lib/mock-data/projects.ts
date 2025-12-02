export interface MockProject {
  id: string;
  name: string;
  description: string;
  type: 'ml' | 'llm';
  status: 'active' | 'in_review' | 'approved' | 'rejected' | 'archived';
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  team: {
    owner: string;
    members: Array<{
      id: string;
      name: string;
      role: 'data_scientist' | 'compliance_officer' | 'auditor' | 'product_manager';
      avatar?: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  artifacts: {
    code: number;
    models: number;
    datasets: number;
    documentation: number;
  };
  certifications: Array<{
    id: string;
    name: string;
    issuedBy: string;
    issuedDate: string;
    expiresDate?: string;
    status: 'active' | 'expired' | 'revoked';
  }>;
}

export const mockProjects: MockProject[] = [
  {
    id: 'proj-001',
    name: 'Customer Churn Prediction Model',
    description: 'Machine learning model for predicting customer churn based on behavioral data and transaction history.',
    type: 'ml',
    status: 'in_review',
    complianceScore: 78,
    riskLevel: 'medium',
    team: {
      owner: 'Sarah Chen',
      members: [
        { id: 'user-001', name: 'Sarah Chen', role: 'data_scientist', avatar: '/avatars/sarah.jpg' },
        { id: 'user-002', name: 'Michael Rodriguez', role: 'data_scientist', avatar: '/avatars/michael.jpg' },
        { id: 'user-003', name: 'Emily Watson', role: 'compliance_officer', avatar: '/avatars/emily.jpg' }
      ]
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-11-28T14:22:00Z',
    lastActivity: '2 hours ago',
    artifacts: {
      code: 12,
      models: 3,
      datasets: 4,
      documentation: 8
    },
    certifications: []
  },
  {
    id: 'proj-002',
    name: 'Medical Diagnosis Assistant',
    description: 'LLM-powered assistant for medical professionals to help with diagnosis and treatment recommendations.',
    type: 'llm',
    status: 'approved',
    complianceScore: 92,
    riskLevel: 'low',
    team: {
      owner: 'Dr. James Wilson',
      members: [
        { id: 'user-004', name: 'Dr. James Wilson', role: 'data_scientist', avatar: '/avatars/james.jpg' },
        { id: 'user-005', name: 'Lisa Park', role: 'compliance_officer', avatar: '/avatars/lisa.jpg' }
      ]
    },
    createdAt: '2024-02-20T09:15:00Z',
    updatedAt: '2024-11-15T11:30:00Z',
    lastActivity: '1 day ago',
    artifacts: {
      code: 8,
      models: 2,
      datasets: 6,
      documentation: 12
    },
    certifications: [
      {
        id: 'cert-001',
        name: 'Medical AI Compliance Certified',
        issuedBy: 'Healthcare AI Ethics Board',
        issuedDate: '2024-10-01T00:00:00Z',
        expiresDate: '2025-10-01T00:00:00Z',
        status: 'active'
      }
    ]
  },
  {
    id: 'proj-003',
    name: 'Financial Fraud Detection System',
    description: 'Real-time fraud detection system for banking transactions using ensemble methods.',
    type: 'ml',
    status: 'active',
    complianceScore: 65,
    riskLevel: 'high',
    team: {
      owner: 'Alex Kumar',
      members: [
        { id: 'user-006', name: 'Alex Kumar', role: 'data_scientist', avatar: '/avatars/alex.jpg' },
        { id: 'user-007', name: 'Patricia Chen', role: 'data_scientist', avatar: '/avatars/patricia.jpg' },
        { id: 'user-008', name: 'Robert Taylor', role: 'product_manager', avatar: '/avatars/robert.jpg' }
      ]
    },
    createdAt: '2024-03-10T13:45:00Z',
    updatedAt: '2024-11-29T16:45:00Z',
    lastActivity: '5 minutes ago',
    artifacts: {
      code: 18,
      models: 5,
      datasets: 12,
      documentation: 15
    },
    certifications: []
  },
  {
    id: 'proj-004',
    name: 'Customer Service Chatbot',
    description: 'Multilingual customer service chatbot powered by GPT-4 with company knowledge base.',
    type: 'llm',
    status: 'rejected',
    complianceScore: 45,
    riskLevel: 'critical',
    team: {
      owner: 'Maria Garcia',
      members: [
        { id: 'user-009', name: 'Maria Garcia', role: 'data_scientist', avatar: '/avatars/maria.jpg' },
        { id: 'user-010', name: 'John Smith', role: 'compliance_officer', avatar: '/avatars/john.jpg' }
      ]
    },
    createdAt: '2024-01-05T08:30:00Z',
    updatedAt: '2024-11-20T09:15:00Z',
    lastActivity: '3 days ago',
    artifacts: {
      code: 6,
      models: 1,
      datasets: 3,
      documentation: 5
    },
    certifications: []
  },
  {
    id: 'proj-005',
    name: 'Supply Chain Optimization AI',
    description: 'AI system for optimizing supply chain logistics and inventory management.',
    type: 'ml',
    status: 'archived',
    complianceScore: 95,
    riskLevel: 'low',
    team: {
      owner: 'David Lee',
      members: [
        { id: 'user-011', name: 'David Lee', role: 'data_scientist', avatar: '/avatars/david.jpg' },
        { id: 'user-012', name: 'Sophie Martin', role: 'compliance_officer', avatar: '/avatars/sophie.jpg' }
      ]
    },
    createdAt: '2023-09-12T11:20:00Z',
    updatedAt: '2024-06-30T15:45:00Z',
    lastActivity: '2 months ago',
    artifacts: {
      code: 24,
      models: 8,
      datasets: 18,
      documentation: 20
    },
    certifications: [
      {
        id: 'cert-002',
        name: 'Supply Chain AI Excellence',
        issuedBy: 'Global AI Standards Institute',
        issuedDate: '2024-05-15T00:00:00Z',
        status: 'active'
      }
    ]
  }
];

export const getProjectById = (id: string): MockProject | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const getProjectsByType = (type: 'ml' | 'llm'): MockProject[] => {
  return mockProjects.filter(project => project.type === type);
};

export const getProjectsByStatus = (status: MockProject['status']): MockProject[] => {
  return mockProjects.filter(project => project.status === status);
};

export const getProjectsByRiskLevel = (riskLevel: MockProject['riskLevel']): MockProject[] => {
  return mockProjects.filter(project => project.riskLevel === riskLevel);
};