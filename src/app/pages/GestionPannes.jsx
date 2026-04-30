import { useState } from "react";
import "./GestionPannes.css";

const mockPannes = [
  {
    id: "P001",
    client: "Jean Baptiste",
    description: "Coupure de courant complète",
    status: "en-attente",
    date: "2026-04-02",
    adresse: "Cité Militaire, Port-au-Prince",
  },
  {
    id: "P002",
    client: "Marie Dupont",
    description: "Tension faible",
    status: "assigne",
    date: "2026-04-01",
    adresse: "Delmas 33",
  },
];

export default function GestionPannes() {
  const [pannes, setPannes] = useState(mockPannes);
  const [search, setSearch] = useState("");

  // Formulaire simple
  const [client, setClient] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");

  // Filtrage simple
  const filteredPannes = pannes.filter((p) =>
    p.client.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  // Ajouter pannes
  const addPanne = () => {
    const newPanne = {
      id: "P" + (pannes.length + 1),
      client,
      adresse,
      description,
      status: "en-attente",
      date: new Date().toISOString().split("T")[0],
    };

    setPannes([...pannes, newPanne]);

    // reset form
    setClient("");
    setAdresse("");
    setDescription("");
  };

  return (
    <div className="container">
      <h1>Gestion des pannes</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      {/* FORMULAIRE */}
      <div className="form">
        <input
          placeholder="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <input
          placeholder="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addPanne}>Ajouter panne</button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Adresse</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredPannes.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.client}</td>
              <td>{p.adresse}</td>
              <td>{p.description}</td>
              <td>{p.status}</td>
              <td>{p.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}