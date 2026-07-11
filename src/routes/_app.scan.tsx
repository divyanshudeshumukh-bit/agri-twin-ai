import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScanLine, Sprout, Bug, Droplets, FlaskConical, Calendar, Activity, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import { useFarm } from "@/lib/farm-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNotifications } from "@/lib/notifications-context";

export const Route = createFileRoute("/_app/scan")({
  head: () => ({ meta: [{ title: "Smart Scan · AgriTwin AI" }] }),
  component: Scan,
});

interface ScanResult {
  plant: number;
  growth: number;
  disease: number;
  moisture: number;
  nutrient: number;
  harvest: number;
}

function Scan() {
  const { scenario } = useFarm();
  const { add } = useNotifications();
  const [progress, setProgress] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const start = () => {
    setResult(null);
    setScanning(true);
    setProgress(0);
    const int = setInterval(() => {
      setProgress((p) => {
        const next = p + 6 + Math.random() * 8;
        if (next >= 100) {
          clearInterval(int);
          const b = scenario.key === "healthy" ? 90 : scenario.key === "dry" ? 60 : 45;
          const jitter = () => Math.round(b + (Math.random() - 0.5) * 20);
          const res = {
            plant: Math.min(99, jitter()),
            growth: Math.min(99, jitter()),
            disease: scenario.key === "disease" ? 68 : scenario.key === "dry" ? 34 : 12,
            moisture: scenario.sensors.soilMoisture,
            nutrient: Math.min(99, jitter()),
            harvest: Math.max(20, 100 - scenario.sensors.harvestDays * 2),
          };
          setResult(res);
          setScanning(false);
          toast.success("Scan completed");
          add({ icon: "report", title: "Smart Scan Completed", body: `Plant health ${res.plant}% · Disease risk ${res.disease}%` });
          return 100;
        }
        return next;
      });
    }, 180);
  };

  const status = (v: number, inv = false) => {
    const t = inv ? 100 - v : v;
    if (t >= 75) return { label: "Healthy", cls: "bg-primary/15 text-primary", icon: CheckCircle2 };
    if (t >= 50) return { label: "Warning", cls: "bg-warning/15 text-warning", icon: AlertTriangle };
    return { label: "Critical", cls: "bg-destructive/15 text-destructive", icon: ShieldAlert };
  };

  const metrics = result ? [
    { label: "Plant Health",       value: result.plant,    icon: Sprout,       inv: false },
    { label: "Growth Progress",    value: result.growth,   icon: Activity,     inv: false },
    { label: "Disease Risk",       value: result.disease,  icon: Bug,          inv: true  },
    { label: "Moisture Level",     value: result.moisture, icon: Droplets,     inv: false },
    { label: "Nutrient Status",    value: result.nutrient, icon: FlaskConical, inv: false },
    { label: "Harvest Readiness",  value: result.harvest,  icon: Calendar,     inv: false },
  ] : [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">AI Vision</div>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Smart Scan</h1>
        <p className="text-muted-foreground text-sm mt-1">Simulate an AI-powered crop scan and get instant health diagnostics.</p>
      </div>

      <div className="glass rounded-3xl p-8 shadow-elegant relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-primary opacity-10" />
        <div className="flex flex-col items-center text-center">
          <div className={cn(
            "h-40 w-40 rounded-full grid place-items-center relative border-4",
            scanning ? "border-primary animate-pulse-ring" : "border-primary/30"
          )}>
            <div className="absolute inset-2 rounded-full gradient-primary opacity-20" />
            <ScanLine className={cn("h-16 w-16 text-primary", scanning && "animate-pulse")} />
            {scanning && (
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" style={{ animationDuration: "1.2s" }} />
            )}
          </div>

          <div className="mt-6 w-full max-w-md">
            {scanning ? (
              <>
                <div className="text-sm text-muted-foreground mb-2">AI analyzing plant… {Math.round(progress)}%</div>
                <Progress value={progress} className="h-2" />
              </>
            ) : result ? (
              <div className="text-sm text-primary font-semibold">Scan complete — see results below</div>
            ) : (
              <div className="text-sm text-muted-foreground">Point the twin at any plant zone and start a scan.</div>
            )}
          </div>

          <Button
            size="lg"
            onClick={start}
            disabled={scanning}
            className="mt-6 rounded-xl gradient-primary text-primary-foreground shadow-glow h-12 px-8"
          >
            <ScanLine className="mr-2 h-5 w-5" />
            {scanning ? "Scanning…" : result ? "Scan Again" : "Start Smart Scan"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => {
            const s = status(m.value, m.inv);
            const S = s.icon;
            return (
              <div key={m.label} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <m.icon className="h-4 w-4 text-primary" />
                    {m.label}
                  </div>
                  <span className={cn("inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full", s.cls)}>
                    <S className="h-3 w-3" /> {s.label}
                  </span>
                </div>
                <div className="mt-3 text-3xl font-bold">{m.value}%</div>
                <Progress value={m.value} className="mt-2 h-1.5" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
