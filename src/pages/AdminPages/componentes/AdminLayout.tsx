// src/pages/Admin/components/AdminLayout.tsx
import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 bg-neutral-900 border-t border-green-500/20">
          {children}
        </main>
      </div>
    </div>
  );
}
