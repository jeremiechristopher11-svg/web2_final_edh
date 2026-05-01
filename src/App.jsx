import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { initSync } from "./services/sync";

export default function App() {
  useEffect(() => {
    // Init de la synchronisation auto online/offline
    initSync();

    // Enregistre le service worker en production pour le mode offline
    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register("/sw.js").catch((e) => {
        console.warn("[sw] register failed", e);
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
