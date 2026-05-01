import React, { useState } from "react";
import { AlertTriangle, Wrench, Users, CheckCircle, BarChart3, Clock } from "lucide-react";

function Dashboard() {
  const [pannes, setPannes] = useState([
    { id: "#001", zone: "Delmas", statut: "En cours", date: "30/04/2026" },
    { id: "#002", zone: "Pétion-Ville", statut: "Résolu", date: "29/04/2026" },
  ]);

  const stats = [
    { label: "Total Pannes", value: 24, icon: <AlertTriangle className="text-red-500" /> },
    { label: "Interventions", value: 18, icon: <Wrench className="text-blue-500" /> },
    { label: "Agents Actifs", value: 6, icon: <Users className="text-purple-500" /> },
    { label: "Tickets Résolus", value: 15, icon: <CheckCircle className="text-green-500" /> },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard EDH Zero Paper</h1>

      {/* etap pou KPIs la */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between">
            <div>
              <h2 className="text-gray-500 text-sm">{item.label}</h2>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
            {item.icon}
          </div>
        ))}
      </div>

      {/* Étap pou  Graphik Placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6 col-span-3 flex items-center justify-center border-dashed border-2 border-gray-300">
          <BarChart3 className="mr-2" /> <span className="text-gray-500">Zone d'intégration pour vos graphiques (Recharts)</span>
        </div>
      </div>

      {/* sa et pati Tableaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1 tableau  Pannes yo */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="font-semibold mb-4">Pannes Récentes</h2>
          <table className="w-full">
            <thead className="text-left text-gray-500"><tr><th className="p-2">ID</th><th className="p-2">Zone</th><th className="p-2">Statut</th></tr></thead>
            <tbody>
              {pannes.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.id}</td><td className="p-2">{p.zone}</td>
                  <td className="p-2 text-orange-500">{p.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2 tableau : kore nap asignel la */}
        <div className="bg-white shadow-md rounded-xl p-4">
          <h2 className="font-semibold mb-4 flex items-center"><Clock className="mr-2 h-4"/> À Assigner</h2>
          <table className="w-full">
            <thead className="text-left text-gray-500"><tr><th className="p-2">Panne</th><th className="p-2">Technicien</th></tr></thead>
            <tbody>
              <tr className="border-t"><td className="p-2">Transformateur H-12</td><td className="p-2">Non assigné</td></tr>
              <tr className="border-t"><td className="p-2">Câblage Delmas 33</td><td className="p-2">Non assigné</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;