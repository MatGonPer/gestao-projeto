import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <button onClick={() => navigate("/agendar")} className="bg-blue-500 text-white p-2 m-2 rounded">
        Novo Agendamento
      </button>

      <button onClick={() => navigate("/historico")} className="bg-gray-500 text-white p-2 m-2 rounded">
        Ver Histórico
      </button>
    </div>
  );
}