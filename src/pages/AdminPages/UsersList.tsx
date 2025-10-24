// src/pages/Admin/UsersList.tsx
import { useState } from "react";
import AdminLayout from "./componentes/AdminLayout";

export default function UsersList() {
  const [users] = useState(
    Array.from({ length: 50 }).map((_, i) => ({
      id: i + 1,
      name: `Usuário ${i + 1}`,
      role: i % 3 === 0 ? "Motorista" : i % 2 === 0 ? "Passageiro" : "Administrador",
      status: i % 4 === 0 ? "Pendente" : "Aprovado",
    }))
  );

  const [page, setPage] = useState(1);
  const perPage = 20;
  const totalPages = Math.ceil(users.length / perPage);

  const currentUsers = users.slice((page - 1) * perPage, page * perPage);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Usuários</h2>

      <table className="w-full text-left border border-green-500/30 rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-black">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Tipo</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((u) => (
            <tr key={u.id} className="border-b border-green-500/20">
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">{u.status}</td>
              <td className="p-3 text-center">
                <button className="text-green-400 hover:text-green-300 mr-3">
                  Editar
                </button>
                <button className="text-red-500 hover:text-red-400">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-green-600 text-black"
                : "bg-gray-800 text-gray-400 hover:bg-green-800/40"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </AdminLayout>
  );
}
