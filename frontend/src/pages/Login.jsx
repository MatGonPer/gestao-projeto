import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input className="w-full border p-2 mb-2" placeholder="Email" />
        <input className="w-full border p-2 mb-2" type="password" placeholder="Senha" />

        <button 
          onClick={() => navigate("/dashboard")}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Entrar
        </button>

        <p className="mt-2 text-sm">
          Não tem conta?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/cadastro")}>
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}