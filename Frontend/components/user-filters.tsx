"use client"

import { Button } from "@/components/ui/button"
import type { UserType } from "@/types/user"
import { getUserTypeLabel } from "@/lib/user-utils"

interface UserFiltersProps {
  activeFilter: UserType | "all"
  onFilterChange: (filter: UserType | "all") => void
}

export function UserFilters({ activeFilter, onFilterChange }: UserFiltersProps) {
  const filters: (UserType | "all")[] = ["all", "creator", "engager", "lurker", "inactive"]

  return (
    <div className="mb-6 space-y-4">
      <h3 className="text-lg font-medium">Filter by Type</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter)}
          >
            {filter === "all" ? "All Users" : getUserTypeLabel(filter)}
          </Button>
        ))}
      </div>
    </div>
  )
}
