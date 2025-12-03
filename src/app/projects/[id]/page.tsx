import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Edit,
  FileText,
  FolderTree,
  Users,
  Shield,
  Settings,
  MoreHorizontal,
  Eye,
  Trash2,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProjects } from "@/lib/mock-data/projects";
import { mockUsers } from "@/lib/mock-data/users";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectId = params.id;
  const project = mockProjects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }

  const teamMembers = mockUsers.filter(u => project.team?.some(member => member.id));

  return (
    <main className="flex-1 min-h-[calc(100vh-4rem)]">
      {/* Project Header */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                {project.name}
              </h1>
              <Badge
                variant={project.complianceStatus === "compliant" ? "default" : project.complianceStatus === "non-compliant" ? "destructive" : "secondary"}
                className="ml-2"
              >
                {project.type.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg text-muted-foreground">{teamMembers.length} Team Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg text-muted-foreground">
                  Created: {project.created.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          </div>
        </section>

      {/* Project Content */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Overview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          project.complianceStatus === "compliant" ? "default" :
                          project.complianceStatus === "non-compliant" ? "destructive" : "secondary"
                        }
                        className="mr-2"
                      >
                        {project.type.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {project.complianceStatus === "compliant" ? "Compliant" :
                          project.complianceStatus === "non-compliant" ? "Non-Compliant" :
                          project.complianceStatus === "under-review" ? "Under Review" : "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <FolderTree className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.artifacts?.length || 0} Artifacts</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.documentation?.length || 0} Documents</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>

            {/* Team & Collaboration Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Team & Collaboration</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="mr-2">
                        {teamMembers.length}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Team Members</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Public Access</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>

            {/* Compliance Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Compliance Status</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          project.riskLevel === "high" ? "destructive" :
                          project.riskLevel === "medium" ? "default" :
                          project.riskLevel === "low" ? "secondary" : "outline"
                        }
                        className="mr-2"
                      >
                        {project.riskLevel.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Risk Level: {project.riskLevel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Last Review: {project.lastReviewed?.toLocaleDateString() || "Not reviewed"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>

            {/* Activity Timeline Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Activity Timeline</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}