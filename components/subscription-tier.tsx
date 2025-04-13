"use client"

import { useState } from "react"
import { Check, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type SubscriptionTier = {
  id: string
  name: string
  description: string
  priceMonthly: number
  priceYearly: number
  features: string[]
  isPopular?: boolean
  buttonText: string
  buttonVariant: "default" | "outline"
}

const tiers: SubscriptionTier[] = [
  {
    id: "free-trial",
    name: "Free Trial",
    description: "Explore the platform with simulated trading",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "Simulated trading environment",
      "Basic AI strategies",
      "Limited market data",
      "Educational content",
      "Community support",
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline",
  },
  {
    id: "standard",
    name: "Standard",
    description: "Access to live trading and core AI strategies",
    priceMonthly: 29.99,
    priceYearly: 299.99,
    features: [
      "Live trading through broker integrations",
      "Core AI strategies",
      "Real-time market data",
      "Basic performance analytics",
      "Email support",
    ],
    isPopular: true,
    buttonText: "Upgrade",
    buttonVariant: "default",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Full access to all AI models and advanced features",
    priceMonthly: 99.99,
    priceYearly: 999.99,
    features: [
      "All Standard features",
      "Advanced AI strategies",
      "Sentiment analysis trading",
      "Custom risk parameters",
      "API access",
      "Priority support",
    ],
    buttonText: "Upgrade",
    buttonVariant: "outline",
  },
]

export function SubscriptionTier() {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md text-center sm:max-w-xl">
        <h2 className="text-3xl font-bold">Subscription Plans</h2>
        <p className="mt-4 text-muted-foreground">Choose the plan that best fits your investment goals</p>
      </div>

      <div className="mt-8 flex justify-center">
        <Tabs defaultValue="monthly" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly" onClick={() => setBillingInterval("monthly")}>
              Monthly
            </TabsTrigger>
            <TabsTrigger value="yearly" onClick={() => setBillingInterval("yearly")}>
              Yearly <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Save 20%</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.id} className={`flex flex-col ${tier.isPopular ? "border-primary shadow-md" : ""}`}>
            {tier.isPopular && (
              <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${billingInterval === "monthly" ? tier.priceMonthly : tier.priceYearly}
                </span>
                <span className="text-muted-foreground">{billingInterval === "monthly" ? "/month" : "/year"}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={tier.buttonVariant} className="w-full">
                {tier.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" className="text-muted-foreground">
                <HelpCircle className="mr-1 h-4 w-4" />
                Need help choosing a plan?
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>
                Contact our support team for personalized guidance on selecting the right plan for your investment
                needs.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
