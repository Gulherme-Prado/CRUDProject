import { useEffect, useState } from "react";
import { ClientCard } from "../components/ClientCard";
import { api } from "../api/api";
import { Client } from "../types/client";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

export function Selected() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const userName = localStorage.getItem("userName") || "Visitante";
  const navigate = useNavigate();
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
            onClick={() => navigate("/dashboard")}
            className={classNames("nav-button", {
              "text-black": true,
            })}
          >
            Clientes
          </button>
          <button
            onClick={() => navigate("/selected")}
            className={classNames("nav-button text-orange-500 font-semibold")}
          >
            Clientes Selecionados ({selectedIds.length})
          </button>
          <button onClick={() => navigate("/")} className="nav-button">
            Sair
          </button>
        </div>
        <div className="flex items-center text-black whitespace-nowrap ml-auto">
          Olá, <span className="ml-2 pr-10 font-semibold">{userName}</span>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2x1 text-black font-bold">
            Clientes Selecionados
          </h1>
        </div>

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
