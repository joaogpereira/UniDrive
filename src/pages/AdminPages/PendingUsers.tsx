// src/pages/Admin/PendingUsers.tsx
import AdminLayout from "./componentes/AdminLayout";

export default function PendingUsers() {
  const pending = [
    { id: 1, name: "Carlos Souza", role: "Motorista", issue: "Documento ilegível" },
    { id: 2, name: "Mariana Alves", role: "Passageiro", issue: "Foto fora do padrão" },
  ];

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Pendentes / Com Problemas</h2>
      <div className="space-y-4">
        {pending.map((u) => (
          <div
            key={u.id}
            className="bg-black border border-yellow-500/40 p-5 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-white">{u.name}</h3>
            <p className="text-gray-400 text-sm">{u.role}</p>
            <p className="text-yellow-400 mt-1">Problema: {u.issue}</p>
            <button className="mt-3 bg-green-600 hover:bg-green-500 text-black px-4 py-2 rounded">
              Ver documentos
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
