import { DashboardSidebar } from "./dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen flex bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <DashboardSidebar />
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}