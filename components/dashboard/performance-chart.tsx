"use client"

import { useEffect, useState } from "react";

interface BarHeights {
  investHeight: number;
  returnHeight: number;
}

export function PerformanceChart() {
  const [barHeights, setBarHeights] = useState<BarHeights[]>([])

  useEffect(() => {
    const generateBarHeights = (count: number): BarHeights[] => {
      return Array.from({ length: count }).map(() => ({
        investHeight: Math.floor(Math.random() * 60) + 20,
        returnHeight: Math.floor(Math.random() * 40) + 10,
      }))
    }
    setBarHeights(generateBarHeights(24))
  }, [])

  if (!barHeights.length) {
    return (
      <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative animate-pulse">
        <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-full bg-slate-800 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        {["100%", "75%", "50%", "25%", "0%"].map((label, i) => (
          <div key={i} className="text-xs text-slate-500">{label}</div>
        ))}
      </div>

      {/* Chart bars */}
      <div className="w-full h-full pl-8 pr-10 flex items-end justify-between">
        {barHeights.map((barHeight, i) => (
          <div key={i} className="flex space-x-0.5">
            <div
              className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
              style={{ height: `${barHeight.investHeight}%` }}
            />
            <div
              className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
              style={{ height: `${barHeight.returnHeight}%` }}
            />
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        {["Jan", "Apr", "Jul", "Oct", "Dec"].map((month, i) => (
          <div key={i} className="text-xs text-slate-500">{month}</div>
        ))}
      </div>
    </div>
  )
}