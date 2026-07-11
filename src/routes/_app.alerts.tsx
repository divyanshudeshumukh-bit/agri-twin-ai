import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useFarm } from "@/lib/farm-context";
import { AlertTriangle, ShieldAlert, CheckCircle2, Droplets, Thermometer, Bug, FlaskConical, CloudRain, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/alerts")({
  head: () => ({ meta: [{ title: "Alerts · AgriTwin AI" }] }),
  component: Alerts,
});

type Priority = "Normal" | "Warning" | "Critical";

interface Alert {
  id: string;
  title: string;
  priority: Priority;
  time: string;
  zone: string;
  action: string;
  icon: any;
}

function alertsFor(key: "healthy" | "dry" | "disease"): Alert[] {
  const base: Alert[] = [
    { id: "aa", title: "Heavy Rain Forecast", priority: "Warning", time: "In 6 hours", zone: "Farm-wide", action: "Pause irrigation and secure loose covers.", icon: CloudRain },
    { id: "ab", title: "Sensor Nominal", priority: "Normal", time: "Live", zone: "Zone B", action: "No action required. Continue monitoring.", icon: CheckCircle2 },
  ];
  if (key === "dry") base.unshift(
    { id: "d1", title: "Low Soil Moisture", priority: "Critical", time: "Just now", zone: "Zone C (west)", action: "Trigger 45-min irrigation cycle.", icon: Droplets },
    { id: "d2", title: "High Temperature", priority: "Warning", time: "20m ago", zone: "Farm-wide", action: "Deploy 30% shade netting.", icon: Thermometer },
    { id: "d3", title: "Low Nutrient Level", priority: "Warning", time: "1h ago", zone: "Zone A", action: "Schedule NPK 10-10-10 in 48 hours.", icon: FlaskConical },
  );
  if (key === "disease") base.unshift(
    { id: "x1", title: "High Disease Risk", priority: "Critical", time: "Just now", zone: "Zone D (NE)", action: "Apply copper hydroxide tonight, isolate rows.", icon: Bug },
    { id: "x2", title: "Sensor Offline", priority: "Warning", time: "12m ago", zone: "Zone D", action: "Check SS-04 battery and antenna.", icon: Radio },
  );
  return base;
}

const priorityStyle: Record<Priority, { badge: string; ring: string; dot: string; label: string; icon: any }> = {
  Normal:   { badge: "bg-primary/15 text-primary",        ring: "border-l-primary",     dot: "bg-primary",     label: "Normal",   icon: CheckCircle2 },
  Warning:  { badge: "bg-warning/15 text-warning",        ring: "border-l-warning",     dot: "bg-warning",     label: "Warning",  icon: AlertTriangle },
  Critical: { badge: "bg-destructive/15 text-destructive",ring: "border-l-destructive", dot: "bg-destructive", label: "Critical", icon: ShieldAlert },
};

function Alerts() {
  const { scenario } = useFarm();
  const list = useMemo(() => alertsFor(scenario.key), [scenario.key]);
  const counts = {
    Critical: list.filter(a => a.priority === "Critical").length,
    Warning: list.filter(a => a.priority === "Warning").length,
    Normal: list.filter(a => a.priority === "Normal").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Alerts</div>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Alert Center</h1>
        <p className="text-muted-foreground text-sm mt-1">Prioritized, actionable alerts from the twin.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {(["Critical","Warning","Normal"] as Priority[]).map((p) => {
          const s = priorityStyle[p];
          const S = s.icon;
          return (
            <div key={p} className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className={cn("h-11 w-11 rounded-xl grid place-items-center", s.badge)}>
                <S className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{p}</div>
                <div className="text-2xl font-bold">{counts[p]}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {list.map((a) => {
          const s = priorityStyle[a.priority];
          return (
            <div key={a.id} className={cn("glass rounded-2xl p-4 border-l-4", s.ring)}>
              <div className="flex items-start gap-3">
                <div className={cn("h-10 w-10 rounded-xl grid place-items-center", s.badge)}>
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-semibold">{a.title}</div>
                    <span className={cn("text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full", s.badge)}>
                      <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-1", s.dot)} />
                      {s.label}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {a.time} · {a.zone}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Suggested action: </span>{a.action}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
