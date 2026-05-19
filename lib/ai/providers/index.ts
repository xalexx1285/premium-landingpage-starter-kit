import { anthropicProvider } from "./anthropic";
import { mockProvider } from "./mock";
import type { SiteConfigProvider } from "./types";

export function getProvider(): SiteConfigProvider {
  const providerName = process.env.AI_PROVIDER ?? "anthropic";

  if (providerName === "mock") return mockProvider;
  if (providerName === "anthropic") return anthropicProvider;

  throw new Error(`Unknown AI_PROVIDER: "${providerName}". Valid values: "anthropic", "mock".`);
}

export type { SiteConfigProvider };
