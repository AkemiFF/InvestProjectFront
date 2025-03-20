"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  ChevronRight,
  Flag,
  Info,
  MessageSquare,
  MoreHorizontal,
  Reply,
  Search,
  Send,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from "lucide-react"

export default function ProjectCommentsPage() {
  const params = useParams()
  const projectId = params.id
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [commentText, setCommentText] = useState("")
  const [replyText, setReplyText] = useState("")
  const [activeReply, setActiveReply] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Sample project data
  const project = {
    id: projectId,
    title: "AI-Powered Healthcare Assistant",
    sector: "Technology",
    progress: 78,
    commentCount: 24,
  }

  // Sample comments data
  const comments = [
    {
      id: 1,
      user: {
        name: "Jean Dupont",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Investor",
      },
      text: "This project has enormous potential to transform healthcare delivery in our region. I'm particularly impressed by the team's expertise and track record. The AI technology seems very promising based on the demo video.",
      timestamp: "2023-11-15T14:30:00",
      likes: 12,
      dislikes: 0,
      replies: [
        {
          id: 101,
          user: {
            name: "Marie Laurent",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Project Owner",
          },
          text: "Thank you for your support, Jean! We're excited about the potential impact of our technology. Our team has been working on this for over two years, and we're thrilled to finally bring it to market.",
          timestamp: "2023-11-15T15:10:00",
          likes: 5,
          dislikes: 0,
          isOwner: true,
        },
        {
          id: 102,
          user: {
            name: "Ahmed Nasser",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Investor",
          },
          text: "I agree with Jean. The potential for cost reduction in healthcare while improving outcomes is significant. Have you considered expanding to rural areas as well?",
          timestamp: "2023-11-15T16:45:00",
          likes: 3,
          dislikes: 0,
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Investor",
      },
      text: "I've been following this team's work for some time, and their approach to AI in healthcare is truly innovative. Looking forward to seeing this project succeed! The integration with existing healthcare systems will be key.",
      timestamp: "2023-11-14T10:15:00",
      likes: 8,
      dislikes: 1,
      replies: [
        {
          id: 201,
          user: {
            name: "Marie Laurent",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Project Owner",
          },
          text: "You're absolutely right about integration, Sophie. We've developed our system to be compatible with the most common EHR systems, and we're working on additional integrations. We'll be sharing more details about this in our next update.",
          timestamp: "2023-11-14T11:20:00",
          likes: 4,
          dislikes: 0,
          isOwner: true,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Thomas Dubois",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Investor",
      },
      text: "I have some concerns about data privacy and security. How are you ensuring patient data is protected? What security measures have you implemented?",
      timestamp: "2023-11-13T09:30:00",
      likes: 15,
      dislikes: 0,
      replies: [
        {
          id: 301,
          user: {
            name: "Marie Laurent",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Project Owner",
          },
          text: "Great question, Thomas. Data security is our top priority. We use end-to-end encryption, anonymized data processing, and comply with all healthcare data regulations. We've also undergone third-party security audits and will continue to do so regularly.",
          timestamp: "2023-11-13T10:05:00",
          likes: 10,
          dislikes: 0,
          isOwner: true,
        },
        {
          id: 302,
          user: {
            name: "Thomas Dubois",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Investor",
          },
          text: "Thank you for the detailed response. That's reassuring to hear. Will you be publishing the results of these security audits?",
          timestamp: "2023-11-13T10:30:00",
          likes: 3,
          dislikes: 0,
        },
        {
          id: 303,
          user: {
            name: "Marie Laurent",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Project Owner",
          },
          text: "Yes, we plan to share summaries of the audit results with our investors and stakeholders while keeping sensitive security details private. Transparency is important to us.",
          timestamp: "2023-11-13T11:15:00",
          likes: 7,
          dislikes: 0,
          isOwner: true,
        },
      ],
    },
    {
      id: 4,
      user: {
        name: "Amina Koné",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Healthcare Professional",
      },
      text: "As a doctor, I'm excited about the potential of this technology. Have you tested it in real clinical settings yet? What has been the feedback from healthcare professionals?",
      timestamp: "2023-11-12T14:20:00",
      likes: 20,
      dislikes: 0,
      replies: [],
    },
  ]

  // Filter comments based on search query and filter
  const filteredComments = comments.filter((comment) => {
    // Filter by search query
    if (
      searchQuery &&
      !comment.text.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !comment.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by type
    if (filter === "questions" && !comment.text.includes("?")) {
      return false
    }

    if (filter === "feedback" && comment.text.includes("?")) {
      return false
    }

    return true
  })

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else if (diffDays < 7) {
      return `${date.toLocaleDateString([], { weekday: "long" })} at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    } else {
      return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" })
    }
  }

  // Handle post comment
  const handlePostComment = () => {
    if (!commentText.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Reset state
      setCommentText("")
      setIsLoading(false)
    }, 1000)
  }

  // Handle post reply
  const handlePostReply = (commentId: number) => {
    if (!replyText.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Reset state
      setReplyText("")
      setActiveReply(null)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Link href="/projects" className="hover:text-slate-300 flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Projects
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/projects/${projectId}`} className="hover:text-slate-300">
            {project.title}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-300">Comments</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{project.title} - Discussion</h1>
            <p className="text-slate-400">Join the conversation about this project</p>
          </div>

          <Badge className="bg-slate-800/50 text-slate-300 border-slate-600/50">
            <MessageSquare className="h-3 w-3 mr-1" /> {project.commentCount} Comments
          </Badge>
        </div>

        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-100 text-base">Post a Comment</CardTitle>
            <CardDescription className="text-slate-400">
              Share your thoughts, questions, or feedback about this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your comment here..."
              className="min-h-[100px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-slate-500">Be respectful and constructive in your comments</div>
            <Button
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
              disabled={!commentText.trim() || isLoading}
              onClick={handlePostComment}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="h-4 w-4 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Posting...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 h-4 w-4" /> Post Comment
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList className="bg-slate-800/50 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                onClick={() => setFilter("all")}
              >
                All Comments
              </TabsTrigger>
              <TabsTrigger
                value="questions"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                onClick={() => setFilter("questions")}
              >
                Questions
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                onClick={() => setFilter("feedback")}
              >
                Feedback
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search comments..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredComments.map((comment) => (
            <Card key={comment.id} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                    <AvatarFallback className="bg-slate-700 text-cyan-500">
                      {comment.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-200">{comment.user.name}</div>
                        <div className="text-xs text-slate-500 flex items-center">
                          <Badge className="mr-2 bg-slate-800/50 text-slate-400 border-slate-700/50 text-xs">
                            {comment.user.role}
                          </Badge>
                          {formatTimestamp(comment.timestamp)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" /> Report Comment
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-2 text-sm text-slate-300">{comment.text}</div>
                    <div className="mt-3 flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-400 hover:text-slate-100">
                        <ThumbsUp className="h-3 w-3 mr-1" /> {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-400 hover:text-slate-100">
                        <ThumbsDown className="h-3 w-3 mr-1" /> {comment.dislikes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-slate-400 hover:text-slate-100"
                        onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
                      >
                        <Reply className="h-3 w-3 mr-1" /> Reply
                      </Button>
                    </div>

                    {/* Reply form */}
                    {activeReply === comment.id && (
                      <div className="mt-3 pl-6 border-l-2 border-slate-700">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                            <AvatarFallback className="bg-slate-700 text-cyan-500">Y</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea
                              placeholder="Write your reply..."
                              className="min-h-[80px] bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 text-sm"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex justify-end mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs mr-2 border-slate-700"
                                onClick={() => setActiveReply(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="h-8 text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                                disabled={!replyText.trim() || isLoading}
                                onClick={() => handlePostReply(comment.id)}
                              >
                                {isLoading ? (
                                  <div className="flex items-center">
                                    <div className="h-3 w-3 border-2 border-slate-100 border-t-transparent rounded-full animate-spin mr-1"></div>
                                    Posting...
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <Send className="mr-1 h-3 w-3" /> Post Reply
                                  </div>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4 pl-6 border-l-2 border-slate-700">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                              <AvatarFallback className="bg-slate-700 text-cyan-500">
                                {reply.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <div className="text-sm font-medium text-slate-200 mr-2">{reply.user.name}</div>
                                {reply.isOwner && (
                                  <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs">
                                    Project Owner
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-slate-500">{formatTimestamp(reply.timestamp)}</div>
                              <div className="mt-1 text-sm text-slate-300">{reply.text}</div>
                              <div className="mt-2 flex items-center space-x-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs text-slate-400 hover:text-slate-100"
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" /> {reply.likes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs text-slate-400 hover:text-slate-100"
                                >
                                  <ThumbsDown className="h-3 w-3 mr-1" /> {reply.dislikes}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-xs text-slate-400 hover:text-slate-100"
                                  onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
                                >
                                  <Reply className="h-3 w-3 mr-1" /> Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredComments.length === 0 && (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">No comments found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                  {searchQuery
                    ? "We couldn't find any comments matching your search criteria."
                    : "Be the first to comment on this project!"}
                </p>
                {searchQuery && (
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear Search
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {filteredComments.length > 0 && (
          <div className="flex justify-center">
            <Button variant="outline" className="border-slate-700 text-slate-400 hover:text-slate-100">
              Load More Comments
            </Button>
          </div>
        )}

        <Alert className="bg-slate-800/50 border-slate-700/50 text-slate-300">
          <Info className="h-4 w-4" />
          <AlertDescription>
            All comments are moderated according to our community guidelines. Please be respectful and constructive.
          </AlertDescription>
        </Alert>
      </div>
    </DashboardLayout>
  )
}

