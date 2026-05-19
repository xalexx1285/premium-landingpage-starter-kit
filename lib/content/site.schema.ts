import type { ThemeId } from "../themes";

/** A link-style call to action used across hero, nav, and final CTA sections. */
export interface CtaConfig {
  /** Visible button/link label. */
  label: string;
  /** Anchor, relative URL, or absolute URL destination. */
  href: string;
}

/** SEO and social preview metadata for the landing page. */
export interface SiteMetaConfig {
  /** Browser title and default Open Graph title. */
  title: string;
  /** Search/social description for the landing page. */
  description: string;
  /** Absolute Open Graph image URL. */
  ogImage: string;
  /** Accessible alt text for the Open Graph image. */
  ogImageAlt: string;
}

/** Top navigation content. */
export interface NavbarConfig {
  /** Text logo or brand label. */
  logo: string;
  /** Navigation-level primary CTA. */
  cta: CtaConfig;
}

/** Footer navigation link. */
export interface FooterLinkConfig {
  /** Visible footer link label. */
  label: string;
  /** Anchor, relative URL, or absolute URL destination. */
  href: string;
}

/** Footer content rendered below all pages. */
export interface FooterConfig {
  /** Footer brand label. */
  brand: string;
  /** Optional short positioning line. */
  tagline?: string;
  /** Legal and utility links. */
  links: readonly FooterLinkConfig[];
  /** Copyright or legal line. */
  legal: string;
}

/** Hero section content and primary conversion copy. */
export interface HeroConfig {
  /** Small label above the main headline. */
  eyebrow: string;
  /** Primary above-the-fold headline. */
  headline: string;
  /** Supporting hero copy. */
  subheadline: string;
  /** Main hero CTA. */
  primaryCta: CtaConfig;
  /** Secondary hero CTA. */
  secondaryCta: CtaConfig;
  /** Short proof/feature chips rendered inside the hero. */
  meta: string[];
  /** Optional visual media replacing the default CSS orb. */
  media?: {
    type: "image" | "video";
    src: string;
    alt?: string;
    /** Poster image used for video media. */
    poster?: string;
  };
}

/** One chapter in the scroll-story section. */
export interface StoryChapterConfig {
  /** Chapter label, e.g. Problem, Mechanism, Proof, Offer. */
  kicker: string;
  /** Chapter headline. */
  title: string;
  /** Chapter body copy. */
  text: string;
}

/** Cinematic story section content. */
export interface StoryConfig {
  /** Small section label. */
  eyebrow: string;
  /** Section headline. */
  headline: string;
  /** Introductory body copy. */
  body: string;
  /** Ordered narrative chapters. */
  chapters: StoryChapterConfig[];
}

/** One pricing plan. */
export interface PricingPlanConfig {
  /** Plan name. */
  name: string;
  /** Short plan positioning copy. */
  description: string;
  /** Display price. */
  price: string;
  /** CTA label for this plan. */
  cta: string;
  /** Whether the plan should be visually featured. */
  featured: boolean;
  /** Included features or outcomes. */
  features: string[];
}

/** Pricing section content. */
export interface PricingConfig {
  /** Small section label. */
  eyebrow: string;
  /** Pricing headline. */
  headline: string;
  /** Pricing explanation copy. */
  body: string;
  /** Pricing plans, usually three. */
  plans: PricingPlanConfig[];
}

/** Shared section header used by FAQ. */
export interface SectionHeaderConfig {
  /** Small section label. */
  eyebrow: string;
  /** Section headline. */
  headline: string;
  /** Supporting section copy. */
  body: string;
}

/** One FAQ item. */
export interface FaqItemConfig {
  /** Visitor question or objection. */
  question: string;
  /** Direct answer that reduces uncertainty. */
  answer: string;
}

/** FAQ section content. */
export interface FaqConfig {
  /** FAQ section header. */
  header: SectionHeaderConfig;
  /** FAQ items; generated configs should include at least six. */
  items: FaqItemConfig[];
}

/** Final conversion section content. */
export interface FinalCtaConfig {
  /** Small section label. */
  eyebrow: string;
  /** Final conversion headline. */
  headline: string;
  /** Supporting final CTA copy. */
  body: string;
  /** Primary final CTA. */
  primaryCta: CtaConfig;
  /** Secondary final CTA. */
  secondaryCta: CtaConfig;
}

/** Complete landing page content and visual configuration. */
export interface SiteConfig {
  /** Active visual theme id. */
  theme: ThemeId;
  /** SEO and Open Graph metadata. */
  meta: SiteMetaConfig;
  /** Navigation content. */
  navbar: NavbarConfig;
  /** Footer content. */
  footer: FooterConfig;
  /** Hero section content. */
  hero: HeroConfig;
  /** Short proof/section chips shown in the hero visual. */
  proof: string[];
  /** Story section content. */
  story: StoryConfig;
  /** Pricing section content. */
  pricing: PricingConfig;
  /** FAQ section content. */
  faq: FaqConfig;
  /** Final CTA section content. */
  finalCta: FinalCtaConfig;
  /** Delivery QA checklist rendered in the final CTA. */
  qaChecklist: string[];
}

export const SITE_CONFIG_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["theme", "meta", "navbar", "footer", "hero", "proof", "story", "pricing", "faq", "finalCta", "qaChecklist"],
  properties: {
    theme: { type: "string", enum: ["industrial-ai", "minimal-luxury", "cyber-saas", "clean-startup"] },
    meta: {
      type: "object",
      additionalProperties: false,
      required: ["title", "description", "ogImage", "ogImageAlt"],
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        ogImage: { type: "string" },
        ogImageAlt: { type: "string" },
      },
    },
    navbar: {
      type: "object",
      additionalProperties: false,
      required: ["logo", "cta"],
      properties: {
        logo: { type: "string" },
        cta: { $ref: "#/definitions/cta" },
      },
    },
    footer: {
      type: "object",
      additionalProperties: false,
      required: ["brand", "links", "legal"],
      properties: {
        brand: { type: "string" },
        tagline: { type: "string" },
        links: { type: "array", minItems: 3, maxItems: 4, items: { $ref: "#/definitions/footerLink" } },
        legal: { type: "string" },
      },
    },
    hero: {
      type: "object",
      additionalProperties: false,
      required: ["eyebrow", "headline", "subheadline", "primaryCta", "secondaryCta", "meta"],
      properties: {
        eyebrow: { type: "string" },
        headline: { type: "string" },
        subheadline: { type: "string" },
        primaryCta: { $ref: "#/definitions/cta" },
        secondaryCta: { $ref: "#/definitions/cta" },
        meta: { type: "array", minItems: 4, items: { type: "string" } },
        media: { $ref: "#/definitions/heroMedia" },
      },
    },
    proof: { type: "array", minItems: 5, items: { type: "string" } },
    story: {
      type: "object",
      additionalProperties: false,
      required: ["eyebrow", "headline", "body", "chapters"],
      properties: {
        eyebrow: { type: "string" },
        headline: { type: "string" },
        body: { type: "string" },
        chapters: { type: "array", minItems: 4, items: { $ref: "#/definitions/storyChapter" } },
      },
    },
    pricing: {
      type: "object",
      additionalProperties: false,
      required: ["eyebrow", "headline", "body", "plans"],
      properties: {
        eyebrow: { type: "string" },
        headline: { type: "string" },
        body: { type: "string" },
        plans: { type: "array", minItems: 3, maxItems: 3, items: { $ref: "#/definitions/pricingPlan" } },
      },
    },
    faq: {
      type: "object",
      additionalProperties: false,
      required: ["header", "items"],
      properties: {
        header: { $ref: "#/definitions/header" },
        items: { type: "array", minItems: 6, items: { $ref: "#/definitions/faqItem" } },
      },
    },
    finalCta: {
      type: "object",
      additionalProperties: false,
      required: ["eyebrow", "headline", "body", "primaryCta", "secondaryCta"],
      properties: {
        eyebrow: { type: "string" },
        headline: { type: "string" },
        body: { type: "string" },
        primaryCta: { $ref: "#/definitions/cta" },
        secondaryCta: { $ref: "#/definitions/cta" },
      },
    },
    qaChecklist: { type: "array", minItems: 6, items: { type: "string" } },
  },
  definitions: {
    cta: {
      type: "object",
      additionalProperties: false,
      required: ["label", "href"],
      properties: { label: { type: "string" }, href: { type: "string" } },
    },
    footerLink: {
      type: "object",
      additionalProperties: false,
      required: ["label", "href"],
      properties: { label: { type: "string" }, href: { type: "string" } },
    },
    heroMedia: {
      type: "object",
      additionalProperties: false,
      required: ["type", "src"],
      properties: {
        type: { type: "string", enum: ["image", "video"] },
        src: { type: "string" },
        alt: { type: "string" },
        poster: { type: "string" },
      },
    },
    header: {
      type: "object",
      additionalProperties: false,
      required: ["eyebrow", "headline", "body"],
      properties: { eyebrow: { type: "string" }, headline: { type: "string" }, body: { type: "string" } },
    },
    storyChapter: {
      type: "object",
      additionalProperties: false,
      required: ["kicker", "title", "text"],
      properties: { kicker: { type: "string" }, title: { type: "string" }, text: { type: "string" } },
    },
    pricingPlan: {
      type: "object",
      additionalProperties: false,
      required: ["name", "description", "price", "cta", "featured", "features"],
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "string" },
        cta: { type: "string" },
        featured: { type: "boolean" },
        features: { type: "array", minItems: 3, items: { type: "string" } },
      },
    },
    faqItem: {
      type: "object",
      additionalProperties: false,
      required: ["question", "answer"],
      properties: { question: { type: "string" }, answer: { type: "string" } },
    },
  },
} as const;
