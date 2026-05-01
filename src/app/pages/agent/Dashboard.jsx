import { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Search, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react'

// Mok Data utilisé pou Dashboard Agent la
const interventionsDuJour = [
  {
    id: 'I001',
    client: 'Entreprise ABC',
    adresse: '123 rue de la Paix, Zone 1',
    type: 'Panne électrique',
    priorite: 'Haute',
    heure: '09:00',
    statut: 'En cours',
    technicien: 'Jean Dupont',
  },
  {
    id: 'I002',
    client: 'Société XYZ',
    adresse: '456 avenue du Commerce, Zone 2',
    type: 'Maintenance',
    priorite: 'Moyenne',
    heure: '11:30',
    statut: 'Planifiée',
    technicien: 'Marie Martin',
  },
  {
    id: 'I003',
    client: 'Client 123',
    adresse: '789 boulevard des Fleurs, Zone 1',
    type: 'Dépannage',
    priorite: 'Basse',
    heure: '14:00',
    statut: 'Planifiée',
    technicien: 'Pierre Leblanc',
  },
]

const clientsRecents = [
  { id: 'C001', nom: 'Entreprise ABC', phone: '01 23 45 67 89', email: 'contact@abc.fr' },
  { id: 'C002', nom: 'Société XYZ', phone: '01 98 76 54 32', email: 'info@xyz.fr' },
  { id: 'C003', nom: 'Client 123', phone: '02 11 22 33 44', email: 'hello@client123.fr' },
]

const techniciensDisponibles = [
  { id: 'T001', nom: 'Jean Dupont', statut: 'En intervention', zone: 'Zone 1' },
  { id: 'T002', nom: 'Marie Martin', statut: 'Disponible', zone: 'Zone 2' },
  { id: 'T003', nom: 'Pierre Leblanc', statut: 'En pause', zone: 'Zone 1' },
  { id: 'T004', nom: 'Sophie Durand', statut: 'Disponible', zone: 'Zone 3' },
]

export default function AgentDashboard() {
  const [searchClient, setSearchClient] = useState('')
  const [searchTechnicien, setSearchTechnicien] = useState('')

  const filteredClients = clientsRecents.filter((c) =>
    c.nom.toLowerCase().includes(searchClient.toLowerCase())
  )

  const filteredTechniciens = techniciensDisponibles.filter((t) =>
    t.nom.toLowerCase().includes(searchTechnicien.toLowerCase())
  )

  return (
    <DashboardLayout userRole="agent">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Agent</h1>

        {/* Vu Principal */}
        <Tabs defaultValue="interventions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interventions">📋 Interventions du Jour</TabsTrigger>
            <TabsTrigger value="clients">👥 Recherche Clients</TabsTrigger>
            <TabsTrigger value="techniciens">👨‍🔧 Techniciens</TabsTrigger>
          </TabsList>

          {/* interventions pou Jodoa */}
          <TabsContent value="interventions">
            <Card>
              <CardHeader>
                <CardTitle>Interventions Programmées du Jour</CardTitle>
                <CardDescription>
                  {interventionsDuJour.filter((i) => i.statut === 'En cours').length} en cours,{' '}
                  {interventionsDuJour.filter((i) => i.statut === 'Planifiée').length} planifiées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interventionsDuJour.map((intervention) => (
                    <div
                      key={intervention.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                      {/* Statut Icon */}
                      <div className="pt-1">
                        {intervention.statut === 'En cours' ? (
                          <Clock className="h-5 w-5 text-orange-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>

                      {/* Détails */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{intervention.client}</h3>
                        <p className="text-sm text-gray-600 mt-1">{intervention.adresse}</p>
                        <div className="flex gap-2 mt-2 text-xs">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {intervention.type}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${
                              intervention.priorite === 'Haute'
                                ? 'bg-red-100 text-red-800'
                                : intervention.priorite === 'Moyenne'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {intervention.priorite}
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${
                              intervention.statut === 'En cours'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {intervention.statut}
                          </span>
                        </div>
                      </div>

                      {/* Heure & Actions */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">{intervention.heure}</p>
                        <p className="text-xs text-gray-500 mt-1">{intervention.technicien}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Détails
                          </Button>
                          {intervention.statut === 'En cours' && (
                            <Button size="sm" variant="default">
                              Compléter
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* kote pou nou chaje CLient tankou Narcisse de Jean Loll*/}
          <TabsContent value="clients">
            <div className="space-y-4">
              {/* Bouton [pou yon Nouvo panne] */}
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="pt-6">
                  <Button className="w-full" size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Signaler une Nouvelle Panne
                  </Button>
                </CardContent>
              </Card>

              {/* Recherche */}
              <Card>
                <CardHeader>
                  <CardTitle>Recherche Rapide Client</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Nom du client..."
                      value={searchClient}
                      onChange={(e) => setSearchClient(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <div className="space-y-2">
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                        >
                          <div>
                            <h4 className="font-semibold text-gray-800">{client.nom}</h4>
                            <p className="text-xs text-gray-600">{client.email}</p>
                            <p className="text-xs text-gray-600">{client.phone}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Appeler
                            </Button>
                            <Button size="sm">Voir Historique</Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">Aucun client trouvé</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Techniciens Disponibles */}
          <TabsContent value="techniciens">
            <Card>
              <CardHeader>
                <CardTitle>État des Techniciens</CardTitle>
                <CardDescription>
                  {filteredTechniciens.filter((t) => t.statut === 'Disponible').length} disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher technicien..."
                    value={searchTechnicien}
                    onChange={(e) => setSearchTechnicien(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="space-y-3">
                  {filteredTechniciens.map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {tech.nom.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{tech.nom}</h4>
                          <p className="text-xs text-gray-600">{tech.zone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tech.statut === 'Disponible'
                              ? 'bg-green-100 text-green-800'
                              : tech.statut === 'En intervention'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tech.statut}
                        </span>
                        {tech.statut === 'Disponible' && (
                          <Button size="sm">Assigner</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notifications Agent */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-900">Intervention urgente</h4>
                  <p className="text-sm text-orange-800">Zone 1 - Contactez le client au plus tôt</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">Intervention complétée</h4>
                  <p className="text-sm text-blue-800">I002 - Facture envoyée au client</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
