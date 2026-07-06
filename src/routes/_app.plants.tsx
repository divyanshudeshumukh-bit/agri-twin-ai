import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { plants } from "@/lib/mock-data";
import { useFarm } from "@/lib/farm-context";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sprout, Droplets, FlaskConical, Timer, TrendingUp, HeartPulse, ShieldAlert, Bug } from "lucide-react";

export const Route = createFileRoute("/_app/plants")({
  head: () => ({ meta: [{ title: "Plants · AgriTwin AI" }] }),
  component: PlantsPage,
});

function PlantsPage() {
  const [selectedId, setSelectedId] = useState(plants[0].id);
  const selected = plants.find((p) => p.id === selectedId)!;
  const { scenario } = useFarm();

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">
      <div className="glass rounded-2xl p-3 h-fit lg:sticky lg:top-24">
        <div className="px-3 py-2">
          <h2 className="font-semibold">Plants</h2>
          <p className="text-xs text-muted-foreground">{plants.length} tracked</p>
        </div>
        <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
          {plants.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full text-left rounded-xl px-3 py-2.5 flex items-center gap-3 transition-all ${
                selectedId === p.id ? "gradient-primary text-primary-foreground shadow-glow" : "hover:bg-accent"
              }`}
            >
              <div className={`h-8 w-8 rounded-lg grid place-items-center ${
                selectedId === p.id ? "bg-white/20" : "bg-primary/10 text-primary"
              }`}>
                <Sprout className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium truncate">{p.id}</div>
                <div className={`text-xs truncate ${selectedId === p.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {p.crop} · {p.health}% health
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">Plant Detail</div>
              <h1 className="mt-1 text-3xl font-bold">{selected.id}</h1>
              <p className="text-muted-foreground">{selected.crop} · {selected.age} days old</p>
            </div>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              {selected.disease === "None" ? "✅ Healthy" : `⚠️ ${selected.disease}`}
            </Badge>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-sm"><span>Growth</span><span className="font-semibold">{selected.growth}%</span></div>
              <Progress value={selected.growth} className="mt-2 h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm"><span>Health</span><span className="font-semibold">{selected.health}%</span></div>
              <Progress value={selected.health} className="mt-2 h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm"><span>Disease Risk</span><span className="font-semibold">{selected.diseaseRisk}%</span></div>
              <Progress value={selected.diseaseRisk} className="mt-2 h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm"><span>Harvest In</span><span className="font-semibold">{selected.harvestRemaining} days</span></div>
              <Progress value={100 - selected.harvestRemaining} className="mt-2 h-2" />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { i: Droplets, l: "Water Today", v: `${selected.waterToday.toFixed(1)} L` },
            { i: FlaskConical, l: "Fertilizer", v: selected.fertilizer },
            { i: Timer, l: "Harvest Remaining", v: `${selected.harvestRemaining} d` },
            { i: TrendingUp, l: "Expected Yield", v: `${selected.expectedYield} kg` },
            { i: HeartPulse, l: "Current Disease", v: selected.disease },
            { i: ShieldAlert, l: "Risk Level", v: selected.diseaseRisk > 40 ? "High" : "Low" },
          ].map((s) => (
            <div key={s.l} className="glass card-hover rounded-2xl p-5">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary grid place-items-center">
                <s.i className="h-4 w-4" />
              </div>
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className="text-lg font-bold mt-1">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold flex items-center gap-2"><Bug className="h-4 w-4 text-primary" /> Live Sensor Values</h3>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              ["Moisture", `${scenario.sensors.soilMoisture}%`],
              ["Soil Temp", `${scenario.sensors.soilTemp}°C`],
              ["pH", scenario.sensors.soilPh],
              ["Nitrogen", `${scenario.sensors.nitrogen} ppm`],
            ].map(([k, v]) => (
              <div key={k as string} className="rounded-xl border border-border/50 p-3">
                <div className="text-xs text-muted-foreground">{k}</div>
                <div className="text-lg font-semibold">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold">History Timeline</h3>
          <div className="mt-4 space-y-3">
            {[
              { d: "Today", t: "Sensor sync completed", tone: "primary" },
              { d: "2d ago", t: `Fertilized with ${selected.fertilizer}`, tone: "info" },
              { d: "5d ago", t: "Irrigation cycle · 3.2L", tone: "info" },
              { d: "1w ago", t: "Health check passed", tone: "primary" },
              { d: "2w ago", t: "Transplanted from nursery", tone: "warning" },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                <div>
                  <div className="text-sm">{e.t}</div>
                  <div className="text-xs text-muted-foreground">{e.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
