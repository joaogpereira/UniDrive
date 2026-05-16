import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ✅ Importações de Contexto e Hooks
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useRideNotifications } from "./hooks/useRideNotifications"; 

// 🌎 Páginas públicas
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 🔒 Páginas protegidas (usuário)
import ProtectedRoute, { DriverRoutes } from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Regions from "./pages/Regions";
import RidesList from "./pages/TripList";
import RideChat from "./pages/TripChat";
import Payment from "./pages/Payment";

// 🚗 Páginas de motorista
import DriverProfile from "./pages/DriverProfile";
import DriverRegistration from "./pages/DriverRegistration";
import ManageCars from "./pages/ManageCars";
import CreateTrip from "./pages/CreateTrip";

// 🟩 Páginas administrativas
import LoginAdmin from "./pages/AdminPages/Login";
import Dashboard from "./pages/AdminPages/Dashboard";
import UsersList from "./pages/AdminPages/UsersList";
import Pendingusers from "./pages/AdminPages/PendingUsers";

// ❌ Página 404
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ✅ Componente invisível que gerencia as conexões WebSocket (Reverb)
const NotificationManager = () => {
  const { user } = useAuth();
  
  // Agora que o hook aceita string ou number, este erro desaparece
  useRideNotifications(user?.id); 
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <NotificationManager />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loginadmin" element={<LoginAdmin />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/pending" element={<Pendingusers />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/regions" element={<ProtectedRoute><Regions /></ProtectedRoute>} />
            <Route path="/triplist" element={<ProtectedRoute><RidesList /></ProtectedRoute>} />
            <Route path="/ride-details/:rideId" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/chat/:rideId" element={<ProtectedRoute><RideChat /></ProtectedRoute>} />
            <Route path="/driver-profile" element={<ProtectedRoute><DriverRoutes><DriverProfile /></DriverRoutes></ProtectedRoute>} />
            <Route path="/driver-registration" element={<ProtectedRoute><DriverRegistration /></ProtectedRoute>} />
            <Route path="/manage-cars" element={<ProtectedRoute><DriverRoutes><ManageCars /></DriverRoutes></ProtectedRoute>} />
            <Route path="/create-trip" element={<ProtectedRoute><DriverRoutes><CreateTrip /></DriverRoutes></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;