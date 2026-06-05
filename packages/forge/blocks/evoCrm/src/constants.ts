export const defaultBaseUrl = "https://api.evoai.app";

export const statusValues = ["open", "resolved", "pending"] as const;

export const priorityValues = [
  "urgent",
  "high",
  "medium",
  "low",
  "none",
] as const;

export const searchReturnTypes = ["First", "All"] as const;
