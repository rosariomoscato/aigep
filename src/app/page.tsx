import Link from "next/link";
import { Shield, BarChart3, Users, FileCheck, Search, BookOpen, FolderTree, TrendingUp, Library, MonitorSpeaker, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/20 py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                  AIGEP
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
                AI Governance & Ethics Platform
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive compliance, risk assessment, and certification platform for AI products
                — supporting both traditional ML and LLM-based applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/docs">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Complete AI Governance Solution
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  Compliance Management
                </CardTitle>
                <CardDescription>
                  Automated compliance checks for AI Act, Rome Call, and industry standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• EU AI Act requirements validation</li>
                  <li>• Rome Call ethics principles</li>
                  <li>• Bias and fairness detection</li>
                  <li>• Risk assessment tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  Certification System
                </CardTitle>
                <CardDescription>
                  Quality badges and certification workflows with public verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Automated quality scoring</li>
                  <li>• Certification badge issuance</li>
                  <li>• Public verification interface</li>
                  <li>• Expiration and renewal</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  Multi-Role Platform
                </CardTitle>
                <CardDescription>
                  Role-based workflows for different stakeholders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Data Scientists & ML Engineers</li>
                  <li>• Compliance Officers</li>
                  <li>• External Auditors</li>
                  <li>• Product Managers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MonitorSpeaker className="h-6 w-6 text-primary" />
                  </div>
                  Monitoring & Analytics
                </CardTitle>
                <CardDescription>
                  Real-time monitoring and comprehensive analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Model performance tracking</li>
                  <li>• Drift detection alerts</li>
                  <li>• Compliance metrics</li>
                  <li>• Audit trail logging</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  Project Management
                </CardTitle>
                <CardDescription>
                  Complete artifact versioning and project collaboration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• ML and LLM project types</li>
                  <li>• Complete artifact versioning</li>
                  <li>• Team collaboration</li>
                  <li>• Advanced search & filtering</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Library className="h-6 w-6 text-primary" />
                  </div>
                  Documentation & Learning
                </CardTitle>
                <CardDescription>
                  Comprehensive guides, tutorials, and best practices for AI governance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Interactive learning paths</li>
                  <li>• Compliance framework guides</li>
                  <li>• Best practice documentation</li>
                  <li>• Video tutorials and webinars</li>
                  <li>• Community forum access</li>
                  <li>• Expert certification resources</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your AI Governance?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join organizations that trust AIGEP for their AI compliance and certification needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/dashboard">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}