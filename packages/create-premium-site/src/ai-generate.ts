import { resolve } from "node:path";
import { writeFileSync } from "node:fs";
import { generateSiteConfig } from "../../../lib/ai/generate-site-config";
import type { SiteConfig } from "../../../lib/content/site.schema";
import { applyAnswersToConfig } from "./configure";
import type { UserAnswers } from "./questions";
import { logger } from "./logger";

function siteConfigToTs(siteConfig: SiteConfig): string {
  return `import type { SiteConfig } from "./site.schema";\nimport type { ThemeId } from "@/lib/themes";\n\nexport const site: SiteConfig = ${JSON.stringify(siteConfig, null, 2).replace(
    `"${siteConfig.theme}"`,
    `"${siteConfig.theme}" satisfies ThemeId`,
  )};\n`;
}

function hasUsableAnthropicKey(): boolean {
  const key = process.env.ANTHROPIC_API_KEY?.trim();
  return Boolean(key && key !== "sk-ant-...");
}

export async function maybeGenerateAiContent(targetPath: string, answers: UserAnswers): Promise<boolean> {
  if (!answers.generateAiContent) return false;

  if (!hasUsableAnthropicKey()) {
    logger.warning("AI-Generierung übersprungen: ANTHROPIC_API_KEY ist nicht gesetzt. Das Projekt bleibt vollständig nutzbar.");
    return false;
  }

  const businessIdea = `${answers.brandName}: ${answers.industry}. CTA-Art: ${answers.ctaType}. Theme: ${answers.theme}.`;
  logger.step("AI-Inhalte generieren");

  try {
    const generated = await generateSiteConfig(businessIdea);
    const configured = applyAnswersToConfig(generated, answers);
    writeFileSync(resolve(targetPath, "lib/content/site.ts"), siteConfigToTs(configured));
    logger.success("AI-Inhalte wurden in lib/content/site.ts geschrieben.");
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unbekannter AI-Fehler";
    logger.warning(`AI-Generierung fehlgeschlagen und wurde übersprungen: ${message}`);
    return false;
  }
}
