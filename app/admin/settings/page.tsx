"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import adminService from "@/services/admin-service"
import { Eye, EyeOff, PlusCircle, Save, Search, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface SystemSetting {
  id: number
  key: string
  value: string
  description: string
  is_public: boolean
  updated_at: string
  updated_by?: {
    username: string
    id: number
  }
}

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const router = useRouter()

  const [settings, setSettings] = useState<SystemSetting[]>([])
  const [filteredSettings, setFilteredSettings] = useState<SystemSetting[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // New setting dialog
  const [newSettingOpen, setNewSettingOpen] = useState(false)
  const [newSetting, setNewSetting] = useState({
    key: "",
    value: "",
    description: "",
    is_public: false,
  })

  // Edit setting dialog
  const [editSettingOpen, setEditSettingOpen] = useState(false)
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(null)

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [settingToDelete, setSettingToDelete] = useState<SystemSetting | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    filterSettings()
  }, [settings, searchQuery, activeTab])

  const fetchSettings = async () => {
    setIsLoading(true)
    try {
      const response = await adminService.getSystemSettings()
      setSettings(response.data.results)
    } catch (error) {
      console.error("Erreur lors du chargement des paramètres:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les paramètres système.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filterSettings = () => {
    let filtered = [...settings]

    // Filter by tab
    if (activeTab === "public") {
      filtered = filtered.filter((setting) => setting.is_public)
    } else if (activeTab === "private") {
      filtered = filtered.filter((setting) => !setting.is_public)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (setting) =>
          setting.key.toLowerCase().includes(query) ||
          setting.value.toLowerCase().includes(query) ||
          setting.description.toLowerCase().includes(query),
      )
    }

    setFilteredSettings(filtered)
  }

  const handleCreateSetting = async () => {
    try {
      await adminService.createSystemSetting(
        newSetting.key,
        newSetting.value,
        newSetting.description,
        newSetting.is_public,
      )

      toast({
        title: "Succès",
        description: "Paramètre système créé avec succès.",
      })

      setNewSettingOpen(false)
      setNewSetting({
        key: "",
        value: "",
        description: "",
        is_public: false,
      })

      fetchSettings()
    } catch (error) {
      console.error("Erreur lors de la création du paramètre:", error)
      toast({
        title: "Erreur",
        description: "Impossible de créer le paramètre système.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateSetting = async () => {
    if (!editingSetting) return

    try {
      await adminService.updateSystemSetting(editingSetting.id, editingSetting.value, editingSetting.is_public)

      toast({
        title: "Succès",
        description: "Paramètre système mis à jour avec succès.",
      })

      setEditSettingOpen(false)
      setEditingSetting(null)

      fetchSettings()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du paramètre:", error)
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le paramètre système.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteSetting = async () => {
    if (!settingToDelete) return

    try {
      await adminService.deleteSystemSetting(settingToDelete.id)

      toast({
        title: "Succès",
        description: "Paramètre système supprimé avec succès.",
      })

      setDeleteDialogOpen(false)
      setSettingToDelete(null)

      fetchSettings()
    } catch (error) {
      console.error("Erreur lors de la suppression du paramètre:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le paramètre système.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <DashboardLayout userType="admin">
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Paramètres Système</h1>
            <p className="text-muted-foreground">Gérez les paramètres système de la plateforme</p>
          </div>
          <Button onClick={() => setNewSettingOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau Paramètre
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Paramètres</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <CardDescription>{filteredSettings.length} paramètres trouvés</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="public">Publics</TabsTrigger>
                <TabsTrigger value="private">Privés</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="m-0">
                <SettingsTable
                  settings={filteredSettings}
                  isLoading={isLoading}
                  onEdit={(setting) => {
                    setEditingSetting(setting)
                    setEditSettingOpen(true)
                  }}
                  onDelete={(setting) => {
                    setSettingToDelete(setting)
                    setDeleteDialogOpen(true)
                  }}
                  formatDate={formatDate}
                />
              </TabsContent>
              <TabsContent value="public" className="m-0">
                <SettingsTable
                  settings={filteredSettings}
                  isLoading={isLoading}
                  onEdit={(setting) => {
                    setEditingSetting(setting)
                    setEditSettingOpen(true)
                  }}
                  onDelete={(setting) => {
                    setSettingToDelete(setting)
                    setDeleteDialogOpen(true)
                  }}
                  formatDate={formatDate}
                />
              </TabsContent>
              <TabsContent value="private" className="m-0">
                <SettingsTable
                  settings={filteredSettings}
                  isLoading={isLoading}
                  onEdit={(setting) => {
                    setEditingSetting(setting)
                    setEditSettingOpen(true)
                  }}
                  onDelete={(setting) => {
                    setSettingToDelete(setting)
                    setDeleteDialogOpen(true)
                  }}
                  formatDate={formatDate}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Dialog pour créer un nouveau paramètre */}
        <Dialog open={newSettingOpen} onOpenChange={setNewSettingOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nouveau Paramètre Système</DialogTitle>
              <DialogDescription>Créez un nouveau paramètre système pour la plateforme.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="key">Clé</Label>
                <Input
                  id="key"
                  placeholder="site_name"
                  value={newSetting.key}
                  onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Valeur</Label>
                <Input
                  id="value"
                  placeholder="InvestMada"
                  value={newSetting.value}
                  onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Nom du site affiché dans l'en-tête"
                  value={newSetting.description}
                  onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_public"
                  checked={newSetting.is_public}
                  onCheckedChange={(checked) => setNewSetting({ ...newSetting, is_public: checked })}
                />
                <Label htmlFor="is_public">Paramètre public</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewSettingOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateSetting}>Créer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog pour éditer un paramètre */}
        <Dialog open={editSettingOpen} onOpenChange={setEditSettingOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Modifier Paramètre Système</DialogTitle>
              <DialogDescription>Modifiez les détails du paramètre système.</DialogDescription>
            </DialogHeader>
            {editingSetting && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-key">Clé</Label>
                  <Input id="edit-key" value={editingSetting.key} disabled />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-value">Valeur</Label>
                  <Input
                    id="edit-value"
                    value={editingSetting.value}
                    onChange={(e) => setEditingSetting({ ...editingSetting, value: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea id="edit-description" value={editingSetting.description} disabled />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-is_public"
                    checked={editingSetting.is_public}
                    onCheckedChange={(checked) => setEditingSetting({ ...editingSetting, is_public: checked })}
                  />
                  <Label htmlFor="edit-is_public">Paramètre public</Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditSettingOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleUpdateSetting}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog de confirmation de suppression */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action ne peut pas être annulée. Cela supprimera définitivement le paramètre
                <span className="font-semibold"> {settingToDelete?.key}</span> du système.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteSetting} className="bg-red-600 hover:bg-red-700">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}

interface SettingsTableProps {
  settings: SystemSetting[]
  isLoading: boolean
  onEdit: (setting: SystemSetting) => void
  onDelete: (setting: SystemSetting) => void
  formatDate: (date: string) => string
}

function SettingsTable({ settings, isLoading, onEdit, onDelete, formatDate }: SettingsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (settings.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Aucun paramètre trouvé</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Clé</TableHead>
            <TableHead>Valeur</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">Visibilité</TableHead>
            <TableHead className="hidden lg:table-cell">Dernière mise à jour</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settings.map((setting) => (
            <TableRow key={setting.id}>
              <TableCell className="font-medium">{setting.key}</TableCell>
              <TableCell>{setting.value}</TableCell>
              <TableCell className="hidden md:table-cell max-w-[300px] truncate">{setting.description}</TableCell>
              <TableCell className="hidden md:table-cell">
                {setting.is_public ? (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <Eye className="mr-1 h-3 w-3" />
                    Public
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                    <EyeOff className="mr-1 h-3 w-3" />
                    Privé
                  </Badge>
                )}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">
                {formatDate(setting.updated_at)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(setting)} title="Modifier">
                    <Save className="h-4 w-4" />
                    <span className="sr-only">Modifier</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(setting)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
