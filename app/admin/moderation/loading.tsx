import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminModerationLoading() {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Modération de Contenu</h1>
            <p className="text-slate-400">Gérer les commentaires signalés par les utilisateurs</p>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 bg-slate-800" />
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-slate-100">Commentaires Signalés</CardTitle>
            <CardDescription className="text-slate-400">
              Commentaires signalés par les utilisateurs nécessitant une modération
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-32 w-full bg-slate-800" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
