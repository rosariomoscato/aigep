"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  BarChart3,
  FileCheck,
  Search,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  User,
  HelpCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ui/mode-toggle";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const primaryNav = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Projects", href: "/projects", icon: FileCheck },
    { name: "Compliance", href: "/compliance", icon: Shield },
    { name: "Audit", href: "/audit", icon: Search },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const mockNotifications = [
    { id: 1, title: "Compliance review due", project: "Credit Scoring Model", urgent: true },
    { id: 2, title: "Audit request submitted", project: "Chatbot v2.0", urgent: false },
    { id: 3, title: "Certificate expiring soon", project: "HR Assistant", urgent: false },
  ];

  const mockUser = {
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    role: "Compliance Officer",
    avatar: null,
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-md"
      >
        Skip to main content
      </a>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50" role="banner">
        <div className="container mx-auto px-4">
          {/* Top bar with branding and user actions */}
          <div className="flex justify-between items-center h-16">
            {/* Logo and branding */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 group"
                aria-label="AIGEP - AI Governance & Ethics Platform - Go to homepage"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    AIGEP
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    AI Governance & Ethics Platform
                  </span>
                </div>
              </Link>
            </div>

            {/* User actions */}
            <div className="flex items-center gap-3" role="group" aria-label="User actions">
              {/* Search */}
              <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-muted-foreground">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search...</span>
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full" aria-hidden="true"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mockNotifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                      <div className="flex items-start gap-2 w-full">
                        {notification.urgent && (
                          <div className="h-2 w-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.project}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/notifications" className="w-full text-center text-sm">
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{mockUser.name}</p>
                      <p className="text-xs text-muted-foreground">{mockUser.role}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
                      <Badge variant="secondary" className="w-fit mt-1">
                        {mockUser.role}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme toggle */}
              <ModeToggle />

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Primary navigation */}
          <nav className="hidden md:flex border-t" aria-label="Primary navigation">
            <ul className="flex gap-1">
              {primaryNav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-t-md"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t">
              <nav className="py-2" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {primaryNav.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
