import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { User } from "@/types/user"
import { ActivityChart } from "@/components/activity-chart"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MessageSquare, ThumbsUp, Users } from "lucide-react"
import { getUserTypeColor, getUserTypeLabel } from "@/lib/user-utils"
import { cn } from "@/lib/utils"

interface UserStatsProps {
  user: User
}

export function UserStats({ user }: UserStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>@{user.username}</CardDescription>
              </div>
            </div>
            <Badge className={cn("bg-opacity-10", getUserTypeColor(user.type))}>{getUserTypeLabel(user.type)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user.followers} followers</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Joined {user.joinDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user.posts} posts</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user.likes} likes</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm">{user.bio}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>User engagement metrics over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityChart data={user.activityData} />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-3">
              <div className="text-sm font-medium">Engagement Rate</div>
              <div className="text-2xl font-bold">{user.engagementRate}%</div>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="text-sm font-medium">Activity Score</div>
              <div className="text-2xl font-bold">{user.activityScore}/100</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
