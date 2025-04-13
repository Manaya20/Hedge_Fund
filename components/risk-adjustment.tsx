"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function RiskAdjustment() {
  const [riskLevel, setRiskLevel] = useState(50)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const getRiskCategory = (level: number) => {
    if (level < 25) return "Conservative"
    if (level < 50) return "Moderate-Conservative"
    if (level < 75) return "Moderate-Aggressive"
    return "Aggressive"
  }

  const getExpectedReturn = (level: number) => {
    return (5 + (level / 100) * 10).toFixed(1)
  }

  const getVolatility = (level: number) => {
    return (4 + (level / 100) * 16).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Risk Tolerance</h3>
          <span className="text-sm font-semibold">{getRiskCategory(riskLevel)}</span>
        </div>
        <Slider
          value={[riskLevel]}
          min={0}
          max={100}
          step={1}
          onValueChange={(value) => setRiskLevel(value[0])}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Conservative</span>
          <span>Moderate</span>
          <span>Aggressive</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Expected Annual Return</span>
              <span className="font-medium text-green-600">{getExpectedReturn(riskLevel)}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Expected Volatility</span>
              <span className="font-medium text-amber-600">{getVolatility(riskLevel)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Alert variant="outline" className="bg-muted/50">
        <Info className="h-4 w-4" />
        <AlertTitle>Risk Profile Information</AlertTitle>
        <AlertDescription>
          Adjusting your risk tolerance will modify the AI's strategy selection and asset allocation. Higher risk may
          lead to higher returns but with increased volatility.
        </AlertDescription>
      </Alert>

      {saved && (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>Changes Saved</AlertTitle>
          <AlertDescription>
            Your risk profile has been updated. The AI will adjust your portfolio accordingly during the next
            rebalancing period.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}
