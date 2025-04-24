interface PredictionInput {
  deviceModel: string
  operatingSystem: string
  appUsageTime: number
  screenOnTime: number
  batteryDrain: number
  appsInstalled: number
  dataUsage: number
  age: number
  gender: string
}

// This is a mock prediction function that simulates the behavior of the ML model
// In a real application, this would call your backend API
export async function predictUserBehavior(input: PredictionInput): Promise<number> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Simple rule-based classification for demonstration
  // In reality, this would be handled by your trained ML model

  // Convert categorical variables
  const osScore = input.operatingSystem === "iOS" ? 1 : 0
  const genderScore = input.gender === "Male" ? 1 : input.gender === "Female" ? 0 : 0.5

  // Normalize and weight features
  const appUsageNorm = input.appUsageTime / 300 // Normalize to 0-1 range assuming 300 min is high
  const screenTimeNorm = input.screenOnTime / 8 // Normalize assuming 8 hours is high
  const batteryDrainNorm = input.batteryDrain / 2000 // Normalize assuming 2000 mAh is high
  const appsInstalledNorm = input.appsInstalled / 100 // Normalize assuming 100 apps is high
  const dataUsageNorm = input.dataUsage / 2000 // Normalize assuming 2000 MB is high

  // Calculate weighted score
  const score =
    appUsageNorm * 0.3 + screenTimeNorm * 0.25 + batteryDrainNorm * 0.15 + appsInstalledNorm * 0.1 + dataUsageNorm * 0.2

  // Classify based on score
  if (score < 0.3) return 1 // Light user
  if (score < 0.6) return 2 // Moderate user
  if (score < 0.85) return 3 // Heavy user
  return 4 // Power user
}
