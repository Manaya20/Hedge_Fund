"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp } from "lucide-react"

const insights = [
  {
    title: "Tech sector showing strong momentum",
    sentiment: "positive",
    confidence: 87,
    impact: "high",
    timestamp: "2 hours ago",
  },
  {
    title: "Fed signals potential rate hike in June",
    sentiment: "negative",
    confidence: 92,
    impact: "medium",
    timestamp: "5 hours ago",
  },
  {
    title: "Supply chain disruptions easing in Asia",
    sentiment: "positive",
    confidence: 78,
    impact: "medium",
    timestamp: "1 day ago",
  },
  {
    title: "Energy stocks underperforming market",
    sentiment: "negative",
    confidence: 81,
    impact: "low",
    timestamp: "2 days ago",
  },
]

export function MarketInsights() {
  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <Card key={index} className="border-0 shadow-none">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  insight.sentiment === "positive" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {insight.sentiment === "positive" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{insight.title}</div>
                  <Badge
                    variant="outline"
                    className={`ml-2 ${
                      insight.impact === "high"
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : insight.impact === "medium"
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  >
                    {insight.impact} impact
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs text-muted-foreground">AI confidence: {insight.confidence}%</div>
                  <div className="text-xs text-muted-foreground">{insight.timestamp}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
