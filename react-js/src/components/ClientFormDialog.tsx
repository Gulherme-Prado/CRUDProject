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
      setFormData({
        name: "",
        salary: 0,
        companyValue: 0,
      });
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
          <div className="relative mb-4 justify-between">
            <DialogTitle
              as="h3"
              className="text-xl font-bold text-black  m-0 py-2"
            >
              {client ? "Editar Cliente:" : "Novo Cliente:"}
            </DialogTitle>
            <button
              onClick={() => {
                onClose();
                setFormData({ name: "", salary: 0, companyValue: 0 });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 close-dialog-button"
              aria-label="Fechar"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={formData.name}
                  placeholder="Digite o nome:"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 border border-solid border-gray-400 rounded-md placeholder-gray-400 text-black"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  value={displayCurrency(formData.salary)}
                  placeholder="Digite o salário:"
                  onChange={(e) => {
                    const value = formatCurrencyInput(e.target.value);
                    setFormData({ ...formData, salary: value });
                  }}
                  className="w-full p-2 border border-solid border-gray-400 rounded-md placeholder-gray-400 text-black"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  value={displayCurrency(formData.companyValue)}
                  placeholder="Digite o valor da empresa:"
                  onChange={(e) => {
                    const value = formatCurrencyInput(e.target.value);
                    setFormData({ ...formData, companyValue: value });
                  }}
                  className="w-full p-2 border border-solid border-gray-400 rounded-md placeholder-gray-400 text-black"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded w-full"
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
