"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  History,
  File,
  FileCode,
  FileQuestion,
  FileCheck,
  FileX,
  FolderOpen,
  HardDrive,
  Database,
  Cpu,
  Code,
  FilePlus,
  FileUp,
  FileDown,
  Copy,
  Move,
  Archive,
  Share,
  Lock,
  Unlock,
  EyeOff,
  Clock,
  Calendar,
  User,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Package,
  Layers,
  Grid,
  List,
  BarChart,
  PieChart,
  TrendingUp,
  Activity,
  Zap
} from "lucide-react"

interface Artifact {
  id: string
  name: string
  type: 'code' | 'model' | 'dataset' | 'documentation'
  version: string
  size: number
  uploadedBy: string
  uploadedAt: Date
  description?: string
  tags?: string[]
  status: 'uploading' | 'processing' | 'ready' | 'error'
  dependencies?: string[]
  versions?: Array<{
    version: string
    uploadedAt: Date
    uploadedBy: string
    changelog?: string
  }>
  permissions: {
    canView: string[]
    canEdit: string[]
    canDelete: string[]
  }
  metadata?: Record<string, any>
}

interface ArtifactManagerProps {
  projectId: string
  artifacts: Artifact[]
  onArtifactUpload?: (artifact: Omit<Artifact, 'id' | 'uploadedAt' | 'versions'>) => void
  onArtifactUpdate?: (id: string, updates: Partial<Artifact>) => void
  onArtifactDelete?: (id: string) => void
}

export default function ArtifactManager({
  projectId,
  artifacts,
  onArtifactUpload,
  onArtifactUpdate,
  onArtifactDelete
}: ArtifactManagerProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [versionDialogOpen, setVersionDialogOpen] = useState(false)
  const [compareDialogOpen, setCompareDialogOpen] = useState(false)

  // Filter artifacts
  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch = artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artifact.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artifact.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || artifact.type === selectedType
    const matchesStatus = selectedStatus === "all" || artifact.status === selectedStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case 'model': return <Cpu className="h-5 w-5 text-blue-600" />
      case 'code': return <Code className="h-5 w-5 text-green-600" />
      case 'dataset': return <Database className="h-5 w-5 text-orange-600" />
      case 'documentation': return <FileText className="h-5 w-5 text-purple-600" />
      default: return <File className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return <Upload className="h-4 w-4 text-blue-600 animate-pulse" />
      case 'processing': return <Zap className="h-4 w-4 text-yellow-600 animate-pulse" />
      case 'ready': return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <FileQuestion className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'text-blue-600 bg-blue-50'
      case 'processing': return 'text-yellow-600 bg-yellow-50'
      case 'ready': return 'text-green-600 bg-green-50'
      case 'error': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
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

  const ArtifactCard = ({ artifact }: { artifact: Artifact }) => (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {getArtifactIcon(artifact.type)}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium truncate">
                {artifact.name}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="capitalize text-xs">
                  {artifact.type}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${getStatusColor(artifact.status)}`}
                >
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(artifact.status)}
                    <span>{artifact.status}</span>
                  </div>
                </Badge>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedArtifact(artifact)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVersionDialogOpen(true)}>
                <GitBranch className="h-4 w-4 mr-2" />
                Version History
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {artifact.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {artifact.description}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">v{artifact.version}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Size</span>
            <span className="font-medium">{formatFileSize(artifact.size)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Uploaded</span>
            <span className="font-medium">{formatDate(artifact.uploadedAt)}</span>
          </div>
        </div>

        {artifact.tags && artifact.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {artifact.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {artifact.status === 'uploading' && (
          <Progress value={65} className="h-2" />
        )}
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{artifact.uploadedBy}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedArtifact(artifact)}>
              <Eye className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )

  const ArtifactListItem = ({ artifact }: { artifact: Artifact }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="p-2 rounded-lg bg-primary/10">
              {getArtifactIcon(artifact.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium truncate">{artifact.name}</h3>
                <Badge variant="outline" className="capitalize text-xs">
                  {artifact.type}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${getStatusColor(artifact.status)}`}
                >
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(artifact.status)}
                    <span>{artifact.status}</span>
                  </div>
                </Badge>
              </div>
              {artifact.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {artifact.description}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                <span>Version v{artifact.version}</span>
                <span>{formatFileSize(artifact.size)}</span>
                <span>by {artifact.uploadedBy}</span>
                <span>{formatDate(artifact.uploadedAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedArtifact(artifact)}>
              <Eye className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setVersionDialogOpen(true)}>
                  <GitBranch className="h-4 w-4 mr-2" />
                  Version History
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Artifact Manager</h2>
          <p className="text-muted-foreground">
            Manage project files, models, datasets, and documentation with version control
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Artifact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Artifact</DialogTitle>
                <DialogDescription>
                  Add a new file, model, or dataset to the project
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="artifact-name">Name *</Label>
                  <Input id="artifact-name" placeholder="Enter artifact name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="artifact-type">Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="code">Code</SelectItem>
                        <SelectItem value="model">Model</SelectItem>
                        <SelectItem value="dataset">Dataset</SelectItem>
                        <SelectItem value="documentation">Documentation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artifact-version">Version</Label>
                    <Input id="artifact-version" placeholder="1.0.0" defaultValue="1.0.0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artifact-description">Description</Label>
                  <Textarea
                    id="artifact-description"
                    placeholder="Describe the artifact and its purpose..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artifact-file">File *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports all file types up to 10GB
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artifact-tags">Tags</Label>
                  <Input id="artifact-tags" placeholder="Add tags (comma separated)" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setUploadDialogOpen(false)}>
                  Upload Artifact
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <FilePlus className="h-4 w-4 mr-2" />
            Create Folder
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artifacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="code">Code</SelectItem>
              <SelectItem value="model">Model</SelectItem>
              <SelectItem value="dataset">Dataset</SelectItem>
              <SelectItem value="documentation">Documentation</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="uploading">Uploading</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Artifacts</p>
                <p className="text-2xl font-bold">{artifacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-100">
                <HardDrive className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Storage</p>
                <p className="text-2xl font-bold">
                  {formatFileSize(artifacts.reduce((sum, a) => sum + a.size, 0))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Zap className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Processing</p>
                <p className="text-2xl font-bold">
                  {artifacts.filter(a => a.status === 'processing').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <GitBranch className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Versions</p>
                <p className="text-2xl font-bold">
                  {artifacts.reduce((sum, a) => sum + (a.versions?.length || 0) + 1, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Artifacts */}
      {filteredArtifacts.length > 0 ? (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
          {filteredArtifacts.map((artifact) =>
            viewMode === "grid" ? (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ) : (
              <ArtifactListItem key={artifact.id} artifact={artifact} />
            )
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileX className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Artifacts Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || selectedType !== "all" || selectedStatus !== "all"
                ? "No artifacts match your current filters."
                : "Upload your first artifact to get started with file management."}
            </p>
            {searchTerm || selectedType !== "all" || selectedStatus !== "all" ? (
              <Button variant="outline" onClick={() => {
                setSearchTerm("")
                setSelectedType("all")
                setSelectedStatus("all")
              }}>
                Clear Filters
              </Button>
            ) : (
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload First Artifact
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Artifact Detail Dialog */}
      <Dialog open={!!selectedArtifact} onOpenChange={() => setSelectedArtifact(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedArtifact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  {getArtifactIcon(selectedArtifact.type)}
                  <span>{selectedArtifact.name}</span>
                </DialogTitle>
                <DialogDescription>
                  Artifact details and version history
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="versions">Versions</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Type</Label>
                      <Badge variant="outline" className="capitalize mt-1">
                        {selectedArtifact.type}
                      </Badge>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Badge
                        variant="outline"
                        className={`mt-1 ${getStatusColor(selectedArtifact.status)}`}
                      >
                        {selectedArtifact.status}
                      </Badge>
                    </div>
                    <div>
                      <Label>Version</Label>
                      <p className="font-medium">v{selectedArtifact.version}</p>
                    </div>
                    <div>
                      <Label>Size</Label>
                      <p className="font-medium">{formatFileSize(selectedArtifact.size)}</p>
                    </div>
                    <div>
                      <Label>Uploaded By</Label>
                      <p className="font-medium">{selectedArtifact.uploadedBy}</p>
                    </div>
                    <div>
                      <Label>Uploaded At</Label>
                      <p className="font-medium">{formatDate(selectedArtifact.uploadedAt)}</p>
                    </div>
                  </div>
                  {selectedArtifact.description && (
                    <div>
                      <Label>Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedArtifact.description}
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="versions" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Version {selectedArtifact.version}</p>
                        <p className="text-sm text-muted-foreground">
                          Current version • {formatDate(selectedArtifact.uploadedAt)}
                        </p>
                      </div>
                      <Badge variant="default">Current</Badge>
                    </div>
                    {selectedArtifact.versions?.map((version, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Version {version.version}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(version.uploadedAt)} • by {version.uploadedBy}
                          </p>
                          {version.changelog && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {version.changelog}
                            </p>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="metadata" className="space-y-4">
                  <div className="space-y-3">
                    {selectedArtifact.tags && selectedArtifact.tags.length > 0 && (
                      <div>
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedArtifact.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedArtifact.dependencies && selectedArtifact.dependencies.length > 0 && (
                      <div>
                        <Label>Dependencies</Label>
                        <div className="space-y-1 mt-1">
                          {selectedArtifact.dependencies.map((dep, index) => (
                            <Badge key={index} variant="outline" className="mr-2">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="permissions" className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label>Can View</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedArtifact.permissions.canView.map((user, index) => (
                          <Badge key={index} variant="outline">
                            {user}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Can Edit</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedArtifact.permissions.canEdit.map((user, index) => (
                          <Badge key={index} variant="outline">
                            {user}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>Can Delete</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedArtifact.permissions.canDelete.map((user, index) => (
                          <Badge key={index} variant="outline">
                            {user}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}