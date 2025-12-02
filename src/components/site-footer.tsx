import { Shield } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <p>
            Built with{" "}
            <span className="font-semibold">AIGEP</span>
            {" "}
            <span className="text-primary hover:underline">AI Governance & Ethics Platform</span>
          </p>
        </div>
      </div>
    </footer>
  );
}