import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getProvider } from "../lib/ai/providers";

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

function toTypeScript(siteConfig: unknown, isMock = false): string {
  const header = isMock
    ? "// ⚠️  MOCK-GENERATED — Kein echter AI-Output\n// Automatisch generiert via npm run generate:mock\n// Nicht für Production-Copy verwenden"
    : "// Automatisch generiert via npm run generate\n// Nicht manuell bearbeiten";

  return `${header}\n\nimport type { SiteConfig } from "./site.schema";\n\nexport const generatedSite: SiteConfig = ${JSON.stringify(siteConfig, null, 2)};\n`;
}

async function main() {
  loadEnvFile(resolve(process.cwd(), ".env.local"));

  const businessIdea = await getBusinessIdea();
  if (!businessIdea) {
    throw new Error("Bitte eine Business-Idee als Argument oder interaktiv eingeben.");
  }

  const isMock = process.env.AI_PROVIDER === "mock";
  console.log(isMock ? "⚠ Generating mock landing page configuration (no API call)..." : "Generating landing page configuration...");
  const provider = getProvider();
  const siteConfig = await provider.generateSiteConfig(businessIdea);
  const outputPath = resolve(process.cwd(), "lib/content/site.generated.ts");
  writeFileSync(outputPath, toTypeScript(siteConfig, isMock));

  console.log(`✅ Generated site config written to ${outputPath}`);
  console.log(`Theme: ${siteConfig.theme}`);
  console.log(`Title: ${siteConfig.meta.title}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown generation error";
  console.error(`❌ ${message}`);
  process.exit(1);
});
