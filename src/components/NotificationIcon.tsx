import { Bug, Droplets, CheckCircle2, FlaskConical, FileText, CloudRain, Radio } from "lucide-react";
import type { Notification } from "@/lib/mock-data";

const map = {
  disease: { i: Bug, tone: "bg-destructive/15 text-destructive" },
  "irrigation-start": { i: Droplets, tone: "bg-info/15 text-info" },
  "irrigation-done": { i: CheckCircle2, tone: "bg-primary/15 text-primary" },
  fertilizer: { i: FlaskConical, tone: "bg-primary/15 text-primary" },
  report: { i: FileText, tone: "bg-info/15 text-info" },
  weather: { i: CloudRain, tone: "bg-warning/15 text-warning" },
  sensor: { i: Radio, tone: "bg-warning/15 text-warning" },
} as const;

export function NotificationIcon({ kind }: { kind: Notification["icon"] }) {
  const { i: Icon, tone } = map[kind];
  return (
    <div className={`h-9 w-9 rounded-lg grid place-items-center ${tone}`}>
      <Icon className="h-4 w-4" />
    </div>
  );
}
