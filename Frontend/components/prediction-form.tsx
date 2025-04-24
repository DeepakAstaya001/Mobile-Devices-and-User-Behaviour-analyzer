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
import { Card, CardContent } from "@/components/ui/card"
import { predictUserBehavior } from "@/lib/prediction"
import { Loader2 } from "lucide-react"

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
        <Card className="mt-6 bg-muted">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium">Prediction Result</h3>
            <div className="mt-2 text-3xl font-bold">User Behavior Class: {prediction}</div>
            <p className="mt-2 text-sm text-muted-foreground">
              {prediction === 1
                ? "Light User: Minimal device usage with low app engagement and data consumption."
                : prediction === 2
                  ? "Moderate User: Average screen time with balanced app usage and moderate data consumption."
                  : prediction === 3
                    ? "Heavy User: Extended screen time with high app engagement and significant data usage."
                    : "Power User: Extremely high usage across all metrics with maximum engagement."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
