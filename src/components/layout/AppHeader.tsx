import { Bell, Cloud, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useFarm } from "@/lib/farm-context";
import { scenarios, type ScenarioKey } from "@/lib/mock-data";

export function AppHeader() {
  const { scenarioKey, setScenario, scenario } = useFarm();
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/50 glass px-4">
      <SidebarTrigger />
      <div className="flex items-center gap-2 min-w-0">
        <Select value={scenarioKey} onValueChange={(v) => setScenario(v as ScenarioKey)}>
          <SelectTrigger className="w-[200px] rounded-xl border-border/50 bg-background/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(scenarios).map((s) => (
              <SelectItem key={s.key} value={s.key}>
                <span className="mr-2">{s.emoji}</span>{s.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-background/60 px-3 py-1.5 border border-border/50">
          <Cloud className="h-4 w-4 text-info" />
          <span className="text-sm font-medium">{scenario.weather.temp}°C</span>
          <span className="text-xs text-muted-foreground">{scenario.weather.condition}</span>
        </div>
        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
        </Button>
        <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center text-primary-foreground shadow-glow">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
