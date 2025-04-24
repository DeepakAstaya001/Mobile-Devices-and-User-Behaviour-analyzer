"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DataTable from "@/components/data-table"
import DataVisualizations from "@/components/data-visualizations"
import PredictionForm from "@/components/prediction-form"
import BehaviorInsights from "@/components/behavior-insights"
import { type UserData, fetchUserData } from "@/lib/data"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchUserData()
        setUserData(data)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading data...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mobile Device Usage and User Behavior Analysis</h1>
        <p className="text-muted-foreground">
          Analyze usage patterns and predict behavior classes based on device usage metrics
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="data">Dataset</TabsTrigger>
          <TabsTrigger value="predict">Predict</TabsTrigger>
          <TabsTrigger value="insights">Behavior Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.length}</div>
                <p className="text-xs text-muted-foreground">Analyzed in the dataset</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. App Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    userData.reduce((acc, user) => acc + Number.parseInt(user["App Usage Time (min/day)"]), 0) /
                      userData.length,
                  )}{" "}
                  min/day
                </div>
                <p className="text-xs text-muted-foreground">Across all users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Screen Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(
                    userData.reduce((acc, user) => acc + Number.parseFloat(user["Screen On Time (hours/day)"]), 0) /
                    userData.length
                  ).toFixed(1)}{" "}
                  hrs/day
                </div>
                <p className="text-xs text-muted-foreground">Across all users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Data Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(
                    userData.reduce((acc, user) => acc + Number.parseInt(user["Data Usage (MB/day)"]), 0) /
                      userData.length,
                  )}{" "}
                  MB/day
                </div>
                <p className="text-xs text-muted-foreground">Across all users</p>
              </CardContent>
            </Card>
          </div>

          <DataVisualizations userData={userData} />
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>User Behavior Dataset</CardTitle>
              <CardDescription>
                Complete dataset with user demographics, device information, and usage metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable data={userData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predict">
          <Card>
            <CardHeader>
              <CardTitle>Predict User Behavior Class</CardTitle>
              <CardDescription>Enter device usage metrics to predict the user behavior classification</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <BehaviorInsights userData={userData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
