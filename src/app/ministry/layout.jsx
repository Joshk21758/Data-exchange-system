import { SidebarProvider } from "@/components/ui/sidebar";
import MinistrySidebar from "@/components/layout/ministry-sidebar";
import MinistryHeader from "@/components/layout/ministry-header";
import { Sidebar } from "@/components/ui/sidebar";

export default function MinistryDashboardLayout({
  children,
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar>
          <MinistrySidebar />
        </Sidebar>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <MinistryHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}