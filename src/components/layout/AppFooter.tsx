import { Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AppFooter() {
  return (
    <footer className="mt-8 border-t border-border/50 glass">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">AgriTwin AI</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-primary" />
            Built by <span className="font-semibold text-foreground">Team Tech Wizards</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>v1.1.0</span>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
        </div>
      </div>
    </footer>
  );
}
