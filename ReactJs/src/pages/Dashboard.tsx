import { useState, useEffect } from "react";
import { ClientCard } from "../components/ClientCard";
import { api } from "../api/api";
import { Client } from "../types/client";
import { ClientFormDialog } from "../components/ClientFormDialog";

export function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "Visitante";

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Failed to fetch clients", error);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await api.delete(`/users/${id}`);
        setClients(clients.filter((client) => client.id !== id));
      } catch (error) {
        console.error("Failed to delete client", error);
      }
    }
  };

  const handleSaveClient = async (clientData: Omit<Client, "id">) => {
    try {
      if (currentClient) {
        const response = await api.patch<Client>(
          `/clients/${currentClient.id}`,
          clientData
        );
        setClients(
          clients.map((u) => (u.id === currentClient.id ? response.data : u))
        );
      } else {
        const response = await api.post<Client>("/users", clientData);
        setClients([...clients, response.data]);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-gray-700">Bem-vindo, {userName}!</p>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2x1 font-bold">Clientes Cadastrados</h1>
            <button
              onClick={() => (window.location.href = "/selected")}
              disabled={selectedIds.length === 0}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Ver Selecionados ({selectedIds.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onEdit={() => {
                  setCurrentClient(client);
                  setIsDialogOpen(true);
                }}
                onDelete={handleDelete}
                onSelect={toggleSelect}
                isSelected={selectedIds.includes(client.id)}
              />
            ))}
          </div>
          <ClientFormDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            client={currentClient}
            onSubmit={handleSaveClient}
          />
        </div>
      </main>
    </div>
  );
}
