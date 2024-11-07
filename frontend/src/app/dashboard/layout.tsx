import NavLayout from "@/components/custom/dashboard/nav-layout";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full block space-y-5">
        <NavLayout />
        <div className="px-5">{children}</div>
      </main>
    </SidebarProvider>
  );
}
