import { useEffect, useState } from "react";
import { ClientCard } from "../components/ClientCard";
import { api } from "../api/api";
import { Client } from "../types/client";
import classNames from "classnames";

export function Selected() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const userName = localStorage.getItem("userName") || "Visitante";

  useEffect(() => {
    const storedIds = localStorage.getItem("selectedIds") || "[]";
    if (storedIds) {
      setSelectedIds(JSON.parse(storedIds));
    }

    const fetchClients = async () => {
      try {
        const response = await api.get("/clients");
        setClients(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    selectedIds.includes(client.id)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <div className="header-nav-container text-black">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className={classNames("nav-button", {
              "text-black": true,
            })}
          >
            Clientes
          </button>
          <button
            onClick={() => (window.location.href = "/selected")}
            className={classNames("nav-button text-orange-500 font-semibold")}
          >
            Clientes Selecionados ({selectedIds.length})
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="nav-button"
          >
            Sair
          </button>
        </div>
        <div className="flex items-center text-black whitespace-nowrap">
          <span className="mr-1">Olá,</span>
          <span className="font-semibold">{userName}</span>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-black mb-6">
          Clientes Selecionados
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={() => {}}
              onDelete={() => {}}
              onSelect={() => {}}
              isSelected={true}
            />
          ))}
        </div>
        {selectedIds.length > 0 && (
          <button
            className="bg-white font-bold text-orange-500 px-4 py-2 border-2 border-orange-500 w-full block mt-8"
            onClick={() => {
              localStorage.removeItem("selectedIds");
              setSelectedIds([]);
            }}
          >
            Limpar Lista de Selecionados
          </button>
        )}
      </main>
    </div>
  );
}
