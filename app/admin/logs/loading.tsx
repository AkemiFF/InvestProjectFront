import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLogsLoading() {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Journaux d&apos;Administration</h1>
            <p className="text-slate-400">Historique des actions administratives sur la plateforme</p>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 bg-slate-800" />
            <Skeleton className="h-10 w-32 bg-slate-800" />
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100">Filtres</CardTitle>
            <CardDescription className="text-slate-400">
              Filtrer les journaux par type ou rechercher par mot-clé
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 w-full md:w-1/3 bg-slate-800" />
              <Skeleton className="h-10 w-full md:w-2/3 bg-slate-800" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-slate-100">Journaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full bg-slate-800" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
