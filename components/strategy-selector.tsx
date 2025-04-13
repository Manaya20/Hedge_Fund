"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const strategies = [
  {
    id: "momentum",
    name: "Momentum Trading",
    description: "Capitalizes on continuation of existing market trends",
    performance: "+18.2%",
    risk: "High",
    active: true,
    aiPowered: true,
  },
  {
    id: "value",
    name: "Value Investing",
    description: "Focuses on undervalued assets with strong fundamentals",
    performance: "+12.5%",
    risk: "Medium",
    active: true,
    aiPowered: true,
  },
  {
    id: "sentiment",
    name: "Sentiment Analysis",
    description: "Uses NLP to analyze news and social media sentiment",
    performance: "+21.3%",
    risk: "High",
    active: false,
    aiPowered: true,
  },
  {
    id: "macro",
    name: "Macro Hedging",
    description: "Positions based on macroeconomic indicators and trends",
    performance: "+8.7%",
    risk: "Low",
    active: true,
    aiPowered: true,
  },
  {
    id: "arbitrage",
    name: "Statistical Arbitrage",
    description: "Exploits price inefficiencies between related securities",
    performance: "+15.1%",
    risk: "Medium",
    active: false,
    aiPowered: true,
  },
]

export function StrategySelector() {
  const [activeStrategies, setActiveStrategies] = useState(strategies.map((strategy) => strategy.active))

  const handleToggleStrategy = (index: number) => {
    const newActiveStrategies = [...activeStrategies]
    newActiveStrategies[index] = !newActiveStrategies[index]
    setActiveStrategies(newActiveStrategies)
  }

  return (
    <div className="space-y-4">
      {strategies.map((strategy, index) => (
        <Card key={strategy.id} className={`transition-all ${!activeStrategies[index] ? "opacity-70" : ""}`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{strategy.name}</CardTitle>
                {strategy.aiPowered && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                    AI Powered
                  </Badge>
                )}
              </div>
              <Switch checked={activeStrategies[index]} onCheckedChange={() => handleToggleStrategy(index)} />
            </div>
            <CardDescription>{strategy.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">YTD Performance</span>
                <span
                  className={`font-medium ${strategy.performance.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {strategy.performance}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Risk Level</span>
                <span className="font-medium">
                  {strategy.risk === "High" && <span className="text-amber-600">High</span>}
                  {strategy.risk === "Medium" && <span className="text-amber-500">Medium</span>}
                  {strategy.risk === "Low" && <span className="text-green-600">Low</span>}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Info className="h-4 w-4 mr-1" /> Strategy Details
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    View detailed performance metrics, historical trades, and AI decision factors for this strategy.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
