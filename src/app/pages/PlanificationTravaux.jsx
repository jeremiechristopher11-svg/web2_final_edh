import { useState } from "react";
import "./PlanificationTravaux.css";

export default function PlanificationTravaux() {
  const [titre, setTitre] = useState("");
  const [date, setDate] = useState("");
  const [listeTravaux, setListeTravaux] = useState([]);

  const ajouterTravail = () => {
    if (!titre || !date) return;

    const nouveau = {
      id: Date.now(),
      titre,
      date
    };

    setListeTravaux([...listeTravaux, nouveau]);
    setTitre("");
    setDate("");
  };

  return (
    <div className="planification-container">
      <h2>Planification des Travaux</h2>

      <div className="formulaire">
        <input
          type="text"
          placeholder="Titre du travail"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={ajouterTravail}>Ajouter</button>
      </div>

      <ul className="liste-travaux">
        {listeTravaux.map((t) => (
          <li key={t.id}>
            <strong>{t.titre}</strong> — <span>{t.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}