import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // A conexão mágica com o Laravel

export default function Agendamento() {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAgendar = async (e) => {
    e.preventDefault();
    
    // Validação simples: não deixa enviar vazio
    if (!data || !hora) {
      alert("Por favor, preencha data e hora.");
      return;
    }

    setLoading(true);

    try {
      // Envia para a rota POST /appointments que criamos no Back-end
      await api.post("/appointments", {
        date: data,
        time: hora,
        observation: "Agendamento realizado via React" // Opcional
      });

      alert("✅ Agendamento salvo no SQLite com sucesso!");
      navigate("/historico"); // Redireciona para o aluno ver o novo item na lista
    } catch (error) {
      console.error(error);
      alert("Erro ao agendar: " + (error.response?.data?.message || "Tente novamente"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleAgendar} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Novo Agendamento</h1>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col text-sm font-semibold text-gray-600">
            Data do Agendamento
            <input 
              type="date" 
              required
              value={data}
              onChange={(e) => setData(e.target.value)} 
              className="mt-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </label>

          <label className="flex flex-col text-sm font-semibold text-gray-600">
            Horário
            <input 
              type="time" 
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)} 
              className="mt-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" 
            />
          </label>

          <button 
            type="submit"
            disabled={loading}
            className={`mt-4 w-full text-white font-bold p-3 rounded-lg shadow transition-all ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 active:scale-95"
            }`}
          >
            {loading ? "Salvando..." : "Confirmar Agendamento"}
          </button>

          <button 
            type="button"
            onClick={() => navigate("/dashboard")}
            className="text-gray-500 text-sm hover:underline mt-2"
          >
            Cancelar e Voltar
          </button>
        </div>
      </form>
    </div>
  );
}