// OfflineBanner — bandeau affiché en haut quand l'utilisateur est hors-ligne
import { useOnline } from "../hooks/useOnline";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const isOnline = useOnline();
  if (isOnline) return null;

  return (
    <div className="w-full bg-yellow-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
      <WifiOff className="w-4 h-4" />
      <span>Mode hors-ligne — Les données seront synchronisées dès le retour de la connexion</span>
    </div>
  );
}
