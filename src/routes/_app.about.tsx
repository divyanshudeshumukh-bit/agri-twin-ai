import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Sparkles, Users, Rocket, Github, Mail } from "lucide-react";

export const Route = createFileRoute("/_app/about")({
  head: () => ({ meta: [{ title: "About · AgriTwin AI" }] }),
  component: About,
});

function About() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass rounded-3xl p-8 shadow-elegant text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-primary opacity-10" />
        <div className="mx-auto h-16 w-16 rounded-2xl gradient-primary grid place-items-center shadow-glow">
          <Leaf className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mt-4">AgriTwin AI</h1>
        <p className="text-muted-foreground mt-2">AI-Powered Digital Twin Platform for Precision Agriculture</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          Built by <span className="font-semibold text-foreground">Team Tech Wizards</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
            <Rocket className="h-4 w-4" /> Mission
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Bring precision agriculture to every farm — through a real-time digital twin that
            mirrors soil, plants and weather, and turns telemetry into actionable AI
            recommendations any grower can trust.
          </p>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
            <Users className="h-4 w-4" /> The Team
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Team Tech Wizards</strong> — a group of engineers, designers and agronomy enthusiasts building intuitive tools for sustainable farming.
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">What we built</div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
          {[
            "Real-time farm command center",
            "AI-powered smart scan",
            "Smart irrigation controller",
            "Fertilizer advisor",
            "Farm zone monitoring",
            "Alerts & notifications center",
            "Sensor network topology",
            "Analytics & reports",
          ].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-2xl p-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          © 2025 AgriTwin AI · Built by Team Tech Wizards · v1.1.0
        </div>
        <div className="flex gap-3">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><Github className="h-4 w-4" /> GitHub</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><Mail className="h-4 w-4" /> Contact</a>
        </div>
      </div>
    </div>
  );
}
