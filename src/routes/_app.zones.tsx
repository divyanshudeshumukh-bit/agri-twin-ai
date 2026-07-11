import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useFarm } from "@/lib/farm-context";
import { zonesFor, type Zone } from "@/lib/mock-data";
import { Sprout, Droplets, Bug, Activity, Radio, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/zones")({
  head: () => ({ meta: [{ title: "Farm Zones · AgriTwin AI" }] }),
  component: Zones,
});

const alertCls: Record<Zone["alert"], string> = {
  Normal: "bg-primary/15 text-primary",
  Warning: "bg-warning/15 text-warning",
  Critical: "bg-destructive/15 text-destructive",
};

const sensorCls: Record<Zone["sensor"], string> = {
  Online: "bg-primary/15 text-primary",
  Warning: "bg-warning/15 text-warning",
  Offline: "bg-destructive/15 text-destructive",
};

function Zones() {
  const { scenario } = useFarm();
  const zones = useMemo(() => zonesFor(scenario.key), [scenario.key]);
  const [selected, setSelected] = useState<Zone | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Zones</div>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Farm Zones</h1>
        <p className="text-muted-foreground text-sm mt-1">Every zone monitored independently. Click for detailed analysis.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {zones.map((z) => (
          <button
            key={z.id}
            onClick={() => setSelected(z)}
            className="glass card-hover rounded-2xl p-5 text-left relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{z.crop} · {z.area}</div>
                <div className="text-2xl font-bold mt-1">{z.name}</div>
              </div>
              <span className={cn("text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full", alertCls[z.alert])}>{z.alert}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <Row icon={Sprout} label="Health" value={`${z.health}%`} />
              <Row icon={Bug} label="Disease" value={`${z.disease}%`} />
              <Row icon={Activity} label="Growth" value={`${z.growth}%`} />
              <Row icon={Droplets} label="Water" value={z.water} />
              <Row icon={Radio} label="Sensor" value={z.sensor} />
              <Row icon={TriangleAlert} label="Alert" value={z.alert} />
            </div>

            <div className="mt-3">
              <Progress value={z.health} className="h-1.5" />
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="glass border-border/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selected?.name} — {selected?.crop}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Detailed analysis for {selected.plants} plants across {selected.area}.</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Detail label="Plant Health" value={`${selected.health}%`} />
                <Detail label="Disease Risk" value={`${selected.disease}%`} />
                <Detail label="Growth" value={`${selected.growth}%`} />
                <Detail label="Water Status" value={selected.water} />
                <Detail label="Sensor Status" value={selected.sensor} cls={sensorCls[selected.sensor]} />
                <Detail label="Alert Status" value={selected.alert} cls={alertCls[selected.alert]} />
              </div>
              <div className="rounded-xl bg-accent p-3 text-xs text-accent-foreground">
                <strong>AI recommendation:</strong> {selected.alert === "Critical" ? "Immediate action required in this zone. Trigger irrigation or apply treatment as needed." : selected.alert === "Warning" ? "Monitor closely over next 24h and adjust water/nutrients." : "Zone is performing well. Continue routine scouting."}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <X className="hidden" />
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-background/60 border border-border/50 px-2 py-1.5">
      <span className="flex items-center gap-1 text-muted-foreground"><Icon className="h-3 w-3" /> {label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function Detail({ label, value, cls }: { label: string; value: string; cls?: string }) {
  return (
    <div className="rounded-xl bg-background/60 border border-border/50 p-3">
      <div className="text-[11px] uppercase text-muted-foreground">{label}</div>
      <div className={cn("mt-1 font-semibold", cls && "inline-block px-2 py-0.5 rounded-full text-xs " + cls)}>{value}</div>
    </div>
  );
}
