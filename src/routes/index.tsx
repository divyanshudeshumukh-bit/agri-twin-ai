import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf, Brain, LineChart, Sparkles, Box, Shield, Zap, ArrowRight, Github, Droplets, Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriTwin AI — AI-Powered Digital Twin for Precision Agriculture" },
      { name: "description", content: "AgriTwin AI is a real-time digital twin platform for precision farming, built by Team Tech Wizards." },
      { property: "og:title", content: "AgriTwin AI — Digital Twin for Precision Agriculture" },
      { property: "og:description", content: "Monitor soil, weather, plant health and get AI-driven recommendations in real time." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-40 glass border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-bold leading-tight">AgriTwin AI</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Precision Agriculture</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#workflow" className="hover:text-foreground transition-colors">Workflow</a>
            <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
            <a href="#team" className="hover:text-foreground transition-colors">Team</a>
          </div>
          <Link to="/home">
            <Button className="rounded-xl gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              Launch Platform <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-info/20 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Built by Team Tech Wizards
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight">
            The <span className="text-gradient">Digital Twin</span>
            <br /> for Precision Agriculture
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground">
            AgriTwin AI mirrors your farm in real time — from soil chemistry to plant health —
            and turns thousands of signals into actionable, AI-powered decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/home">
              <Button size="lg" className="rounded-xl gradient-primary text-primary-foreground shadow-glow hover:opacity-90 h-12 px-6">
                Launch Platform <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="rounded-xl h-12 px-6">
                Explore Features
              </Button>
            </a>
          </div>

          {/* Hero preview */}
          <div className="mt-16 glass rounded-3xl p-4 md:p-6 max-w-5xl mx-auto shadow-elegant">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Farm Health", value: "92%" },
                { label: "Water Saved", value: "34%" },
                { label: "Yield Boost", value: "+21%" },
                { label: "Plants Tracked", value: "1,240" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-background/60 border border-border/50 p-4 text-left">
                  <div className="text-xs uppercase text-muted-foreground tracking-wider">{s.label}</div>
                  <div className="mt-2 text-2xl font-bold text-gradient">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Features</div>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Built for modern precision farming.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { icon: Box, title: "Digital Farm Twin", desc: "A living replica of every plant, sensor and valve — updated in real time." },
            { icon: Brain, title: "AI Recommendations", desc: "Prioritized actions for irrigation, fertilizer and disease response." },
            { icon: LineChart, title: "Predictive Analytics", desc: "Forecast harvest yield, disease risk and water demand up to 30 days out." },
            { icon: Shield, title: "Disease Detection", desc: "Computer vision flags outbreaks before they spread across quadrants." },
            { icon: Droplets, title: "Smart Irrigation", desc: "Automate watering with hyper-local weather and soil chemistry data." },
            { icon: Radio, title: "IoT Sensor Network", desc: "Every zone monitored: soil, NPK, pH, humidity, light and more." },
          ].map((f) => (
            <div key={f.title} className="glass card-hover rounded-2xl p-6">
              <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center shadow-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="mx-auto max-w-7xl px-6 py-20">
        <div className="glass rounded-3xl p-10 shadow-elegant">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { k: "34%", v: "Less water used" },
              { k: "+21%", v: "Higher yield" },
              { k: "72%", v: "Faster disease response" },
              { k: "18%", v: "Reduced fertilizer" },
            ].map((b) => (
              <div key={b.v}>
                <div className="text-5xl font-bold text-gradient">{b.k}</div>
                <div className="mt-2 text-sm text-muted-foreground">{b.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Workflow</div>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Sensors to decisions, in one loop.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          {[
            { t: "Field Sensors", d: "Soil, weather and drone cameras" },
            { t: "Edge Gateway", d: "Local aggregation & filtering" },
            { t: "Digital Twin", d: "Real-time simulation of your farm" },
            { t: "AI Assistant", d: "Recommendations you can act on" },
          ].map((s, i) => (
            <div key={s.t} className="relative glass rounded-2xl p-6">
              <div className="text-3xl font-bold text-gradient">0{i + 1}</div>
              <h3 className="mt-2 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <div className="glass rounded-3xl p-10 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 -z-10 gradient-primary opacity-10" />
          <h2 className="text-4xl font-bold tracking-tight">Ready to see your farm come alive?</h2>
          <p className="mt-3 text-muted-foreground">Launch the interactive AgriTwin AI platform.</p>
          <Link to="/home">
            <Button size="lg" className="mt-6 h-12 px-8 rounded-xl gradient-primary text-primary-foreground shadow-glow">
              Launch Platform <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 -z-10 gradient-primary opacity-10" />
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">The Team</div>
          <h2 className="mt-2 text-3xl font-bold">Built by Team Tech Wizards</h2>
          <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
            A crew of engineers, designers and agronomy enthusiasts building intuitive
            tools for sustainable, precision farming.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/about">
              <Button variant="outline" className="rounded-xl">Learn more about the team</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-10">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary grid place-items-center">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">AgriTwin AI</span>
            <span>· Built by Team Tech Wizards</span>
          </div>
          <div className="flex items-center gap-4">
            <span>v1.1.0</span>
            <a href="#" className="inline-flex items-center gap-1 hover:text-foreground">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
