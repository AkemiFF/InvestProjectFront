import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres Système</h1>
          <p className="text-muted-foreground">Gérez les paramètres système de la plateforme</p>
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Paramètres</CardTitle>
            <Skeleton className="h-10 w-64" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="public">Publics</TabsTrigger>
              <TabsTrigger value="private">Privés</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="m-0">
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
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-40" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-5 w-60" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Skeleton className="h-5 w-36" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
