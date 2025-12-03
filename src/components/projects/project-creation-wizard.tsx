"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronRight,
  FileText,
  Shield,
  AlertTriangle,
  Settings,
  Users,
  ArrowLeft,
  CheckCircle2,
  Layers,
  HelpCircle,
} from "lucide-react"
import { Brain, Code, Bot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Project, ProjectType, ComplianceFramework } from "@/lib/mock-data/projects"
import { mockUsers } from "@/lib/mock-data/users"

interface ProjectTemplate {
  id: string
  name: string
  description: string
  type: ProjectType
  icon: React.ReactNode
  frameworks: ComplianceFramework[]
  estimatedTime: string
  complexity: 'Simple' | 'Moderate' | 'Complex'
}

const projectTemplates: ProjectTemplate[] = [
  {
    id: 'ml-classification',
    name: 'Classification Model',
    description: 'Binary or multi-class classification for structured data',
    type: 'ml',
    icon: <Brain className="h-5 w-5" />,
    frameworks: ['eu-ai-act'],
    estimatedTime: '2-3 weeks',
    complexity: 'Moderate'
  },
  {
    id: 'ml-regression',
    name: 'Regression Model',
    description: 'Predictive modeling for continuous values',
    type: 'ml',
    icon: <Code className="h-5 w-5" />,
    frameworks: ['eu-ai-act', 'iso-42001'],
    estimatedTime: '2-4 weeks',
    complexity: 'Moderate'
  },
  {
    id: 'llm-chatbot',
    name: 'Chatbot/Assistant',
    description: 'Conversational AI for customer service or internal support',
    type: 'llm',
    icon: <Bot className="h-5 w-5" />,
    frameworks: ['eu-ai-act', 'rome-call'],
    estimatedTime: '4-6 weeks',
    complexity: 'Complex'
  },
  {
    id: 'llm-content',
    name: 'Content Generation',
    description: 'Automated content creation for marketing or documentation',
    type: 'llm',
    icon: <FileText className="h-5 w-5" />,
    frameworks: ['eu-ai-act', 'nist-ai-600'],
    estimatedTime: '3-5 weeks',
    complexity: 'Complex'
  }
]

const availableFrameworks = [
  { id: 'eu-ai-act', name: 'EU AI Act', description: 'European Union Artificial Intelligence Act' },
  { id: 'rome-call', name: 'Rome Call', description: 'Rome Call for AI Ethics' },
  { id: 'iso-42001', name: 'ISO 42001', description: 'AI Management System Standard' },
  { id: 'nist-ai-600', name: 'NIST AI 600', description: 'AI Risk Management Framework' },
]

const complexityColors = {
  Simple: 'bg-green-100 text-green-800',
  Moderate: 'bg-yellow-100 text-yellow-800',
  Complex: 'bg-red-100 text-red-800'
}

interface CreateProjectWizardProps {
  onClose?: () => void
}

export default function CreateProjectWizard({ onClose }: CreateProjectWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    type: '' as ProjectType | '',
    selectedTemplate: '' as string,
    frameworks: [] as ComplianceFramework[],
    teamMembers: [] as string[],
    publicAccess: false,
    requirements: {
      dataCollection: false,
      modelTraining: false,
      deployment: false,
      monitoring: false,
    }
  })

  const totalSteps = 4

  const updateProjectData = (key: string, value: any) => {
    setProjectData(prev => ({ ...prev, [key]: value }))
  }

  const updateRequirements = (key: string, checked: boolean) => {
    setProjectData(prev => ({
      ...prev,
      requirements: { ...prev.requirements, [key]: checked }
    }))
  }

  const addTeamMember = (userId: string) => {
    if (!projectData.teamMembers.includes(userId)) {
      updateProjectData('teamMembers', [...projectData.teamMembers, userId])
    }
  }

  const removeTeamMember = (userId: string) => {
    updateProjectData('teamMembers', projectData.teamMembers.filter(id => id !== userId))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return projectData.name.trim() && projectData.description.trim() && projectData.type
      case 2:
        return projectData.selectedTemplate && projectData.frameworks.length > 0
      case 3:
        return projectData.requirements.dataCollection && projectData.requirements.modelTraining
      default:
        return true
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Create project and navigate
      handleCreateProject()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateProject = () => {
    // In a real app, this would create the project via API

    // Navigate to the new project
    const projectId = 'project-new-' + Date.now()
    router.push(`/projects/${projectId}`)

    onClose?.()
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = projectTemplates.find(t => t.id === templateId)
    if (template) {
      updateProjectData('selectedTemplate', templateId)
      updateProjectData('type', template.type)
      updateProjectData('frameworks', template.frameworks)
    }
  }

  const teamMemberUsers = mockUsers.filter(user => user.role !== 'admin')

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Button>
            <h1 className="text-2xl font-bold">Create New Project</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </div>
              Basic Information
            </CardTitle>
            <CardDescription>
              Provide the basic details about your AI project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name *</Label>
                <Input
                  id="project-name"
                  value={projectData.name}
                  onChange={(e) => updateProjectData('name', e.target.value)}
                  placeholder="e.g., Customer Service Chatbot"
                />
              </div>

              <div className="space-y-2">
                <Label>Project Type *</Label>
                <Select value={projectData.type} onValueChange={(value) => updateProjectData('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="llm">Large Language Model</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description *</Label>
              <Textarea
                id="project-description"
                value={projectData.description}
                onChange={(e) => updateProjectData('description', e.target.value)}
                placeholder="Describe the purpose, scope, and intended use of your AI project..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Public Access</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="public-access"
                  checked={projectData.publicAccess}
                  onCheckedChange={(checked) => updateProjectData('publicAccess', checked)}
                />
                <Label htmlFor="public-access" className="text-sm font-normal">
                  Make this project accessible to all team members
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Template Selection */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              Choose Template & Framework
            </CardTitle>
            <CardDescription>
              Select a template to get started and choose compliance frameworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Templates */}
            <div className="space-y-4">
              <Label>Project Template</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectTemplates.filter(template =>
                  projectData.type ? template.type === projectData.type : true
                ).map(template => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                      projectData.selectedTemplate === template.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {template.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{template.name}</h3>
                            <Badge
                              variant="outline"
                              className={`text-xs ${complexityColors[template.complexity]}`}
                            >
                              {template.complexity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {template.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{template.estimatedTime}</span>
                            <span>{template.frameworks.length} frameworks</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Frameworks */}
            <div className="space-y-4">
              <Label>Compliance Frameworks *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableFrameworks.map(framework => (
                  <div key={framework.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={framework.id}
                      checked={projectData.frameworks.includes(framework.id as ComplianceFramework)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateProjectData('frameworks', [...projectData.frameworks, framework.id as ComplianceFramework])
                        } else {
                          updateProjectData('frameworks', projectData.frameworks.filter(f => f !== framework.id))
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor={framework.id} className="font-medium cursor-pointer">
                        {framework.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {framework.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Project Requirements */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              Project Requirements
            </CardTitle>
            <CardDescription>
              Define the requirements and scope of your AI project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Project Components *</Label>
                {Object.entries(projectData.requirements).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => updateRequirements(key, checked)}
                    />
                    <Label htmlFor={key} className="text-sm font-normal">
                      {key.split(/(?=[A-Z])/).join(' ').charAt(0).toUpperCase() +
                       key.split(/(?=[A-Z])/).join(' ').slice(1)}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Label>Project Timeline</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Expected Duration</span>
                    <span className="text-sm font-medium">4-6 weeks</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Team Size</span>
                    <span className="text-sm font-medium">
                      {projectData.teamMembers.length + 1} members
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Compliance Reviews</span>
                    <span className="text-sm font-medium">
                      {projectData.frameworks.length} required
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Team Setup */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                4
              </div>
              Team Setup
            </CardTitle>
            <CardDescription>
              Invite team members and assign roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Available Team Members</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teamMemberUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.role.replace('_', ' ')} • {user.organization}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant={projectData.teamMembers.includes(user.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (projectData.teamMembers.includes(user.id)) {
                          removeTeamMember(user.id)
                        } else {
                          addTeamMember(user.id)
                        }
                      }}
                    >
                      {projectData.teamMembers.includes(user.id) ? 'Added' : 'Add'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Project Summary</Label>
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">{projectData.name}</div>
                    <div className="text-sm text-muted-foreground">{projectData.type.toUpperCase()} Project</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">
                      {projectData.teamMembers.length + 1} Team Members
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Including yourself as project lead
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">
                      {projectData.frameworks.length} Compliance Frameworks
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {projectData.frameworks.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onClose : handlePrevious}
        >
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
          <span>Need help? View our documentation</span>
        </div>

        <Button
          onClick={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === totalSteps ? 'Create Project' : 'Next'}
          {currentStep < totalSteps && <ChevronRight className="h-4 w-4 ml-1" />}
        </Button>
      </div>
    </div>
  )
}