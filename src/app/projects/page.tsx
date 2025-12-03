"use client"

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  BarChart3,
  Users,
  Search,
  FileText,
  Plus,
  FolderTree,
  Filter,
  Calendar,
  Clock,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Settings,
  Info,
  ChevronDown,
} from "lucide-react";
import CreateProjectDialog from "@/components/projects/project-creation-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { mockProjects } from "@/lib/mock-data/projects";

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter projects based on search and status
  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || project.complianceStatus === selectedStatus;
    const matchesType = selectedType === "all" || project.type === selectedType;
    const matchesRisk = selectedRisk === "all" || project.riskLevel === selectedRisk;
    const matchesTeam = selectedTeam === "all" || project.team?.some(member => member.id === selectedTeam);
    return matchesSearch && matchesStatus && matchesType && matchesRisk && matchesTeam;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const aValue = sortBy === "updated" ? b.lastUpdated.getTime() : 0;
    const bValue = sortBy === "updated" ? a.lastUpdated.getTime() : 0;
    return bValue - aValue;
  });

  // Get unique values for filters
  const uniqueTypes = [...new Set(mockProjects.flatMap(p => p.type || []))];
  const uniqueStatuses = [...new Set(mockProjects.flatMap(p => p.complianceStatus || []))];
  const uniqueRisks = [...new Set(mockProjects.flatMap(p => p.riskLevel || []))];
  const uniqueTeams = [...new Set(mockProjects.flatMap(p => p.team?.members?.map(t => t.id) || []))];

  // Status options
  const statusOptions = [
    { value: "all", label: "All Projects", count: mockProjects.length },
    { value: "compliant", label: "Compliant", count: mockProjects.filter(p => p.complianceStatus === "compliant").length },
    { value: "under-review", label: "Under Review", count: mockProjects.filter(p => p.complianceStatus === "under-review").length },
    { value: "non-compliant", label: "Non-Compliant", count: mockProjects.filter(p => p.complianceStatus === "non-compliant").length },
  ];

  const typeOptions = [
    { value: "all", label: "All Types", count: mockProjects.length },
    { value: "ml", label: "Machine Learning", count: mockProjects.filter(p => p.type === "ml").length },
    { value: "llm", label: "Language Models", count: mockProjects.filter(p => p.type === "llm").length },
    { value: "computer-vision", label: "Computer Vision", count: mockProjects.filter(p => p.type === "computer-vision").length },
    { value: "nlp", label: "Natural Language Processing", count: mockProjects.filter(p => p.type === "nlp").length },
  ];

  const riskOptions = [
    { value: "all", label: "All Risk Levels", count: mockProjects.length },
    { value: "low", label: "Low Risk", count: mockProjects.filter(p => p.riskLevel === "low").length },
    { value: "medium", label: "Medium Risk", count: mockProjects.filter(p => p.riskLevel === "medium").length },
    { value: "high", label: "High Risk", count: mockProjects.filter(p => p.riskLevel === "high").length },
  ];

  const teamOptions = [
    { value: "all", label: "All Teams", count: mockProjects.length },
    { value: "data-science", label: "Data Science", count: mockProjects.filter(p => p.team?.members?.some(t => t.department === "data-science")).length },
    { value: "ml-engineering", label: "ML Engineering", count: mockProjects.filter(p => p.team?.members?.some(t => t.department === "ml-engineering")).length },
    { value: "compliance", label: "Compliance", count: mockProjects.filter(p => p.team?.members?.some(t => t.department === "compliance")).length },
    { value: "audit", label: "Audit", count: mockProjects.filter(p => p.team?.members?.some(t => t.department === "audit")).length },
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
                  Projects
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <CreateProjectDialog>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    New Project
                  </Button>
                </CreateProjectDialog>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="border-b">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col lg:flex-row gap-6 mb-6">
                {/* Search */}
                <div className="flex-1 space-y-4 lg:w-1/3">
                  <div className="relative">
                    <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex-1 space-y-4 lg:w-2/3 xl:w-1/4">
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
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">
                  {filteredProjects.length} Projects
                </h2>
                <p className="text-muted-foreground">
                  Manage and govern your AI projects with comprehensive compliance tracking
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
                                variant={project.complianceStatus === "compliant" ? "default" : "destructive"}
                                className="mr-2"
                              >
                                {project.complianceStatus === "compliant" ? "Compliant" :
                                 project.complianceStatus === "non-compliant" ? "Non-Compliant" : "Under Review"}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="mr-2"
                              >
                                {project.riskLevel}
                              </Badge>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Risk Level: {project.riskLevel}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Compliance Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Team Collaboration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FolderTree className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Artifact Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">Public Access</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4 inline" />
                        Created {project.created.toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/projects/${project.id}`}>
                            View Details
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
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Archive
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

export default ProjectsPage;