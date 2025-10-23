// src/pages/Admin/components/AdminHeader.tsx
export default function AdminHeader() {
  return (
    <header className="w-full bg-black/80 border-b border-green-500/30 py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-green-400">Painel Administrativo</h1>
      <span className="text-gray-400 text-sm">Bem-vindo, Administrador 👋</span>
    </header>
  );
}
