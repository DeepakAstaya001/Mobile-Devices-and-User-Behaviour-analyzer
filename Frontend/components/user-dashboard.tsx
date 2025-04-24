"use client"

import { useState } from "react"
import { UserList } from "@/components/user-list"
import { UserStats } from "@/components/user-stats"
import { UserFilters } from "@/components/user-filters"
import { UserClassification } from "@/components/user-classification"
import type { User, UserType } from "@/types/user"
import { mockUsers } from "@/data/mock-users"

export function UserDashboard() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeFilter, setActiveFilter] = useState<UserType | "all">("all")

  const filteredUsers = activeFilter === "all" ? users : users.filter((user) => user.type === activeFilter)

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }

  const handleFilterChange = (filter: UserType | "all") => {
    setActiveFilter(filter)
  }

  const handleClassifyUser = (userId: string, newType: UserType) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, type: newType } : user)))

    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser({ ...selectedUser, type: newType })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Social Media User Classifier</h1>
        <p className="text-muted-foreground mt-2">Analyze and classify users based on their social media activity</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1">
          <UserFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          <UserList users={filteredUsers} selectedUserId={selectedUser?.id} onUserSelect={handleUserSelect} />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          {selectedUser ? (
            <div className="grid gap-6">
              <UserStats user={selectedUser} />
              <UserClassification user={selectedUser} onClassify={handleClassifyUser} />
            </div>
          ) : (
            <div className="flex h-[500px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <h3 className="text-lg font-medium">No user selected</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a user from the list to view their details and classification
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
