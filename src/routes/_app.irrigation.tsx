import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Play, Clock, CheckCircle2, Timer, Gauge, CalendarClock } from "lucide-react";
import { useFarm } from "@/lib/farm-context";
import { useNotifications } from "@/lib/notifications-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/irrigation")({
  head: () => ({ meta: [{ title: "Smart Irrigation · AgriTwin AI" }] }),
  component: Irrigation,
});

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <Icon className="h-3.5 w-3.5 text-primary" /> {label}
      </div>
      <div className="mt-2 text-lg font-bold">{value}</div>
    </div>
  );
}

function Irrigation() {
  const { scenario } = useFarm();
  const { add } = useNotifications();
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (intRef.current) clearInterval(intRef.current); }, []);

  const rec = scenario.key === "dry"
    ? { need: "High", quantity: "4.5 L / plant", time: "45 min", reason: "Soil moisture below optimal band" }
    : scenario.key === "disease"
    ? { need: "Reduced", quantity: "1.5 L / plant", time: "18 min", reason: "Reduce canopy humidity" }
    : { need: "Moderate", quantity: "2.4 L / plant", time: "25 min", reason: "Maintain optimal moisture" };

  const start = () => {
    if (running) return;
    setDone(false);
    setRunning(true);
    setProgress(0);
    add({ icon: "irrigation-start", title: "Irrigation Started", body: `Cycle started · ${rec.quantity} · ETA ${rec.time}` });
    toast.info("Irrigation started");
    intRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + 2 + Math.random() * 2;
        if (next >= 100) {
          if (intRef.current) clearInterval(intRef.current);
          setRunning(false);
          setDone(true);
          add({ icon: "irrigation-done", title: "Irrigation Completed", body: `${rec.quantity} delivered successfully.` });
          toast.success("Irrigation Completed Successfully");
          return 100;
        }
        return next;
      });
    }, 200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Operations</div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Smart Irrigation</h1>
          <p className="text-muted-foreground text-sm mt-1">Recommended by the twin · adaptive to weather and soil.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Current Water Requirement" value={rec.need} icon={Droplets} />
        <Stat label="Today's Status" value={done ? "Completed" : running ? "In Progress" : "Pending"} icon={Gauge} />
        <Stat label="Recommended Quantity" value={rec.quantity} icon={Droplets} />
        <Stat label="Estimated Duration" value={rec.time} icon={Timer} />
        <Stat label="Last Irrigation" value="Yesterday · 06:12" icon={Clock} />
        <Stat label="Next Recommended" value="Tomorrow · 06:00" icon={CalendarClock} />
      </div>

      <div className="glass rounded-3xl p-8 shadow-elegant relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-info/10 to-primary/10" />
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="flex flex-col items-center text-center">
            <div className={cn(
              "h-40 w-40 rounded-full grid place-items-center relative border-4",
              running ? "border-info animate-pulse-ring" : done ? "border-primary" : "border-info/30"
            )}>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-info/30 to-primary/20" />
              {done ? (
                <CheckCircle2 className="h-16 w-16 text-primary relative" />
              ) : (
                <Droplets className={cn("h-16 w-16 text-info relative", running && "animate-bounce")} />
              )}
            </div>
            <Button
              size="lg"
              onClick={start}
              disabled={running}
              className="mt-6 rounded-xl gradient-primary text-primary-foreground shadow-glow h-12 px-8"
            >
              <Play className="mr-2 h-5 w-5" />
              {running ? "Irrigating…" : done ? "Run Again" : "Start Irrigation"}
            </Button>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Current Irrigation Progress</div>
            <div className="mt-2 text-4xl font-bold">{Math.round(progress)}%</div>
            <Progress value={progress} className="mt-3 h-3" />
            <div className="mt-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Why this recommendation:</strong> {rec.reason}.
            </div>
            {done && (
              <div className="mt-4 rounded-xl bg-primary/10 border border-primary/30 p-3 text-sm text-primary flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Irrigation Completed Successfully
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
