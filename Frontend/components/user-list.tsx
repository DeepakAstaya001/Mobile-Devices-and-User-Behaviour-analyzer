"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import type { User } from "@/types/user"
import { UserCard } from "@/components/user-card"

interface UserListProps {
  users: User[]
  selectedUserId?: string
  onUserSelect: (user: User) => void
}

export function UserList({ users, selectedUserId, onUserSelect }: UserListProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Users ({users.length})</h3>
      </div>
      <ScrollArea className="h-[600px]">
        <div className="p-4">
          {users.length > 0 ? (
            <div className="space-y-3">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isSelected={user.id === selectedUserId}
                  onClick={() => onUserSelect(user)}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center">
              <p className="text-sm text-muted-foreground">No users found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
