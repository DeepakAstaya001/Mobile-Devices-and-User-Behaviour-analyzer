"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { User, UserType } from "@/types/user"
import { getUserTypeLabel } from "@/lib/user-utils"
import { useState } from "react"

interface UserClassificationProps {
  user: User
  onClassify: (userId: string, newType: UserType) => void
}

export function UserClassification({ user, onClassify }: UserClassificationProps) {
  const [selectedType, setSelectedType] = useState<UserType>(user.type)

  const handleSubmit = () => {
    onClassify(user.id, selectedType)
  }

  const userTypes: UserType[] = ["creator", "engager", "lurker", "inactive"]

  const typeDescriptions = {
    creator: "Regularly posts original content and has high engagement",
    engager: "Frequently comments and likes but creates less original content",
    lurker: "Consumes content but rarely interacts or posts",
    inactive: "Has minimal or no recent activity on the platform",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Classification</CardTitle>
        <CardDescription>Classify this user based on their activity patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Activity Metrics</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Posts/Week</div>
                  <div className="text-lg font-medium">{user.postsPerWeek.toFixed(1)}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Comments/Post</div>
                  <div className="text-lg font-medium">{user.commentsPerPost.toFixed(1)}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Likes/Day</div>
                  <div className="text-lg font-medium">{user.likesPerDay.toFixed(1)}</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Login Frequency</div>
                  <div className="text-lg font-medium">{user.loginFrequency}/7</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Content Analysis</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Original Content</div>
                  <div className="text-lg font-medium">{user.originalContent}%</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Response Rate</div>
                  <div className="text-lg font-medium">{user.responseRate}%</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Avg. Session</div>
                  <div className="text-lg font-medium">{user.avgSessionMinutes} min</div>
                </div>
                <div className="rounded-md bg-muted p-2">
                  <div className="text-xs text-muted-foreground">Content Variety</div>
                  <div className="text-lg font-medium">{user.contentVariety}/10</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">User Type Classification</h4>
            <RadioGroup value={selectedType} onValueChange={(value) => setSelectedType(value as UserType)}>
              {userTypes.map((type) => (
                <div key={type} className="flex items-start space-x-2 mb-3">
                  <RadioGroupItem value={type} id={type} />
                  <div className="grid gap-1.5">
                    <Label htmlFor={type} className="font-medium">
                      {getUserTypeLabel(type)}
                    </Label>
                    <p className="text-sm text-muted-foreground">{typeDescriptions[type]}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Button onClick={handleSubmit} disabled={selectedType === user.type}>
            Update Classification
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
