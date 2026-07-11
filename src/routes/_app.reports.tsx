import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download, Share2, Clock } from "lucide-react";
import { useFarm } from "@/lib/farm-context";
import { pastReports } from "@/lib/mock-data";
import { toast } from "sonner";
import { useNotifications } from "@/lib/notifications-context";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Reports · AgriTwin AI" }] }),
  component: Reports,
});

function Reports() {
  const { scenario } = useFarm();
  const { add } = useNotifications();
  const s = scenario;
  const sn = s.sensors;

  const sections = [
    { title: "Farm Summary", body: `${s.name} · Health ${s.healthScore}/100 · ${s.farm.plantCount} plants tracked.` },
    { title: "Sensor Data", body: `Soil moisture ${sn.soilMoisture}%, humidity ${sn.humidity}%, air ${sn.airTemp}°C, wind ${sn.windSpeed} km/h.` },
    { title: "Disease Analysis", body: `${s.disease.confirmed} confirmed · ${s.disease.suspected} suspected · ${s.disease.highRiskAreas} high-risk area(s).` },
    { title: "Plant Health", body: `${s.farm.healthy} healthy · ${s.farm.warning} warning · ${s.farm.diseased} diseased.` },
    { title: "Growth Status", body: `Growth index ${sn.growth}% · projected harvest in ${sn.harvestDays} days.` },
    { title: "Water Usage", body: `Reservoir ${s.farm.waterTank}% · smart irrigation optimizing 34% vs baseline.` },
    { title: "Fertilizer Recommendation", body: `NPK profile balanced (N ${sn.nitrogen} · P ${sn.phosphorus} · K ${sn.potassium}).` },
    { title: "AI Recommendations", body: `Prioritized actions generated with confidence ${s.key === "healthy" ? 92 : s.key === "dry" ? 78 : 71}%.` },
  ];

  const trigger = (label: string) => {
    toast.success(`${label} — mock action`);
    add({ icon: "report", title: `Report ${label}`, body: `Farm report ${label.toLowerCase()} for ${s.name}.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Reports</div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Farm Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate, print or download detailed AI-authored farm reports.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl" onClick={() => trigger("Printed")}><Printer className="mr-2 h-4 w-4" /> Print</Button>
          <Button variant="outline" className="rounded-xl" onClick={() => trigger("Downloaded")}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
          <Button className="rounded-xl gradient-primary text-primary-foreground shadow-glow" onClick={() => trigger("Exported")}><Share2 className="mr-2 h-4 w-4" /> Export Summary</Button>
        </div>
      </div>

      <div className="glass rounded-3xl p-8 shadow-elegant">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-xl gradient-primary grid place-items-center shadow-glow">
            <FileText className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Current Report</div>
            <h2 className="text-2xl font-bold mt-1">{s.name} — Full Farm Report</h2>
            <p className="text-sm text-muted-foreground mt-1">Generated moments ago · AgriTwin AI · Team Tech Wizards</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sections.map((sec) => (
            <div key={sec.title} className="rounded-2xl bg-background/60 border border-border/50 p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{sec.title}</div>
              <div className="mt-2 text-sm leading-relaxed">{sec.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Previous Reports</h3>
        <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
          {pastReports.map((r) => (
            <div key={r.id} className="glass rounded-2xl p-4 relative">
              <span className="absolute -left-[18px] top-5 h-3 w-3 rounded-full bg-primary shadow-glow" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-semibold">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.id} · {r.date} · {r.scenario}</div>
                </div>
                <Button size="sm" variant="ghost" className="rounded-xl" onClick={() => trigger("Downloaded")}>
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{r.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
