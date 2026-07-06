import { createFileRoute } from "@tanstack/react-router";
import { Box, Plane, Satellite, Radio, Sparkles, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/digital-twin")({
  head: () => ({ meta: [{ title: "Future Digital Twin · AgriTwin AI" }] }),
  component: DigitalTwin,
});

const features = [
  { icon: Box, title: "3D Farm Visualization", desc: "Immersive, physics-accurate rendering of every plant, zone and valve." },
  { icon: Plane, title: "Drone Mapping", desc: "Autonomous scout drones stream aerial imagery into the twin in real time." },
  { icon: Satellite, title: "Satellite Integration", desc: "NDVI + weather overlays from orbital sensors, updated hourly." },
  { icon: Radio, title: "Live IoT Overlay", desc: "Every sensor reading anchored to its exact 3D location on the farm." },
];

function DigitalTwin() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Roadmap</div>
        <h1 className="text-3xl font-bold tracking-tight mt-1">Future Digital Twin</h1>
        <p className="text-muted-foreground text-sm mt-1">A living, three-dimensional replica of your farm — coming soon.</p>
      </div>

      {/* Premium placeholder */}
      <div className="glass rounded-3xl p-2 shadow-elegant">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-sidebar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.62_0.17_148/0.35),transparent_50%),radial-gradient(circle_at_70%_70%,oklch(0.65_0.15_230/0.3),transparent_50%)]" />
          {/* animated grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(oklch(0.62 0.17 148 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.17 148 / 0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />
          <div className="absolute inset-0 grid place-items-center text-center px-6">
            <div>
              <div className="mx-auto h-20 w-20 rounded-2xl gradient-primary grid place-items-center shadow-glow animate-float">
                <Box className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="mt-5 text-primary-foreground font-semibold text-2xl">Immersive 3D Twin — Coming Soon</div>
              <div className="text-primary-foreground/70 text-sm mt-2 max-w-md mx-auto">
                We're building a real-time, drone-mapped, satellite-fused 3D replica of your farm.
              </div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-primary-foreground/90 border border-white/10">
                <Clock className="h-3 w-3" /> Planned · Q3 rollout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Planned features */}
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="glass card-hover rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
            <div className="flex items-start gap-4 relative">
              <div className="h-11 w-11 rounded-xl gradient-primary grid place-items-center shadow-glow shrink-0">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{f.title}</h3>
                  <span className="text-[10px] uppercase tracking-wider bg-primary/15 text-primary px-2 py-0.5 rounded-full font-semibold">Planned</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-5 flex items-center gap-3 text-sm">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="text-muted-foreground">
          Meanwhile, the <strong className="text-foreground">Home</strong> and <strong className="text-foreground">Sensor Network</strong> pages give you the full command view of the live twin.
        </span>
      </div>
    </div>
  );
}
