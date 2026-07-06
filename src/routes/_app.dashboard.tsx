import { createFileRoute } from "@tanstack/react-router";
import {
  Droplets, Thermometer, Wind, CloudRain, Leaf, Activity, Sprout, Timer,
  FlaskConical, Sun, TestTube, Gauge,
} from "lucide-react";
import { SensorCard } from "@/components/SensorCard";
import { useFarm } from "@/lib/farm-context";
import { timeSeries } from "@/lib/mock-data";
import { useMemo } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, BarChart, Bar,
} from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · AgriTwin AI" }] }),
  component: Dashboard,
});

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="mt-4 h-48">{children}</div>
    </div>
  );
}

function Dashboard() {
  const { scenario } = useFarm();
  const s = scenario.sensors;

  const moistureData = useMemo(() => timeSeries(s.soilMoisture, 10), [s.soilMoisture]);
  const tempData = useMemo(() => timeSeries(s.airTemp, 5), [s.airTemp]);
  const growthData = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ t: `W${i + 1}`, value: Math.min(100, 8 + i * (s.growth / 12)) })),
    [s.growth]
  );
  const waterData = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({ t: ["M","T","W","T","F","S","S"][i], value: 20 + ((i * 13 + s.soilMoisture) % 40) })),
    [s.soilMoisture]
  );
  const diseaseData = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({ t: ["M","T","W","T","F","S","S"][i], value: Math.max(5, 100 - s.plantHealth + ((i * 7) % 20)) })),
    [s.plantHealth]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Live Farm Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {scenario.emoji} {scenario.name} · {scenario.description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <SensorCard icon={Droplets} label="Soil Moisture" value={s.soilMoisture} unit="%" tone="info" />
        <SensorCard icon={Thermometer} label="Soil Temp" value={s.soilTemp} unit="°C" tone="warning" />
        <SensorCard icon={Sun} label="Air Temp" value={s.airTemp} unit="°C" tone="warning" />
        <SensorCard icon={CloudRain} label="Humidity" value={s.humidity} unit="%" tone="info" />
        <SensorCard icon={TestTube} label="Soil pH" value={s.soilPh} decimals={1} tone="primary" />
        <SensorCard icon={FlaskConical} label="Nitrogen" value={s.nitrogen} unit="ppm" tone="primary" />
        <SensorCard icon={FlaskConical} label="Phosphorus" value={s.phosphorus} unit="ppm" tone="primary" />
        <SensorCard icon={FlaskConical} label="Potassium" value={s.potassium} unit="ppm" tone="primary" />
        <SensorCard icon={Wind} label="Wind Speed" value={s.windSpeed} unit="km/h" tone="info" />
        <SensorCard icon={CloudRain} label="Rain Prob." value={s.rainProb} unit="%" tone="info" />
        <SensorCard icon={Leaf} label="Plant Health" value={s.plantHealth} unit="%" tone={s.plantHealth < 70 ? "destructive" : "primary"} />
        <SensorCard icon={Sprout} label="Growth" value={s.growth} unit="%" tone="primary" />
        <SensorCard icon={Timer} label="Harvest In" value={s.harvestDays} unit="d" tone="warning" />
        <SensorCard icon={Activity} label="Weather" value={scenario.weather.temp} unit={`°C ${scenario.weather.condition}`} tone="info" />
        <SensorCard icon={Gauge} label="Farm Score" value={scenario.healthScore} unit="/100" tone={scenario.healthScore < 70 ? "warning" : "primary"} />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ChartCard title="Moisture over time" subtitle="Past 24 hours">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moistureData}>
              <defs>
                <linearGradient id="gm" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-info)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-info)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-info)" strokeWidth={2} fill="url(#gm)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Temperature over time" subtitle="Past 24 hours">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tempData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="value" stroke="var(--color-warning)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Plant Growth" subtitle="Weekly progression">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="gg" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill="url(#gg)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Water Usage" subtitle="Liters this week">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Bar dataKey="value" fill="var(--color-info)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Disease Risk" subtitle="7-day trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={diseaseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="t" fontSize={11} stroke="var(--color-muted-foreground)" />
              <YAxis fontSize={11} stroke="var(--color-muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="value" stroke="var(--color-destructive)" strokeWidth={2.5} dot={{ fill: "var(--color-destructive)" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="glass rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold">Live AI Insight</h3>
            <p className="text-xs text-muted-foreground mt-1">Fireworks AI · Llama 3 70B</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            {scenario.key === "healthy" && "All indicators nominal. Maintain current irrigation schedule; consider light foliar potassium next week."}
            {scenario.key === "dry" && "Soil moisture critical in the west quadrant. Recommend 45-minute drip cycle in the next 3 hours."}
            {scenario.key === "disease" && "Humidity + low pH suggests fungal risk. Deploy scouting drone and prep copper-based spray."}
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Updated 12s ago
          </div>
        </div>
      </div>
    </div>
  );
}
