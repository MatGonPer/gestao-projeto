import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    try {
   
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login realizado com sucesso!");
      navigate("/dashboard"); 
    } catch (error) {
     
      alert("Erro ao entrar: " + (error.response?.data?.message || "E-mail ou senha inválidos"));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Transformamos a div em 'form' para aceitar o 'Enter' do teclado */}
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input 
          className="w-full border p-2 mb-2" 
          placeholder="Email" 
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <input 
          className="w-full border p-2 mb-4" 
          type="password" 
          placeholder="Senha" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Entrar
        </button>

        <p className="mt-4 text-sm">
          Não tem conta?{" "}
          <span 
            className="text-blue-500 cursor-pointer hover:underline" 
            onClick={() => navigate("/cadastro")}
          >
            Cadastre-se
          </span>
        </p>
      </form>
    </div>
  );
}