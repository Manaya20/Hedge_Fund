"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const COLORS = ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#4c1d95", "#5b21b6", "#6d28d9"]

const data = [
  { name: "US Large Cap Equities", value: 28, change: "+2.1%" },
  { name: "US Small Cap Equities", value: 12, change: "+1.5%" },
  { name: "International Equities", value: 18, change: "-0.8%" },
  { name: "Emerging Markets", value: 10, change: "+3.2%" },
  { name: "Corporate Bonds", value: 15, change: "+0.3%" },
  { name: "Treasury Bonds", value: 8, change: "-0.2%" },
  { name: "Commodities", value: 5, change: "+4.1%" },
  { name: "Crypto Assets", value: 4, change: "+8.5%" },
]

export function PortfolioAllocation() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, "Allocation"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <div>
        <h3 className="text-lg font-medium mb-4">Asset Allocation Details</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{item.value}%</span>
                <Badge
                  variant={item.change.startsWith("+") ? "outline" : "secondary"}
                  className={`text-xs ${item.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                >
                  {item.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          <p>Last rebalanced: April 10, 2025</p>
          <p>Next scheduled rebalance: May 10, 2025</p>
        </div>
      </div>
    </div>
  )
}
