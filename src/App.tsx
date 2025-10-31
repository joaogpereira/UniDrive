import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DriverRoutes } from "./components/ProtectedRoute";

// 🌎 Páginas públicas
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";

// 🔒 Páginas protegidas (usuário)
import Profile from "./pages/Profile";
import Regions from "./pages/Regions";
import RidesList from "./pages/TripList";
import RideChat from "./pages/TripChat";
import Payment from "./pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* ✅ O BrowserRouter agora envolve TODO o app */}
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <Routes>
            {/* 🌎 Rotas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🟩 Rotas administrativas */}
            <Route path="/loginadmin" element={<LoginAdmin />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/pending" element={<Pendingusers />} />

            {/* 🔒 Rotas protegidas de usuário */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/regions"
              element={
                <ProtectedRoute>
                  <Regions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/regions/:region"
              element={
                <ProtectedRoute>
                  <RidesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ride-details/:rideId"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:rideId"
              element={
                <ProtectedRoute>
                  <RideChat />
                </ProtectedRoute>
              }
            />

            {/* 🚗 Rotas exclusivas para motoristas */}
            <Route
              path="/driver-profile"
              element={
                <ProtectedRoute>
                  <DriverRoutes>
                    <DriverProfile />
                  </DriverRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver-registration"
              element={
                <ProtectedRoute>
                  <DriverRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-cars"
              element={
                <ProtectedRoute>
                  <DriverRoutes>
                    <ManageCars />
                  </DriverRoutes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-trip"
              element={
                <ProtectedRoute>
                  <DriverRoutes>
                    <CreateTrip />
                  </DriverRoutes>
                </ProtectedRoute>
              }
            />

            {/* ❌ Página não encontrada */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
