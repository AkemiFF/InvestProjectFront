"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  Archive,
  ArrowRight,
  Check,
  Clock,
  Edit,
  File,
  MoreHorizontal,
  PaperclipIcon,
  Plus,
  Search,
  Send,
  Star,
  Trash,
  User,
  Users,
} from "lucide-react"

export default function MessagingCenterPage() {
  const [userType, setUserType] = useState<"investor" | "project-owner">("investor")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeConversation, setActiveConversation] = useState<number | null>(1)
  const [messageText, setMessageText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      recipient: {
        name: "Marie Laurent",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Project Owner",
        project: "Urban Farming Initiative",
        online: true,
      },
      messages: [
        {
          id: 1,
          sender: "recipient",
          text: "Hello! Thank you for your interest in our Urban Farming Initiative project. How can I help you today?",
          timestamp: "2023-11-15T10:30:00",
          read: true,
        },
        {
          id: 2,
          sender: "user",
          text: "Hi Marie, I'm interested in investing in your project. Could you provide more details about the expected ROI and timeline?",
          timestamp: "2023-11-15T10:32:00",
          read: true,
        },
        {
          id: 3,
          sender: "recipient",
          text: "Of course! Our Urban Farming Initiative has a projected ROI of 15% over a 24-month period. We're planning to establish vertical farming systems in three urban locations, with the first harvest expected within 4 months of funding completion.",
          timestamp: "2023-11-15T10:35:00",
          read: true,
        },
        {
          id: 4,
          sender: "recipient",
          text: "Would you like me to send you our detailed business plan and financial projections?",
          timestamp: "2023-11-15T10:36:00",
          read: true,
        },
        {
          id: 5,
          sender: "user",
          text: "Yes, that would be very helpful. Also, could you tell me about the minimum investment amount?",
          timestamp: "2023-11-15T10:38:00",
          read: true,
        },
        {
          id: 6,
          sender: "recipient",
          text: "The minimum investment is 500,000 MGA. Here's our business plan and financial projections document.",
          timestamp: "2023-11-15T10:40:00",
          read: true,
          attachment: {
            type: "document",
            name: "Urban_Farming_Business_Plan.pdf",
            size: "2.4 MB",
          },
        },
        {
          id: 7,
          sender: "user",
          text: "Thank you for the information. I'll review the document and get back to you soon.",
          timestamp: "2023-11-15T10:45:00",
          read: true,
        },
        {
          id: 8,
          sender: "recipient",
          text: "Great! Feel free to ask if you have any questions. We're also hosting a virtual tour of our pilot site next week if you'd be interested in joining.",
          timestamp: "2023-11-15T10:47:00",
          read: true,
        },
      ],
      unread: 0,
      lastMessage: "2023-11-15T10:47:00",
    },
    {
      id: 2,
      recipient: {
        name: "Ahmed Nasser",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Project Owner",
        project: "FinTech Mobile App",
        online: false,
      },
      messages: [
        {
          id: 1,
          sender: "recipient",
          text: "Hi there! I noticed you've invested in our FinTech Mobile App project. Thank you for your support!",
          timestamp: "2023-11-14T14:20:00",
          read: true,
        },
        {
          id: 2,
          sender: "user",
          text: "Hello Ahmed, yes I'm excited about the potential of your app. When do you expect to launch the beta version?",
          timestamp: "2023-11-14T14:25:00",
          read: true,
        },
        {
          id: 3,
          sender: "recipient",
          text: "We're on track to launch the beta version in January 2024. As an investor, you'll get early access to test it out!",
          timestamp: "2023-11-14T14:30:00",
          read: true,
        },
      ],
      unread: 0,
      lastMessage: "2023-11-14T14:30:00",
    },
    {
      id: 3,
      recipient: {
        name: "Sophie Martin",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Investor",
        online: true,
      },
      messages: [
        {
          id: 1,
          sender: "recipient",
          text: "Hello! I'm interested in your EcoTech Solutions project. Could you tell me more about the technology you're developing?",
          timestamp: "2023-11-13T09:15:00",
          read: true,
        },
        {
          id: 2,
          sender: "user",
          text: "Hi Sophie, thanks for your interest! Our EcoTech Solutions project is developing biodegradable packaging materials from agricultural waste.",
          timestamp: "2023-11-13T09:20:00",
          read: true,
        },
        {
          id: 3,
          sender: "recipient",
          text: "That sounds fascinating! What stage of development are you in currently?",
          timestamp: "2023-11-13T09:25:00",
          read: false,
        },
      ],
      unread: 1,
      lastMessage: "2023-11-13T09:25:00",
    },
    {
      id: 4,
      recipient: {
        name: "Jean Dupont",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Project Owner",
        project: "Medical Supplies Chain",
        online: false,
      },
      messages: [
        {
          id: 1,
          sender: "recipient",
          text: "Thank you for investing in our Medical Supplies Chain project! We've just reached our funding goal.",
          timestamp: "2023-11-10T16:45:00",
          read: true,
        },
        {
          id: 2,
          sender: "recipient",
          text: "Here's our implementation timeline for the next 6 months.",
          timestamp: "2023-11-10T16:46:00",
          read: true,
          attachment: {
            type: "document",
            name: "Implementation_Timeline.pdf",
            size: "1.8 MB",
          },
        },
        {
          id: 3,
          sender: "user",
          text: "Congratulations on reaching your funding goal! Looking forward to seeing the project progress.",
          timestamp: "2023-11-10T17:00:00",
          read: true,
        },
        {
          id: 4,
          sender: "recipient",
          text: "We'll be sending monthly updates. The first phase of implementation starts next week!",
          timestamp: "2023-11-10T17:05:00",
          read: false,
        },
      ],
      unread: 1,
      lastMessage: "2023-11-10T17:05:00",
    },
  ]

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) => {
    if (!searchQuery) return true
    return (
      conversation.recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conversation.recipient.project &&
        conversation.recipient.project.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  // Get active conversation
  const currentConversation = conversations.find((c) => c.id === activeConversation) || null

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Handle send message
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Add message to conversation
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.id === activeConversation) {
          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              {
                id: conversation.messages.length + 1,
                sender: "user",
                text: messageText,
                timestamp: new Date().toISOString(),
                read: true,
              },
            ],
            lastMessage: new Date().toISOString(),
          }
        }
        return conversation
      })

      // Update state
      setMessageText("")
      setIsLoading(false)

      // Scroll to bottom
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 500)
  }

  // Scroll to bottom when conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation])

  return (
    <DashboardLayout userType={userType}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Messaging Center</h1>
            <p className="text-slate-400">Communicate with investors and project owners</p>
          </div>

          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
            <Plus className="mr-2 h-4 w-4" /> New Message
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations list */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm lg:col-span-1 h-full flex flex-col">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-slate-100 text-base">Conversations</CardTitle>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-slate-800/50 h-8 p-1">
                  <TabsTrigger
                    value="all"
                    className="text-xs h-6 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="unread"
                    className="text-xs h-6 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Unread
                  </TabsTrigger>
                  <TabsTrigger
                    value="starred"
                    className="text-xs h-6 data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Starred
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <div className="px-4 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <CardContent className="flex-1 overflow-auto p-0">
              <div className="divide-y divide-slate-700/30">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 cursor-pointer hover:bg-slate-800/50 ${activeConversation === conversation.id ? "bg-slate-800/70" : ""}`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.recipient.avatar} alt={conversation.recipient.name} />
                          <AvatarFallback className="bg-slate-700 text-cyan-500">
                            {conversation.recipient.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.recipient.online && (
                          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-slate-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-slate-200 truncate">
                            {conversation.recipient.name}
                          </div>
                          <div className="text-xs text-slate-500">{formatTimestamp(conversation.lastMessage)}</div>
                        </div>
                        <div className="text-xs text-slate-400 truncate">
                          {conversation.recipient.project && (
                            <span className="text-cyan-400">{conversation.recipient.project} • </span>
                          )}
                          {conversation.messages[conversation.messages.length - 1].sender === "user" ? "You: " : ""}
                          {conversation.messages[conversation.messages.length - 1].text}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-slate-500">{conversation.recipient.role}</div>
                          {conversation.unread > 0 && (
                            <Badge className="bg-cyan-500 text-slate-900 text-xs">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredConversations.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-sm text-slate-400">No conversations found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Conversation */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm lg:col-span-2 h-full flex flex-col">
            {currentConversation ? (
              <>
                <CardHeader className="pb-2 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={currentConversation.recipient.avatar}
                          alt={currentConversation.recipient.name}
                        />
                        <AvatarFallback className="bg-slate-700 text-cyan-500">
                          {currentConversation.recipient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-slate-200 mr-2">
                            {currentConversation.recipient.name}
                          </div>
                          {currentConversation.recipient.online ? (
                            <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">Online</Badge>
                          ) : (
                            <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/30 text-xs">
                              Offline
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          {currentConversation.recipient.role}
                          {currentConversation.recipient.project && ` • ${currentConversation.recipient.project}`}
                        </div>
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
                          <Star className="h-4 w-4 mr-2" /> Star Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" /> Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                  {currentConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                        {message.sender !== "user" && (
                          <Avatar className="h-8 w-8 mb-1">
                            <AvatarImage
                              src={currentConversation.recipient.avatar}
                              alt={currentConversation.recipient.name}
                            />
                            <AvatarFallback className="bg-slate-700 text-cyan-500">
                              {currentConversation.recipient.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user"
                              ? "bg-cyan-900/50 border border-cyan-700/50 text-slate-100"
                              : "bg-slate-800/50 border border-slate-700/50 text-slate-300"
                          }`}
                        >
                          <div className="text-sm">{message.text}</div>
                          {message.attachment && (
                            <div className="mt-2 bg-slate-800/70 rounded-md p-2 flex items-center">
                              <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center mr-2">
                                <File className="h-4 w-4 text-cyan-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-slate-300 truncate">
                                  {message.attachment.name}
                                </div>
                                <div className="text-xs text-slate-500">{message.attachment.size}</div>
                              </div>
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center mt-1 space-x-2">
                          <div className="text-xs text-slate-500">{formatTimestamp(message.timestamp)}</div>
                          {message.sender === "user" && (
                            <div className="text-xs text-slate-500 flex items-center">
                              {message.read ? (
                                <Check className="h-3 w-3 text-cyan-500" />
                              ) : (
                                <Clock className="h-3 w-3 text-slate-500" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>
                <CardFooter className="border-t border-slate-700/50 p-4">
                  <div className="flex items-center w-full space-x-2">
                    <Button variant="outline" size="icon" className="h-10 w-10 border-slate-700">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <div className="relative flex-1">
                      <Input
                        placeholder="Type a message..."
                        className="bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 pr-10"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 text-slate-400"
                        onClick={() => setMessageText("")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      className="h-10 w-10 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                      disabled={!messageText.trim() || isLoading}
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <Users className="h-16 w-16 text-slate-700 mb-4" />
                <h3 className="text-lg font-medium text-slate-300 mb-2">No conversation selected</h3>
                <p className="text-sm text-slate-500 max-w-md mb-6">
                  Select a conversation from the list or start a new one to begin messaging.
                </p>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                  <Plus className="mr-2 h-4 w-4" /> New Message
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

