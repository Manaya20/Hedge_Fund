"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  CreditCard,
  DollarSign,
  HelpCircle,
  LayoutDashboard,
  LineChart,
  LogOut,
  PieChart,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { signOut, user } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span>AI Hedge Fund</span>
        </Link>
        <nav className="hidden flex-1 md:flex md:gap-6 lg:gap-10">
          <Link
            href="/dashboard"
            className={`flex items-center gap-1 text-sm font-medium ${
              pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/portfolio"
            className={`flex items-center gap-1 text-sm font-medium ${
              pathname.startsWith("/portfolio") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Portfolio
          </Link>
          <Link
            href="/strategies"
            className={`flex items-center gap-1 text-sm font-medium ${
              pathname.startsWith("/strategies") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Strategies
          </Link>
          <Link
            href="/analytics"
            className={`flex items-center gap-1 text-sm font-medium ${
              pathname.startsWith("/analytics") ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
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
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === "/dashboard" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/portfolio"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/portfolio")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <PieChart className="h-4 w-4" />
              Portfolio
            </Link>
            <Link
              href="/strategies"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/strategies")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LineChart className="h-4 w-4" />
              Strategies
            </Link>
            <Link
              href="/analytics"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/analytics")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Link>
            <Link
              href="/transactions"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/transactions")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Transactions
            </Link>
            <Link
              href="/referrals"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/referrals")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              Referrals
            </Link>
            <Link
              href="/settings/profile"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname.startsWith("/settings")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <div className="mt-auto">
              <Button variant="ghost" className="w-full justify-start" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
