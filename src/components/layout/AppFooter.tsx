import { Github } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="mt-8 border-t border-border/50 glass">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-foreground">AgriTwin AI</span>
          <span className="hidden sm:inline">Powered by AMD Instinct™</span>
          <span className="hidden sm:inline">· Fireworks AI</span>
        </div>
        <div className="flex items-center gap-4">
          <span>v1.0.0</span>
          <a href="#" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
