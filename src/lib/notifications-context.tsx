import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from "react";
import { baseNotifications, type Notification } from "./mock-data";
import { useFarm } from "./farm-context";

interface Ctx {
  notifications: Notification[];
  unread: number;
  add: (n: Omit<Notification, "id" | "read" | "time">) => void;
  markAllRead: () => void;
  clearAll: () => void;
  markRead: (id: string) => void;
}

const NotifCtx = createContext<Ctx | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const { scenarioKey } = useFarm();
  const [extra, setExtra] = useState<Notification[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [cleared, setCleared] = useState(false);

  const notifications = useMemo(() => {
    const list = cleared ? [] : [...extra, ...baseNotifications(scenarioKey)];
    return list.map((n) => ({ ...n, read: n.read || readIds.has(n.id) }));
  }, [extra, scenarioKey, readIds, cleared]);

  const add: Ctx["add"] = useCallback((n) => {
    setCleared(false);
    setExtra((prev) => [{ ...n, id: `x-${Date.now()}`, read: false, time: "just now" }, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  }, [notifications]);

  const markRead = useCallback((id: string) => {
    setReadIds((prev) => new Set(prev).add(id));
  }, []);

  const clearAll = useCallback(() => {
    setCleared(true);
    setExtra([]);
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <NotifCtx.Provider value={{ notifications, unread, add, markAllRead, markRead, clearAll }}>
      {children}
    </NotifCtx.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotifCtx);
  if (!ctx) throw new Error("useNotifications must be inside NotificationsProvider");
  return ctx;
}
