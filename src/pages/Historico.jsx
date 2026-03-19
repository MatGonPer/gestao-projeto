export default function Historico() {

  const historico = [
    { data: "10/03", hora: "10:00" },
    { data: "12/03", hora: "14:00" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Histórico</h1>

      {historico.map((item, index) => (
        <div key={index} className="border p-2 m-2 rounded">
          {item.data} - {item.hora}
        </div>
      ))}
    </div>
  );
}