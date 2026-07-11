import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Box, Sprout, Brain, BarChart3, MessageSquare, Settings, Leaf, Radio,
  ScanLine, Droplets, FlaskConical, Map, Bell, TriangleAlert, FileText, Info,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";

const groups: { label: string; items: { title: string; url: string; icon: any }[] }[] = [
  {
    label: "Command",
    items: [
      { title: "Home", url: "/home", icon: Home },
      { title: "Farm Zones", url: "/zones", icon: Map },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { title: "Smart Scan", url: "/scan", icon: ScanLine },
      { title: "Sensor Network", url: "/sensor-network", icon: Radio },
      { title: "Plants", url: "/plants", icon: Sprout },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Irrigation", url: "/irrigation", icon: Droplets },
      { title: "Fertilizer", url: "/fertilizer", icon: FlaskConical },
      { title: "Alerts", url: "/alerts", icon: TriangleAlert },
      { title: "Notifications", url: "/notifications", icon: Bell },
    ],
  },
  {
    label: "Insights",
    items: [
      { title: "AI Analysis", url: "/ai-analysis", icon: Brain },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "Reports", url: "/reports", icon: FileText },
      { title: "AI Assistant", url: "/chat", icon: MessageSquare },
    ],
  },
  {
    label: "More",
    items: [
      { title: "Digital Twin", url: "/digital-twin", icon: Box },
      { title: "About", url: "/about", icon: Info },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <div className="text-sm font-bold text-sidebar-foreground leading-tight">AgriTwin AI</div>
            <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">Precision Agriculture</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-2 text-[10px] text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          <div>Built by Team Tech Wizards</div>
          <div className="mt-1 opacity-70">v1.1.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
