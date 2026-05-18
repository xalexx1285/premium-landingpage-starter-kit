import { cleanStartupTheme } from "./clean-startup";
import { cyberSaasTheme } from "./cyber-saas";
import { industrialAITheme } from "./industrial-ai";
import { minimalLuxuryTheme } from "./minimal-luxury";

export type ThemeId = "industrial-ai" | "minimal-luxury" | "cyber-saas" | "clean-startup";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  colors: Record<string, string>;
  surfaces: Record<string, string>;
  motion: {
    signatureVariant: string;
    easeHero: string;
    easeScroll: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
}

export const themes = [industrialAITheme, minimalLuxuryTheme, cyberSaasTheme, cleanStartupTheme] as const;

export const defaultTheme = industrialAITheme;

export function getThemeById(id: string | undefined): ThemeConfig {
  return themes.find((theme) => theme.id === id) ?? defaultTheme;
}

export function themeToCssProperties(theme: ThemeConfig): Record<string, string> {
  return {
    ...theme.colors,
    ...theme.surfaces,
    "--font-heading": theme.typography.headingFont,
    "--font-body-theme": theme.typography.bodyFont,
    "--ease-premium": theme.motion.easeHero === "expo.out" ? "cubic-bezier(0.16, 1, 0.3, 1)" : "cubic-bezier(0.16, 1, 0.3, 1)",
  };
}
