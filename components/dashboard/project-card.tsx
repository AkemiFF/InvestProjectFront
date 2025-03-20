import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProjectCardProps {
  title: string
  sector: string
  progress: number
  target: number
  raised: number
  investors: number
  daysLeft: number
  featured?: boolean
  isOwner?: boolean
  completed?: boolean
}

export function ProjectCard({
  title,
  sector,
  progress,
  target,
  raised,
  investors,
  daysLeft,
  featured = false,
  isOwner = false,
  completed = false,
}: ProjectCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MG", {
      style: "currency",
      currency: "MGA",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div
      className={`bg-slate-800/30 rounded-lg border ${
        featured
          ? "border-cyan-500/30 shadow-lg shadow-cyan-500/10"
          : completed
            ? "border-green-500/30"
            : "border-slate-700/50"
      } p-4 relative overflow-hidden`}
    >
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-cyan-500 text-xs font-medium px-2 py-0.5 text-black transform rotate-45 translate-x-6 translate-y-1">
            Featured
          </div>
        </div>
      )}
      {isOwner && (
        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
            Your Project
          </Badge>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <div className="text-base font-medium text-slate-200">{title}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {sector}
        </Badge>
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-slate-400">
            {formatCurrency(raised)} of {formatCurrency(target)}
          </div>
          <div className="text-xs text-cyan-400">{progress}%</div>
        </div>
        <Progress value={progress} className="h-1.5 bg-slate-700">
          <div
            className={`h-full rounded-full ${
              completed
                ? "bg-green-500"
                : progress > 75
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </Progress>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-800/50 rounded p-2 text-center">
          <div className="text-xs text-slate-500">Investors</div>
          <div className="text-sm font-medium text-slate-300">{investors}</div>
        </div>
        <div className="bg-slate-800/50 rounded p-2 text-center">
          <div className="text-xs text-slate-500">{completed ? "Completed" : "Days Left"}</div>
          <div className="text-sm font-medium text-slate-300">{completed ? "✓" : daysLeft}</div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          className={`flex-1 h-8 text-xs ${
            completed
              ? "bg-green-600 hover:bg-green-700"
              : isOwner
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {completed ? "View Results" : isOwner ? "Manage Project" : "Invest Now"}
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-700">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

