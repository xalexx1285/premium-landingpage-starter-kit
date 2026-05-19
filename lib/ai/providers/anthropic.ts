import { generateSiteConfig } from "../generate-site-config";
import type { SiteConfigProvider } from "./types";

export const anthropicProvider: SiteConfigProvider = {
  generateSiteConfig,
};
