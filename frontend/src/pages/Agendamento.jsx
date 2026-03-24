import { useState } from "react";

export default function Agendamento() {

  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  function agendar() {
    alert("Agendado com sucesso!");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Agendamento</h1>

      <input type="date" onChange={(e) => setData(e.target.value)} className="border p-2 m-2" />
      <input type="time" onChange={(e) => setHora(e.target.value)} className="border p-2 m-2" />

      <button onClick={agendar} className="bg-green-500 text-white p-2 rounded">
        Agendar
      </button>
    </div>
  );
}