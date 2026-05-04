import { Badge } from "./ui/badge";
const statusConfig = {
  "en-attente": {
    label: "En attente",
    className: "bg-[#F5A623] text-white hover:bg-[#F5A623]/90"
  },
  "en-cours": {
    label: "En cours",
    className: "bg-[#5B9BD5] text-white hover:bg-[#5B9BD5]/90"
  },
  "termine": {
    label: "Terminé",
    className: "bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90"
  },
  "assigne": {
    label: "Assigné",
    className: "bg-purple-600 text-white hover:bg-purple-600/90"
  }
};
export function StatusBadge({
  status
}) {
  const config = statusConfig[status];
  return <Badge className={config.className}>
      {config.label}
    </Badge>;
}