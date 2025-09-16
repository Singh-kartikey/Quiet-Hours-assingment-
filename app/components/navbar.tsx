"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "../lib/supabaseClient"

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }
    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-indigo-600">
        Quiet Hours
      </Link>

      <div>
        {loading ? (
          // ⏳ Show nothing while checking session
          <span className="text-gray-500">Loading...</span>
        ) : !user ? (
          <div className="space-x-4">
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/blocks"
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            >
              My Blocks
            </Link>
            <span className="text-gray-700 text-sm">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
