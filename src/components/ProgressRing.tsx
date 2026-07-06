import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type RingTone = "good" | "warning" | "critical";

export function toneForValue(value: number, opts?: { invert?: boolean; goodMin?: number; warnMin?: number }): RingTone {
  const invert = opts?.invert ?? false;
  const goodMin = opts?.goodMin ?? 70;
  const warnMin = opts?.warnMin ?? 40;
  if (invert) {
    // low = good (e.g. disease risk)
    if (value <= 100 - goodMin) return "good";
    if (value <= 100 - warnMin) return "warning";
    return "critical";
  }
  if (value >= goodMin) return "good";
  if (value >= warnMin) return "warning";
  return "critical";
}

const toneColor: Record<RingTone, string> = {
  good: "var(--color-primary)",
  warning: "var(--color-warning)",
  critical: "var(--color-destructive)",
};

const toneText: Record<RingTone, string> = {
  good: "text-primary",
  warning: "text-warning",
  critical: "text-destructive",
};

const toneDot: Record<RingTone, string> = {
  good: "bg-primary",
  warning: "bg-warning",
  critical: "bg-destructive",
};

export function ProgressRing({
  value,
  size = 96,
  stroke = 8,
  tone = "good",
  label,
  icon: Icon,
  tooltip,
  duration = 900,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: RingTone;
  label?: string;
  icon?: LucideIcon;
  tooltip?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, display));
  const offset = circ - (clamped / 100) * circ;

  useEffect(() => {
    const start = performance.now();
    const from = display;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const ring = (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--color-muted)"
          strokeWidth={stroke}
          fill="none"
          opacity={0.6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={toneColor[tone]}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke 0.4s ease" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          {Icon && <Icon className={cn("h-3.5 w-3.5 mx-auto mb-0.5", toneText[tone])} />}
          <div className={cn("text-lg font-bold leading-none", toneText[tone])}>
            {Math.round(clamped)}
            <span className="text-xs opacity-70">%</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="glass card-hover rounded-2xl p-4 flex flex-col items-center gap-2 cursor-help">
            {ring}
            {label && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span className={cn("h-1.5 w-1.5 rounded-full", toneDot[tone])} />
                {label}
              </div>
            )}
          </div>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent className="max-w-xs text-xs leading-relaxed">{tooltip}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
