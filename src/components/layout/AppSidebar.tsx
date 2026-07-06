import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Box, Sprout, Brain, BarChart3, MessageSquare, Settings, Leaf,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Digital Twin", url: "/digital-twin", icon: Box },
  { title: "Plants", url: "/plants", icon: Sprout },
  { title: "AI Analysis", url: "/ai-analysis", icon: Brain },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Settings", url: "/settings", icon: Settings },
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
            <div className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">Digital Twin</div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-2 text-[10px] text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
          <div>AMD Powered · Fireworks AI</div>
          <div className="mt-1">v1.0.0</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
