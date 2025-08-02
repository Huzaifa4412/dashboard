export interface CallDataResponse {
  data: CallEntry[]
}

export interface CallEntry {
  "Caller ID": string
  "Caller Name": string
  "Caller Email": string
  Transcript: string
  Summary: string
  "Call Date": number // Timestamp (milliseconds)
  "Fitness Goal": string
  "Call Recording": string // URL
  "Disconnected By": string
  "Call Duration": string // Raw seconds (but string)
  "Call Status": boolean
  "User Segment": "Positive" | "Neutral" | "Negative" | string
}

export interface ProcessedCallData {
  id: string
  name: string
  email: string
  transcript: string
  summary: string
  date: number
  fitnessGoal: string
  recording: string
  disconnectedBy: string
  duration: string
  status: boolean
  segment: "Positive" | "Neutral" | "Negative" | string
}
