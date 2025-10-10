import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";

export default function DashboardLayout({
  children,
}) {
  return (
    <SidebarProvider>
        <Sidebar>
            <AppSidebar />
        </Sidebar>
        <div className="flex flex-col w-full">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                {children}
            </main>
        </div>
    </SidebarProvider>
  );
}
