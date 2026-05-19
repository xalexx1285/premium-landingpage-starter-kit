import type { SiteConfig } from "@/lib/content/site.schema";

export type GeneratorStatus = "idle" | "loading" | "error" | "success";

export type GeneratorErrorType =
  | "VALIDATION"
  | "NO_API_KEY"
  | "INSUFFICIENT_CREDITS"
  | "NETWORK"
  | "INVALID_RESPONSE"
  | "SERVER_ERROR";

export interface GeneratorError {
  type: GeneratorErrorType;
  title: string;
  message: string;
  hint?: string;
}

export interface GenerateApiResponse {
  siteConfig?: SiteConfig;
  error?: string;
}
