"use client"

import type React from "react"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import adminService from "@/services/admin-service"
import type { AdminLog } from "@/types/admin"
import { format } from "date-fns"
import { Calendar, Download, RefreshCw, Search, User } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function AdminLogsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [logs, setLogs] = useState<AdminLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalLogs, setTotalLogs] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [logType, setLogType] = useState<string>("all")
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)

  useEffect(() => {
    const type = searchParams.get("type") || "all"
    const search = searchParams.get("search") || ""
    const pageParam = Number.parseInt(searchParams.get("page") || "1")

    setLogType(type)
    setSearchQuery(search)
    setPage(pageParam)

    fetchLogs(type, search, pageParam)
  }, [searchParams])

  const fetchLogs = async (type: string, search: string, currentPage: number) => {
    setIsLoading(true)
    try {
      let response

      if (type === "all") {
        if (search) {
          response = await adminService.searchAdminLogs(search, currentPage, pageSize)
        } else {
          response = await adminService.getAdminLogs(currentPage, pageSize)
        }
      } else {
        response = await adminService.getAdminLogsByType(type, currentPage, pageSize)
      }

      setLogs(response.data.results)
      // console.log(response.data.results);

      setTotalLogs(response.data.count)
      setHasNextPage(response.data.next)
      setHasPreviousPage(response.data.previous)
    } catch (error) {
      console.error("Error fetching admin logs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateUrlParams({ search: searchQuery, page: 1 })
  }

  const handleTypeChange = (value: string) => {
    setLogType(value)
    updateUrlParams({ type: value, page: 1 })
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    updateUrlParams({ page: newPage })
  }

  const updateUrlParams = (params: { [key: string]: any }) => {
    const urlParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        urlParams.delete(key)
      } else {
        urlParams.set(key, String(value))
      }
    })

    router.push(`/admin/logs?${urlParams.toString()}`)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm")
    } catch (error) {
      return dateString
    }
  }

  const getLogTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      user_management: "Gestion utilisateur",
      project_validation: "Validation projet",
      comment_moderation: "Modération commentaire",
      system_config: "Configuration système",
      project_deletion: "Suppression projet",
      approuve_project: "Approbation projet",
    }
    return types[type] || type
  }

  const exportLogs = () => {
    // Convert logs to CSV
    const headers = ["ID", "Admin", "Action", "Description", "Date"]
    const csvContent = [
      headers.join(","),
      ...logs.map((log) =>
        [
          log.id,
          log.admin_user?.email,
          getLogTypeLabel(log.action_type),
          `"${log.description.replace(/"/g, '""')}"`,
          formatDate(log.created_at),
        ].join(","),
      ),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `admin-logs-${format(new Date(), "yyyy-MM-dd")}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Journaux d&apos;Administration</h1>
            <p className="text-slate-400">Historique des actions administratives sur la plateforme</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => fetchLogs(logType, searchQuery, page)}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>
            <Button
              onClick={exportLogs}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
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
              <div className="w-full md:w-1/3">
                <Select value={logType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Type d'action" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-100">
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="user_management">Gestion utilisateur</SelectItem>
                    <SelectItem value="project_validation">Validation projet</SelectItem>
                    <SelectItem value="comment_moderation">Modération commentaire</SelectItem>
                    <SelectItem value="system_config">Configuration système</SelectItem>
                    <SelectItem value="project_deletion">Suppression projet</SelectItem>
                    <SelectItem value="approuve_project">Approbation projet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-2/3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Rechercher dans les journaux..."
                    className="bg-slate-800/50 border-slate-700 text-slate-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="secondary" className="bg-cyan-800 hover:bg-cyan-700 text-white">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Journaux ({totalLogs})</CardTitle>
              <div className="text-sm text-slate-400">
                Page {page} {totalLogs > 0 ? `sur ${Math.ceil(totalLogs / pageSize)}` : ""}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-12 w-full bg-slate-800" />
                ))}
              </div>
            ) : logs.length > 0 ? (
              <div className="rounded-md border border-slate-700 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-800/50">
                    <TableRow className="hover:bg-slate-800/80 border-slate-700">
                      <TableHead className="text-slate-300 w-[80px]">ID</TableHead>
                      <TableHead className="text-slate-300 w-[150px]">Admin</TableHead>
                      <TableHead className="text-slate-300 w-[180px]">Type d&apos;action</TableHead>
                      <TableHead className="text-slate-300">Description</TableHead>
                      <TableHead className="text-slate-300 w-[180px] text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-slate-800/50 border-slate-700">
                        <TableCell className="text-slate-300 font-mono">{log.id}</TableCell>
                        <TableCell className="text-slate-300">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-cyan-900/30 flex items-center justify-center">
                              <User className="h-4 w-4 text-cyan-400" />
                            </div>
                            <span>{log.admin_user?.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-slate-800 text-cyan-400">
                            {getLogTypeLabel(log.action_type)}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-300">{log.description}</TableCell>
                        <TableCell className="text-slate-400 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatDate(log.created_at)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400">Aucun journal trouvé</p>
              </div>
            )}

            {/* Pagination */}
            {logs.length > 0 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (hasPreviousPage) handlePageChange(page - 1)
                      }}
                      className={!hasPreviousPage ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(5, Math.ceil(totalLogs / pageSize)) }).map((_, i) => {
                    const pageNumber = i + 1
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(pageNumber)
                          }}
                          isActive={page === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (hasNextPage) handlePageChange(page + 1)
                      }}
                      className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
