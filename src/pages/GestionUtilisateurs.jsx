import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow } from
"../components/ui/table";
import { Search, Edit, Trash2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger } from
"../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"../components/ui/select";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";










const roleLabels = {
  admin: "Administrateur",
  technicien: "Technicien",
  "chef-technicien": "Chef des techniciens",
  agent: "Agent service client"
};

const roleColors = {
  admin: { bg: "#F5A62320", text: "#F5A623" },
  technicien: { bg: "#5B9BD520", text: "#5B9BD5" },
  "chef-technicien": { bg: "#1A3A5C20", text: "#1A3A5C" },
  agent: { bg: "#4CAF5020", text: "#4CAF50" }
};

const mockUsers = [
{
  id: "U001",
  nom: "Marc Antoine",
  email: "marc.antoine@edh.ht",
  role: "technicien",
  status: "actif",
  dateCreation: "2025-01-15"
},
{
  id: "U002",
  nom: "Lucie Moreau",
  email: "lucie.moreau@edh.ht",
  role: "technicien",
  status: "actif",
  dateCreation: "2025-02-20"
},
{
  id: "U003",
  nom: "Jacques Pierre",
  email: "jacques.pierre@edh.ht",
  role: "chef-technicien",
  status: "actif",
  dateCreation: "2024-11-10"
},
{
  id: "U004",
  nom: "Sophie Laurent",
  email: "sophie.laurent@edh.ht",
  role: "agent",
  status: "actif",
  dateCreation: "2025-03-05"
},
{
  id: "U005",
  nom: "André Joseph",
  email: "andre.joseph@edh.ht",
  role: "technicien",
  status: "inactif",
  dateCreation: "2024-08-12"
}];


export function GestionUtilisateurs() {
  const [users] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    role: ""
  });

  const filteredUsers = users.filter(
    (user) =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = async () => {
    // Validation
    if (!formData.nom || !formData.prenom || !formData.email || !formData.password || !formData.role) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            nom: formData.nom,
            prenom: formData.prenom,
            telephone: formData.telephone,
            role: formData.role
          });

        if (profileError) throw profileError;

        toast.success("Nouvel utilisateur créé avec succès!");
        setDialogOpen(false);
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          password: "",
          role: ""
        });
        setSelectedRole("");
      }
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      toast.error(error.message || "Erreur lors de la création du compte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Gestion des utilisateurs</h1>
          <p className="text-gray-500 mt-1">Gérer les comptes employés du système</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-white"
              style={{ backgroundColor: "#F5A623" }}>
              
              <UserPlus className="w-4 h-4 mr-2" />
              Créer un compte
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau compte</DialogTitle>
              <DialogDescription>
                Ajouter un nouveau membre de l'équipe EDH
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder="Nom"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@edh.ht"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={formData.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  placeholder="+509 XX XX XX XX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle *</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="technicien">Technicien de terrain</SelectItem>
                    <SelectItem value="chef-technicien">Chef des techniciens</SelectItem>
                    <SelectItem value="agent">Agent service client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe temporaire *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Minimum 6 caractères"
                  required
                />
              </div>
              <Button
                onClick={handleCreateUser}
                className="w-full text-white"
                style={{ backgroundColor: "#F5A623" }}
                disabled={loading}
              >
                {loading ? "Création en cours..." : "Créer le compte"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Total utilisateurs</p>
            <p className="text-3xl mt-2" style={{ color: "#1A1A1A" }}>{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Actifs</p>
            <p className="text-3xl mt-2" style={{ color: "#4CAF50" }}>
              {users.filter((u) => u.status === "actif").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Techniciens</p>
            <p className="text-3xl mt-2" style={{ color: "#5B9BD5" }}>
              {users.filter((u) => u.role === "technicien").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Agents</p>
            <p className="text-3xl mt-2" style={{ color: "#F5A623" }}>
              {users.filter((u) => u.role === "agent").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10" />
            
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) =>
              <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p style={{ color: "#1A1A1A" }}>{user.nom}</p>
                      <p className="text-xs text-gray-500">{user.id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                    className="text-xs"
                    style={{
                      backgroundColor: roleColors[user.role].bg,
                      color: roleColors[user.role].text
                    }}>
                    
                      {roleLabels[user.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                    variant={user.status === "actif" ? "default" : "secondary"}
                    style={
                    user.status === "actif" ?
                    { backgroundColor: "#4CAF50", color: "white" } :
                    {}
                    }>
                    
                      {user.status === "actif" ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.dateCreation).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>);

}