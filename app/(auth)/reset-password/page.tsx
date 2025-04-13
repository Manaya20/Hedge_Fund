"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (error) throw error

      setIsSubmitted(true)
    } catch (error: any) {
      setError(error.message || "An error occurred while sending the reset link")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-center mb-8 md:hidden">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <TrendingUp className="h-6 w-6" />
          <span className="font-bold text-xl">AI Hedge Fund</span>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>
            {isSubmitted ? "Check your email for a reset link" : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending reset link..." : "Send reset link"}
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Back to login</Link>
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <p className="text-center text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
              instructions to reset your password.
            </p>
            <Button variant="outline" asChild className="w-full mt-4">
              <Link href="/login">Back to login</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
