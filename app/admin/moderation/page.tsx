"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
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
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { toast } from "@/components/ui/use-toast"
import adminService from "@/services/admin-service"
import type { CommentModerationData } from "@/types/admin"
import { AlertTriangle, CheckCircle, MessageSquare, RefreshCw, Shield, ThumbsDown, User, XCircle } from "lucide-react"
import { format } from "date-fns"

interface Comment {
  id: number
  user: {
    id: number
    username: string
    avatar?: string
  }
  project: {
    id: number
    title: string
  }
  content: string
  created_at: string
  is_reported: boolean
  report_reason?: string
  report_count?: number
}

export default function AdminModerationPage() {
  const router = useRouter()

  const [reportedComments, setReportedComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalComments, setTotalComments] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [moderationAction, setModerationAction] = useState<"approve" | "reject" | "hide" | null>(null)
  const [moderationReason, setModerationReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchReportedComments()
  }, [page])

  const fetchReportedComments = async () => {
    setIsLoading(true)
    try {
      const response = await adminService.listReportedComments(page, pageSize)
      setReportedComments(response.data.results)
      setTotalComments(response.data.count)
      setHasNextPage(response.data.next)
      setHasPreviousPage(response.data.previous)
    } catch (error) {
      console.error("Error fetching reported comments:", error)
      toast({
        title: "Erreur",
        description: "Impossible de charger les commentaires signalés",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const openModerationDialog = (comment: Comment, action: "approve" | "reject" | "hide") => {
    setSelectedComment(comment)
    setModerationAction(action)
    setModerationReason("")
  }

  const closeModerationDialog = () => {
    setSelectedComment(null)
    setModerationAction(null)
    setModerationReason("")
  }

  const handleModerateComment = async () => {
    if (!selectedComment || !moderationAction) return

    setIsSubmitting(true)

    const moderationData: CommentModerationData = {
      comment_id: selectedComment.id,
      action: moderationAction,
      reason: moderationReason,
    }

    try {
      await adminService.moderateComment(moderationData)

      // Remove the moderated comment from the list
      setReportedComments((prev) => prev.filter((comment) => comment.id !== selectedComment.id))
      setTotalComments((prev) => prev - 1)

      toast({
        title: "Commentaire modéré",
        description: `Le commentaire a été ${
          moderationAction === "approve" ? "approuvé" : moderationAction === "reject" ? "rejeté" : "masqué"
        } avec succès.`,
        variant: "default",
      })

      closeModerationDialog()
    } catch (error) {
      console.error("Error moderating comment:", error)
      toast({
        title: "Erreur",
        description: "Impossible de modérer le commentaire",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm")
    } catch (error) {
      return dateString
    }
  }

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Modération de Contenu</h1>
            <p className="text-slate-400">Gérer les commentaires signalés par les utilisateurs</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={fetchReportedComments}
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100">Commentaires Signalés ({totalComments})</CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Commentaires signalés par les utilisateurs nécessitant une modération
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-32 w-full bg-slate-800" />
                ))}
              </div>
            ) : reportedComments.length > 0 ? (
              <div className="space-y-4">
                {reportedComments.map((comment) => (
                  <Card key={comment.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center">
                              <User className="h-5 w-5 text-cyan-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-200">{comment.user.username}</h4>
                              <p className="text-xs text-slate-400">
                                Sur le projet "{comment.project.title}" • {formatDate(comment.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="px-2 py-1 rounded-md text-xs font-medium bg-red-900/30 text-red-400 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              Signalé {comment.report_count || 1} fois
                            </span>
                          </div>
                        </div>

                        <div className="bg-slate-900/50 p-3 rounded-md text-slate-300">{comment.content}</div>

                        {comment.report_reason && (
                          <div className="bg-red-900/20 p-3 rounded-md text-slate-300 text-sm">
                            <span className="font-medium text-red-400">Raison du signalement:</span>{" "}
                            {comment.report_reason}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-700 text-green-400 hover:bg-green-900/30"
                            onClick={() => openModerationDialog(comment, "approve")}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approuver
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            onClick={() => openModerationDialog(comment, "hide")}
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Masquer
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-700 text-red-400 hover:bg-red-900/30"
                            onClick={() => openModerationDialog(comment, "reject")}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Rejeter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination */}
                {totalComments > pageSize && (
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

                      {Array.from({ length: Math.min(5, Math.ceil(totalComments / pageSize)) }).map((_, i) => {
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
              </div>
            ) : (
              <div className="text-center py-10">
                <MessageSquare className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-300">Aucun commentaire signalé</h3>
                <p className="text-slate-400 mt-1">Tous les commentaires ont été modérés</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Moderation Dialog */}
      <Dialog open={!!selectedComment && !!moderationAction} onOpenChange={closeModerationDialog}>
        <DialogContent className="bg-slate-900 border-slate-700 text-slate-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {moderationAction === "approve"
                ? "Approuver le commentaire"
                : moderationAction === "reject"
                  ? "Rejeter le commentaire"
                  : "Masquer le commentaire"}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {moderationAction === "approve"
                ? "Ce commentaire sera approuvé et restera visible."
                : "Veuillez fournir une raison pour cette action. L'utilisateur sera notifié."}
            </DialogDescription>
          </DialogHeader>

          {selectedComment && (
            <div className="bg-slate-800/50 p-3 rounded-md text-slate-300 text-sm max-h-40 overflow-y-auto">
              {selectedComment.content}
            </div>
          )}

          {moderationAction !== "approve" && (
            <Textarea
              placeholder="Raison de la modération..."
              className="bg-slate-800/50 border-slate-700 text-slate-100"
              value={moderationReason}
              onChange={(e) => setModerationReason(e.target.value)}
            />
          )}

          <DialogFooter>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800"
              onClick={closeModerationDialog}
            >
              Annuler
            </Button>
            <Button
              onClick={handleModerateComment}
              disabled={isSubmitting || (moderationAction !== "approve" && !moderationReason)}
              className={
                moderationAction === "approve"
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : moderationAction === "reject"
                    ? "bg-red-700 hover:bg-red-800 text-white"
                    : "bg-slate-700 hover:bg-slate-800 text-white"
              }
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  {moderationAction === "approve" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approuver
                    </>
                  ) : moderationAction === "reject" ? (
                    <>
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Rejeter
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Masquer
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
