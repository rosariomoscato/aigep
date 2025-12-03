export interface MockProject {
  id: string;
  name: string;
  description: string;
  type: 'ml' | 'llm';
  status: 'active' | 'in_review' | 'approved' | 'rejected' | 'archived';
  complianceScore: number;
  complianceStatus: 'compliant' | 'non-compliant' | 'under-review';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  team: {
    owner: string;
    members: Array<{
      id: string;
      name: string;
      role: 'data_scientist' | 'compliance_officer' | 'auditor' | 'product_manager';
      avatar?: string;
      department?: 'data-science' | 'ml-engineering' | 'compliance' | 'audit';
    }>;
  };
  createdAt: Date;
  created: Date;
  updatedAt: string;
  lastUpdated: Date;
  lastActivity: string;
  lastReviewed?: Date;
  artifacts?: Array<{
    id: string;
    name: string;
    type: 'code' | 'model' | 'dataset' | 'documentation';
    version: string;
    size: number;
  }>;
  documentation?: Array<{
    id: string;
    title: string;
    type: 'compliance-report' | 'technical-doc' | 'user-guide';
    lastModified: Date;
  }>;
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
    complianceStatus: 'under-review',
    riskLevel: 'medium',
    team: {
      owner: 'Sarah Chen',
      members: [
        { id: 'user-001', name: 'Sarah Chen', role: 'data_scientist', avatar: '/avatars/sarah.jpg', department: 'data-science' },
        { id: 'user-002', name: 'Michael Rodriguez', role: 'data_scientist', avatar: '/avatars/michael.jpg', department: 'data-science' },
        { id: 'user-003', name: 'Emily Watson', role: 'compliance_officer', avatar: '/avatars/emily.jpg', department: 'compliance' }
      ]
    },
    createdAt: new Date('2024-01-15T10:30:00Z'),
    created: new Date('2024-01-15T10:30:00Z'),
    updatedAt: '2024-11-28T14:22:00Z',
    lastUpdated: new Date('2024-11-28T14:22:00Z'),
    lastActivity: '2 hours ago',
    lastReviewed: new Date('2024-11-15T10:00:00Z'),
    artifacts: [
      { id: 'art-001', name: 'model.py', type: 'code', version: '1.2.0', size: 1024 },
      { id: 'art-002', name: 'churn_model.pkl', type: 'model', version: '1.1.0', size: 5120 },
      { id: 'art-003', name: 'customer_data.csv', type: 'dataset', version: '1.0.0', size: 20480 },
      { id: 'art-004', name: 'model_documentation.pdf', type: 'documentation', version: '1.0.0', size: 3072 }
    ],
    documentation: [
      { id: 'doc-001', title: 'Compliance Report', type: 'compliance-report', lastModified: new Date('2024-11-15T10:00:00Z') },
      { id: 'doc-002', title: 'Technical Documentation', type: 'technical-doc', lastModified: new Date('2024-11-10T15:30:00Z') }
    ],
    certifications: []
  },
  {
    id: 'proj-002',
    name: 'Medical Diagnosis Assistant',
    description: 'LLM-powered assistant for medical professionals to help with diagnosis and treatment recommendations.',
    type: 'llm',
    status: 'approved',
    complianceScore: 92,
    complianceStatus: 'compliant',
    riskLevel: 'low',
    team: {
      owner: 'Dr. James Wilson',
      members: [
        { id: 'user-004', name: 'Dr. James Wilson', role: 'data_scientist', avatar: '/avatars/james.jpg', department: 'data-science' },
        { id: 'user-005', name: 'Lisa Park', role: 'compliance_officer', avatar: '/avatars/lisa.jpg', department: 'compliance' }
      ]
    },
    createdAt: new Date('2024-02-20T09:15:00Z'),
    created: new Date('2024-02-20T09:15:00Z'),
    updatedAt: '2024-11-15T11:30:00Z',
    lastUpdated: new Date('2024-11-15T11:30:00Z'),
    lastActivity: '1 day ago',
    lastReviewed: new Date('2024-10-01T00:00:00Z'),
    artifacts: [
      { id: 'art-005', name: 'diagnosis_prompt.txt', type: 'code', version: '2.1.0', size: 2048 },
      { id: 'art-006', name: 'med_model_v2.gguf', type: 'model', version: '2.0.0', size: 8192 },
      { id: 'art-007', name: 'medical_cases.json', type: 'dataset', version: '1.0.0', size: 40960 }
    ],
    documentation: [
      { id: 'doc-003', title: 'Medical Compliance Report', type: 'compliance-report', lastModified: new Date('2024-10-01T00:00:00Z') },
      { id: 'doc-004', title: 'API Documentation', type: 'technical-doc', lastModified: new Date('2024-11-01T10:00:00Z') }
    ],
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
    complianceStatus: 'non-compliant',
    riskLevel: 'high',
    team: {
      owner: 'Alex Kumar',
      members: [
        { id: 'user-006', name: 'Alex Kumar', role: 'data_scientist', avatar: '/avatars/alex.jpg', department: 'ml-engineering' },
        { id: 'user-007', name: 'Patricia Chen', role: 'data_scientist', avatar: '/avatars/patricia.jpg', department: 'ml-engineering' },
        { id: 'user-008', name: 'Robert Taylor', role: 'product_manager', avatar: '/avatars/robert.jpg', department: 'data-science' }
      ]
    },
    createdAt: new Date('2024-03-10T13:45:00Z'),
    created: new Date('2024-03-10T13:45:00Z'),
    updatedAt: '2024-11-29T16:45:00Z',
    lastUpdated: new Date('2024-11-29T16:45:00Z'),
    lastActivity: '5 minutes ago',
    lastReviewed: new Date('2024-11-01T10:00:00Z'),
    artifacts: [
      { id: 'art-008', name: 'fraud_detector.py', type: 'code', version: '3.1.0', size: 2560 },
      { id: 'art-009', name: 'ensemble_model.pkl', type: 'model', version: '3.0.0', size: 15360 },
      { id: 'art-010', name: 'transactions.csv', type: 'dataset', version: '2.0.0', size: 102400 }
    ],
    documentation: [
      { id: 'doc-005', title: 'Fraud Detection Report', type: 'compliance-report', lastModified: new Date('2024-11-01T10:00:00Z') }
    ],
    certifications: []
  },
  {
    id: 'proj-004',
    name: 'Customer Service Chatbot',
    description: 'Multilingual customer service chatbot powered by GPT-4 with company knowledge base.',
    type: 'llm',
    status: 'rejected',
    complianceScore: 45,
    complianceStatus: 'non-compliant',
    riskLevel: 'critical',
    team: {
      owner: 'Maria Garcia',
      members: [
        { id: 'user-009', name: 'Maria Garcia', role: 'data_scientist', avatar: '/avatars/maria.jpg', department: 'data-science' },
        { id: 'user-010', name: 'John Smith', role: 'compliance_officer', avatar: '/avatars/john.jpg', department: 'compliance' }
      ]
    },
    createdAt: new Date('2024-01-05T08:30:00Z'),
    created: new Date('2024-01-05T08:30:00Z'),
    updatedAt: '2024-11-20T09:15:00Z',
    lastUpdated: new Date('2024-11-20T09:15:00Z'),
    lastActivity: '3 days ago',
    lastReviewed: new Date('2024-11-15T10:00:00Z'),
    artifacts: [
      { id: 'art-011', name: 'chatbot_handler.py', type: 'code', version: '1.5.0', size: 3072 },
      { id: 'art-012', name: 'gpt4_fine_tuned.gguf', type: 'model', version: '1.2.0', size: 6144 },
      { id: 'art-013', name: 'knowledge_base.json', type: 'dataset', version: '3.0.0', size: 51200 }
    ],
    documentation: [
      { id: 'doc-006', title: 'Chatbot Compliance Review', type: 'compliance-report', lastModified: new Date('2024-11-15T10:00:00Z') }
    ],
    certifications: []
  },
  {
    id: 'proj-005',
    name: 'Supply Chain Optimization AI',
    description: 'AI system for optimizing supply chain logistics and inventory management.',
    type: 'ml',
    status: 'archived',
    complianceScore: 95,
    complianceStatus: 'compliant',
    riskLevel: 'low',
    team: {
      owner: 'David Lee',
      members: [
        { id: 'user-011', name: 'David Lee', role: 'data_scientist', avatar: '/avatars/david.jpg', department: 'data-science' },
        { id: 'user-012', name: 'Sophie Martin', role: 'compliance_officer', avatar: '/avatars/sophie.jpg', department: 'compliance' }
      ]
    },
    createdAt: new Date('2023-09-12T11:20:00Z'),
    created: new Date('2023-09-12T11:20:00Z'),
    updatedAt: '2024-06-30T15:45:00Z',
    lastUpdated: new Date('2024-06-30T15:45:00Z'),
    lastActivity: '2 months ago',
    lastReviewed: new Date('2024-06-01T10:00:00Z'),
    artifacts: [
      { id: 'art-014', name: 'optimization_engine.py', type: 'code', version: '4.2.0', size: 4096 },
      { id: 'art-015', name: 'supply_chain_model.pkl', type: 'model', version: '4.1.0', size: 20480 },
      { id: 'art-016', name: 'inventory_data.csv', type: 'dataset', version: '5.0.0', size: 153600 }
    ],
    documentation: [
      { id: 'doc-007', title: 'Supply Chain Compliance Report', type: 'compliance-report', lastModified: new Date('2024-06-01T10:00:00Z') }
    ],
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

// Export types for use in components
export type ProjectType = MockProject['type'];
export type ComplianceFramework = 'EU_AI_Act' | 'Rome_Call' | 'ISO_42001' | 'NIST_AI_RM' | 'Custom';

export const getProjectById = (id: string): MockProject | undefined => {
  return mockProjects.find(project => project.id === id) || {
    id: '',
    name: 'Project Not Found',
    description: 'No project found with the specified ID',
    type: 'ml',
    status: 'archived',
    complianceScore: 0,
    complianceStatus: 'non-compliant',
    riskLevel: 'medium',
    team: {
      owner: 'System',
      members: [],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    lastActivity: 'Never',
    lastReviewed: undefined,
    artifacts: [],
    documentation: [],
    certifications: []
  };
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