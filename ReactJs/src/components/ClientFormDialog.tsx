import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Client } from "../types/client";

interface ClientFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client | null;
  onSubmit: (clientData: Omit<Client, "id">) => void;
}

export const ClientFormDialog = ({
  isOpen,
  onClose,
  client,
  onSubmit,
}: ClientFormDialogProps) => {
  const [formData, setFormData] = useState<Omit<Client, "id">>({
    name: "",
    salary: 0,
    companyValue: 0,
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        salary: client.salary,
        companyValue: client.companyValue,
      });
    } else {
      setFormData({
        name: "",
        salary: 0,
        companyValue: 0,
      });
    }
  }, [client]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error while saving client:", error);
    }
  };

  const formatCurrencyInput = (value: string): number => {
    return Number(value.replace(/\D/g, "")) / 100;
  };

  const displayCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded bg-white p-6">
          <DialogTitle className="text-xl font-bold mb-4">
            {client ? "Editar Usuário" : "Novo Usuário"}
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Salário
                </label>
                <input
                  type="text"
                  value={displayCurrency(formData.salary)}
                  onChange={(e) => {
                    const value = formatCurrencyInput(e.target.value);
                    setFormData({ ...formData, salary: value });
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Valor da Empresa
                </label>
                <input
                  type="text"
                  value={displayCurrency(formData.companyValue)}
                  onChange={(e) => {
                    const value = formatCurrencyInput(e.target.value);
                    setFormData({ ...formData, companyValue: value });
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Salvar
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
