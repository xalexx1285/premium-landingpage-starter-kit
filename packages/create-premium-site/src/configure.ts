import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import type { SiteConfig } from "../../../lib/content/site.schema";
import { site as starterSite } from "../../../lib/content/site";
import type { UserAnswers, CtaType, SectionChoice } from "./questions";
import { logger } from "./logger";

function ctaLabel(type: CtaType): string {
  switch (type) {
    case "waitlist":
      return "Zur Waitlist";
    case "kaufen":
      return "Jetzt kaufen";
    case "demo":
      return "Demo buchen";
    case "kontakt":
      return "Kontakt aufnehmen";
  }
}

function ctaHref(type: CtaType, waitlistMode: boolean): string {
  if (waitlistMode) return "/waitlist";
  switch (type) {
    case "waitlist":
      return "/waitlist";
    case "kaufen":
      return "#pricing";
    case "demo":
      return "#final-cta";
    case "kontakt":
      return "#final-cta";
  }
}

function removeSectionFromPage(page: string, section: Exclude<SectionChoice, "hero">): string {
  const removals: Record<Exclude<SectionChoice, "hero">, Array<[RegExp, string]>> = {
    story: [
      [/^import \{ Story \} from "@\/components\/sections\/Story";\n/m, ""],
      [/^\s*<Story content=\{site\.story\} \/>\n/m, ""],
    ],
    pricing: [
      [/^import \{ Pricing \} from "@\/components\/sections\/Pricing";\n/m, ""],
      [/^\s*<Pricing content=\{site\.pricing\} \/>\n/m, ""],
    ],
    faq: [
      [/^import \{ FAQ \} from "@\/components\/sections\/FAQ";\n/m, ""],
      [/^\s*<FAQ header=\{site\.faq\.header\} items=\{site\.faq\.items\} \/>\n/m, ""],
    ],
    finalCta: [
      [/^import \{ FinalCTA \} from "@\/components\/sections\/FinalCTA";\n/m, ""],
      [/^\s*<FinalCTA content=\{site\.finalCta\} qaChecklist=\{site\.qaChecklist\} \/>\n/m, ""],
    ],
  };

  return removals[section].reduce((updated, [pattern, replacement]) => updated.replace(pattern, replacement), page);
}

function selectedProof(sections: SectionChoice[]): string[] {
  const labels: Record<SectionChoice, string> = {
    hero: "Hero",
    story: "Story",
    pricing: "Pricing",
    faq: "FAQ",
    finalCta: "Final CTA",
  };
  return sections.map((section) => labels[section]);
}

export function applyAnswersToConfig(site: SiteConfig, answers: UserAnswers): SiteConfig {
  const label = ctaLabel(answers.ctaType);
  const href = ctaHref(answers.ctaType, answers.waitlistMode);
  const brand = answers.brandName;

  return {
    ...site,
    theme: answers.theme,
    meta: {
      ...site.meta,
      title: `${brand} — Premium Landing Page`,
      description: `${brand} ist eine premium Landingpage für ${answers.industry} mit klarer Conversion-Struktur und ${label}-CTA.`,
      ogImageAlt: `${brand} Landingpage Preview`,
    },
    navbar: {
      ...site.navbar,
      logo: brand,
      cta: { label, href },
    },
    hero: {
      ...site.hero,
      eyebrow: `${answers.industry} · ${brand}`,
      headline: `${brand} macht ${answers.industry} klar, schnell und conversion-ready.`,
      subheadline: `Eine premium Landingpage für ${answers.industry}, vorkonfiguriert mit Theme, Motion, Sections und sauberer Deployment-Basis.`,
      primaryCta: { label, href },
      secondaryCta: { label: "Mehr erfahren", href: answers.sections.includes("story") ? "#story" : "#final-cta" },
    },
    proof: selectedProof(answers.sections),
    pricing: {
      ...site.pricing,
      headline: `${brand} Pakete für klare Entscheidungen.`,
      body: `Wähle den passenden Einstieg für ${answers.industry}. Jede Option ist auf schnelle Validierung und hochwertige Ausführung optimiert.`,
      plans: site.pricing.plans.map((plan) => ({ ...plan, cta: label })),
    },
    finalCta: {
      ...site.finalCta,
      headline: `${brand} jetzt als Premium Landingpage starten.`,
      body: `Nutze dieses Projekt als hochwertige Basis für ${answers.industry}: Inhalte anpassen, Proof ergänzen, QA durchlaufen und deployen.`,
      primaryCta: { label, href },
      secondaryCta: { label: "Zurück nach oben", href: "#top" },
    },
  };
}

function siteConfigToTs(siteConfig: SiteConfig): string {
  return `import type { SiteConfig } from "./site.schema";\nimport type { ThemeId } from "@/lib/themes";\n\nexport const site: SiteConfig = ${JSON.stringify(siteConfig, null, 2).replace(
    `"${siteConfig.theme}"`,
    `"${siteConfig.theme}" satisfies ThemeId`,
  )};\n`;
}

export async function configureProject(targetPath: string, answers: UserAnswers): Promise<void> {
  const sitePath = resolve(targetPath, "lib/content/site.ts");
  const pagePath = resolve(targetPath, "app/page.tsx");

  const configuredSite = applyAnswersToConfig(starterSite, answers);
  writeFileSync(sitePath, siteConfigToTs(configuredSite));

  let page = readFileSync(pagePath, "utf8");
  for (const section of ["story", "pricing", "faq", "finalCta"] as const) {
    if (!answers.sections.includes(section)) {
      page = removeSectionFromPage(page, section);
    }
  }
  writeFileSync(pagePath, page);

  if (!answers.pricingEnabled) logger.info("Pricing wurde deaktiviert und aus app/page.tsx entfernt.");
  if (!answers.faqEnabled) logger.info("FAQ wurde deaktiviert und aus app/page.tsx entfernt.");
  if (answers.waitlistMode) logger.warning("Waitlist-Modus aktiv: CTA-Link zeigt auf /waitlist. Ergänze dort bei Bedarf ein Formular.");
}

export function runCommand(command: string, args: string[], cwd: string): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolveCommand) => {
    const child = spawn(command, args, { cwd, shell: false, stdio: ["ignore", "pipe", "pipe"] });
    let output = "";

    child.stdout.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      output += text;
      process.stdout.write(text);
    });

    child.stderr.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      output += text;
      process.stderr.write(text);
    });

    child.on("close", (code) => resolveCommand({ ok: code === 0, output }));
  });
}
