import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
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
      className={`bg-white shadow-md p-2  ${
        isSelected ? "border-orange-500" : "border-gray-200"
      }`}
    >
      <div className="mt-2">
        <h3 className="text-lg font-bold text-black ">{client.name}</h3>
        <p className="text-black mt-1">
          Salário: {formatCurrency(client.salary)}
        </p>
        <p className="text-black mt-1">
          Valor Empresa: {formatCurrency(client.companyValue)}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onSelect(client.id)}
          className="text-black hover:text-green-700"
        >
          {isSelected ? (
            <MinusCircleIcon className="h-7 w-7 hover:text-red-700" />
          ) : (
            <PlusCircleIcon className="h-7 w-7" />
          )}
        </button>

        <button
          onClick={() => onEdit(client.id)}
          className="text-black hover:text-orange-500"
        >
          <PencilSquareIcon className="h-7 w-7" />
        </button>
        <button onClick={() => onDelete(client.id)} className="text-red-600">
          <TrashIcon className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
};
