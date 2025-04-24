"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { User } from "@/types/user"
import { getUserTypeColor, getUserTypeLabel } from "@/lib/user-utils"

interface UserCardProps {
  user: User
  isSelected: boolean
  onClick: () => void
}

export function UserCard({ user, isSelected, onClick }: UserCardProps) {
  return (
    <div
      className={cn(
        "flex items-center space-x-4 rounded-md border p-3 transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer",
        isSelected && "bg-accent text-accent-foreground",
      )}
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{user.name}</p>
        <p className="text-xs text-muted-foreground">@{user.username}</p>
      </div>
      <Badge variant="outline" className={cn("bg-opacity-10", getUserTypeColor(user.type))}>
        {getUserTypeLabel(user.type)}
      </Badge>
    </div>
  )
}
