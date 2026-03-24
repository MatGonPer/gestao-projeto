import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // A ponte que criamos para o Laravel

export default function Historico() {
  const [historico, setHistorico] = useState([]); // Começa vazio
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // O useEffect roda assim que a página abre no navegador
  useEffect(() => {
    const buscarDados = async () => {
      try {
        // Faz a requisição GET para o Laravel
        const response = await api.get("/appointments");
        
        // O Laravel devolve a lista de agendamentos do banco
        setHistorico(response.data);
      } catch (error) {
        console.error("Erro ao carregar banco de dados:", error);
        alert("Erro ao carregar histórico. Verifique se está logado.");
        navigate("/"); // Se der erro de autenticação, volta pro Login
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Meu Histórico Real (SQLite)</h1>
        <button 
          onClick={() => navigate("/dashboard")}
          className="bg-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-400"
        >
          Voltar
        </button>
      </div>

      {loading ? (
        <p className="text-blue-500 animate-pulse">Conectando ao banco de dados...</p>
      ) : historico.length > 0 ? (
        historico.map((item) => (
          <div key={item.id} className="border-l-4 border-blue-500 bg-white p-3 m-2 rounded shadow-sm">
            <span className="font-bold">{item.date}</span> — <span className="text-gray-600">{item.time}</span>
            {item.observation && (
              <p className="text-xs text-gray-400 mt-1 italic">{item.observation}</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">Nenhum agendamento encontrado no SQLite.</p>
      )}
    </div>
  );
}