import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useFarm } from "@/lib/farm-context";
import { metricsFor } from "@/lib/mock-data";
import { ProgressRing } from "@/components/ProgressRing";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  Leaf, ShieldAlert, TriangleAlert, CloudSun, Wind, Droplets, Calendar, Activity,
  Bell, Zap, ScanLine, FileText, Sparkles, Bug, Info,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "Home · AgriTwin AI" }] }),
  component: Home,
});

function SectionCard({ title, subtitle, action, children, className }: {
  title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("glass rounded-2xl p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const severityColor: Record<string, string> = {
  low: "var(--color-primary)",
  medium: "var(--color-warning)",
  high: "var(--color-destructive)",
};

function Home() {
  const { scenario } = useFarm();
  const metrics = useMemo(() => metricsFor(scenario), [scenario]);
  const [openDisease, setOpenDisease] = useState<null | typeof scenario.disease.breakdown[number]>(null);

  const f = scenario.farm;

  return (
    <div className="space-y-6">
      {/* Command header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Command Center</div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Home</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {scenario.emoji} {scenario.name} · {scenario.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Farm scan started")}>
            <ScanLine className="mr-2 h-4 w-4" /> Scan
          </Button>
          <Button variant="outline" className="rounded-xl" onClick={() => toast.success("Irrigation started")}>
            <Droplets className="mr-2 h-4 w-4" /> Irrigate
          </Button>
          <Button className="rounded-xl gradient-primary text-primary-foreground shadow-glow" onClick={() => toast.success("AI report generated")}>
            <FileText className="mr-2 h-4 w-4" /> AI Report
          </Button>
        </div>
      </div>

      {/* Top row: Farm Overview / Weather / Health Score */}
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Farm Overview" subtitle="Snapshot of your fleet">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-primary/10 p-3">
              <div className="text-[11px] uppercase text-muted-foreground">Healthy</div>
              <div className="text-2xl font-bold text-primary"><AnimatedCounter value={f.healthy} /></div>
            </div>
            <div className="rounded-xl bg-warning/15 p-3">
              <div className="text-[11px] uppercase text-muted-foreground">Warning</div>
              <div className="text-2xl font-bold text-warning"><AnimatedCounter value={f.warning} /></div>
            </div>
            <div className="rounded-xl bg-destructive/10 p-3">
              <div className="text-[11px] uppercase text-muted-foreground">Diseased</div>
              <div className="text-2xl font-bold text-destructive"><AnimatedCounter value={f.diseased} /></div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg bg-background/60 p-2 border border-border/50">
              <div className="text-muted-foreground">Plants</div>
              <div className="font-semibold">{f.plantCount}</div>
            </div>
            <div className="rounded-lg bg-background/60 p-2 border border-border/50">
              <div className="text-muted-foreground">Sensors</div>
              <div className="font-semibold">{f.sensorStatus}</div>
            </div>
            <div className="rounded-lg bg-background/60 p-2 border border-border/50">
              <div className="text-muted-foreground">Drone</div>
              <div className="font-semibold">{f.droneStatus}</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Current Weather" subtitle="Live conditions">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl gradient-primary grid place-items-center shadow-glow">
              <CloudSun className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <div className="text-4xl font-bold">{scenario.weather.temp}°C</div>
              <div className="text-sm text-muted-foreground">{scenario.weather.condition}</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-lg bg-background/60 p-2 border border-border/50">
              <div className="text-muted-foreground flex items-center gap-1"><Wind className="h-3 w-3" /> Wind</div>
              <div className="font-semibold">{scenario.sensors.windSpeed} km/h</div>
            </div>
            <div className="rounded-lg bg-background/60 p-2 border border-border/50">
              <div className="text-muted-foreground flex items-center gap-1"><Droplets className="h-3 w-3" /> Humidity</div>
              <div className="font-semibold">{scenario.sensors.humidity}%</div>
            </div>
            <div className="rounded-lg bg-background/60 p-2 border border-border/50">
              <div className="text-muted-foreground flex items-center gap-1"><Activity className="h-3 w-3" /> Rain</div>
              <div className="font-semibold">{scenario.sensors.rainProb}%</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="AI Health Score" subtitle="Composite twin index" className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 gradient-primary opacity-10" />
          <div className="flex items-center gap-5">
            <ProgressRing value={scenario.healthScore} size={120} stroke={10} tone={scenario.healthScore >= 80 ? "good" : scenario.healthScore >= 60 ? "warning" : "critical"} />
            <div>
              <div className="text-5xl font-bold text-gradient leading-none">
                <AnimatedCounter value={scenario.healthScore} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">out of 100</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Updated 12s ago
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Sensor Summary — intelligent percentages */}
      <SectionCard
        title="Sensor Summary"
        subtitle="Every parameter as an intelligent percentage · hover for detail"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
          {metrics.map((m) => (
            <ProgressRing
              key={m.key}
              value={m.value}
              tone={m.tone}
              label={m.label}
              tooltip={m.tooltip}
            />
          ))}
        </div>
      </SectionCard>

      {/* Plant Health + Disease Monitoring */}
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Plant Health Summary" subtitle="Distribution across your farm">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Healthy", value: f.healthy, fill: "var(--color-primary)" },
                    { name: "Warning", value: f.warning, fill: "var(--color-warning)" },
                    { name: "Diseased", value: f.diseased, fill: "var(--color-destructive)" },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                />
                <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Healthy</div>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /> Warning</div>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Diseased</div>
          </div>
        </SectionCard>

        <SectionCard title="Disease Monitoring" subtitle="Click a disease for detail" className="lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <div className="text-[11px] uppercase text-muted-foreground">Healthy Plants</div>
              <div className="text-2xl font-bold text-primary"><AnimatedCounter value={f.healthy} /></div>
            </div>
            <div className="rounded-xl bg-warning/15 p-3">
              <div className="text-[11px] uppercase text-muted-foreground">Suspected</div>
              <div className="text-2xl font-bold text-warning"><AnimatedCounter value={scenario.disease.suspected} /></div>
            </div>
            <div className="rounded-xl bg-destructive/10 p-3">
              <div className="text-[11px] uppercase text-muted-foreground">Confirmed</div>
              <div className="text-2xl font-bold text-destructive"><AnimatedCounter value={scenario.disease.confirmed} /></div>
            </div>
            <div className="rounded-xl bg-accent p-3">
              <div className="text-[11px] uppercase text-muted-foreground">High Risk Areas</div>
              <div className="text-2xl font-bold"><AnimatedCounter value={scenario.disease.highRiskAreas} /></div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scenario.disease.breakdown}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={85}
                    paddingAngle={2}
                  >
                    {scenario.disease.breakdown.map((d, i) => (
                      <Cell key={i} fill={severityColor[d.severity]} />
                    ))}
                  </Pie>
                  <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {scenario.disease.breakdown.map((d) => (
                <button
                  key={d.name}
                  onClick={() => setOpenDisease(d)}
                  className="w-full text-left rounded-xl bg-background/60 border border-border/50 p-3 hover:bg-accent transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: severityColor[d.severity] }} />
                    <span className="font-medium truncate">{d.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{d.value} plants</span>
                    <Info className="h-3.5 w-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Recommendations + Alerts + Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Water Recommendation" subtitle="Based on soil, weather, canopy">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-xl bg-info/15 text-info grid place-items-center">
              <Droplets className="h-5 w-5" />
            </div>
            <p className="text-sm leading-relaxed">
              {scenario.key === "dry" && "Irrigate 4.5 L/plant in the west quadrant within 3 hours. Skip east rows."}
              {scenario.key === "healthy" && "Maintain 2.4 L/plant daily. Skip Wednesday if forecast rain holds."}
              {scenario.key === "disease" && "Reduce watering 20% to lower canopy humidity and slow fungal spread."}
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Harvest Prediction" subtitle="AI forecast window">
          <div className="flex items-start gap-3">
            <div className="h-11 w-11 rounded-xl bg-warning/15 text-warning grid place-items-center">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-3xl font-bold">
                <AnimatedCounter value={scenario.sensors.harvestDays} /> <span className="text-sm text-muted-foreground font-medium">days</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Growth {scenario.sensors.growth}% · confidence {scenario.key === "healthy" ? "92" : scenario.key === "dry" ? "78" : "71"}%
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Quick Actions" subtitle="One-tap operations">
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Droplets, label: "Start Irrigation", tone: "info" },
              { icon: ScanLine, label: "Scan Farm", tone: "primary" },
              { icon: Sparkles, label: "Ask AI", tone: "primary", to: "/chat" },
              { icon: FileText, label: "Generate Report", tone: "warning" },
            ].map((a) => {
              const Btn = (
                <button
                  onClick={() => !a.to && toast.success(`${a.label} triggered`)}
                  className={cn(
                    "glass card-hover rounded-xl p-3 flex flex-col items-start gap-2 text-left w-full",
                  )}
                >
                  <div className={cn(
                    "h-9 w-9 rounded-lg grid place-items-center",
                    a.tone === "info" && "bg-info/15 text-info",
                    a.tone === "primary" && "bg-primary/15 text-primary",
                    a.tone === "warning" && "bg-warning/15 text-warning",
                  )}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium">{a.label}</span>
                </button>
              );
              return a.to ? <Link key={a.label} to={a.to}>{Btn}</Link> : <div key={a.label}>{Btn}</div>;
            })}
          </div>
        </SectionCard>
      </div>

      {/* Recent Alerts */}
      <SectionCard title="Recent Alerts" subtitle="Live feed from the twin"
        action={<Bell className="h-4 w-4 text-primary animate-pulse" />}
      >
        <div className="space-y-2">
          {scenario.alerts.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-xl bg-background/60 border border-border/50 p-3">
              <div className={cn(
                "h-9 w-9 rounded-lg grid place-items-center",
                a.severity === "critical" && "bg-destructive/15 text-destructive",
                a.severity === "warning" && "bg-warning/15 text-warning",
                a.severity === "info" && "bg-info/15 text-info",
              )}>
                {a.severity === "critical" ? <ShieldAlert className="h-4 w-4" /> :
                 a.severity === "warning" ? <TriangleAlert className="h-4 w-4" /> :
                 <Zap className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </div>
              <span className={cn(
                "text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full",
                a.severity === "critical" && "bg-destructive/15 text-destructive",
                a.severity === "warning" && "bg-warning/15 text-warning",
                a.severity === "info" && "bg-info/15 text-info",
              )}>
                {a.severity}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>

      <Dialog open={!!openDisease} onOpenChange={(o) => !o && setOpenDisease(null)}>
        <DialogContent className="glass border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-primary" />
              {openDisease?.name}
            </DialogTitle>
            <DialogDescription className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: openDisease ? severityColor[openDisease.severity] : "" }} />
                {openDisease?.severity} severity · {openDisease?.value} plants affected
              </span>
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed">{openDisease?.info}</p>
          <div className="mt-2 rounded-xl bg-accent p-3 text-xs text-accent-foreground">
            <strong>AI recommendation:</strong> Monitor daily for 72 hours, isolate affected zone, and apply the prescribed treatment during dry evening hours.
          </div>
        </DialogContent>
      </Dialog>

      <Leaf className="hidden" />
    </div>
  );
}
