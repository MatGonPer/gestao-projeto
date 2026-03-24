import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState("Estudante");

  useEffect(() => {
    // 1. Verifica se o aluno está logado (tem o token?)
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      // Se não tem token, manda pro login na hora
      navigate("/");
    } else if (userData) {
      // Se tem, pega o nome do aluno para exibir
      const user = JSON.parse(userData);
      setNomeUsuario(user.name);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Limpa tudo do navegador e desloga
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6 text-center">
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Painel do Aluno</h1>
        <p className="text-gray-500 mb-8">
          Olá, <span className="text-blue-600 font-bold">{nomeUsuario}</span>! 
          O que você deseja fazer hoje?
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate("/agendar")} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            📅 Novo Agendamento
          </button>

          <button 
            onClick={() => navigate("/historico")} 
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            📋 Ver Meu Histórico
          </button>
        </div>

        <button 
          onClick={handleLogout}
          className="mt-10 text-red-500 hover:text-red-700 font-semibold text-sm underline decoration-2 underline-offset-4"
        >
          Sair do Sistema
        </button>
      </div>

      <footer className="mt-8 text-gray-400 text-xs">
        Conectado ao Servidor Laravel + SQLite (Projeto ADS)
      </footer>
    </div>
  );
}