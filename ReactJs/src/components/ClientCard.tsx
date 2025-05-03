import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Client } from "../types/client";

interface ClientCardProps {
  client: Client;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
  isSelected?: boolean;
}

export const ClientCard = ({
  client,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
}: ClientCardProps) => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border ${
        isSelected ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{client.name}</h3>
        <button
          onClick={() => onSelect(client.id)}
          className="text-green-500 gover:text-green-700"
        >
          <PlusCircleIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-2">
        <p>Salário: {formatCurrency(client.salary)}</p>
        <p>Valor Empresa: {formatCurrency(client.companyValue)}</p>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(client.id)}
          className="text-blue-500 hover:text-blue-700"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(client.id)}
          className="text-red-500 hover:text-red-700"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
