import type { SiteConfig } from "@/lib/content/site.schema";
import type { ThemeId } from "@/lib/themes";
import type { SiteConfigProvider } from "./types";

const STOP_WORDS = new Set([
  "ein",
  "eine",
  "einen",
  "einer",
  "für",
  "und",
  "oder",
  "der",
  "die",
  "das",
  "mit",
  "von",
  "bei",
  "zu",
  "im",
  "ist",
  "a",
  "an",
  "the",
  "for",
  "and",
  "or",
  "of",
  "to",
  "in",
  "is",
  "as",
  "at",
  "on",
  "with",
]);

function extractBrandName(idea: string): string {
  const word = idea
    .split(/\s+/)
    .map((part) => part.replace(/^[^A-Za-z0-9ÄÖÜäöüß]+|[^A-Za-z0-9ÄÖÜäöüß]+$/g, ""))
    .filter((part) => part.length >= 4)
    .find((part) => !STOP_WORDS.has(part.toLowerCase()));

  if (!word) return "MockBrand";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function selectTheme(idea: string): ThemeId {
  const lower = idea.toLowerCase();

  const themeKeywords: Array<[ThemeId, string[]]> = [
    [
      "industrial-ai",
      [
        "ai",
        "ml",
        "machine learning",
        "automation",
        "enterprise",
        "infrastructure",
        "b2b",
        "data",
        "analytics",
        "infrastruktur",
        "automatisierung",
        "buchhaltung",
        "rechnungsstellung",
      ],
    ],
    ["cyber-saas", ["saas", "developer", "api", "crypto", "blockchain", "dashboard", "software", "tool", "code", "platform", "plattform", "app"]],
    ["minimal-luxury", ["luxury", "premium", "high-end", "coaching", "consulting", "agency", "brand", "fashion", "design", "beratung"]],
    ["clean-startup", ["startup", "fitness", "health", "food", "consumer", "lifestyle", "community", "mobile", "personal"]],
  ];

  for (const [themeId, keywords] of themeKeywords) {
    if (keywords.some((keyword) => lower.includes(keyword))) return themeId;
  }

  return "clean-startup";
}

async function mockGenerateSiteConfig(businessIdea: string): Promise<SiteConfig> {
  if (!businessIdea.trim()) {
    throw new Error("businessIdea is required.");
  }

  const brandName = extractBrandName(businessIdea);
  const theme = selectTheme(businessIdea);

  return {
    theme,
    meta: {
      title: `${brandName} — Premium Solution`,
      description: `${brandName} helps professionals get results faster. Discover the smarter way to work.`,
      ogImage: `https://placehold.co/1200x630/0d1320/f7efe3?text=${encodeURIComponent(brandName)}`,
      ogImageAlt: `${brandName} landing page preview`,
    },
    navbar: {
      logo: brandName,
      cta: { label: "Get Started", href: "#pricing" },
    },
    hero: {
      eyebrow: "⚠ Mock Content · Not for production",
      headline: `${brandName} — Built for results.`,
      subheadline: `Stop wasting time on tools that weren't designed for your workflow. ${brandName} changes how you work.`,
      primaryCta: { label: "Get Started", href: "#pricing" },
      secondaryCta: { label: "See how it works", href: "#story" },
      meta: ["Fast setup", "No lock-in", "Built to scale", "Proven workflow"],
    },
    proof: ["Faster results", "Less overhead", "Happy teams", "Real ROI", "Ship sooner"],
    story: {
      eyebrow: "The Story",
      headline: `Why ${brandName} exists.`,
      body: "Every product is built to solve a real problem. Here's the argument.",
      chapters: [
        {
          kicker: "I · Problem",
          title: "The old way is costing you more than you think.",
          text: `Before ${brandName}, teams relied on scattered tools and manual processes. The hidden cost: time, errors, and missed opportunities.`,
        },
        {
          kicker: "II · Mechanism",
          title: `${brandName} changes the equation.`,
          text: "Instead of patching broken workflows, we redesigned them from scratch. The result is a system that works the way you think.",
        },
        {
          kicker: "III · Proof",
          title: "Results that speak for themselves.",
          text: `Teams using ${brandName} report measurable improvements within the first week. Less friction. More output. Fewer mistakes.`,
        },
        {
          kicker: "IV · Offer",
          title: "Start today. See results this week.",
          text: `${brandName} is available now. Pick a plan, set up in minutes, and start seeing the difference immediately.`,
        },
      ],
    },
    pricing: {
      eyebrow: "Pricing",
      headline: "Simple, honest pricing.",
      body: `${brandName} offers three plans designed for different stages of growth. No hidden fees. No surprises.`,
      plans: [
        {
          name: "Starter",
          description: "For individuals and small teams getting started.",
          price: "$29/mo",
          cta: "Start free trial",
          featured: false,
          features: ["Up to 3 users", "Core features", "Email support"],
        },
        {
          name: "Professional",
          description: `The complete ${brandName} experience for growing teams.`,
          price: "$79/mo",
          cta: "Start free trial",
          featured: true,
          features: ["Unlimited users", "Advanced features", "Priority support", "Custom integrations"],
        },
        {
          name: "Enterprise",
          description: "For large teams with custom requirements.",
          price: "Custom",
          cta: "Contact sales",
          featured: false,
          features: ["Custom SLA", "Dedicated support", "On-premise option"],
        },
      ],
    },
    faq: {
      header: {
        eyebrow: "FAQ",
        headline: "Questions we get a lot.",
        body: `Everything you need to know about ${brandName}.`,
      },
      items: [
        {
          question: `How quickly can I get started with ${brandName}?`,
          answer: "Setup takes under 10 minutes. Most teams are productive on day one.",
        },
        {
          question: "Do I need technical knowledge to use it?",
          answer: `${brandName} is designed for non-technical users. No code required.`,
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes. No lock-in, no cancellation fees. Cancel from your dashboard.",
        },
        {
          question: "Is my data secure?",
          answer: "We use industry-standard encryption and never share your data.",
        },
        {
          question: "Do you offer a free trial?",
          answer: `Yes. Try ${brandName} free for 14 days. No credit card required.`,
        },
        {
          question: "What support is available?",
          answer: "Email support on all plans. Priority support on Professional and above.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Get Started",
      headline: `${brandName} is ready when you are.`,
      body: "Join teams that have already switched to a better workflow. Start your free trial today.",
      primaryCta: { label: "Start free trial", href: "#pricing" },
      secondaryCta: { label: "Talk to sales", href: "#faq" },
    },
    qaChecklist: [
      "Replace mock content with real copy before launch.",
      "Add real proof: testimonials, metrics, case studies.",
      "Replace placeholder ogImage with real preview image.",
      "Review pricing: adjust to match your actual offering.",
      "Expand FAQ with real objections from your audience.",
      "Run npm run lint and npm run build before deploying.",
    ],
  };
}

export const mockProvider: SiteConfigProvider = {
  generateSiteConfig: mockGenerateSiteConfig,
};
