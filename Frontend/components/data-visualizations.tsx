"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserData } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"

interface DataVisualizationsProps {
  userData: UserData[]
}

export default function DataVisualizations({ userData }: DataVisualizationsProps) {
  // Calculate OS distribution
  const osDistribution = userData.reduce(
    (acc, user) => {
      const os = user["Operating System"]
      acc[os] = (acc[os] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const osData = Object.entries(osDistribution).map(([name, value]) => ({
    name,
    value,
  }))

  // Calculate behavior class distribution
  const behaviorDistribution = userData.reduce(
    (acc, user) => {
      const behaviorClass = user["User Behavior Class"]
      acc[behaviorClass] = (acc[behaviorClass] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const behaviorData = Object.entries(behaviorDistribution).map(([name, value]) => ({
    name: `Class ${name}`,
    value,
  }))

  // Calculate average app usage by age group
  const ageGroups = userData.reduce(
    (acc, user) => {
      const age = Number.parseInt(user["Age"])
      let ageGroup = "18-24"
      if (age >= 25 && age <= 34) ageGroup = "25-34"
      else if (age >= 35 && age <= 44) ageGroup = "35-44"
      else if (age >= 45) ageGroup = "45+"

      if (!acc[ageGroup]) {
        acc[ageGroup] = { total: 0, count: 0 }
      }
      acc[ageGroup].total += Number.parseInt(user["App Usage Time (min/day)"])
      acc[ageGroup].count += 1
      return acc
    },
    {} as Record<string, { total: number; count: number }>,
  )

  const appUsageByAgeData = Object.entries(ageGroups).map(([name, { total, count }]) => ({
    name,
    value: Math.round(total / count),
  }))

  // Scatter plot data for screen time vs battery drain
  const scatterData = userData.map((user) => ({
    x: Number.parseFloat(user["Screen On Time (hours/day)"]),
    y: Number.parseInt(user["Battery Drain (mAh/day)"]),
    z: 1,
    class: user["User Behavior Class"],
  }))

  // COLORS
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Data Visualizations</CardTitle>
        <CardDescription>Visual analysis of mobile device usage patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="distribution">User Distribution</TabsTrigger>
            <TabsTrigger value="usage">Usage by Age</TabsTrigger>
            <TabsTrigger value="correlation">Screen Time vs Battery</TabsTrigger>
            <TabsTrigger value="behavior">Behavior Classes</TabsTrigger>
          </TabsList>
          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operating System Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={osData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {osData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Behavior Class Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={behaviorData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {behaviorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average App Usage Time by Age Group</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={appUsageByAgeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Minutes per Day", angle: -90, position: "insideLeft" }} />
                      <Tooltip formatter={(value) => [`${value} min/day`, "App Usage"]} />
                      <Legend />
                      <Bar dataKey="value" name="App Usage Time" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="correlation">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Screen Time vs Battery Drain</CardTitle>
                <CardDescription>Correlation between daily screen time and battery consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid />
                      <XAxis
                        type="number"
                        dataKey="x"
                        name="Screen Time"
                        unit=" hrs"
                        label={{ value: "Screen Time (hours/day)", position: "insideBottomRight", offset: -5 }}
                      />
                      <YAxis
                        type="number"
                        dataKey="y"
                        name="Battery Drain"
                        unit=" mAh"
                        label={{ value: "Battery Drain (mAh/day)", angle: -90, position: "insideLeft" }}
                      />
                      <ZAxis type="number" dataKey="z" range={[60, 400]} name="class" />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Legend />
                      <Scatter name="Users" data={scatterData} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="behavior">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Metrics by Behavior Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[1, 2, 3, 4]
                        .map((classNum) => {
                          const classUsers = userData.filter(
                            (user) => Number.parseInt(user["User Behavior Class"]) === classNum,
                          )
                          if (classUsers.length === 0) return null

                          return {
                            name: `Class ${classNum}`,
                            appUsage: Math.round(
                              classUsers.reduce(
                                (sum, user) => sum + Number.parseInt(user["App Usage Time (min/day)"]),
                                0,
                              ) / classUsers.length,
                            ),
                            screenTime: Number.parseFloat(
                              (
                                classUsers.reduce(
                                  (sum, user) => sum + Number.parseFloat(user["Screen On Time (hours/day)"]),
                                  0,
                                ) / classUsers.length
                              ).toFixed(1),
                            ),
                            dataUsage: Math.round(
                              classUsers.reduce((sum, user) => sum + Number.parseInt(user["Data Usage (MB/day)"]), 0) /
                                classUsers.length,
                            ),
                          }
                        })
                        .filter(Boolean)}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="appUsage" name="App Usage (min/day)" fill="#8884d8" />
                      <Bar dataKey="screenTime" name="Screen Time (hrs/day)" fill="#82ca9d" />
                      <Bar dataKey="dataUsage" name="Data Usage (MB/day)" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
