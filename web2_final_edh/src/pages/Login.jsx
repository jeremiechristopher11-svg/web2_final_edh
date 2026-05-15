import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import edhLogo from "../imports/edh.jpg";
import { toast } from "sonner";
import { Zap, UserPlus } from "lucide-react";
import { SignUp } from "../components/SignUp";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Veuillez saisir votre email et mot de passe");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile to determine role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        // Redirect based on role
        const roleRoutes = {
          admin: "/admin",
          technicien: "/technicien",
          "chef-technicien": "/chef-technicien",
          agent: "/agent",
          client: "/client"
        };

        toast.success(`Connexion réussie!`);
        navigate(roleRoutes[profile.role] || "/");
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error(error.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  if (showSignUp) {
    return <SignUp onBackToLogin={() => setShowSignUp(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F4F6F9 0%, #E8EDF3 100%)" }}>
      {/* Background pattern with gear and lightning motif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }} />
        <Zap className="absolute top-40 right-40 w-32 h-32" style={{ color: "#F5E642" }} />
        <Zap className="absolute bottom-40 left-40 w-24 h-24" style={{ color: "#F5E642" }} />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-t-4" style={{ borderTopColor: "#F5A623" }}>
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="flex justify-center">
            <img src={edhLogo} alt="EDH Logo" className="w-40 h-40 object-contain" />
          </div>
          <div>
            <CardTitle className="text-3xl" style={{ color: "#1A1A1A" }}>Plateforme Zéro Papier</CardTitle>
            <CardDescription className="text-base mt-2">
              Système de gestion intégré pour l'Électricité d'Haïti
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@edh.ht"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-white text-base"
              style={{ backgroundColor: "#F5A623" }}
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Nouveau membre de l'équipe ?</p>
            <Button
              variant="outline"
              onClick={() => setShowSignUp(true)}
              className="w-full"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Créer un compte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}