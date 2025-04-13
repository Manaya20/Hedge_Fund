import { createClient } from "@supabase/supabase-js"

// Check if we have the required environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Check your .env file or environment configuration.")
}

// Create a Supabase client with error handling
export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co", // Fallback URL to prevent immediate errors
  supabaseAnonKey || "placeholder-key", // Fallback key to prevent immediate errors
  {
    auth: {
      persistSession: true,
    },
  },
)

// Helper function to check if Supabase is properly configured
export function isSupabaseConfigured() {
  return !!supabaseUrl && !!supabaseAnonKey
}
