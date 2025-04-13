"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

const transactions = [
  {
    id: "TX123456",
    type: "buy",
    asset: "AAPL",
    amount: "$2,450.00",
    shares: "12.5",
    date: "Apr 12, 2025",
    status: "completed",
  },
  {
    id: "TX123455",
    type: "sell",
    asset: "TSLA",
    amount: "$1,840.00",
    shares: "8.2",
    date: "Apr 11, 2025",
    status: "completed",
  },
  {
    id: "TX123454",
    type: "buy",
    asset: "MSFT",
    amount: "$3,200.00",
    shares: "9.8",
    date: "Apr 10, 2025",
    status: "completed",
  },
  {
    id: "TX123453",
    type: "buy",
    asset: "NVDA",
    amount: "$4,100.00",
    shares: "10.2",
    date: "Apr 9, 2025",
    status: "completed",
  },
  {
    id: "TX123452",
    type: "sell",
    asset: "AMZN",
    amount: "$2,900.00",
    shares: "15.5",
    date: "Apr 8, 2025",
    status: "completed",
  },
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                transaction.type === "buy" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {transaction.type === "buy" ? (
                <ArrowDownRight className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowUpRight className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div>
              <div className="font-medium">
                {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.asset}
              </div>
              <div className="text-xs text-muted-foreground">
                {transaction.shares} shares • {transaction.date}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{transaction.amount}</div>
            <div className="text-xs text-muted-foreground">{transaction.id}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
