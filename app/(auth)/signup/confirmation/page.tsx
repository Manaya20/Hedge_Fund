import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignupConfirmationPage() {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent you a confirmation link to verify your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Please check your inbox and click on the verification link to complete your registration.</p>
          <p className="mt-2">If you don't see the email, check your spam folder or request a new verification link.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/login">Go to login</Link>
          </Button>
          <Button variant="outline" className="w-full">
            Resend verification email
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
