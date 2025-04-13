import type React from "react"
import { TrendingUp } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col bg-primary/10 p-10 text-white">
        <div className="flex items-center gap-2 text-primary">
          <TrendingUp className="h-6 w-6" />
          <span className="font-bold text-xl">AI Hedge Fund</span>
        </div>
        <div className="flex flex-col justify-center items-center flex-1 px-6">
          <div className="space-y-6 max-w-md">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Institutional-grade investing powered by AI
            </h1>
            <p className="text-muted-foreground">
              Access sophisticated AI-driven investment strategies previously available only to hedge funds and
              institutional investors.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <strong className="text-foreground">Advanced AI Models</strong>
                  <p>Leveraging LSTM, reinforcement learning, and NLP for market prediction</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <strong className="text-foreground">Risk Management</strong>
                  <p>Customizable risk parameters to match your investment goals</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <strong className="text-foreground">Automated Trading</strong>
                  <p>Set it and forget it - our AI handles the trading for you</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-6 md:p-10">{children}</div>
    </div>
  )
}
