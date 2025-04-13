"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "@/components/performance-chart"
import { PortfolioAllocation } from "@/components/portfolio-allocation"
import { RecentTransactions } from "@/components/recent-transactions"
import { RiskAdjustment } from "@/components/risk-adjustment"
import { StrategySelector } from "@/components/strategy-selector"
import { MarketInsights } from "@/components/market-insights"
import { SubscriptionTier } from "@/components/subscription-tier"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

type UserSubscription = {
  id: string
  status: string
  tier: {
    name: string
    features: any
  }
  trial_ends_at: string | null
}

export default function Dashboard() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) return

      try {
        // First, get the user subscription
        const { data: subscriptionData, error: subscriptionError } = await supabase
          .from("user_subscriptions")
          .select("id, status, trial_ends_at, tier_id")
          .eq("user_id", user.id)
          .single()

        if (subscriptionError) throw subscriptionError

        // Then, get the tier details
        if (subscriptionData) {
          const { data: tierData, error: tierError } = await supabase
            .from("subscription_tiers")
            .select("name, features")
            .eq("id", subscriptionData.tier_id)
            .single()

          if (tierError) throw tierError

          // Combine the data
          setSubscription({
            ...subscriptionData,
            tier: tierData,
          })
        }
      } catch (error) {
        console.error("Error fetching subscription:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [user])

  const isFreeTrial = subscription?.tier?.name === "Free Trial"

  return (
    <div className="grid gap-6">
      {isFreeTrial && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle>Free Trial</CardTitle>
            <CardDescription>You're currently on a free trial with simulated trading</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Upgrade to a paid plan to access live trading, advanced AI strategies, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm" asChild>
              <Link href="#subscription">View Plans</Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor your portfolio performance and AI-driven strategies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button size="sm">
            <DollarSign className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124,765.89</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2.8%</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +0.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">YTD Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18.3%</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +5.2% vs. S&P 500
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Medium</div>
            <div className="flex items-center text-xs text-muted-foreground">Sharpe Ratio: 1.8</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Track your investment growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest automated trades</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>AI-generated market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketInsights />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Analysis
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="allocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Current asset distribution optimized by AI</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioAllocation />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Strategies</CardTitle>
              <CardDescription>AI-powered investment strategies currently deployed</CardDescription>
            </CardHeader>
            <CardContent>
              <StrategySelector />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Risk Adjustment</CardTitle>
              <CardDescription>Customize your risk tolerance</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskAdjustment />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div id="subscription" className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Subscription Plans</h2>
        <SubscriptionTier />
      </div>
    </div>
  )
}
