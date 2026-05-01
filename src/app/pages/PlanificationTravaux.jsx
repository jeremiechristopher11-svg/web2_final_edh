import { useState } from "react";
import "./PlanificationTravaux.css";

export default function PlanificationTravaux() {
  const [date, setDate] = useState("");
  const [technicien, setTechnicien] = useState("");
  const [travaux, setTravaux] = useState([]);

  const ajouterTravail = () => {
    const nouveauTravail = {
      id: travaux.length + 1,
      date,
      technicien,
    };

    setTravaux([...travaux, nouveauTravail]);

    setDate("");
    setTechnicien("");
  };

  return (
    <div className="container">
      <h1>Planification des travaux</h1>

      {/* formulaire */}
      <div className="form">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Nom du technicien"
          value={technicien}
          onChange={(e) => setTechnicien(e.target.value)}
        />

        <button onClick={ajouterTravail}>Ajouter</button>
      </div>

      {/* liste */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Technicien</th>
          </tr>
        </thead>

        <tbody>
          {travaux.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.date}</td>
              <td>{t.technicien}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}