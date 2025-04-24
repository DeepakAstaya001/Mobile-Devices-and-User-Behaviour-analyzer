export interface UserData {
  "User ID": string
  "Device Model": string
  "Operating System": string
  "App Usage Time (min/day)": string
  "Screen On Time (hours/day)": string
  "Battery Drain (mAh/day)": string
  "Number of Apps Installed": string
  "Data Usage (MB/day)": string
  Age: string
  Gender: string
  "User Behavior Class": string
}

export async function fetchUserData(): Promise<UserData[]> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/user_behavior_dataset-LncQBozOLyS4WsQVsdBCzgPu01K4xY.csv",
    )
    const csvText = await response.text()

    // Parse CSV
    const lines = csvText.split("\n")
    const headers = lines[0].split(",")

    const data: UserData[] = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = lines[i].split(",")
      const user: Record<string, string> = {}

      headers.forEach((header, index) => {
        user[header.trim()] = values[index]?.trim() || ""
      })

      data.push(user as UserData)
    }

    return data
  } catch (error) {
    console.error("Error fetching user data:", error)
    return []
  }
}
