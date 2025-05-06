import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClientCard } from "../components/ClientCard";
import { api } from "../api/api";
import { Client } from "../types/client";
import { ClientFormDialog } from "../components/ClientFormDialog";
import classNames from "classnames";

export function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem("selectedIds") || "[]");
  });
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "Visitante";
  const [page, setPage] = useState(1);
  const [clientsPerPage, setClientsPerPage] = useState(15);

  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const paginatedClients = clients.slice(
    (page - 1) * clientsPerPage,
    page * clientsPerPage
  );
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const isSelected = location.pathname === "/selected";
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedIds", JSON.stringify(selectedIds));
  }, [selectedIds]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/clients");
        setClients(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch clients", error);
        setClients([]);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        await api.delete(`/clients/${id}`);
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
        const response = await api.post<Client>("/clients", clientData);
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
      <header className="bg-white shadow-sm px-6 py-4">
        <div className="flex justify-between items-center w-screen">
          <div className="header-nav-container bg-transparent text-black flex space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className={classNames("nav-button", {
                "text-orange-500 font-semibold": isDashboard,
                "text-black": !isDashboard,
              })}
            >
              Clientes
            </button>
            <button
              onClick={() => navigate("/selected")}
              className={classNames("nav-button", {
                "text-orange-500 font-semibold": isSelected,
                "text-black": !isSelected,
              })}
            >
              Clientes Selecionados ({selectedIds.length})
            </button>
            <button onClick={() => navigate("/")} className="nav-button">
              Sair
            </button>
          </div>
          <div className="flex absolute right-6 items-center text-black whitespace-nowrap ml-auto">
            Olá, <span className="ml-2 pr-10 font-semibold">{userName}</span>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2x1 text-black font-bold">
              Clientes Cadastrados
            </h1>
          </div>
          <div className="flex justify-end mb-4">
            <label className="text-black mr-2 font-medium">
              Clientes por página:
            </label>
            <input
              type="number"
              min={1}
              value={clientsPerPage}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value > 0) {
                  setClientsPerPage(value);
                  setPage(1);
                }
              }}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-black"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(paginatedClients) &&
              paginatedClients.map((client) => (
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
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={classNames("px-3 py-1 border rounded", {
                    "bg-orange-500 text-white font-semibold":
                      pageNumber === page,
                    "bg-white text-black hover:bg-gray-100":
                      pageNumber !== page,
                  })}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <ClientFormDialog
            isOpen={isDialogOpen}
            onClose={() => {
              setIsDialogOpen(false);
              setCurrentClient(null);
            }}
            client={currentClient}
            onSubmit={handleSaveClient}
          />
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-white font-bold text-orange-500 px-4 py-2 border-2 border-orange-500 w-full block mt-8"
            style={{ fontWeight: "bold" }}
          >
            Novo Cliente
          </button>
        </div>
      </main>
    </div>
  );
}
