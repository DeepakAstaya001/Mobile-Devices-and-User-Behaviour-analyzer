"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { UserData } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BehaviorInsightsProps {
  userData: UserData[]
}

export default function BehaviorInsights({ userData }: BehaviorInsightsProps) {
  // Calculate average metrics for each behavior class
  const behaviorMetrics = [1, 2, 3, 4]
    .map((classNum) => {
      const classUsers = userData.filter((user) => Number.parseInt(user["User Behavior Class"]) === classNum)
      if (classUsers.length === 0) return null

      return {
        class: classNum,
        count: classUsers.length,
        appUsage: Math.round(
          classUsers.reduce((sum, user) => sum + Number.parseInt(user["App Usage Time (min/day)"]), 0) /
            classUsers.length,
        ),
        screenTime: Number.parseFloat(
          (
            classUsers.reduce((sum, user) => sum + Number.parseFloat(user["Screen On Time (hours/day)"]), 0) /
            classUsers.length
          ).toFixed(1),
        ),
        batteryDrain: Math.round(
          classUsers.reduce((sum, user) => sum + Number.parseInt(user["Battery Drain (mAh/day)"]), 0) /
            classUsers.length,
        ),
        appsInstalled: Math.round(
          classUsers.reduce((sum, user) => sum + Number.parseInt(user["Number of Apps Installed"]), 0) /
            classUsers.length,
        ),
        dataUsage: Math.round(
          classUsers.reduce((sum, user) => sum + Number.parseInt(user["Data Usage (MB/day)"]), 0) / classUsers.length,
        ),
        avgAge: Math.round(classUsers.reduce((sum, user) => sum + Number.parseInt(user["Age"]), 0) / classUsers.length),
      }
    })
    .filter(Boolean)

  const behaviorDescriptions = {
    1: {
      title: "Light Users",
      description:
        "Light users have minimal interaction with their mobile devices. They typically use their phones for essential communication and basic tasks.",
      characteristics: [
        "Low screen time (typically less than 2 hours per day)",
        "Minimal app usage focused on essential applications",
        "Low data consumption and battery drain",
        "Fewer installed apps compared to other user groups",
        "Often use devices primarily for calls, texts, and occasional web browsing",
      ],
      recommendations: [
        "Basic devices with long battery life would be suitable",
        "Entry-level data plans would be sufficient",
        "Simple, intuitive interfaces would be appreciated",
        "Focus on reliability and ease of use rather than advanced features",
      ],
    },
    2: {
      title: "Moderate Users",
      description:
        "Moderate users maintain a balanced relationship with their devices. They use a variety of apps regularly but don't show excessive screen time.",
      characteristics: [
        "Medium screen time (typically 2-4 hours per day)",
        "Regular but controlled app usage across different categories",
        "Moderate data consumption and battery drain",
        "Average number of installed apps",
        "Use devices for communication, social media, entertainment, and productivity",
      ],
      recommendations: [
        "Mid-range devices with good battery life and performance",
        "Medium-sized data plans with some flexibility",
        "Features that help maintain digital wellbeing",
        "Balanced approach to notifications and engagement features",
      ],
    },
    3: {
      title: "Heavy Users",
      description:
        "Heavy users spend significant time on their devices daily. They are highly engaged with multiple apps and services, consuming substantial data.",
      characteristics: [
        "High screen time (typically 4-7 hours per day)",
        "Extensive app usage across many categories",
        "High data consumption and battery drain",
        "Large number of installed apps",
        "Heavy use of social media, streaming services, and games",
      ],
      recommendations: [
        "High-performance devices with excellent displays and battery life",
        "Large or unlimited data plans",
        "Advanced features and customization options",
        "Power management tools and fast charging capabilities",
      ],
    },
    4: {
      title: "Power Users",
      description:
        "Power users are extremely dependent on their mobile devices, showing the highest levels of engagement across all metrics.",
      characteristics: [
        "Very high screen time (typically more than 7 hours per day)",
        "Intensive app usage across all categories",
        "Maximum data consumption and battery drain",
        "Extensive collection of installed apps",
        "Use devices for almost all digital activities including work, entertainment, and social interaction",
      ],
      recommendations: [
        "Premium flagship devices with cutting-edge specifications",
        "Unlimited data plans with high-speed options",
        "Advanced multitasking capabilities and productivity tools",
        "Maximum customization and integration with other devices/services",
      ],
    },
  }

  return (
    <Tabs defaultValue="1" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="1">Class 1</TabsTrigger>
        <TabsTrigger value="2">Class 2</TabsTrigger>
        <TabsTrigger value="3">Class 3</TabsTrigger>
        <TabsTrigger value="4">Class 4</TabsTrigger>
      </TabsList>

      {[1, 2, 3, 4].map((classNum) => {
        const metrics = behaviorMetrics.find((m) => m?.class === classNum)
        const insights = behaviorDescriptions[classNum as keyof typeof behaviorDescriptions]

        return (
          <TabsContent key={classNum} value={classNum.toString()} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{insights.title}</CardTitle>
                  <CardDescription>Class {classNum} User Behavior Profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{insights.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Characteristics</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {insights.characteristics.map((item, i) => (
                          <li key={i} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {insights.recommendations.map((item, i) => (
                          <li key={i} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Metrics</CardTitle>
                  <CardDescription>Average values for Class {classNum} users</CardDescription>
                </CardHeader>
                <CardContent>
                  {metrics ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">App Usage Time</div>
                          <div className="text-2xl font-bold">{metrics.appUsage} min/day</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Screen On Time</div>
                          <div className="text-2xl font-bold">{metrics.screenTime} hrs/day</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Battery Drain</div>
                          <div className="text-2xl font-bold">{metrics.batteryDrain} mAh/day</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Data Usage</div>
                          <div className="text-2xl font-bold">{metrics.dataUsage} MB/day</div>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Apps Installed</div>
                            <div className="text-2xl font-bold">{metrics.appsInstalled}</div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Average Age</div>
                            <div className="text-2xl font-bold">{metrics.avgAge} years</div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="text-sm font-medium mb-2">User Count</div>
                        <div className="text-2xl font-bold">{metrics.count} users</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {((metrics.count / userData.length) * 100).toFixed(1)}% of total users
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center">
                      <p className="text-muted-foreground">No data available for Class {classNum}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Representative Users</CardTitle>
                <CardDescription>Sample users from Class {classNum}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-4">
                    {userData
                      .filter((user) => Number.parseInt(user["User Behavior Class"]) === classNum)
                      .slice(0, 5)
                      .map((user) => (
                        <Card key={user["User ID"]} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">User ID: {user["User ID"]}</h4>
                              <p className="text-sm text-muted-foreground">
                                {user["Gender"]}, {user["Age"]} years old
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">{user["Device Model"]}</p>
                              <p className="text-xs text-muted-foreground">{user["Operating System"]}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="text-sm">
                              <span className="text-muted-foreground">App Usage:</span>{" "}
                              {user["App Usage Time (min/day)"]} min/day
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Screen Time:</span>{" "}
                              {user["Screen On Time (hours/day)"]} hrs/day
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Data:</span> {user["Data Usage (MB/day)"]} MB/day
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Apps:</span> {user["Number of Apps Installed"]}
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
