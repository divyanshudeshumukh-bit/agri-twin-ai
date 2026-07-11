import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";
import { FarmProvider } from "@/lib/farm-context";
import { NotificationsProvider } from "@/lib/notifications-context";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <FarmProvider>
      <NotificationsProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex flex-col min-w-0">
              <AppHeader />
              <main className="flex-1 px-4 py-6 md:px-8">
                <Outlet />
              </main>
              <AppFooter />
            </SidebarInset>
          </div>
          <Toaster />
        </SidebarProvider>
      </NotificationsProvider>
    </FarmProvider>
  );
}
