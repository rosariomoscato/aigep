export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'data_scientist' | 'compliance_officer' | 'auditor' | 'product_manager' | 'admin';
  avatar?: string;
  organization: string;
  joinedAt: string;
  lastActive: string;
  permissions: string[];
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-001',
    name: 'Sarah Chen',
    email: 'sarah.chen@aigep.com',
    role: 'data_scientist',
    avatar: '/avatars/sarah.jpg',
    organization: 'TechCorp Analytics',
    joinedAt: '2024-01-15T10:30:00Z',
    lastActive: '2 hours ago',
    permissions: ['create_projects', 'upload_artifacts', 'view_compliance', 'edit_own_projects']
  },
  {
    id: 'user-002',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@aigep.com',
    role: 'data_scientist',
    avatar: '/avatars/michael.jpg',
    organization: 'TechCorp Analytics',
    joinedAt: '2024-01-20T14:22:00Z',
    lastActive: '1 day ago',
    permissions: ['create_projects', 'upload_artifacts', 'view_compliance', 'edit_own_projects']
  },
  {
    id: 'user-003',
    name: 'Emily Watson',
    email: 'emily.watson@aigep.com',
    role: 'compliance_officer',
    avatar: '/avatars/emily.jpg',
    organization: 'TechCorp Analytics',
    joinedAt: '2024-02-01T09:00:00Z',
    lastActive: '30 minutes ago',
    permissions: ['view_projects', 'review_compliance', 'approve_projects', 'issue_certifications', 'view_audit_trail']
  },
  {
    id: 'user-004',
    name: 'Dr. James Wilson',
    email: 'james.wilson@medtech.ai',
    role: 'data_scientist',
    avatar: '/avatars/james.jpg',
    organization: 'Medical AI Solutions',
    joinedAt: '2024-02-20T09:15:00Z',
    lastActive: '1 day ago',
    permissions: ['create_projects', 'upload_artifacts', 'view_compliance', 'edit_own_projects']
  },
  {
    id: 'user-005',
    name: 'Lisa Park',
    email: 'lisa.park@medtech.ai',
    role: 'compliance_officer',
    avatar: '/avatars/lisa.jpg',
    organization: 'Medical AI Solutions',
    joinedAt: '2024-02-25T11:30:00Z',
    lastActive: '2 hours ago',
    permissions: ['view_projects', 'review_compliance', 'approve_projects', 'issue_certifications', 'view_audit_trail']
  },
  {
    id: 'user-006',
    name: 'Alex Kumar',
    email: 'alex.kumar@fintech.bank',
    role: 'data_scientist',
    avatar: '/avatars/alex.jpg',
    organization: 'Global Banking Corp',
    joinedAt: '2024-03-10T13:45:00Z',
    lastActive: '5 minutes ago',
    permissions: ['create_projects', 'upload_artifacts', 'view_compliance', 'edit_own_projects']
  },
  {
    id: 'user-007',
    name: 'Patricia Chen',
    email: 'patricia.chen@fintech.bank',
    role: 'data_scientist',
    avatar: '/avatars/patricia.jpg',
    organization: 'Global Banking Corp',
    joinedAt: '2024-03-15T16:45:00Z',
    lastActive: '1 day ago',
    permissions: ['create_projects', 'upload_artifacts', 'view_compliance', 'edit_own_projects']
  },
  {
    id: 'user-008',
    name: 'Robert Taylor',
    email: 'robert.taylor@fintech.bank',
    role: 'product_manager',
    avatar: '/avatars/robert.jpg',
    organization: 'Global Banking Corp',
    joinedAt: '2024-03-01T08:00:00Z',
    lastActive: '3 hours ago',
    permissions: ['view_projects', 'view_compliance', 'view_analytics', 'manage_team', 'view_reports']
  },
  {
    id: 'user-009',
    name: 'Maria Garcia',
    email: 'maria.garcia@custservice.ai',
    role: 'data_scientist',
    avatar: '/avatars/maria.jpg',
    organization: 'Customer Service AI',
    joinedAt: '2024-01-05T08:30:00Z',
    lastActive: '3 days ago',
    permissions: ['create_projects', 'upload_artifacts', 'view_compliance', 'edit_own_projects']
  },
  {
    id: 'user-010',
    name: 'John Smith',
    email: 'john.smith@custservice.ai',
    role: 'compliance_officer',
    avatar: '/avatars/john.jpg',
    organization: 'Customer Service AI',
    joinedAt: '2024-01-10T14:00:00Z',
    lastActive: '2 days ago',
    permissions: ['view_projects', 'review_compliance', 'approve_projects', 'issue_certifications', 'view_audit_trail']
  },
  {
    id: 'user-011',
    name: 'David Lee',
    email: 'david.lee@logistics.ai',
    role: 'data_scientist',
    avatar: '/avatars/david.jpg',
    organization: 'Supply Chain Tech',
    joinedAt: '2023-09-12T11:20:00Z',
    lastActive: '2 months ago',
    permissions: ['create_projects', 'upload_artifacts', 'view_compliance', 'edit_own_projects']
  },
  {
    id: 'user-012',
    name: 'Sophie Martin',
    email: 'sophie.martin@logistics.ai',
    role: 'compliance_officer',
    avatar: '/avatars/sophie.jpg',
    organization: 'Supply Chain Tech',
    joinedAt: '2023-10-01T09:00:00Z',
    lastActive: '1 month ago',
    permissions: ['view_projects', 'review_compliance', 'approve_projects', 'issue_certifications', 'view_audit_trail']
  },
  {
    id: 'user-013',
    name: 'Amanda Foster',
    email: 'amanda.foster@audit.global',
    role: 'auditor',
    avatar: '/avatars/amanda.jpg',
    organization: 'Global Audit Partners',
    joinedAt: '2024-01-01T00:00:00Z',
    lastActive: '4 hours ago',
    permissions: ['view_projects', 'view_compliance', 'view_analytics', 'view_reports', 'download_evidence']
  },
  {
    id: 'user-014',
    name: 'Thomas Chen',
    email: 'thomas.chen@techcorp.com',
    role: 'product_manager',
    avatar: '/avatars/thomas.jpg',
    organization: 'TechCorp Analytics',
    joinedAt: '2023-12-01T00:00:00Z',
    lastActive: '1 week ago',
    permissions: ['view_projects', 'view_compliance', 'view_analytics', 'manage_team', 'view_reports', 'approve_budget']
  },
  {
    id: 'user-015',
    name: 'Jennifer Liu',
    email: 'jennifer.liu@aigep.com',
    role: 'admin',
    avatar: '/avatars/jennifer.jpg',
    organization: 'AIGEP Platform',
    joinedAt: '2023-11-01T00:00:00Z',
    lastActive: '1 hour ago',
    permissions: ['*'] // All permissions
  }
];

export const getUserById = (id: string): MockUser | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUsersByRole = (role: MockUser['role']): MockUser[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getUsersByOrganization = (organization: string): MockUser[] => {
  return mockUsers.filter(user => user.organization === organization);
};

export const getCurrentUser = (): MockUser => {
  // In a real app, this would come from authentication
  // For mock purposes, return a data scientist user
  return mockUsers[0]!; // Sarah Chen
};