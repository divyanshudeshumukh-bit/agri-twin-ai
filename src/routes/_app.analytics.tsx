import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, LineChart, Line,
} from "recharts";
import { Droplets, Sprout, Bug, FlaskConical, Leaf, DollarSign } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useFarm } from "@/lib/farm-context";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics · AgriTwin AI" }] }),
  component: Analytics,
});

const RANGES = { daily: 7, weekly: 12, monthly: 12 } as const;

function series(len: number, base: number, variance: number) {
  return Array.from({ length: len }, (_, i) => ({
    t: `${i + 1}`,
    value: Math.max(0, Math.round(base + Math.sin(i / 2) * variance + (i * 3) % variance)),
  }));
}

function Analytics() {
  const [range, setRange] = useState<keyof typeof RANGES>("weekly");
  const { scenario } = useFarm();
  const len = RANGES[range];

  const water = useMemo(() => series(len, 50 - scenario.sensors.soilMoisture / 4, 12), [len, scenario]);
  const yieldD = useMemo(() => series(len, scenario.sensors.growth, 8), [len, scenario]);
  const disease = useMemo(() => series(len, 100 - scenario.sensors.plantHealth, 10), [len, scenario]);
  const fert = useMemo(() => series(len, 40, 15), [len]);

  const stats = [
    { i: Droplets, l: "Water Saved", v: 34, s: "%", tone: "info" },
    { i: Sprout, l: "Expected Yield", v: 21, s: "%", tone: "primary" },
    { i: Bug, l: "Disease Trend", v: -18, s: "%", tone: "destructive" },
    { i: FlaskConical, l: "Fertilizer Usage", v: -12, s: "%", tone: "primary" },
    { i: Leaf, l: "Carbon Reduced", v: 128, s: "kg", tone: "primary" },
    { i: DollarSign, l: "Profit Estimate", v: 4820, s: "$", tone: "warning" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Farm performance & sustainability metrics</p>
        </div>
        <Tabs value={range} onValueChange={(v) => setRange(v as any)}>
          <TabsList className="rounded-xl">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.l} className="glass card-hover rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</span>
              <div className={`h-9 w-9 rounded-xl grid place-items-center ${
                s.tone === "info" ? "bg-info/10 text-info" :
                s.tone === "destructive" ? "bg-destructive/10 text-destructive" :
                s.tone === "warning" ? "bg-warning/10 text-warning" :
                "bg-primary/10 text-primary"
              }`}>
                <s.i className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-3xl font-bold tracking-tight">
              {s.s === "$" && "$"}
              <AnimatedCounter value={s.v} />
              {s.s !== "$" && s.s}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Water Usage</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={water}>
                <defs>
                  <linearGradient id="wg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-info)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-info)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="value" stroke="var(--color-info)" fill="url(#wg)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Yield Trend</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldD}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Disease Trend</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={disease}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="value" stroke="var(--color-destructive)" strokeWidth={2.5} dot={{ fill: "var(--color-destructive)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Fertilizer Usage</h3>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fert}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="value" fill="var(--color-primary-glow)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
