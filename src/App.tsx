import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GuestSplash from "./pages/guest/GuestSplash";
import GuestHome from "./pages/guest/GuestHome";
import GuestEmergency from "./pages/guest/GuestEmergency";
import GuestEvacuation from "./pages/guest/GuestEvacuation";
import StaffLogin from "./pages/staff/StaffLogin";
import StaffHome from "./pages/staff/StaffHome";
import StaffAmber from "./pages/staff/StaffAmber";
import StaffEmergency from "./pages/staff/StaffEmergency";
import DashboardNormal from "./pages/dashboard/DashboardNormal";
import DashboardAmber from "./pages/dashboard/DashboardAmber";
import DashboardEmergency from "./pages/dashboard/DashboardEmergency";
import DashboardSimulator from "./pages/dashboard/DashboardSimulator";
import DashboardReport from "./pages/dashboard/DashboardReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guest/splash" element={<GuestSplash />} />
          <Route path="/guest/home" element={<GuestHome />} />
          <Route path="/guest/emergency" element={<GuestEmergency />} />
          <Route path="/guest/evacuation" element={<GuestEvacuation />} />
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/home" element={<StaffHome />} />
          <Route path="/staff/amber" element={<StaffAmber />} />
          <Route path="/staff/emergency" element={<StaffEmergency />} />
          <Route path="/dashboard" element={<DashboardNormal />} />
          <Route path="/dashboard/amber" element={<DashboardAmber />} />
          <Route path="/dashboard/emergency" element={<DashboardEmergency />} />
          <Route path="/dashboard/simulator" element={<DashboardSimulator />} />
          <Route path="/dashboard/report" element={<DashboardReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
