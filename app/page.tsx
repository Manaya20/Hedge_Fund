import Link from "next/link"
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  CreditCard,
  DollarSign,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  PieChart,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceChart } from "@/components/performance-chart"
import { PortfolioAllocation } from "@/components/portfolio-allocation"
import { RecentTransactions } from "@/components/recent-transactions"
import { RiskAdjustment } from "@/components/risk-adjustment"
import { StrategySelector } from "@/components/strategy-selector"
import { MarketInsights } from "@/components/market-insights"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span>AI Hedge Fund</span>
        </Link>
        <nav className="hidden flex-1 md:flex md:gap-6 lg:gap-10">
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Portfolio
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Strategies
            <ChevronDown className="h-4 w-4" />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Analytics
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <HelpCircle className="mr-2 h-4 w-4" />
            Support
          </Button>
          <Button size="sm">
            <DollarSign className="mr-2 h-4 w-4" />
            Deposit
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[250px] flex-col border-r bg-muted/40 md:flex">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            <Link href="#" className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <PieChart className="h-4 w-4" />
              Portfolio
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-4 w-4" />
              Strategies
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <CreditCard className="h-4 w-4" />
              Transactions
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Referrals
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Monitor your portfolio performance and AI-driven strategies
                </p>
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
          </div>
        </main>
      </div>
    </div>
  )
}
