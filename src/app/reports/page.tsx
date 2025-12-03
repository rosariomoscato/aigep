"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  PieChart,
  Activity,
  Filter,
  ChevronDown,
  Search,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Shield,
  Users,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

// Mock reports data
const mockReports = [
  {
    id: "report-001",
    title: "Q4 2024 Compliance Overview",
    type: "compliance",
    framework: "comprehensive",
    status: "completed",
    generatedDate: new Date("2024-12-01T10:00:00Z"),
    lastModified: new Date("2024-12-01T10:00:00Z"),
    generatedBy: "Emily Watson",
    projects: ["proj-001", "proj-002", "proj-003"],
    metrics: {
      totalProjects: 3,
      compliantProjects: 1,
      underReviewProjects: 1,
      nonCompliantProjects: 1,
      avgComplianceScore: 78,
      riskDistribution: { low: 1, medium: 1, high: 1 },
    },
    downloadCount: 156,
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: "report-002",
    title: "Medical AI Systems Annual Review",
    type: "certification",
    framework: "EU_AI_Act",
    status: "completed",
    generatedDate: new Date("2024-10-15T14:30:00Z"),
    lastModified: new Date("2024-10-15T14:30:00Z"),
    generatedBy: "Lisa Park",
    projects: ["proj-002"],
    metrics: {
      totalProjects: 1,
      compliantProjects: 1,
      underReviewProjects: 0,
      nonCompliantProjects: 0,
      avgComplianceScore: 92,
      riskDistribution: { low: 1, medium: 0, high: 0 },
    },
    downloadCount: 89,
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: "report-003",
    title: "Financial Systems Risk Assessment",
    type: "risk",
    framework: "NIST_AI_RM",
    status: "in_progress",
    generatedDate: new Date("2024-11-20T09:15:00Z"),
    lastModified: new Date("2024-11-22T16:45:00Z"),
    generatedBy: "Robert Taylor",
    projects: ["proj-003"],
    metrics: {
      totalProjects: 1,
      compliantProjects: 0,
      underReviewProjects: 0,
      nonCompliantProjects: 1,
      avgComplianceScore: 65,
      riskDistribution: { low: 0, medium: 0, high: 1 },
    },
    downloadCount: 45,
    size: "3.1 MB",
    format: "Excel",
  },
  {
    id: "report-004",
    title: "ML Project Portfolio Analysis",
    type: "analytics",
    framework: "comprehensive",
    status: "scheduled",
    generatedDate: new Date("2024-12-05T10:00:00Z"),
    lastModified: new Date("2024-12-05T10:00:00Z"),
    generatedBy: "Alex Kumar",
    projects: ["proj-001", "proj-003", "proj-005"],
    metrics: {
      totalProjects: 3,
      compliantProjects: 2,
      underReviewProjects: 0,
      nonCompliantProjects: 1,
      avgComplianceScore: 81,
      riskDistribution: { low: 1, medium: 1, high: 1 },
    },
    downloadCount: 0,
    size: "0 KB",
    format: "PowerPoint",
  },
  {
    id: "report-005",
    title: "Compliance Trends 2022-2024",
    type: "trends",
    framework: "comprehensive",
    status: "completed",
    generatedDate: new Date("2024-11-10T11:30:00Z"),
    lastModified: new Date("2024-11-10T11:30:00Z"),
    generatedBy: "Sarah Chen",
    projects: ["proj-001", "proj-002", "proj-003", "proj-005"],
    metrics: {
      totalProjects: 4,
      compliantProjects: 2,
      underReviewProjects: 1,
      nonCompliantProjects: 1,
      avgComplianceScore: 79,
      riskDistribution: { low: 1, medium: 2, high: 1 },
    },
    downloadCount: 234,
    size: "5.2 MB",
    format: "Interactive Dashboard",
  },
];

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFramework, setSelectedFramework] = useState("all");

  // Filter reports
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || report.type === selectedType;
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;
    const matchesFramework = selectedFramework === "all" || report.framework === selectedFramework;
    return matchesSearch && matchesType && matchesStatus && matchesFramework;
  });

  // Sort by generated date
  const sortedReports = [...filteredReports].sort((a, b) =>
    new Date(b.generatedDate).getTime() - new Date(a.generatedDate).getTime()
  );

  const typeOptions = [
    { value: "all", label: "All Types", count: mockReports.length },
    { value: "compliance", label: "Compliance", count: mockReports.filter(r => r.type === "compliance").length },
    { value: "certification", label: "Certification", count: mockReports.filter(r => r.type === "certification").length },
    { value: "risk", label: "Risk Assessment", count: mockReports.filter(r => r.type === "risk").length },
    { value: "analytics", label: "Analytics", count: mockReports.filter(r => r.type === "analytics").length },
    { value: "trends", label: "Trends", count: mockReports.filter(r => r.type === "trends").length },
  ];

  const statusOptions = [
    { value: "all", label: "All Status", count: mockReports.length },
    { value: "completed", label: "Completed", count: mockReports.filter(r => r.status === "completed").length },
    { value: "in_progress", label: "In Progress", count: mockReports.filter(r => r.status === "in_progress").length },
    { value: "scheduled", label: "Scheduled", count: mockReports.filter(r => r.status === "scheduled").length },
  ];

  const frameworkOptions = [
    { value: "all", label: "All Frameworks", count: mockReports.length },
    { value: "comprehensive", label: "Comprehensive", count: mockReports.filter(r => r.framework === "comprehensive").length },
    { value: "EU_AI_Act", label: "EU AI Act", count: mockReports.filter(r => r.framework === "EU_AI_Act").length },
    { value: "NIST_AI_RM", label: "NIST AI RMF", count: mockReports.filter(r => r.framework === "NIST_AI_RM").length },
    { value: "ISO_42001", label: "ISO 42001", count: mockReports.filter(r => r.framework === "ISO_42001").length },
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "compliance":
        return <Shield className="h-5 w-5 text-blue-600" />;
      case "certification":
        return <Star className="h-5 w-5 text-yellow-600" />;
      case "risk":
        return <BarChart3 className="h-5 w-5 text-red-600" />;
      case "analytics":
        return <PieChart className="h-5 w-5 text-green-600" />;
      case "trends":
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (trend < 0) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    } else {
      return <Activity className="h-4 w-4 text-gray-600" />;
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
                <BarChart3 className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Reports & Analytics
                </h1>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
            <p className="text-muted-foreground">
              Generate comprehensive reports and analytics across compliance, risk assessment, and project performance
            </p>
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
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex-1 space-y-4 lg:w-2/3">
                  <div className="flex gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {selectedType === "all" ? "All Types" : typeOptions.find(t => t.value === selectedType)?.label || "Select Type"}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Report Type</DropdownMenuLabel>
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
                          {selectedFramework === "all" ? "All Frameworks" : frameworkOptions.find(f => f.value === selectedFramework)?.label || "Select Framework"}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Framework</DropdownMenuLabel>
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
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  {sortedReports.length} Reports
                </h2>
                <p className="text-muted-foreground">
                  Comprehensive reporting across compliance, risk, and analytics
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(report.type)}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">
                              {report.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Generated by {report.generatedBy} • {report.projects.length} projects
                            </p>
                            <div className="flex items-center gap-4 mt-4">
                              <Badge {...getStatusBadge(report.status)} className="mr-2">
                                {report.status === "completed" ? "Completed" :
                                 report.status === "in_progress" ? "In Progress" :
                                 report.status === "scheduled" ? "Scheduled" : report.status}
                              </Badge>
                              <Badge variant="secondary" className="mr-2">
                                {report.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Generated Date</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(report.generatedDate).toLocaleDateString()}
                      </div>

                      <div className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Key Metrics</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Total Projects</div>
                          <div className="text-lg font-bold">{report.metrics.totalProjects}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Compliance Score</div>
                          <div className="text-lg font-bold">{report.metrics.avgComplianceScore}%</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Risk Distribution</span>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(report.metrics.riskDistribution).map(([risk, count]) => (
                          count > 0 && (
                            <div key={risk} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground capitalize">{risk}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      risk === 'high' ? 'bg-red-500' :
                                      risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${(count / report.metrics.totalProjects) * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium w-8">{count}</span>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{report.downloadCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>{report.format}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4" />
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/reports/${report.id}`}>
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
                              Edit Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Archive Report
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
      </div>
    </TooltipProvider>
  );
};

export default ReportsPage;