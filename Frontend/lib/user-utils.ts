import type { UserType } from "@/types/user"

export function getUserTypeLabel(type: UserType): string {
  switch (type) {
    case "creator":
      return "Creator"
    case "engager":
      return "Engager"
    case "lurker":
      return "Lurker"
    case "inactive":
      return "Inactive"
    default:
      return type
  }
}

export function getUserTypeColor(type: UserType): string {
  switch (type) {
    case "creator":
      return "text-green-500 bg-green-500"
    case "engager":
      return "text-blue-500 bg-blue-500"
    case "lurker":
      return "text-amber-500 bg-amber-500"
    case "inactive":
      return "text-gray-500 bg-gray-500"
    default:
      return ""
  }
}
