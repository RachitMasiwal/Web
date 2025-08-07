import React from "react";
import { Switch, Route, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Tracking from "@/pages/tracking";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import SignUp from "@/pages/sign-up";
import SignIn from "@/pages/sign-in";
import Dashboard from "@/pages/dashboard";
import JobsPage from "@/pages/dashboard/jobs";
import InvoicesPage from "@/pages/dashboard/invoices";
import RequestsPage from "@/pages/dashboard/requests";
import ProfilePage from "@/pages/dashboard/profile";
import NotFound from "@/pages/not-found";

// Protected route wrapper
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const [location, setLocation] = useLocation();
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  React.useEffect(() => {
    if (!isLoading && (error || !user)) {
      setLocation("/signin");
    }
  }, [isLoading, error, user, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error || !user) {
    return null;
  }

  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function Router() {
  const [location] = useLocation();
  
  // If user is on a dashboard route, show protected content
  if (location.startsWith("/dashboard")) {
    return (
      <Switch>
        <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
        <Route path="/dashboard/jobs" component={() => <ProtectedRoute component={JobsPage} />} />
        <Route path="/dashboard/invoices" component={() => <ProtectedRoute component={InvoicesPage} />} />
        <Route path="/dashboard/requests" component={() => <ProtectedRoute component={RequestsPage} />} />
        <Route path="/dashboard/profile" component={() => <ProtectedRoute component={ProfilePage} />} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // Public routes with navbar and footer
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/tracking" component={Tracking} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
