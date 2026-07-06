import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useFarm } from "@/lib/farm-context";
import {
  ScanLine, Sparkles, Droplets, FileText, Wifi, CloudSun, Leaf, ShieldAlert,
  Trees, Box, Battery, Radio,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/digital-twin")({
  head: () => ({ meta: [{ title: "Digital Twin · AgriTwin AI" }] }),
  component: DigitalTwin,
});

function StatCard({ icon: Icon, label, value, tone = "primary" }: any) {
  const toneCls: Record<string, string> = {
    primary: "text-primary bg-primary/10",
    info: "text-info bg-info/10",
    warning: "text-warning bg-warning/10",
    destructive: "text-destructive bg-destructive/10",
  };
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <div className={`h-10 w-10 rounded-xl grid place-items-center ${toneCls[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground truncate">{label}</div>
        <div className="text-lg font-bold truncate">{value}</div>
      </div>
    </div>
  );
}

function DigitalTwin() {
  const { scenario } = useFarm();
  const f = scenario.farm;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Twin</h1>
          <p className="text-muted-foreground text-sm mt-1">Interactive 3D replica of your farm</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="rounded-xl" variant="outline" onClick={() => toast.success("Farm scan started")}><ScanLine className="mr-2 h-4 w-4" /> Scan Farm</Button>
          <Button className="rounded-xl" variant="outline" onClick={() => toast.success("Analyzing farm...")}><Sparkles className="mr-2 h-4 w-4" /> Analyze</Button>
          <Button className="rounded-xl" variant="outline" onClick={() => toast.success("Irrigation started")}><Droplets className="mr-2 h-4 w-4" /> Start Irrigation</Button>
          <Button className="rounded-xl gradient-primary text-primary-foreground shadow-glow" onClick={() => toast.success("AI report generated")}>
            <FileText className="mr-2 h-4 w-4" /> Generate AI Report
          </Button>
        </div>
      </div>

      {/* 3D placeholder */}
      <div className="glass rounded-3xl p-2 shadow-elegant">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-sidebar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.62_0.17_148/0.35),transparent_50%),radial-gradient(circle_at_70%_70%,oklch(0.65_0.15_230/0.3),transparent_50%)]" />
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="mx-auto h-20 w-20 rounded-2xl gradient-primary grid place-items-center shadow-glow animate-float">
                <Box className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="mt-4 text-primary-foreground font-semibold text-lg">Spline 3D Digital Twin</div>
              <div className="text-primary-foreground/70 text-sm mt-1">Embed your Spline scene here</div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-primary-foreground/80">
                <span className="h-2 w-2 rounded-full bg-primary-glow animate-pulse" /> Streaming live twin data
              </div>
            </div>
          </div>
          {/* floating chips */}
          {[
            { x: "12%", y: "20%", t: "Sensor #12" },
            { x: "70%", y: "30%", t: "Drone α" },
            { x: "40%", y: "70%", t: "Zone B" },
            { x: "82%", y: "75%", t: "Valve 3" },
          ].map((c, i) => (
            <div key={i} className="absolute glass rounded-lg px-2 py-1 text-[11px]" style={{ left: c.x, top: c.y }}>
              <span className="text-foreground">{c.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Leaf} label="Farm Status" value="Operational" tone="primary" />
        <StatCard icon={Wifi} label="Sensor Status" value={f.sensorStatus} tone={f.sensorStatus === "Online" ? "primary" : "warning"} />
        <StatCard icon={CloudSun} label="Weather" value={`${scenario.weather.temp}° ${scenario.weather.condition}`} tone="info" />
        <StatCard icon={Trees} label="Plant Count" value={f.plantCount.toLocaleString()} tone="primary" />
        <StatCard icon={Leaf} label="Healthy Plants" value={f.healthy.toLocaleString()} tone="primary" />
        <StatCard icon={ShieldAlert} label="Diseased Plants" value={f.diseased.toLocaleString()} tone="destructive" />
        <StatCard icon={Battery} label="Water Tank" value={`${f.waterTank}%`} tone={f.waterTank < 40 ? "warning" : "info"} />
        <StatCard icon={Radio} label="Drone Status" value={f.droneStatus} tone="info" />
      </div>
    </div>
  );
}
