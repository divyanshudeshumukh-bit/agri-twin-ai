import type { LucideIcon } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { cn } from "@/lib/utils";

export function SensorCard({
  icon: Icon,
  label,
  value,
  unit = "",
  decimals = 0,
  hint,
  tone = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  hint?: string;
  tone?: "primary" | "info" | "warning" | "destructive";
}) {
  const toneMap = {
    primary: "from-primary/20 to-primary-glow/10 text-primary",
    info: "from-info/20 to-info/5 text-info",
    warning: "from-warning/25 to-warning/5 text-warning",
    destructive: "from-destructive/20 to-destructive/5 text-destructive",
  } as const;

  return (
    <div className="glass card-hover rounded-2xl p-5 relative overflow-hidden group">
      <div className={cn("absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-70 blur-2xl", toneMap[tone])} />
      <div className="flex items-center justify-between relative">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        <div className={cn("h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br", toneMap[tone])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-1 relative">
        <span className="text-3xl font-bold tracking-tight text-foreground">
          <AnimatedCounter value={value} decimals={decimals} />
        </span>
        {unit && <span className="text-sm text-muted-foreground font-medium">{unit}</span>}
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground relative">{hint}</p>}
    </div>
  );
}
