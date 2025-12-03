"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  FileText,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  BarChart,
  PieChart,
  Target,
  Zap,
  Activity,
  Bell,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  RefreshCw,
  Settings,
  Info,
  AlertCircle,
  FileCheck,
  FileQuestion,
  FileX,
  Scale,
  Gavel,
  Book,
  ClipboardCheck,
  ClipboardList,
  CheckSquare,
  Square,
  AlertOctagon,
  ExternalLink,
  Upload,
  FilePlus,
  FolderOpen,
  Lock,
  Unlock
} from "lucide-react"

interface ComplianceFramework {
  id: string
  name: string
  description: string
  version: string
  status: 'active' | 'deprecated' | 'draft'
  requirements: ComplianceRequirement[]
  lastUpdated: Date
  documentation?: string
}

interface ComplianceRequirement {
  id: string
  name: string
  description: string
  category: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'compliant' | 'non-compliant' | 'in-progress' | 'not-applicable'
  evidence?: EvidenceItem[]
  dueDate?: Date
  assignedTo?: string
  notes?: string
}

interface EvidenceItem {
  id: string
  name: string
  type: 'document' | 'test_result' | 'screenshot' | 'log' | 'code' | 'model_output'
  uploadedBy: string
  uploadedAt: Date
  fileUrl?: string
  description?: string
  verified: boolean
}

interface ComplianceCheck {
  id: string
  name: string
  framework: string
  status: 'passed' | 'failed' | 'warning' | 'pending'
  score: number
  maxScore: number
  lastRun: Date
  nextRun?: Date
  details?: string
}

interface ComplianceReport {
  id: string
  title: string
  framework: string
  type: 'assessment' | 'audit' | 'review' | 'certification'
  status: 'draft' | 'in-review' | 'approved' | 'published'
  score: number
  generatedAt: Date
  generatedBy: string
  findings?: Finding[]
  recommendations?: Recommendation[]
}

interface Finding {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  category: string
  status: 'open' | 'in-progress' | 'resolved' | 'accepted-risk'
  assignedTo?: string
  dueDate?: Date
}

interface Recommendation {
  id: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  title: string
  description: string
  category: string
  status: 'pending' | 'in-progress' | 'implemented'
  effort: 'low' | 'medium' | 'high'
}

interface ComplianceTrackerProps {
  projectId: string
  frameworks: ComplianceFramework[]
  checks: ComplianceCheck[]
  reports: ComplianceReport[]
  overallScore: number
  status: 'compliant' | 'non-compliant' | 'under-review'
  lastAssessment: Date
  onUploadEvidence?: (requirementId: string, evidence: Omit<EvidenceItem, 'id' | 'uploadedAt' | 'verified'>) => void
  onUpdateRequirement?: (requirementId: string, updates: Partial<ComplianceRequirement>) => void
  onGenerateReport?: (frameworkId: string, type: ComplianceReport['type']) => void
}

export default function ComplianceTracker({
  projectId,
  frameworks,
  checks,
  reports,
  overallScore,
  status,
  lastAssessment,
  onUploadEvidence,
  onUpdateRequirement,
  onGenerateReport
}: ComplianceTrackerProps) {
  const [selectedFramework, setSelectedFramework] = useState(frameworks[0]?.id || "")
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const currentFramework = frameworks.find(f => f.id === selectedFramework)

  // Filter requirements
  const filteredRequirements = currentFramework?.requirements.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || req.status === selectedStatus
    const matchesPriority = selectedPriority === "all" || req.priority === selectedPriority
    return matchesSearch && matchesStatus && matchesPriority
  }) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'passed':
      case 'approved':
      case 'published':
      case 'resolved':
        return 'text-green-600 bg-green-50'
      case 'non-compliant':
      case 'failed':
      case 'critical':
      case 'open':
        return 'text-red-600 bg-red-50'
      case 'in-progress':
      case 'warning':
      case 'in-review':
        return 'text-yellow-600 bg-yellow-50'
      case 'not-applicable':
      case 'pending':
      case 'accepted-risk':
        return 'text-gray-600 bg-gray-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
      case 'urgent':
        return 'text-red-600 bg-red-50'
      case 'high':
        return 'text-orange-600 bg-orange-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'passed':
      case 'approved':
      case 'published':
        return <CheckCircle2 className="h-4 w-4" />
      case 'non-compliant':
      case 'failed':
      case 'critical':
        return <XCircle className="h-4 w-4" />
      case 'in-progress':
      case 'warning':
      case 'in-review':
        return <AlertTriangle className="h-4 w-4" />
      case 'not-applicable':
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <FileQuestion className="h-4 w-4" />
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    if (score >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  const RequirementCard = ({ requirement }: { requirement: ComplianceRequirement }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium truncate">
              {requirement.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {requirement.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-3">
            <Badge
              variant="outline"
              className={`text-xs ${getPriorityColor(requirement.priority)}`}
            >
              {requirement.priority}
            </Badge>
            <Badge
              variant="outline"
              className={`text-xs ${getStatusColor(requirement.status)}`}
            >
              <div className="flex items-center space-x-1">
                {getStatusIcon(requirement.status)}
                <span>{requirement.status.replace('-', ' ')}</span>
              </div>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Category</span>
          <Badge variant="outline" className="text-xs">
            {requirement.category}
          </Badge>
        </div>

        {requirement.dueDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Due Date</span>
            <span className={`font-medium ${
              requirement.dueDate < new Date() ? 'text-red-600' : 'text-foreground'
            }`}>
              {formatDate(requirement.dueDate)}
            </span>
          </div>
        )}

        {requirement.assignedTo && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Assigned To</span>
            <span className="font-medium">{requirement.assignedTo}</span>
          </div>
        )}

        {requirement.evidence && requirement.evidence.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Evidence ({requirement.evidence.length})</p>
            <div className="space-y-1">
              {requirement.evidence.slice(0, 2).map((evidence) => (
                <div key={evidence.id} className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-3 w-3" />
                    <span className="truncate">{evidence.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {evidence.verified ? (
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    ) : (
                      <Clock className="h-3 w-3 text-yellow-600" />
                    )}
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              {requirement.evidence.length > 2 && (
                <p className="text-xs text-muted-foreground text-center">
                  +{requirement.evidence.length - 2} more items
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Upload className="h-3 w-3 mr-1" />
              Add Evidence
            </Button>
            <Button variant="ghost" size="sm">
              <Edit className="h-3 w-3 mr-1" />
              Update
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            {requirement.status === 'non-compliant' && (
              <Button variant="outline" size="sm">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Create Action Plan
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compliance Tracker</h2>
          <p className="text-muted-foreground">
            Monitor compliance status, track requirements, and manage evidence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Assessment
          </Button>
          <Button>
            <FilePlus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Compliance Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Overall Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}%
                </p>
              </div>
            </div>
            <Progress value={overallScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Compliant</p>
                <p className="text-2xl font-bold text-green-600">
                  {frameworks.reduce((sum, f) =>
                    sum + f.requirements.filter(r => r.status === 'compliant').length, 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {frameworks.reduce((sum, f) =>
                    sum + f.requirements.filter(r => r.status === 'in-progress').length, 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Non-Compliant</p>
                <p className="text-2xl font-bold text-red-600">
                  {frameworks.reduce((sum, f) =>
                    sum + f.requirements.filter(r => r.status === 'non-compliant').length, 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Requirements
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Evidence
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Frameworks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {frameworks.map((framework) => {
              const frameworkScore = Math.round(
                (framework.requirements.filter(r => r.status === 'compliant').length /
                 framework.requirements.length) * 100
              )
              return (
                <Card key={framework.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-primary" />
                          {framework.name}
                        </CardTitle>
                        <CardDescription>{framework.description}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(frameworkScore)}`}>
                          {frameworkScore}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          v{framework.version}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={frameworkScore} />

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Compliant</p>
                        <p className="text-sm font-medium text-green-600">
                          {framework.requirements.filter(r => r.status === 'compliant').length}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">In Progress</p>
                        <p className="text-sm font-medium text-yellow-600">
                          {framework.requirements.filter(r => r.status === 'in-progress').length}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Non-Compliant</p>
                        <p className="text-sm font-medium text-red-600">
                          {framework.requirements.filter(r => r.status === 'non-compliant').length}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span>{formatDate(framework.lastUpdated)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="outline" className={getStatusColor(framework.status)}>
                        {framework.status}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedFramework(framework.id)
                        setSelectedTab("requirements")
                      }}
                    >
                      View Requirements
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Recent Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Compliance Checks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checks.map((check) => (
                  <div key={check.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(check.status)}`}>
                        {getStatusIcon(check.status)}
                      </div>
                      <div>
                        <p className="font-medium">{check.name}</p>
                        <p className="text-sm text-muted-foreground">{check.framework}</p>
                        {check.details && (
                          <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`font-medium ${getScoreColor(check.score)}`}>
                          {check.score}/{check.maxScore}
                        </span>
                        <Badge variant="outline" className={getStatusColor(check.status)}>
                          {check.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(check.lastRun)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          {/* Framework Selection */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Framework</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-1">
                {frameworks.map((framework) => (
                  <Button
                    key={framework.id}
                    variant={selectedFramework === framework.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFramework(framework.id)}
                    className="justify-start"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    {framework.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search requirements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="compliant">Compliant</option>
                <option value="non-compliant">Non-Compliant</option>
                <option value="in-progress">In Progress</option>
                <option value="not-applicable">Not Applicable</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Requirements List */}
          {currentFramework && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {currentFramework.name} Requirements
                </h3>
                <p className="text-sm text-muted-foreground">
                  {filteredRequirements.length} of {currentFramework.requirements.length} requirements
                </p>
              </div>

              {filteredRequirements.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredRequirements.map((requirement) => (
                    <RequirementCard key={requirement.id} requirement={requirement} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Requirements Found</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      {searchTerm || selectedStatus !== "all" || selectedPriority !== "all"
                        ? "No requirements match your current filters."
                        : "No requirements available for this framework."}
                    </p>
                    {searchTerm || selectedStatus !== "all" || selectedPriority !== "all" ? (
                      <Button variant="outline" onClick={() => {
                        setSearchTerm("")
                        setSelectedStatus("all")
                        setSelectedPriority("all")
                      }}>
                        Clear Filters
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="evidence" className="space-y-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Evidence Management</h3>
              <p className="text-muted-foreground text-center mb-4">
                Upload and manage evidence for compliance requirements
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Evidence
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm font-medium line-clamp-2">
                        {report.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{report.framework}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className={`font-medium ${getScoreColor(report.score)}`}>
                      {report.score}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <Badge variant="outline" className="capitalize">
                      {report.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Generated</span>
                    <span className="text-sm">{formatDate(report.generatedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Generated By</span>
                    <span className="text-sm">{report.generatedBy}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}