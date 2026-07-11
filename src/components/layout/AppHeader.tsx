import { Bell, Cloud, User, Check, Trash2 } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { useFarm } from "@/lib/farm-context";
import { scenarios, type ScenarioKey } from "@/lib/mock-data";
import { useNotifications } from "@/lib/notifications-context";
import { NotificationIcon } from "@/components/NotificationIcon";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const { scenarioKey, setScenario, scenario } = useFarm();
  const { notifications, unread, markAllRead, clearAll, markRead } = useNotifications();

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

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-xl" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center shadow-glow">
                  {unread}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[360px] p-0 glass border-border/50">
            <div className="flex items-center justify-between p-3 border-b border-border/50">
              <div className="font-semibold text-sm">Notifications</div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={markAllRead}>
                  <Check className="h-3 w-3 mr-1" /> Read
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={clearAll}>
                  <Trash2 className="h-3 w-3 mr-1" /> Clear
                </Button>
              </div>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">No notifications</div>
              ) : notifications.slice(0, 8).map((n) => (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={cn(
                    "w-full text-left flex gap-3 p-3 hover:bg-accent transition-colors border-b border-border/30",
                    !n.read && "bg-primary/5"
                  )}
                >
                  <NotificationIcon kind={n.icon} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium truncate">{n.title}</div>
                      {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{n.body}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-2 border-t border-border/50">
              <Link to="/notifications" className="block w-full text-center text-xs text-primary hover:underline py-1">
                View all notifications
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center text-primary-foreground shadow-glow">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
}
