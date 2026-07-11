import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, Calendar, Scale, RotateCw, Info } from "lucide-react";
import { useFarm } from "@/lib/farm-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/fertilizer")({
  head: () => ({ meta: [{ title: "Fertilizer · AgriTwin AI" }] }),
  component: Fertilizer,
});

function Fertilizer() {
  const { scenario } = useFarm();

  const rec = scenario.key === "disease"
    ? { name: "Potassium Silicate", amount: "1.2 kg / ha", freq: "Every 10 days", next: "Tonight, 18:00", status: "Recommended" as const, tone: "primary", reason: "Strengthens cell walls and slows fungal spread." }
    : scenario.key === "dry"
    ? { name: "NPK 10-10-10", amount: "0.8 kg / ha", freq: "Every 14 days", next: "In 48 hours", status: "Optional" as const, tone: "warning", reason: "Hold until soil moisture recovers to avoid root burn." }
    : { name: "Foliar Potassium (0.5%)", amount: "2 L spray / ha", freq: "Weekly", next: "In 5 days", status: "Recommended" as const, tone: "primary", reason: "Supports flowering and fruit quality. Nutrient bank looks balanced." };

  const statusCls = {
    Recommended: "bg-primary/15 text-primary",
    Optional: "bg-warning/15 text-warning",
    "Not Required": "bg-muted text-muted-foreground",
  } as const;

  const items = [
    { label: "Recommended Fertilizer", value: rec.name, icon: FlaskConical },
    { label: "Application Amount", value: rec.amount, icon: Scale },
    { label: "Application Frequency", value: rec.freq, icon: RotateCw },
    { label: "Next Application Date", value: rec.next, icon: Calendar },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Recommendations</div>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Fertilizer Advisor</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-generated nutrient plan tuned to your farm's current state.</p>
      </div>

      <div className="glass rounded-3xl p-8 shadow-elegant relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-primary opacity-10" />
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Recommendation</div>
            <div className="mt-2 text-4xl font-bold text-gradient">{rec.name}</div>
            <div className="mt-3 flex items-center gap-2">
              <span className={cn("text-[11px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full", statusCls[rec.status])}>
                {rec.status}
              </span>
              <span className="text-sm text-muted-foreground">for {scenario.name}</span>
            </div>
          </div>
          <div className="h-24 w-24 rounded-2xl gradient-primary grid place-items-center shadow-glow">
            <FlaskConical className="h-12 w-12 text-primary-foreground" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((i) => (
          <div key={i.label} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
              <i.icon className="h-3.5 w-3.5 text-primary" /> {i.label}
            </div>
            <div className="mt-2 text-xl font-bold">{i.value}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-info/15 text-info grid place-items-center shrink-0">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">Reason for Recommendation</div>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{rec.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
