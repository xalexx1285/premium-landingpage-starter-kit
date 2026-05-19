import type { SiteConfig } from "./site.schema";
import type { ThemeId } from "@/lib/themes";

export const site: SiteConfig = {
  theme: "industrial-ai" satisfies ThemeId,
  meta: {
    title: "Premium Landing Page Starter Kit",
    description:
      "A reusable premium Next.js landing page template with motion tokens, surface system, QA checklist, and conversion-ready sections.",
    ogImage: "https://premium-landingpage-starter-kit.vercel.app/og-image.jpg",
    ogImageAlt: "Premium landing page starter kit preview with cinematic sections and premium surfaces",
  },
  navbar: {
    logo: "Premium Kit",
    cta: { label: "Template starten", href: "#pricing" },
  },
  footer: {
    brand: "Premium Kit",
    tagline: "Premium landing-page systems for reusable high-polish launches.",
    links: [
      { label: "Impressum", href: "#" },
      { label: "Datenschutz", href: "#" },
      { label: "Kontakt", href: "#" },
    ],
    legal: "© 2026 Premium Kit. All rights reserved.",
  },
  hero: {
    eyebrow: "Premium Next.js Starter Kit · v1.0",
    headline: "Build landing pages that feel intentional.",
    subheadline:
      "A reusable high-polish template with conversion structure, cinematic section rhythm, motion tokens, premium surfaces, responsive behavior, and QA gates.",
    primaryCta: { label: "Start from the template", href: "#pricing" },
    secondaryCta: { label: "View the story system", href: "#story" },
    meta: ["Motion tokens", "Surface system", "Reduced motion", "QA ready"],
  },
  proof: ["Hero", "Story", "Pricing", "FAQ", "Final CTA"],
  story: {
    eyebrow: "Cinematic Scroll Story",
    headline: "Turn the page into a guided argument, not a stack of sections.",
    body:
      "This template uses chaptered storytelling inspired by premium editorial sites, then translates it into a product-ready conversion flow.",
    chapters: [
      {
        kicker: "I · Problem",
        title: "Name the friction before showing features.",
        text: "The page first gives the visitor a sharp frame for the pain, so the offer feels relevant instead of decorative.",
      },
      {
        kicker: "II · Mechanism",
        title: "Explain why the solution works.",
        text: "Feature blocks are replaced by a mechanism narrative: what changes, why it matters, and what the user can now do.",
      },
      {
        kicker: "III · Proof",
        title: "Bring trust into the decision path.",
        text: "Proof belongs before the user gets skeptical. Use real customer outcomes, metrics, quotes, or product evidence.",
      },
      {
        kicker: "IV · Offer",
        title: "Make the CTA feel inevitable.",
        text: "Pricing and FAQ reduce uncertainty so the final CTA becomes a logical next step, not a hard sell.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    headline: "Pricing should reduce uncertainty.",
    body:
      "Use the pricing section to clarify scope, decision criteria, and risk reversal. The featured plan is visually elevated but not visually loud.",
    plans: [
      {
        name: "Start",
        description: "For a focused launch page or waitlist page.",
        price: "€4k",
        cta: "Scope prüfen",
        featured: false,
        features: ["Hero + four core sections", "Responsive implementation", "Basic visual QA"],
      },
      {
        name: "Premium",
        description: "For a brand-defining product landing page.",
        price: "€9k",
        cta: "Premium Sprint buchen",
        featured: true,
        features: ["Strategy + reference deconstruction", "Motion and surface system", "Full QA checklist"],
      },
      {
        name: "Signature",
        description: "For cinematic campaigns and deeper storytelling.",
        price: "Custom",
        cta: "Creative Fit klären",
        featured: false,
        features: ["Scroll-story architecture", "Optional 3D/WebGL direction", "Advanced polish pass"],
      },
    ],
  },
  faq: {
    header: {
      eyebrow: "FAQ + QA",
      headline: "Reusable does not mean generic.",
      body: "The FAQ is where uncertainty gets removed. The QA checklist is where premium quality becomes repeatable.",
    },
    items: [
      {
        question: "Ist das Template schon produktionsbereit?",
        answer:
          "Version 1.0 ist ein sauberer Starter: strukturierte Komponenten, Tokens, reduced-motion support und QA-Checkliste. Für ein reales Projekt werden Inhalte, Proof, Branding und finale QA angepasst.",
      },
      {
        question: "Warum keine schwere GSAP-Integration in v1.0?",
        answer:
          "Das Starter-Kit legt zuerst robuste Motion-Tokens und progressive CSS/IntersectionObserver-Reveals an. GSAP/Lenis kann gezielt ergänzt werden, sobald ein echtes Scroll-Story-Konzept steht.",
      },
      {
        question: "Wie bleibt das Design wiederverwendbar?",
        answer:
          "Content liegt zentral in lib/content/site.ts, Motion-Werte in lib/motion/tokens.ts, Premium-Surfaces in components/surface und Section-Logik in components/sections.",
      },
      {
        question: "Welche QA ist vor Auslieferung Pflicht?",
        answer:
          "Desktop/mobile responsive checks, reduced-motion, console/build/lint, CTA-Klarheit, echte Proof-Elemente, Accessibility-Kontrast und Performance-Budget.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Final CTA",
    headline: "Use this as the foundation for premium page builds.",
    body:
      "Replace the placeholder offer, add real proof, tune the tokens, then run the QA checklist before shipping.",
    primaryCta: { label: "Template anpassen", href: "#top" },
    secondaryCta: { label: "QA Checkliste lesen", href: "#qa" },
  },
  qaChecklist: [
    "Audience, offer, CTA, proof, and objections are explicit.",
    "Section order creates a clear conversion argument.",
    "Motion respects prefers-reduced-motion and uses consistent tokens.",
    "Surface hierarchy is intentional: not every card gets equal emphasis.",
    "Mobile spacing, typography, CTAs, and pricing cards are manually checked.",
    "npm run build and npm run lint pass before delivery.",
  ],
};
