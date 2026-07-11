import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/lib/notifications-context";
import { NotificationIcon } from "@/components/NotificationIcon";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "Notifications · AgriTwin AI" }] }),
  component: Notifications,
});

function Notifications() {
  const { notifications, unread, markAllRead, clearAll, markRead } = useNotifications();
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Center</div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-1">{unread} unread · {notifications.length} total</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl" onClick={markAllRead}><Check className="mr-2 h-4 w-4" /> Mark all read</Button>
          <Button variant="outline" className="rounded-xl" onClick={clearAll}><Trash2 className="mr-2 h-4 w-4" /> Clear all</Button>
        </div>
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center text-sm text-muted-foreground">
            No notifications right now. You're all caught up 🌱
          </div>
        ) : notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => markRead(n.id)}
            className={cn(
              "w-full text-left glass rounded-2xl p-4 flex gap-3 hover:bg-accent transition-colors",
              !n.read && "ring-1 ring-primary/40"
            )}
          >
            <NotificationIcon kind={n.icon} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-medium">{n.title}</div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary" />}
              </div>
              <div className="text-sm text-muted-foreground">{n.body}</div>
              <div className="text-xs text-muted-foreground mt-1">{n.time}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
