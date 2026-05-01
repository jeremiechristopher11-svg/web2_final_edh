import "./StatusBadge.css";

export default function StatusBadge({ status }) {
  let className = "badge";

  if (status === "créé") className += " badge-cree";
  if (status === "terminé") className += " badge-termine";
  if (status === "en attente") className += " badge-attente";
  if (status === "en cours") className += " badge-cours";

  return <div className={className}>{status}</div>;
}