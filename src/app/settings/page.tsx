"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Key,
  Moon,
  Sun,
  Globe,
  Lock,
  Mail,
  Database,
  Smartphone,
  MonitorSpeaker,
  HelpCircle,
  Check,
  X,
  Save,
  RotateCcw,
  Trash2,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  MoreHorizontal,
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [apiNotifications, setApiNotifications] = useState(false);

  // Mock user data
  const mockUser = {
    name: "Alex Johnson",
    email: "alex.johnson@aigep.com",
    role: "Product Manager",
    avatar: "/avatars/alex.jpg",
    department: "Data Science",
    organization: "AI Governance Platform",
    joinDate: new Date("2023-01-15T10:30:00Z"),
    lastLogin: new Date("2024-12-03T09:45:00Z"),
    permissions: {
      projects: true,
      compliance: true,
      audit: true,
      reports: true,
      settings: true,
      admin: false,
    },
  };

  const notificationSettings = [
    {
      id: "email_notices",
      title: "Email Notifications",
      description: "Receive email updates about projects, compliance reviews, and audit results",
      enabled: emailNotifications,
      onChange: setEmailNotifications,
      icon: <Mail className="h-5 w-5" />,
    },
    {
      id: "api_alerts",
      title: "API Notifications",
      description: "Get real-time API alerts for critical compliance events",
      enabled: apiNotifications,
      onChange: setApiNotifications,
      icon: <MonitorSpeaker className="h-5 w-5" />,
    },
    {
      id: "in_app",
      title: "In-App Notifications",
      description: "Show desktop notifications for important updates",
      enabled: notifications,
      onChange: setNotifications,
      icon: <Bell className="h-5 w-5" />,
    },
  ];

  const securitySettings = [
    {
      id: "2fa",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      enabled: twoFactor,
      onChange: setTwoFactor,
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  const dataManagementItems = [
    {
      id: "export_data",
      title: "Export Data",
      description: "Download all your data in various formats",
      action: "Export",
      icon: <Download className="h-5 w-5" />,
      badge: "CSV, JSON, PDF",
    },
    {
      id: "import_data",
      title: "Import Data",
      description: "Upload data from other compliance platforms",
      action: "Import",
      icon: <Upload className="h-5 w-5" />,
      badge: "CSV, JSON",
    },
    {
      id: "backup",
      title: "Backup Settings",
      description: "Configure automatic backups of your settings and data",
      action: "Configure",
      icon: <Database className="h-5 w-5" />,
      badge: "Daily",
    },
    {
      id: "clear_cache",
      title: "Clear Cache",
      description: "Remove temporary files and improve performance",
      action: "Clear",
      icon: <Trash2 className="h-5 w-5" />,
      badge: "Last: 2 days ago",
    },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Settings className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Settings
                </h1>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage your profile, security, and application preferences
            </p>
          </div>

          {/* Settings Content */}
          <div className="container mx-auto px-4 py-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="data">Data Management</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <User className="h-6 w-6 text-primary" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Manage your personal information and account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-8 w-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">
                              {mockUser.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {mockUser.role} • {mockUser.department}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={mockUser.name} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" defaultValue={mockUser.email} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization</Label>
                          <Input id="organization" defaultValue={mockUser.organization} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="theme">Theme</Label>
                          <Select value={darkMode ? "dark" : "light"} onValueChange={(value) => setDarkMode(value === "dark")}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">
                                <div className="flex items-center gap-2">
                                  <Sun className="h-4 w-4" />
                                  Light
                                </div>
                              </SelectItem>
                              <SelectItem value="dark">
                                <div className="flex items-center gap-2">
                                  <Moon className="h-4 w-4" />
                                  Dark
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Bell className="h-6 w-6 text-primary" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to be notified about important updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {notificationSettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {setting.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {setting.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={setting.onChange}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-primary" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account security and authentication preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {securitySettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {setting.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {setting.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {setting.description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={setting.enabled}
                          onCheckedChange={setting.onChange}
                        />
                      </div>
                    ))}

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Password & Authentication
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start">
                          <Key className="h-4 w-4 mr-2" />
                          Change Password
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Data Management Tab */}
              <TabsContent value="data" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Database className="h-6 w-6 text-primary" />
                      Data Management
                    </CardTitle>
                    <CardDescription>
                      Export, import, and manage your compliance data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dataManagementItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            {item.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SettingsPage;