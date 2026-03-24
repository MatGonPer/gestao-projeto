import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import api from "../services/api"; 

export default function Cadastro() {
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault(); 

    try {
      
      const response = await api.post("/register", {
        name: name,
        email: email,
        password: password
      });

      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Conta criada com sucesso!");
      navigate("/dashboard"); 
    } catch (error) {
      
      alert("Erro no cadastro: " + (error.response?.data?.message || "Tente novamente"));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleCadastro} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Cadastro</h1>

        <input 
          className="w-full border p-2 mb-2" 
          placeholder="Nome Completo" 
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input 
          className="w-full border p-2 mb-2" 
          placeholder="Email Acadêmico" 
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          className="w-full border p-2 mb-4" 
          type="password" 
          placeholder="Senha (mín. 6 caracteres)" 
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
        >
          Finalizar Cadastro
        </button>

        <p className="mt-4 text-sm text-center">
          Já tem conta?{" "}
          <span 
            className="text-blue-500 cursor-pointer hover:underline" 
            onClick={() => navigate("/")}
          >
            Faça Login
          </span>
        </p>
      </form>
    </div>
  );
}