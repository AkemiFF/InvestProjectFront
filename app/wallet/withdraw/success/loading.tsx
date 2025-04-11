import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"

export default function WithdrawSuccessLoading() {
  return (
    <DashboardLayout userType="investor">
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-md bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex justify-center">
              <div className="h-12 w-12 border-4 border-slate-600 border-t-cyan-500 rounded-full animate-spin"></div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="h-6 bg-slate-800/70 rounded animate-pulse"></div>
              <div className="h-4 bg-slate-800/50 rounded animate-pulse"></div>
              <div className="h-4 bg-slate-800/50 rounded animate-pulse w-3/4 mx-auto"></div>

              <div className="mt-4 space-y-3">
                <div className="h-12 bg-slate-800/70 rounded animate-pulse"></div>
                <div className="h-12 bg-slate-800/70 rounded animate-pulse"></div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-10 bg-slate-800/70 rounded animate-pulse"></div>
                <div className="h-10 bg-slate-800/50 rounded animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
