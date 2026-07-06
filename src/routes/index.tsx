import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf, Cpu, Brain, LineChart, Sparkles, Box, Shield, Zap, ArrowRight, Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriTwin AI — AI-Powered Digital Twin for Precision Agriculture" },
      { name: "description", content: "AgriTwin AI is a real-time digital twin platform for precision farming, powered by AMD Instinct and Fireworks AI." },
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
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Digital Twin</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a>
            <a href="#amd" className="hover:text-foreground transition-colors">AMD</a>
            <a href="#fireworks" className="hover:text-foreground transition-colors">Fireworks</a>
          </div>
          <Link to="/home">
            <Button className="rounded-xl gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              Launch Digital Twin <ArrowRight className="ml-1 h-4 w-4" />
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
            AMD Unicorn Track · Fireworks AI Integrated
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
                Launch Digital Twin <ArrowRight className="ml-2 h-4 w-4" />
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
                { label: "Farm Health", value: "92%", tone: "primary" },
                { label: "Water Saved", value: "34%", tone: "info" },
                { label: "Yield Boost", value: "+21%", tone: "primary" },
                { label: "Plants Tracked", value: "1,240", tone: "info" },
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

      {/* Product intro */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Product</div>
            <h2 className="mt-2 text-4xl font-bold tracking-tight">A living replica of your farm.</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Every plant, sensor, and irrigation valve becomes part of an interactive digital twin.
              Simulate scenarios, spot disease early, and optimize water usage with confidence.
            </p>
          </div>
          <div className="glass rounded-3xl p-6 shadow-elegant">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl gradient-primary opacity-80"
                  style={{ animation: `float ${4 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}
                />
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
            { icon: Box, title: "Interactive 3D Twin", desc: "Explore your farm in real time with an immersive Spline-powered digital twin." },
            { icon: Brain, title: "AI Recommendations", desc: "Fireworks AI turns sensor telemetry into decisions you can act on today." },
            { icon: LineChart, title: "Predictive Analytics", desc: "Forecast harvest yield, disease risk and water demand up to 30 days out." },
            { icon: Shield, title: "Disease Detection", desc: "Computer vision flags outbreaks before they spread across quadrants." },
            { icon: Zap, title: "Smart Irrigation", desc: "Automate watering with hyper-local weather and soil chemistry data." },
            { icon: Cpu, title: "AMD Accelerated", desc: "Runs on AMD Instinct GPUs for millisecond twin updates at farm scale." },
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

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20">
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

      {/* Architecture */}
      <section id="architecture" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Architecture</div>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">Edge to cloud, in one loop.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          {[
            { t: "Field Sensors", d: "Soil, weather, camera drones" },
            { t: "Edge Gateway", d: "Local aggregation & filtering" },
            { t: "AMD Compute", d: "Twin simulation on Instinct" },
            { t: "Fireworks AI", d: "LLM reasoning + insights" },
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
          <p className="mt-3 text-muted-foreground">Launch the interactive digital twin dashboard.</p>
          <Link to="/home">
            <Button size="lg" className="mt-6 h-12 px-8 rounded-xl gradient-primary text-primary-foreground shadow-glow">
              Launch Digital Twin <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* AMD */}
      <section id="amd" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center glass rounded-3xl p-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Infrastructure</div>
            <h2 className="mt-2 text-3xl font-bold">Powered by AMD Instinct™</h2>
            <p className="mt-3 text-muted-foreground">
              High-throughput simulation of thousands of plants per second on AMD's
              latest AI accelerators, with ROCm-optimized twin pipelines.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Cpu className="h-4 w-4 text-primary" /> AMD MI300X compute nodes</li>
              <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> ROCm-accelerated inference</li>
              <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Confidential compute ready</li>
            </ul>
          </div>
          <div className="rounded-2xl p-8 bg-sidebar text-sidebar-foreground shadow-elegant">
            <div className="text-6xl font-bold tracking-tight">AMD<span className="text-primary">.</span></div>
            <div className="mt-2 text-sm opacity-80">Instinct™ MI300 · ROCm™ 6</div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div><div className="text-2xl font-bold text-primary">192GB</div><div className="text-xs opacity-70">HBM3</div></div>
              <div><div className="text-2xl font-bold text-primary">5.3TB/s</div><div className="text-xs opacity-70">Bandwidth</div></div>
              <div><div className="text-2xl font-bold text-primary">FP8</div><div className="text-xs opacity-70">Precision</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Fireworks */}
      <section id="fireworks" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center glass rounded-3xl p-10">
          <div className="order-2 md:order-1 rounded-2xl p-8 bg-gradient-to-br from-primary to-info text-primary-foreground shadow-elegant">
            <div className="text-4xl font-bold">Fireworks AI 🎆</div>
            <p className="mt-3 opacity-90 text-sm">Ultra-fast LLM inference for on-farm reasoning</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 p-3"><div className="text-2xl font-bold">&lt;80ms</div><div className="text-xs opacity-80">First token</div></div>
              <div className="rounded-xl bg-white/10 p-3"><div className="text-2xl font-bold">Llama 3</div><div className="text-xs opacity-80">70B tuned</div></div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">AI Layer</div>
            <h2 className="mt-2 text-3xl font-bold">Reasoning at Fireworks speed</h2>
            <p className="mt-3 text-muted-foreground">
              Every recommendation, chat response, and disease diagnosis is generated
              through Fireworks AI's low-latency inference stack — tuned for agriculture.
            </p>
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
            <span>· AMD Powered · Fireworks AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span>v1.0.0</span>
            <a href="#" className="inline-flex items-center gap-1 hover:text-foreground">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
