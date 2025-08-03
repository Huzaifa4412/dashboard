export function formatDuration(seconds: string | number): string {
  const totalSeconds = typeof seconds === "string" ? Number.parseInt(seconds) / 1000 : seconds / 1000

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${minutes} : ${secs.toString().padStart(2, "0")}`
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function calculateTotalDuration(calls: any[]): string {
  const totalSeconds = calls.reduce((sum, call) => {
    const durationMs = typeof call.duration === "string" ? Number.parseInt(call.duration) : call.duration
    return sum + Math.floor(durationMs / 1000)
  }, 0)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export function parseTranscript(transcript: string) {
  // Parse transcript into chat format
  // Assuming format like "User: Hello\nAgent: Hi there\nUser: I need help"
  const lines = transcript.split("\n").filter((line) => line.trim())
  return lines.map((line, index) => {
    const [speaker, ...messageParts] = line.split(":")
    return {
      id: index,
      speaker: speaker.trim(),
      message: messageParts.join(":").trim(),
      isUser: speaker.toLowerCase().includes("user") || speaker.toLowerCase().includes("caller"),
    }
  })
}
