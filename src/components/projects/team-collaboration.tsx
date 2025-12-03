"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  UserPlus,
  Settings,
  MessageSquare,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Star,
  Shield,
  Activity,
  TrendingUp,
  GitBranch,
  GitCommit,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Crown,
  User,
  UserCheck,
  UserX,
  Bell,
  BellOff,
  Coffee,
  Zap,
  Target,
  Code,
  Database,
  BookOpen,
  GraduationCap,
  Building,
  Globe,
  Heart,
  Share,
  Copy,
  ExternalLink,
  Download,
  Upload,
  RefreshCw,
  Grid,
  List
} from "lucide-react"
import { mockUsers } from "@/lib/mock-data/users"

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'data_scientist' | 'compliance_officer' | 'auditor' | 'product_manager' | 'admin'
  avatar?: string
  organization: string
  department: string
  joinedAt: string
  lastActive: string
  status: 'active' | 'inactive' | 'away' | 'busy'
  permissions: string[]
  projects: number
  completedTasks: number
  skills: string[]
  bio?: string
}

interface TeamActivity {
  id: string
  type: 'project_created' | 'file_uploaded' | 'comment_added' | 'task_completed' | 'role_changed'
  userId: string
  userName: string
  description: string
  timestamp: Date
  projectId?: string
  projectName?: string
  metadata?: Record<string, any>
}

interface TeamCollaborationProps {
  projectId: string
  teamMembers: TeamMember[]
  activities: TeamActivity[]
  onInviteMember?: (email: string, role: string) => void
  onUpdateRole?: (memberId: string, role: string) => void
  onRemoveMember?: (memberId: string) => void
  onUpdatePermissions?: (memberId: string, permissions: string[]) => void
}

export default function TeamCollaboration({
  projectId,
  teamMembers,
  activities,
  onInviteMember,
  onUpdateRole,
  onRemoveMember,
  onUpdatePermissions
}: TeamCollaborationProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter team members
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || member.role === selectedRole
    const matchesDepartment = selectedDepartment === "all" || member.department === selectedDepartment
    return matchesSearch && matchesRole && matchesDepartment
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />
      case 'data_scientist': return <Code className="h-4 w-4" />
      case 'compliance_officer': return <BookOpen className="h-4 w-4" />
      case 'auditor': return <Award className="h-4 w-4" />
      case 'product_manager': return <Target className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-50'
      case 'data_scientist': return 'text-blue-600 bg-blue-50'
      case 'compliance_officer': return 'text-green-600 bg-green-50'
      case 'auditor': return 'text-orange-600 bg-orange-50'
      case 'product_manager': return 'text-pink-600 bg-pink-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case 'inactive': return <div className="w-2 h-2 bg-gray-400 rounded-full" />
      case 'away': return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      case 'busy': return <div className="w-2 h-2 bg-red-500 rounded-full" />
      default: return <div className="w-2 h-2 bg-gray-400 rounded-full" />
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project_created': return <Star className="h-4 w-4" />
      case 'file_uploaded': return <Upload className="h-4 w-4" />
      case 'comment_added': return <MessageSquare className="h-4 w-4" />
      case 'task_completed': return <CheckCircle2 className="h-4 w-4" />
      case 'role_changed': return <Users className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const formatActivityDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-lg font-semibold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1">
                {getStatusIcon(member.status)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {member.name}
                {member.role === 'admin' && <Crown className="h-3 w-3 text-yellow-600" />}
              </CardTitle>
              <p className="text-sm text-muted-foreground truncate">
                {member.email}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="outline"
                  className={`text-xs ${getRoleColor(member.role)}`}
                >
                  <div className="flex items-center space-x-1">
                    {getRoleIcon(member.role)}
                    <span>{member.role.replace('_', ' ')}</span>
                  </div>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {member.department}
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
              <DropdownMenuItem onClick={() => setSelectedMember(member)}>
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Role
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Permissions
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <UserX className="h-4 w-4 mr-2" />
                Remove from Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">
          <p className="font-medium">{member.organization}</p>
          <p className="text-muted-foreground">Last active: {member.lastActive}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-600" />
            <span>{member.projects} projects</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="h-3 w-3 text-green-600" />
            <span>{member.completedTasks} tasks</span>
          </div>
        </div>

        {member.skills.length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Skills</p>
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{member.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {member.bio && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {member.bio}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Joined {formatDate(member.joinedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm">
              <Mail className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedMember(member)}>
              <User className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )

  const TeamMemberListItem = ({ member }: { member: TeamMember }) => (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-sm font-semibold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              <div className="absolute -bottom-0 -right-0">
                {getStatusIcon(member.status)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-medium truncate">
                  {member.name}
                  {member.role === 'admin' && <Crown className="h-3 w-3 text-yellow-600 ml-1 inline" />}
                </h3>
                <Badge
                  variant="outline"
                  className={`text-xs ${getRoleColor(member.role)}`}
                >
                  <div className="flex items-center space-x-1">
                    {getRoleIcon(member.role)}
                    <span>{member.role.replace('_', ' ')}</span>
                  </div>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {member.department}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{member.email}</p>
              <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                <span>{member.organization}</span>
                <span>{member.projects} projects</span>
                <span>Last active: {member.lastActive}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelectedMember(member)}>
              <User className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Role
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Permissions
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <UserX className="h-4 w-4 mr-2" />
                  Remove from Team
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
          <h2 className="text-2xl font-bold">Team Collaboration</h2>
          <p className="text-muted-foreground">
            Manage team members, roles, and track project collaboration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join the project team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invite-email">Email Address *</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="colleague@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invite-role">Role *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="data_scientist">Data Scientist</SelectItem>
                        <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
                        <SelectItem value="auditor">Auditor</SelectItem>
                        <SelectItem value="product_manager">Product Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-message">Personal Message (Optional)</Label>
                  <Textarea
                    id="invite-message"
                    placeholder="Add a personal message to the invitation..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'View projects',
                      'Edit projects',
                      'Upload artifacts',
                      'Review compliance',
                      'Manage team',
                      'View analytics'
                    ].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <input type="checkbox" id={permission} defaultChecked />
                        <Label htmlFor={permission} className="text-sm font-normal">
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setInviteDialogOpen(false)}>
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Team Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team Members ({teamMembers.length})
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity Feed
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="data_scientist">Data Scientist</SelectItem>
                  <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="product_manager">Product Manager</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="ml-engineering">ML Engineering</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
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

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Members</p>
                    <p className="text-2xl font-bold">{teamMembers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-100">
                    <div className="w-5 h-5 bg-green-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Now</p>
                    <p className="text-2xl font-bold">
                      {teamMembers.filter(m => m.status === 'active').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Departments</p>
                    <p className="text-2xl font-bold">
                      {new Set(teamMembers.map(m => m.department)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Star className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completed Tasks</p>
                    <p className="text-2xl font-bold">
                      {teamMembers.reduce((sum, m) => sum + m.completedTasks, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          {filteredMembers.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
              {filteredMembers.map((member) =>
                viewMode === "grid" ? (
                  <TeamMemberCard key={member.id} member={member} />
                ) : (
                  <TeamMemberListItem key={member.id} member={member} />
                )
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Team Members Found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchTerm || selectedRole !== "all" || selectedDepartment !== "all"
                    ? "No team members match your current filters."
                    : "Invite team members to collaborate on this project."}
                </p>
                {searchTerm || selectedRole !== "all" || selectedDepartment !== "all" ? (
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("")
                    setSelectedRole("all")
                    setSelectedDepartment("all")
                  }}>
                    Clear Filters
                  </Button>
                ) : (
                  <Button onClick={() => setInviteDialogOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite First Member
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{activity.userName}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.description}
                          </p>
                          {activity.projectName && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Project: {activity.projectName}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            {formatActivityDate(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Team members with highest task completion rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers
                    .sort((a, b) => b.completedTasks - a.completedTasks)
                    .slice(0, 5)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{member.completedTasks}</p>
                          <p className="text-xs text-muted-foreground">tasks completed</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Average task completion by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(new Set(teamMembers.map(m => m.department))).map(dept => {
                    const deptMembers = teamMembers.filter(m => m.department === dept)
                    const avgTasks = deptMembers.reduce((sum, m) => sum + m.completedTasks, 0) / deptMembers.length
                    return (
                      <div key={dept} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{dept}</p>
                          <p className="text-xs text-muted-foreground">{deptMembers.length} members</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{Math.round(avgTasks)}</p>
                          <p className="text-xs text-muted-foreground">avg tasks</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
              <CardDescription>
                Manage permissions for different team roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { role: 'admin', permissions: ['All permissions', 'Manage users', 'System settings'] },
                  { role: 'data_scientist', permissions: ['Create projects', 'Upload artifacts', 'View analytics', 'Edit own projects'] },
                  { role: 'compliance_officer', permissions: ['View all projects', 'Review compliance', 'Approve projects', 'Issue certifications'] },
                  { role: 'auditor', permissions: ['View projects', 'View compliance', 'View analytics', 'Download evidence'] },
                  { role: 'product_manager', permissions: ['View projects', 'View compliance', 'View analytics', 'Manage team'] }
                ].map((roleConfig) => (
                  <div key={roleConfig.role} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(roleConfig.role)}
                        <h3 className="font-medium capitalize">{roleConfig.role.replace('_', ' ')}</h3>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {roleConfig.role}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {roleConfig.permissions.map((permission) => (
                        <div key={permission} className="flex items-center space-x-2 text-sm">
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Team Member Detail Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedMember && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {selectedMember.avatar ? (
                      <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-lg font-semibold text-primary">
                        {selectedMember.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{selectedMember.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Team member profile and activity
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Role</Label>
                      <Badge variant="outline" className={`mt-1 ${getRoleColor(selectedMember.role)}`}>
                        {selectedMember.role.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <Label>Department</Label>
                      <p className="font-medium mt-1">{selectedMember.department}</p>
                    </div>
                    <div>
                      <Label>Organization</Label>
                      <p className="font-medium mt-1">{selectedMember.organization}</p>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(selectedMember.status)}
                        <span className="capitalize">{selectedMember.status}</span>
                      </div>
                    </div>
                    <div>
                      <Label>Projects</Label>
                      <p className="font-medium mt-1">{selectedMember.projects}</p>
                    </div>
                    <div>
                      <Label>Completed Tasks</Label>
                      <p className="font-medium mt-1">{selectedMember.completedTasks}</p>
                    </div>
                  </div>
                  {selectedMember.bio && (
                    <div>
                      <Label>Bio</Label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedMember.bio}</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="projects" className="space-y-4">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Project History</h3>
                    <p className="text-muted-foreground">
                      Member has contributed to {selectedMember.projects} projects
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="skills" className="space-y-4">
                  <div className="space-y-2">
                    {selectedMember.skills.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="space-y-4">
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                    <p className="text-muted-foreground">
                      Last active: {selectedMember.lastActive}
                    </p>
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