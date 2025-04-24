export type UserType = "creator" | "engager" | "lurker" | "inactive"

export interface User {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  type: UserType
  followers: number
  following: number
  posts: number
  likes: number
  joinDate: string
  engagementRate: number
  activityScore: number
  postsPerWeek: number
  commentsPerPost: number
  likesPerDay: number
  loginFrequency: number
  originalContent: number
  responseRate: number
  avgSessionMinutes: number
  contentVariety: number
  activityData: {
    date: string
    posts: number
    comments: number
    likes: number
  }[]
}
