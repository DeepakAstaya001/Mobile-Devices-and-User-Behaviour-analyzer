"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { predictUserBehavior } from "@/lib/prediction"
import { Loader2 } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Progress } from "@/components/ui/progress"

const formSchema = z.object({
  deviceModel: z.string().min(1, {
    message: "Device model is required",
  }),
  operatingSystem: z.string().min(1, {
    message: "Operating system is required",
  }),
  appUsageTime: z.coerce.number().min(0).max(1440),
  screenOnTime: z.coerce.number().min(0).max(24),
  batteryDrain: z.coerce.number().min(0).max(5000),
  appsInstalled: z.coerce.number().min(0).max(500),
  dataUsage: z.coerce.number().min(0).max(10000),
  age: z.coerce.number().min(13).max(100),
  gender: z.string().min(1, {
    message: "Gender is required",
  }),
})

export default function PredictionForm() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [userMetrics, setUserMetrics] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deviceModel: "",
      operatingSystem: "",
      appUsageTime: 120,
      screenOnTime: 3,
      batteryDrain: 1000,
      appsInstalled: 30,
      dataUsage: 500,
      age: 25,
      gender: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      // In a real app, this would call your API
      const result = await predictUserBehavior(values)
      setPrediction(result)

      // Save user metrics for visualization
      setUserMetrics({
        appUsage: values.appUsageTime,
        screenTime: values.screenOnTime,
        batteryDrain: values.batteryDrain,
        appsInstalled: values.appsInstalled,
        dataUsage: values.dataUsage,
      })
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  const deviceModels = [
    "iPhone 13",
    "iPhone 12",
    "Samsung Galaxy S21",
    "Samsung Galaxy S20",
    "Google Pixel 6",
    "Google Pixel 5",
    "OnePlus 9",
    "OnePlus 8",
    "Xiaomi Mi 11",
    "Huawei P40",
    "Motorola Edge",
  ]

  // Average metrics for each behavior class (for comparison in radar chart)
  const classAverages = {
    1: {
      // Light users
      appUsage: 60,
      screenTime: 1.5,
      batteryDrain: 800,
      appsInstalled: 20,
      dataUsage: 300,
    },
    2: {
      // Moderate users
      appUsage: 150,
      screenTime: 3,
      batteryDrain: 1200,
      appsInstalled: 35,
      dataUsage: 700,
    },
    3: {
      // Heavy users
      appUsage: 250,
      screenTime: 5,
      batteryDrain: 1800,
      appsInstalled: 60,
      dataUsage: 1500,
    },
    4: {
      // Power users
      appUsage: 350,
      screenTime: 7,
      batteryDrain: 2500,
      appsInstalled: 90,
      dataUsage: 2500,
    },
  }

  // Prepare radar chart data
  const getRadarData = () => {
    if (!userMetrics || !prediction) return []

    const classAvg = classAverages[prediction as keyof typeof classAverages]

    // Normalize values for radar chart
    return [
      { metric: "App Usage", user: (userMetrics.appUsage / 350) * 100, average: (classAvg.appUsage / 350) * 100 },
      { metric: "Screen Time", user: (userMetrics.screenTime / 8) * 100, average: (classAvg.screenTime / 8) * 100 },
      {
        metric: "Battery Drain",
        user: (userMetrics.batteryDrain / 2500) * 100,
        average: (classAvg.batteryDrain / 2500) * 100,
      },
      {
        metric: "Apps Installed",
        user: (userMetrics.appsInstalled / 100) * 100,
        average: (classAvg.appsInstalled / 100) * 100,
      },
      { metric: "Data Usage", user: (userMetrics.dataUsage / 3000) * 100, average: (classAvg.dataUsage / 3000) * 100 },
    ]
  }

  // Prepare comparison bar chart data
  const getComparisonData = () => {
    if (!userMetrics || !prediction) return []

    const classAvg = classAverages[prediction as keyof typeof classAverages]

    return [
      { name: "App Usage (min/day)", user: userMetrics.appUsage, average: classAvg.appUsage },
      { name: "Screen Time (hrs/day)", user: userMetrics.screenTime, average: classAvg.screenTime },
      { name: "Data Usage (MB/day)", user: userMetrics.dataUsage, average: classAvg.dataUsage },
    ]
  }

  // Get behavior class description
  const getBehaviorDescription = (classNum: number) => {
    switch (classNum) {
      case 1:
        return "Light User: Minimal device usage with low app engagement and data consumption."
      case 2:
        return "Moderate User: Average screen time with balanced app usage and moderate data consumption."
      case 3:
        return "Heavy User: Extended screen time with high app engagement and significant data usage."
      case 4:
        return "Power User: Extremely high usage across all metrics with maximum engagement."
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="deviceModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deviceModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operatingSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating System</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select OS" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Android">Android</SelectItem>
                      <SelectItem value="iOS">iOS</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="appUsageTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>App Usage Time (minutes/day): {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={600}
                    step={10}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>Average time spent using apps daily</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="screenOnTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screen On Time (hours/day): {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={12}
                    step={0.5}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>Total screen time daily</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="batteryDrain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Battery Drain (mAh/day)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appsInstalled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Apps Installed</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="dataUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Usage (MB/day)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Predicting...
              </>
            ) : (
              "Predict Behavior Class"
            )}
          </Button>
        </form>
      </Form>

      {prediction !== null && (
        <div className="space-y-6">
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-4xl font-bold">Class {prediction}</div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((num) => (
                    <div
                      key={num}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        num === prediction
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted-foreground/20 text-muted-foreground"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="w-full mt-2">
                  <Progress value={prediction * 25} className="h-2" />
                </div>
                <p className="text-center mt-4">{getBehaviorDescription(prediction)}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Usage Profile Comparison</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={getRadarData()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Your Usage" dataKey="user" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                        <Radar
                          name="Class Average"
                          dataKey="average"
                          stroke="#059669"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Metrics Comparison</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getComparisonData()}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="user" name="Your Usage" fill="#3b82f6" />
                        <Bar dataKey="average" name={`Class ${prediction} Average`} fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
