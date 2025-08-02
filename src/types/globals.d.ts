export { }

// Create a type for the roles
export type Roles = 'admin' | 'moderator'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}


export interface CallDataResponse {
  data: CallEntry[];
}

export interface CallEntry {
  "Caller ID": string;
  "Caller Name": string;
  "Caller Email": string;
  Transcript: string;
  Summary: string;
  "Call Date": number; // Timestamp (milliseconds)
  "Fitness Goal": string;
  "Call Recording": string; // URL
  "Disconnected By": string;
  "Call Duration": string; // Looks like raw seconds (but string) e.g. "96200/60/60"
  "Call Status": boolean;
  "User Segment": "Positive" | "Neutral" | "Negative" | string;
}