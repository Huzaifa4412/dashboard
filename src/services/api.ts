import type { CallDataResponse, CallEntry, ProcessedCallData } from "../types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgUnh3PITsfwVifZ5Xyhj8xR_0lfUBStLR-Gm2wyJTMeF94xtsAcyycWAA4FKdEkR7AmtUnIE3QXynTtb_Z071bMjGPXwH-_3LGvEVelICs-A7CJIvFmioSXEwC_oe8vyrRA2GasqOS-ng5NZHbe8TUvuxG-Su3mn4sUBJYzcfSuNdCF6gmJuswoVnNiVvfvYJfVGJrraVCCh4DGhjWZUbB76bgP7IIym86mjoy3dfQLxL5f2sMmpdoJSvYX8KqT4uRQ9IRTOyMjgW9fbcw2IKrXVDyIll7jJ9iAgQ5&lib=MeV5S9pyOlPbhncapkNh6FVHPcoHe_pe8"

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
