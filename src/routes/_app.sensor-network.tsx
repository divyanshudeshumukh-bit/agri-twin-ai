import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useFarm } from "@/lib/farm-context";
import { devicesFor } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Cpu, Radio, Cloud, Sprout, Brain, Wifi, Battery, Signal, Activity,
  ThermometerSun, Droplets, TestTube, FlaskConical, Camera, GaugeCircle, Waves, PlaneTakeoff,
} from "lucide-react";

export const Route = createFileRoute("/_app/sensor-network")({
  head: () => ({ meta: [{ title: "Sensor Network · AgriTwin AI" }] }),
  component: SensorNetwork,
});

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  "Soil Sensors": Sprout,
  "Weather Station": Cloud,
  "Drone": PlaneTakeoff,
  "Water Pump": Waves,
  "Irrigation Controller": Droplets,
  "Smart Camera": Camera,
  "NPK Sensor": FlaskConical,
  "pH Sensor": TestTube,
  "Temperature Sensor": ThermometerSun,
  "Humidity Sensor": GaugeCircle,
};

const statusTone: Record<string, string> = {
  Online: "bg-primary/15 text-primary",
  Warning: "bg-warning/15 text-warning",
  Offline: "bg-destructive/15 text-destructive",
};

function Bar({ value, tone }: { value: number; tone: "primary" | "info" | "warning" }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full transition-all",
          tone === "primary" && "bg-primary",
          tone === "info" && "bg-info",
          tone === "warning" && "bg-warning",
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function DeviceCard({ d }: { d: ReturnType<typeof devicesFor>[number] }) {
  const Icon = typeIcon[d.type] ?? Radio;
  const batteryTone = d.battery < 30 ? "warning" : "primary";
  const signalTone = d.signal < 60 ? "warning" : "info";
  return (
    <div className="glass card-hover rounded-2xl p-4 relative overflow-hidden">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center shadow-glow shrink-0">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate">{d.name}</div>
            <div className="text-[11px] text-muted-foreground">{d.type} · {d.location}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={cn(
            "h-2 w-2 rounded-full",
            d.status === "Online" && "bg-primary animate-pulse-ring",
            d.status === "Warning" && "bg-warning",
            d.status === "Offline" && "bg-destructive",
          )} />
          <span className={cn("text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full", statusTone[d.status])}>
            {d.status}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2.5 text-xs">
        <div>
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="flex items-center gap-1"><Battery className="h-3 w-3" /> Battery</span>
            <span className="font-semibold text-foreground">{d.battery}%</span>
          </div>
          <Bar value={d.battery} tone={batteryTone} />
        </div>
        <div>
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="flex items-center gap-1"><Signal className="h-3 w-3" /> Signal</span>
            <span className="font-semibold text-foreground">{d.signal}%</span>
          </div>
          <Bar value={d.signal} tone={signalTone} />
        </div>
        <div>
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> Health</span>
            <span className="font-semibold text-foreground">{d.health}%</span>
          </div>
          <Bar value={d.health} tone="primary" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> Last update</span>
        <span>{d.lastUpdate}</span>
      </div>
    </div>
  );
}

function NetworkNode({ icon: Icon, label, sub, tone }: { icon: React.ComponentType<{ className?: string }>; label: string; sub: string; tone: "primary" | "info" | "warning" }) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <div className={cn(
        "h-11 w-11 rounded-xl grid place-items-center",
        tone === "primary" && "gradient-primary text-primary-foreground shadow-glow",
        tone === "info" && "bg-info/15 text-info",
        tone === "warning" && "bg-warning/15 text-warning",
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}

function AnimatedLink() {
  return (
    <div className="relative h-6 flex items-center justify-center">
      <div className="w-px h-full bg-gradient-to-b from-primary/60 to-info/60" />
      <span className="absolute h-2 w-2 rounded-full bg-primary animate-ping" />
    </div>
  );
}

function SensorNetwork() {
  const { scenario } = useFarm();
  const devices = useMemo(() => devicesFor(scenario.key), [scenario.key]);
  const online = devices.filter(d => d.status === "Online").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Infrastructure</div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Sensor Network</h1>
          <p className="text-muted-foreground text-sm mt-1">Live monitoring of every connected device on your farm</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="glass rounded-xl px-3 py-1.5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {online} / {devices.length} online
          </div>
        </div>
      </div>

      {/* Topology */}
      <div className="glass rounded-3xl p-6 shadow-elegant">
        <div className="text-xs uppercase tracking-widest text-primary font-semibold text-center">Topology</div>
        <h3 className="text-center font-semibold mt-1">Data flow across the twin</h3>
        <div className="mt-6 mx-auto max-w-md space-y-1">
          <NetworkNode icon={PlaneTakeoff} label="Scout Drone" sub="Aerial imaging + LiDAR" tone="info" />
          <AnimatedLink />
          <NetworkNode icon={Radio} label="Edge Gateway" sub="Local aggregation · MQTT" tone="warning" />
          <AnimatedLink />
          <NetworkNode icon={Cloud} label="Cloud" sub="Twin simulation" tone="primary" />
          <AnimatedLink />
          <NetworkNode icon={Sprout} label="Farm Sensors" sub="Soil · NPK · pH · Weather" tone="info" />
          <AnimatedLink />
          <NetworkNode icon={Brain} label="AgriTwin AI" sub="Built by Team Tech Wizards" tone="primary" />
        </div>
      </div>

      {/* Device grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {devices.map((d) => <DeviceCard key={d.id} d={d} />)}
      </div>

      <Cpu className="hidden" />
    </div>
  );
}
