import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";

// Layouts
import { UserLayout } from "@/components/layouts/UserLayout";
import { AdminLayout } from "@/components/layouts/AdminLayout";

// Pages
import Landing from "@/pages/Landing";
import UserDashboard from "@/pages/user/Dashboard";
import UserDrives from "@/pages/user/Drives";
import AIAssistant from "@/pages/user/AIAssistant";
import UserHistory from "@/pages/user/History";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminDonors from "@/pages/admin/Donors";
import CreateRequest from "@/pages/admin/CreateRequest";
import LiveRequests from "@/pages/admin/LiveRequests";
import AdminAnalytics from "@/pages/admin/Analytics";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />

            {/* User Routes */}
            <Route path="/user" element={<UserLayout />}>
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="drives" element={<UserDrives />} />
              <Route path="ai-assistant" element={<AIAssistant />} />
              <Route path="history" element={<UserHistory />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="donors" element={<AdminDonors />} />
              <Route path="requests/create" element={<CreateRequest />} />
              <Route path="requests" element={<LiveRequests />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
