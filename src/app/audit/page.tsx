"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Shield,
  BarChart3,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  FileText,
  TrendingUp,
  Filter,
  ChevronDown,
  Plus,
  Eye,
  Edit,
  Download,
  MoreHorizontal,
  FileCheck,
  XCircle,
  Play,
  Pause,
  Square,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock audit data
const mockAudits = [
  {
    id: "audit-001",
    title: "Customer Churn Model - Q4 2024",
    project: "proj-001",
    projectName: "Customer Churn Prediction Model",
    type: "compliance",
    status: "in_progress",
    priority: "high",
    framework: "EU_AI_Act",
    startDate: new Date("2024-10-01T09:00:00Z"),
    endDate: new Date("2024-10-15T17:00:00Z"),
    auditor: "Emily Watson",
    team: ["Emily Watson", "Sarah Chen", "Michael Rodriguez"],
    scope: "Full compliance review including data governance, model transparency, and risk assessment",
    findings: 3,
    recommendations: 8,
    documents: 12,
    progress: 65,
  },
  {
    id: "audit-002",
    title: "Medical Diagnosis Assistant - Annual Review",
    project: "proj-002",
    projectName: "Medical Diagnosis Assistant",
    type: "certification",
    status: "completed",
    priority: "medium",
    framework: "ISO_42001",
    startDate: new Date("2024-09-15T09:00:00Z"),
    endDate: new Date("2024-10-01T17:00:00Z"),
    auditor: "Lisa Park",
    team: ["Lisa Park", "Dr. James Wilson"],
    scope: "ISO 42001 compliance audit with focus on medical AI safety and effectiveness",
    findings: 2,
    recommendations: 5,
    documents: 8,
    progress: 100,
    certification: {
      id: "cert-001",
      name: "Medical AI Compliance Certified",
      issuedBy: "Healthcare AI Ethics Board",
      issuedDate: "2024-10-01T00:00:00Z",
      expiresDate: "2025-10-01T00:00:00Z",
      status: "active",
    },
  },
  {
    id: "audit-003",
    title: "Fraud Detection System - Risk Assessment",
    project: "proj-003",
    projectName: "Financial Fraud Detection System",
    type: "risk",
    status: "scheduled",
    priority: "critical",
    framework: "NIST_AI_RM",
    startDate: new Date("2024-11-05T09:00:00Z"),
    endDate: new Date("2024-11-20T17:00:00Z"),
    auditor: "Robert Taylor",
    team: ["Robert Taylor", "Alex Kumar", "Patricia Chen"],
    scope: "Comprehensive risk assessment focusing on bias detection, fairness metrics, and system reliability",
    findings: 0,
    recommendations: 0,
    documents: 5,
    progress: 0,
  },
  {
    id: "audit-004",
    title: "Supply Chain Optimization - Quality Review",
    project: "proj-005",
    projectName: "Supply Chain Optimization AI",
    type: "quality",
    status: "in_progress",
    priority: "low",
    framework: "Custom",
    startDate: new Date("2024-11-10T09:00:00Z"),
    endDate: new Date("2024-11-25T17:00:00Z"),
    auditor: "Sophie Martin",
    team: ["Sophie Martin", "David Lee"],
    scope: "Quality assurance review for optimization algorithms and performance metrics",
    findings: 1,
    recommendations: 3,
    documents: 6,
    progress: 40,
  },
];

const AuditPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  // Filter audits
  const filteredAudits = mockAudits.filter(audit => {
    const matchesSearch = audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || audit.type === selectedType;
    const matchesStatus = selectedStatus === "all" || audit.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || audit.priority === selectedPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  // Sort by start date
  const sortedAudits = [...filteredAudits].sort((a, b) =>
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const typeOptions = [
    { value: "all", label: "All Types", count: mockAudits.length },
    { value: "compliance", label: "Compliance", count: mockAudits.filter(a => a.type === "compliance").length },
    { value: "certification", label: "Certification", count: mockAudits.filter(a => a.type === "certification").length },
    { value: "risk", label: "Risk Assessment", count: mockAudits.filter(a => a.type === "risk").length },
    { value: "quality", label: "Quality Review", count: mockAudits.filter(a => a.type === "quality").length },
  ];

  const statusOptions = [
    { value: "all", label: "All Status", count: mockAudits.length },
    { value: "scheduled", label: "Scheduled", count: mockAudits.filter(a => a.status === "scheduled").length },
    { value: "in_progress", label: "In Progress", count: mockAudits.filter(a => a.status === "in_progress").length },
    { value: "completed", label: "Completed", count: mockAudits.filter(a => a.status === "completed").length },
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities", count: mockAudits.length },
    { value: "low", label: "Low", count: mockAudits.filter(a => a.priority === "low").length },
    { value: "medium", label: "Medium", count: mockAudits.filter(a => a.priority === "medium").length },
    { value: "high", label: "High", count: mockAudits.filter(a => a.priority === "high").length },
    { value: "critical", label: "Critical", count: mockAudits.filter(a => a.priority === "critical").length },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return { variant: "default" as const, text: "Completed" };
      case "in_progress":
        return { variant: "secondary" as const, text: "In Progress" };
      case "scheduled":
        return { variant: "outline" as const, text: "Scheduled" };
      default:
        return { variant: "destructive" as const, text: status };
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return { variant: "destructive" as const, text: "Critical" };
      case "high":
        return { variant: "default" as const, text: "High" };
      case "medium":
        return { variant: "secondary" as const, text: "Medium" };
      case "low":
        return { variant: "outline" as const, text: "Low" };
      default:
        return { variant: "outline" as const, text: priority };
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Audit Management
                </h1>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Audit
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage and track compliance audits, risk assessments, and certification reviews
            </p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              {/* Search */}
              <div className="flex-1 space-y-4 lg:w-1/3">
                <div className="relative">
                  <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search audits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedType === "all" ? "All Types" : typeOptions.find(t => t.value === selectedType)?.label || "Select Type"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Audit Type</DropdownMenuLabel>
                    {typeOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSelectedType(option.value)}
                        className={selectedType === option.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                      >
                        {option.label}
                        <Badge variant="secondary" className="ml-2 h-5 min-w-[20px] justify-center items-center rounded-full">
                          {option.count}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedStatus === "all" ? "All Status" : statusOptions.find(s => s.value === selectedStatus)?.label || "Select Status"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    {statusOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSelectedStatus(option.value)}
                        className={selectedStatus === option.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                      >
                        {option.label}
                        <Badge variant="secondary" className="ml-2 h-5 min-w-[20px] justify-center items-center rounded-full">
                          {option.count}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {selectedPriority === "all" ? "All Priorities" : priorityOptions.find(p => p.value === selectedPriority)?.label || "Select Priority"}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Priority</DropdownMenuLabel>
                    {priorityOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setSelectedPriority(option.value)}
                        className={selectedPriority === option.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
                      >
                        {option.label}
                        <Badge variant="secondary" className="ml-2 h-5 min-w-[20px] justify-center items-center rounded-full">
                          {option.count}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Audits Grid */}
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                {sortedAudits.length} Audits
              </h2>
              <p className="text-muted-foreground">
                Track compliance audits and risk assessments across all projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedAudits.map((audit) => (
              <Card key={audit.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Badge {...getPriorityBadge(audit.priority)} className="mr-2" />
                        <Badge {...getStatusBadge(audit.status)} className="mr-2" />
                        <div className="text-sm text-muted-foreground">
                          {audit.framework.replace('_', ' ')}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          {audit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {audit.projectName}
                        </p>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Audit Period</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(audit.startDate).toLocaleDateString()} - {new Date(audit.endDate).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Audit Team</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lead: {audit.auditor} • {audit.team.length - 1} member{audit.team.length > 2 ? 's' : ''}
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Scope</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      {audit.scope}
                    </div>

                    {audit.progress > 0 && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Progress</span>
                      </div>
                    )}
                    {audit.progress > 0 && (
                      <div className="flex items-center gap-2">
                        <Progress value={audit.progress} className="w-full" />
                        <span className="text-sm font-medium">{audit.progress}%</span>
                      </div>
                    )}

                    {audit.certification && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <FileCheck className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-green-800 dark:text-green-200">
                            {audit.certification.name}
                          </span>
                          <p className="text-xs text-green-600 dark:text-green-400">
                            Valid until {new Date(audit.certification.expiresDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4 inline" />
                      {audit.status === "completed" ? `Completed ${new Date(audit.endDate).toLocaleDateString()}` :
                       audit.status === "in_progress" ? "In progress" :
                       `Starts ${new Date(audit.startDate).toLocaleDateString()}`}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/audit/${audit.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Audit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Report
                          </DropdownMenuItem>
                          {audit.status === "scheduled" && (
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Start Audit
                            </DropdownMenuItem>
                          )}
                          {audit.status === "in_progress" && (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause Audit
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Square className="mr-2 h-4 w-4" />
                            Complete Audit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AuditPage;