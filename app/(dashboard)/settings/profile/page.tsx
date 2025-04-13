"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

type UserProfile = {
  id: string
  full_name: string
  display_name: string | null
  avatar_url: string | null
  phone_number: string | null
  country: string | null
  tax_id: string | null
  is_accredited_investor: boolean
  risk_tolerance: number
}

export default function ProfileSettings() {
  const { user, refreshSession } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

        if (error) throw error
        setProfile(data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      }
    }

    fetchProfile()
  }, [user, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return

    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile || !user) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: profile.full_name,
          display_name: profile.display_name,
          phone_number: profile.phone_number,
          country: profile.country,
          tax_id: profile.tax_id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })

      // Refresh the session to get updated user data
      await refreshSession()
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!profile) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-[400px]">
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        <Separator />
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url || "/placeholder.svg"}
                          alt={profile.full_name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Change avatar
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input id="full_name" name="full_name" value={profile.full_name || ""} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="display_name">Display Name</Label>
                      <Input
                        id="display_name"
                        name="display_name"
                        value={profile.display_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user?.email || ""} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone_number">Phone Number</Label>
                      <Input
                        id="phone_number"
                        name="phone_number"
                        value={profile.phone_number || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" name="country" value={profile.country || ""} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax_id">Tax ID (Optional)</Label>
                      <Input id="tax_id" name="tax_id" value={profile.tax_id || ""} onChange={handleChange} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Subscription Plan</Label>
                  <p className="text-sm text-muted-foreground">
                    You are currently on the <strong>Free Trial</strong> plan.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upgrade Plan
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Your account is <strong>Active</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Change Password
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
