import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Cadastro</h1>

        <input className="w-full border p-2 mb-2" placeholder="Nome" />
        <input className="w-full border p-2 mb-2" placeholder="Email" />
        <input className="w-full border p-2 mb-2" type="password" placeholder="Senha" />

        <button 
          onClick={() => navigate("/")}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}