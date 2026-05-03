import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { initSync } from "./services/sync";

export default function App() {
  useEffect(() => {
    // Init de la synchronisation auto online/offline
    initSync();

    // Enregistre le service worker uniquement en production
    // (pas dans la preview Lovable / iframe pour éviter le cache des builds)
    const isPreviewHost =
      typeof window !== "undefined" &&
      (window.location.hostname.includes("lovable.app") ||
        window.location.hostname.includes("lovableproject.com") ||
        window.location.hostname === "localhost");
    const inIframe = (() => {
      try {
        return window.self !== window.top;
      } catch {
        return true;
      }
    })();

    if (
      "serviceWorker" in navigator &&
      !isPreviewHost &&
      !inIframe &&
      import.meta.env.PROD
    ) {
      navigator.serviceWorker.register("/sw.js").catch((e) => {
        console.warn("[sw] register failed", e);
      });
    } else if ("serviceWorker" in navigator) {
      // Désinscrit tout SW existant en preview pour éviter le cache obsolète
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
