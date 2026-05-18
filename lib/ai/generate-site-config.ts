import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import { SITE_CONFIG_JSON_SCHEMA, type SiteConfig } from "../content/site.schema";
import { themes, type ThemeId } from "../themes";

const MODEL = "claude-sonnet-4-20250514";
const THEME_IDS = themes.map((theme) => theme.id);

type PlainRecord = Record<string, unknown>;

function isRecord(value: unknown): value is PlainRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertString(record: PlainRecord, key: string, path: string): void {
  if (typeof record[key] !== "string" || record[key].trim().length === 0) {
    throw new Error(`Invalid SiteConfig: ${path}.${key} must be a non-empty string.`);
  }
}

function assertBoolean(record: PlainRecord, key: string, path: string): void {
  if (typeof record[key] !== "boolean") {
    throw new Error(`Invalid SiteConfig: ${path}.${key} must be a boolean.`);
  }
}

function assertStringArray(value: unknown, path: string, minItems: number): void {
  if (!Array.isArray(value) || value.length < minItems || value.some((item) => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`Invalid SiteConfig: ${path} must contain at least ${minItems} non-empty strings.`);
  }
}

function assertCta(value: unknown, path: string): void {
  if (!isRecord(value)) throw new Error(`Invalid SiteConfig: ${path} must be an object.`);
  assertString(value, "label", path);
  assertString(value, "href", path);
}

function assertHeader(value: unknown, path: string): void {
  if (!isRecord(value)) throw new Error(`Invalid SiteConfig: ${path} must be an object.`);
  assertString(value, "eyebrow", path);
  assertString(value, "headline", path);
  assertString(value, "body", path);
}

function assertSiteConfig(value: unknown): asserts value is SiteConfig {
  if (!isRecord(value)) throw new Error("Invalid SiteConfig: root must be an object.");

  if (!THEME_IDS.includes(value.theme as ThemeId)) {
    throw new Error(`Invalid SiteConfig: theme must be one of ${THEME_IDS.join(", ")}.`);
  }

  if (!isRecord(value.meta)) throw new Error("Invalid SiteConfig: meta must be an object.");
  assertString(value.meta, "title", "meta");
  assertString(value.meta, "description", "meta");
  assertString(value.meta, "ogImage", "meta");
  assertString(value.meta, "ogImageAlt", "meta");

  if (!isRecord(value.navbar)) throw new Error("Invalid SiteConfig: navbar must be an object.");
  assertString(value.navbar, "logo", "navbar");
  assertCta(value.navbar.cta, "navbar.cta");

  if (!isRecord(value.hero)) throw new Error("Invalid SiteConfig: hero must be an object.");
  assertString(value.hero, "eyebrow", "hero");
  assertString(value.hero, "headline", "hero");
  assertString(value.hero, "subheadline", "hero");
  assertCta(value.hero.primaryCta, "hero.primaryCta");
  assertCta(value.hero.secondaryCta, "hero.secondaryCta");
  assertStringArray(value.hero.meta, "hero.meta", 4);

  assertStringArray(value.proof, "proof", 5);

  if (!isRecord(value.story)) throw new Error("Invalid SiteConfig: story must be an object.");
  assertString(value.story, "eyebrow", "story");
  assertString(value.story, "headline", "story");
  assertString(value.story, "body", "story");
  if (!Array.isArray(value.story.chapters) || value.story.chapters.length < 4) {
    throw new Error("Invalid SiteConfig: story.chapters must contain at least 4 chapters.");
  }
  value.story.chapters.forEach((chapter, index) => {
    if (!isRecord(chapter)) throw new Error(`Invalid SiteConfig: story.chapters[${index}] must be an object.`);
    assertString(chapter, "kicker", `story.chapters[${index}]`);
    assertString(chapter, "title", `story.chapters[${index}]`);
    assertString(chapter, "text", `story.chapters[${index}]`);
  });

  if (!isRecord(value.pricing)) throw new Error("Invalid SiteConfig: pricing must be an object.");
  assertString(value.pricing, "eyebrow", "pricing");
  assertString(value.pricing, "headline", "pricing");
  assertString(value.pricing, "body", "pricing");
  if (!Array.isArray(value.pricing.plans) || value.pricing.plans.length !== 3) {
    throw new Error("Invalid SiteConfig: pricing.plans must contain exactly 3 plans.");
  }
  value.pricing.plans.forEach((plan, index) => {
    if (!isRecord(plan)) throw new Error(`Invalid SiteConfig: pricing.plans[${index}] must be an object.`);
    assertString(plan, "name", `pricing.plans[${index}]`);
    assertString(plan, "description", `pricing.plans[${index}]`);
    assertString(plan, "price", `pricing.plans[${index}]`);
    assertString(plan, "cta", `pricing.plans[${index}]`);
    assertBoolean(plan, "featured", `pricing.plans[${index}]`);
    assertStringArray(plan.features, `pricing.plans[${index}].features`, 3);
  });

  if (!isRecord(value.faq)) throw new Error("Invalid SiteConfig: faq must be an object.");
  assertHeader(value.faq.header, "faq.header");
  if (!Array.isArray(value.faq.items) || value.faq.items.length < 6) {
    throw new Error("Invalid SiteConfig: faq.items must contain at least 6 questions.");
  }
  value.faq.items.forEach((item, index) => {
    if (!isRecord(item)) throw new Error(`Invalid SiteConfig: faq.items[${index}] must be an object.`);
    assertString(item, "question", `faq.items[${index}]`);
    assertString(item, "answer", `faq.items[${index}]`);
  });

  if (!isRecord(value.finalCta)) throw new Error("Invalid SiteConfig: finalCta must be an object.");
  assertString(value.finalCta, "eyebrow", "finalCta");
  assertString(value.finalCta, "headline", "finalCta");
  assertString(value.finalCta, "body", "finalCta");
  assertCta(value.finalCta.primaryCta, "finalCta.primaryCta");
  assertCta(value.finalCta.secondaryCta, "finalCta.secondaryCta");

  assertStringArray(value.qaChecklist, "qaChecklist", 6);
}

function extractJson(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;

  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new Error("Claude response did not contain a JSON object.");
  }
  return trimmed.slice(first, last + 1);
}

function parseSiteConfig(raw: string): SiteConfig {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJson(raw));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown JSON parse error";
    throw new Error(`Could not parse Claude response as JSON: ${message}`);
  }

  assertSiteConfig(parsed);
  return parsed;
}

function buildSystemPrompt(): string {
  return `You are a senior conversion strategist and premium landing page copywriter.
Generate a complete landing page configuration for this TypeScript SiteConfig shape.

Available theme ids:
${THEME_IDS.map((id) => `- ${id}`).join("\n")}

Choose the best theme for the business idea:
- industrial-ai: dark metallic systems, AI infrastructure, enterprise tooling
- minimal-luxury: elegant, editorial, premium services, luxury or high-ticket offers
- cyber-saas: neon, high-contrast, developer tools, crypto, data, futuristic SaaS
- clean-startup: fresh, friendly, accessible startup/SaaS products

Return only valid JSON. No markdown. No explanation. No preamble.
The JSON must match this schema exactly and include no extra keys:
${JSON.stringify(SITE_CONFIG_JSON_SCHEMA, null, 2)}

Content requirements:
- Hero: eyebrow, headline, subheadline, two CTAs, and at least four proof chips.
- Story: four chapters named around Problem, Mechanism, Proof, Offer.
- Pricing: exactly three plans with features and prices.
- FAQ: at least six questions with practical answers.
- Final CTA: headline, body, and CTA pair.
- SEO metadata: title, description, ogImage, ogImageAlt.
- Use concise, specific, high-conversion language.
- Keep href values as anchors such as #pricing, #story, #faq, #top, or /waitlist.`;
}

function userPromptFor(businessIdea: string, repairInstruction?: string): string {
  return `Business idea:\n${businessIdea.trim()}\n\n${repairInstruction ?? "Generate the complete SiteConfig JSON now."}`;
}

async function requestConfig(client: Anthropic, messages: MessageParam[]): Promise<string> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 5000,
    temperature: 0.45,
    system: buildSystemPrompt(),
    messages,
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  if (!text) throw new Error("Claude returned an empty response.");
  return text;
}

export async function generateSiteConfig(businessIdea: string): Promise<SiteConfig> {
  if (!businessIdea.trim()) {
    throw new Error("Business idea is required.");
  }

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.trim() === "sk-ant-...") {
    throw new Error("ANTHROPIC_API_KEY is not set. Add it to .env.local or your deployment environment.");
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const messages: MessageParam[] = [{ role: "user", content: userPromptFor(businessIdea) }];

  try {
    const first = await requestConfig(client, messages);
    return parseSiteConfig(first);
  } catch (firstError) {
    const firstMessage = firstError instanceof Error ? firstError.message : "Unknown generation error";
    const repairMessages: MessageParam[] = [
      ...messages,
      {
        role: "assistant",
        content: `The previous attempt failed validation: ${firstMessage}`,
      },
      {
        role: "user",
        content: userPromptFor(
          businessIdea,
          "Return corrected JSON only. It must be parseable by JSON.parse and satisfy every required SiteConfig field.",
        ),
      },
    ];

    try {
      const repaired = await requestConfig(client, repairMessages);
      return parseSiteConfig(repaired);
    } catch (secondError) {
      const secondMessage = secondError instanceof Error ? secondError.message : "Unknown generation error";
      throw new Error(`Failed to generate a valid SiteConfig after retry. First error: ${firstMessage}. Retry error: ${secondMessage}`);
    }
  }
}

export { assertSiteConfig };
