import type { Metadata } from "next"
import Dashboard from "@/components/dashboard"

export const metadata: Metadata = {
  title: "Mobile Device Usage and User Behavior Analysis",
  description: "Analyze and predict user behavior based on mobile device usage patterns",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Dashboard />
    </main>
  )
}
