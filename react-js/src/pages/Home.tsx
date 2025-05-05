import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userName", name); // Armazena o nome
    navigate("/dashboard");
  };

  useEffect(() => {
    document.title = "Bem-vindo!";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="bg-white w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="text-2xl text-center mb-8 text-gray-800">
            Olá, seja bem-vindo
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Insira seu nome"
              className="w-full p-3 border border-gray-300 focus:outline-none focus:border-orange-500 placeholder-black text-black"
              required
            />

            <button
              type="submit"
              className="w-full bg-orange-400 text-white border-orange-500 py-3 px-6 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
