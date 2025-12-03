"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  BarChart3,
  FileCheck,
  Search,
  FileText,
  Settings,
  Plus,
  Filter,
  Calendar,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Users,
  FolderTree,
  Download,
  ChevronRight,
  ChevronDown,
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
import { mockProjects } from "@/lib/mock-data/projects";

const CompliancePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  // Filter projects based on search and compliance status
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = selectedFramework === "all" || project.type === selectedFramework;
    const matchesStatus = selectedStatus === "all" || project.complianceStatus === selectedStatus;
    const matchesRisk = selectedRisk === "all" || project.riskLevel === selectedRisk;
    return matchesSearch && matchesFramework && matchesStatus && matchesRisk;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aValue = sortBy === "updated" ? b.lastUpdated.getTime() : b.complianceScore;
    const bValue = sortBy === "updated" ? a.lastUpdated.getTime() : a.complianceScore;
    return bValue - aValue;
  });

  // Calculate compliance statistics
  const totalProjects = mockProjects.length;
  const compliantProjects = mockProjects.filter(p => p.complianceStatus === 'compliant').length;
  const underReviewProjects = mockProjects.filter(p => p.complianceStatus === 'under-review').length;
  const nonCompliantProjects = mockProjects.filter(p => p.complianceStatus === 'non-compliant').length;
  const avgComplianceScore = Math.round(mockProjects.reduce((sum, p) => sum + p.complianceScore, 0) / totalProjects);

  const frameworkOptions = [
    { value: "all", label: "All Frameworks", count: totalProjects },
    { value: "EU_AI_Act", label: "EU AI Act", count: mockProjects.filter(p => p.type === 'ml').length },
    { value: "ISO_42001", label: "ISO 42001", count: mockProjects.filter(p => p.type === 'llm').length },
    { value: "NIST_AI_RM", label: "NIST AI RMF", count: 0 },
    { value: "Custom", label: "Custom Frameworks", count: 0 },
  ];

  const statusOptions = [
    { value: "all", label: "All Status", count: totalProjects },
    { value: "compliant", label: "Compliant", count: compliantProjects },
    { value: "under-review", label: "Under Review", count: underReviewProjects },
    { value: "non-compliant", label: "Non-Compliant", count: nonCompliantProjects },
  ];

  const riskOptions = [
    { value: "all", label: "All Risk Levels", count: totalProjects },
    { value: "low", label: "Low Risk", count: mockProjects.filter(p => p.riskLevel === "low").length },
    { value: "medium", label: "Medium Risk", count: mockProjects.filter(p => p.riskLevel === "medium").length },
    { value: "high", label: "High Risk", count: mockProjects.filter(p => p.riskLevel === "high").length },
    { value: "critical", label: "Critical Risk", count: mockProjects.filter(p => p.riskLevel === "critical").length },
  ];

  const sortOptions = [
    { value: "updated", label: "Last Updated" },
    { value: "score", label: "Compliance Score" },
    { value: "name", label: "Project Name" },
  ];

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
                  Compliance Center
                </h1>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                New Evaluation
              </Button>
            </div>
            <p className="text-muted-foreground mb-6">
              Manage compliance evaluations, risk assessments, and regulatory framework adherence
            </p>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProjects}</div>
                <p className="text-xs text-muted-foreground">Across all frameworks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliant</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{compliantProjects}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((compliantProjects / totalProjects) * 100)}% compliance rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Under Review</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{underReviewProjects}</div>
                <p className="text-xs text-muted-foreground">Awaiting evaluation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgComplianceScore}</div>
                <p className="text-xs text-muted-foreground">Compliance score</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Search */}
            <div className="flex-1 space-y-4">
              <div className="relative">
                <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search compliance evaluations..."
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
                    {selectedFramework === "all" ? "All Frameworks" : frameworkOptions.find(f => f.value === selectedFramework)?.label || "Select Framework"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Compliance Framework</DropdownMenuLabel>
                  {frameworkOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSelectedFramework(option.value)}
                      className={selectedFramework === option.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
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
                  <DropdownMenuLabel>Compliance Status</DropdownMenuLabel>
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
                    {selectedRisk === "all" ? "All Risk Levels" : riskOptions.find(r => r.value === selectedRisk)?.label || "Select Risk Level"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Risk Level</DropdownMenuLabel>
                  {riskOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSelectedRisk(option.value)}
                      className={selectedRisk === option.value ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
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

          {/* Projects Grid */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Compliance Evaluations ({sortedProjects.length})
              </h2>
              <p className="text-muted-foreground">
                Track and manage regulatory compliance across all projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {project.type === "llm" && (
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                        )}
                        {project.type === "ml" && (
                          <div className="p-2 rounded-lg bg-primary/10">
                            <BarChart3 className="h-5 w-5 text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 mt-4">
                            <Badge
                              variant={project.complianceStatus === "compliant" ? "default" : project.complianceStatus === "non-compliant" ? "destructive" : "secondary"}
                              className="mr-2"
                            >
                              {project.complianceStatus === "compliant" ? "Compliant" :
                               project.complianceStatus === "non-compliant" ? "Non-Compliant" : "Under Review"}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="mr-2"
                            >
                              {project.riskLevel} Risk
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Compliance Score</span>
                      <div className="flex items-center gap-2">
                        <Progress value={project.complianceScore} className="w-16" />
                        <span className="text-sm font-medium">{project.complianceScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Framework</span>
                      <span className="text-sm text-muted-foreground">EU AI Act</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last Review</span>
                      <span className="text-sm text-muted-foreground">
                        {project.lastReviewed ? project.lastReviewed.toLocaleDateString() : "Not reviewed"}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4 inline" />
                      Updated {project.lastActivity}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}?tab=compliance`}>
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
                            Edit Evaluation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Export Report
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Archive Evaluation
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

export default CompliancePage;