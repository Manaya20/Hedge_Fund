"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Generate mock performance data
const generatePerformanceData = (days: number, startValue: number, volatility: number) => {
  const data = []
  let currentValue = startValue
  let benchmarkValue = startValue

  const today = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    // Generate random daily returns with slight positive bias for the portfolio
    const portfolioReturn = (Math.random() - 0.45) * volatility
    const benchmarkReturn = (Math.random() - 0.48) * (volatility * 0.8)

    currentValue = currentValue * (1 + portfolioReturn / 100)
    benchmarkValue = benchmarkValue * (1 + benchmarkReturn / 100)

    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      portfolio: Math.round(currentValue * 100) / 100,
      benchmark: Math.round(benchmarkValue * 100) / 100,
    })
  }

  return data
}

export function PerformanceChart() {
  const [timeframe, setTimeframe] = useState<"1M" | "3M" | "6M" | "1Y" | "ALL">("3M")
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Set different data based on selected timeframe
    const days =
      timeframe === "1M" ? 30 : timeframe === "3M" ? 90 : timeframe === "6M" ? 180 : timeframe === "1Y" ? 365 : 730

    const volatility =
      timeframe === "1M" ? 1.2 : timeframe === "3M" ? 1.0 : timeframe === "6M" ? 0.9 : timeframe === "1Y" ? 0.8 : 0.7

    setData(generatePerformanceData(days, 100000, volatility))
  }, [timeframe])

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-medium">Portfolio vs. S&P 500</div>
          <div className="flex space-x-1">
            <Button
              variant={timeframe === "1M" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("1M")}
              className="h-7 px-3"
            >
              1M
            </Button>
            <Button
              variant={timeframe === "3M" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("3M")}
              className="h-7 px-3"
            >
              3M
            </Button>
            <Button
              variant={timeframe === "6M" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("6M")}
              className="h-7 px-3"
            >
              6M
            </Button>
            <Button
              variant={timeframe === "1Y" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("1Y")}
              className="h-7 px-3"
            >
              1Y
            </Button>
            <Button
              variant={timeframe === "ALL" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe("ALL")}
              className="h-7 px-3"
            >
              ALL
            </Button>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#f0f0f0" }}
                tickMargin={10}
                minTickGap={15}
              />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={["dataMin - 5000", "dataMax + 5000"]}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="portfolio"
                name="AI Portfolio"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                name="S&P 500"
                stroke="#94a3b8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
