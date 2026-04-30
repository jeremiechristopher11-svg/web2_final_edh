// GestionInterventions.jsx (version débutant)

import { useState } from "react";
import "./GestionInterventions.css";

const mockInterventions = [
  {
    id: "I001",
    technicien: "Jean Paul",
    panne: "P001",
    statut: "en cours",
    date: "2026-04-10",
  },
  {
    id: "I002",
    technicien: "Marie Claire",
    panne: "P002",
    statut: "terminé",
    date: "2026-04-08",
  },
];

export default function GestionInterventions() {
  const [interventions, setInterventions] = useState(mockInterventions);

  // Formulaire
  const [technicien, setTechnicien] = useState("");
  const [panne, setPanne] = useState("");

  // Ajouter intervention
  const ajouterIntervention = () => {
    const nouvelleIntervention = {
      id: "I" + (interventions.length + 1),
      technicien,
      panne,
      statut: "en attente",
      date: new Date().toISOString().split("T")[0],
    };

    setInterventions([...interventions, nouvelleIntervention]);

    // reset formulaire
    setTechnicien("");
    setPanne("");
  };

  return (
    <div className="container">
      <h1>Gestion des interventions</h1>

      {/* FORMULAIRE */}
      <div className="form">
        <input
          placeholder="Nom du technicien"
          value={technicien}
          onChange={(e) => setTechnicien(e.target.value)}
        />

        <input
          placeholder="ID de la panne"
          value={panne}
          onChange={(e) => setPanne(e.target.value)}
        />

        <button onClick={ajouterIntervention}>Ajouter</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Technicien</th>
            <th>Panne</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {interventions.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.technicien}</td>
              <td>{i.panne}</td>
              <td>{i.statut}</td>
              <td>{i.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}