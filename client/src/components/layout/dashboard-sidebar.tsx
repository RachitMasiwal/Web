import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Package, 
  FileText, 
  Send, 
  User, 
  LogOut,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Jobs", href: "/dashboard/jobs", icon: Package },
  { name: "Invoice List", href: "/dashboard/invoices", icon: FileText },
  { name: "Send Request", href: "/dashboard/requests", icon: Send },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export function DashboardSidebar() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/signout", { method: "POST" });
      if (!response.ok) throw new Error("Failed to sign out");
      return response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/signin");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: "Please try again",
      });
    },
  });

  return (
    <div className="h-full bg-gradient-to-b from-orange-500 to-orange-600 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-orange-400">
        <div className="flex items-center space-x-3">
          <Building2 className="h-8 w-8" />
          <div>
            <div className="text-sm font-medium opacity-90">
              onslogisticsindia@cargo.co.uk
            </div>
            <div className="text-lg font-bold">ONS LOGISTICS INDIA PVT. LTD.</div>
            <div className="text-xs opacity-75">International Freight Forwarders</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item, index) => {
          const isActive = location.startsWith(item.href);
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left h-12 hover:bg-orange-400/20 transition-colors",
                    isActive && "bg-orange-400/30 text-white font-medium"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Button>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-orange-400">
        <Button
          variant="ghost"
          onClick={() => signOutMutation.mutate()}
          disabled={signOutMutation.isPending}
          className="w-full justify-start text-left h-12 hover:bg-orange-400/20 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          {signOutMutation.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}