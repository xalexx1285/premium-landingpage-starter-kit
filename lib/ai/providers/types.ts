import type { SiteConfig } from "@/lib/content/site.schema";

export interface SiteConfigProvider {
  generateSiteConfig(businessIdea: string): Promise<SiteConfig>;
}
