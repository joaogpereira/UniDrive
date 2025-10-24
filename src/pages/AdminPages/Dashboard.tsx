// src/pages/Admin/Dashboard.tsx
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Car, ShieldCheck } from "lucide-react";
import AdminLayout from "./componentes/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRides: 1280,
    totalUsers: 540,
    admins: 4,
  });

  const userGrowth = [
    { month: "Jan", users: 40 },
    { month: "Fev", users: 65 },
    { month: "Mar", users: 90 },
    { month: "Abr", users: 130 },
    { month: "Mai", users: 170 },
    { month: "Jun", users: 200 },
  ];

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Visão Geral</h2>
      <div className="grid grid-cols-3 gap-6 mb-10">
        <Card className="bg-black border-green-500/40">
          <CardContent className="p-6 flex items-center gap-4">
            <Car className="text-green-400" size={28} />
            <div>
              <p className="text-gray-400 text-sm">Corridas Pedidas</p>
              <p className="text-2xl font-bold text-white">{stats.totalRides}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-green-500/40">
          <CardContent className="p-6 flex items-center gap-4">
            <Users className="text-green-400" size={28} />
            <div>
              <p className="text-gray-400 text-sm">Usuários Cadastrados</p>
              <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-green-500/40">
          <CardContent className="p-6 flex items-center gap-4">
            <ShieldCheck className="text-green-400" size={28} />
            <div>
              <p className="text-gray-400 text-sm">Administradores</p>
              <p className="text-2xl font-bold text-white">{stats.admins}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-black border border-green-500/40 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Crescimento de Usuários</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00ff80" opacity={0.2} />
            <XAxis dataKey="month" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#00ff80" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
}
