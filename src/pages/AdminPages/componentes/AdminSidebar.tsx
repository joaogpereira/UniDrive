// src/pages/Admin/components/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { BarChart2, Users, AlertTriangle } from "lucide-react";

export default function AdminSidebar() {
  const { pathname } = useLocation();

  const links = [
    { path: "/admin", label: "Visão Geral", icon: <BarChart2 size={18} /> },
    { path: "/admin/users", label: "Usuários", icon: <Users size={18} /> },
    { path: "/admin/pending", label: "Pendentes", icon: <AlertTriangle size={18} /> },
  ];

  return (
    <aside className="w-64 bg-black border-r border-green-500/30 p-5 flex flex-col">
      <h2 className="text-green-400 text-xl font-bold mb-8 text-center">
        UniDrive Admin
      </h2>
      <nav className="flex flex-col gap-4">
        {links.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
              ${pathname === path ? "bg-green-600 text-black font-bold" : "hover:bg-green-800/40"}
            `}
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
