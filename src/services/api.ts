import type { CallDataResponse, CallEntry, ProcessedCallData } from "../types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjb4mCBNxs6UhuHaYIl4eK3Dy3YyfTsgz8nGWCClATNBN0xx8l-1du6uap5FGTheYUOeLVarK4vQ0z6i8fP8p5kCyUpLVNZ75hWsJqtH4fsLJaobOp0RUmfpnG4jguM9yb1bVstGfSg1gonZP_hg1fvVAtTEHBHn58-yaaS4191j0_2vgnpBqh6XX5mATg6txFugIF2V1hDJMRWHvDjsXPPFvzIzAZ-u3aORV7Q3KLl9q9CZU74pUbxy6bXAd486YwFFX0_47UQJzEwOgGNd2CvEiTnEQ&lib=MvBeqelYj74JwcUTN_2isIb5Sp24iYjk_"

export async function fetchCallData(): Promise<ProcessedCallData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: CallDataResponse = await response.json()

    // Transform the data to match our internal structure
    return result.data.map((call: CallEntry) => ({
      id: call["Caller ID"],
      name: call["Caller Name"],
      email: call["Caller Email"],
      transcript: call.Transcript,
      summary: call.Summary,
      date: call["Call Date"],
      fitnessGoal: call["Fitness Goal"],
      recording: call["Call Recording"],
      disconnectedBy: call["Disconnected By"],
      duration: call["Call Duration"],
      status: call["Call Status"],
      segment: call["User Segment"],
    }))
  } catch (error) {
    console.error("Failed to fetch call data:", error)
    throw error
  }
}
