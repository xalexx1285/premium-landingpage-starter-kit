import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateSiteConfig } from "../lib/ai/generate-site-config";

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;

  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const rawValue = trimmed.slice(index + 1).trim();
    const uncommentedValue = rawValue.replace(/\s+#.*$/, "");
    const value = uncommentedValue.replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

async function getBusinessIdea(): Promise<string> {
  const cliIdea = process.argv.slice(2).join(" ").trim();
  if (cliIdea) return cliIdea;

  const readline = createInterface({ input, output });
  try {
    const answer = await readline.question("Business-Idee: ");
    return answer.trim();
  } finally {
    readline.close();
  }
}

function toTypeScript(siteConfig: unknown): string {
  return `// Automatisch generiert via npm run generate\n// Nicht manuell bearbeiten\n\nimport type { SiteConfig } from "./site.schema";\n\nexport const generatedSite: SiteConfig = ${JSON.stringify(siteConfig, null, 2)};\n`;
}

async function main() {
  loadEnvFile(resolve(process.cwd(), ".env.local"));

  const businessIdea = await getBusinessIdea();
  if (!businessIdea) {
    throw new Error("Bitte eine Business-Idee als Argument oder interaktiv eingeben.");
  }

  console.log("Generating landing page configuration...");
  const siteConfig = await generateSiteConfig(businessIdea);
  const outputPath = resolve(process.cwd(), "lib/content/site.generated.ts");
  writeFileSync(outputPath, toTypeScript(siteConfig));

  console.log(`✅ Generated site config written to ${outputPath}`);
  console.log(`Theme: ${siteConfig.theme}`);
  console.log(`Title: ${siteConfig.meta.title}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown generation error";
  console.error(`❌ ${message}`);
  process.exit(1);
});
