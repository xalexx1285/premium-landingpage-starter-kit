import prompts from "prompts";

export type ThemeChoice = "industrial-ai" | "minimal-luxury" | "cyber-saas" | "clean-startup";
export type SectionChoice = "hero" | "story" | "pricing" | "faq" | "finalCta";
export type CtaType = "waitlist" | "kaufen" | "demo" | "kontakt";

export interface UserAnswers {
  projectName: string;
  brandName: string;
  industry: string;
  theme: ThemeChoice;
  sections: SectionChoice[];
  pricingEnabled: boolean;
  faqEnabled: boolean;
  ctaType: CtaType;
  waitlistMode: boolean;
  generateAiContent: boolean;
  overwriteExisting: boolean;
}

const themeChoices = [
  { title: "industrial-ai", value: "industrial-ai" },
  { title: "minimal-luxury", value: "minimal-luxury" },
  { title: "cyber-saas", value: "cyber-saas" },
  { title: "clean-startup", value: "clean-startup" },
];

const sectionChoices = [
  { title: "Hero (immer aktiv)", value: "hero", selected: true, disabled: true },
  { title: "Story", value: "story", selected: true },
  { title: "Pricing", value: "pricing", selected: true },
  { title: "FAQ", value: "faq", selected: true },
  { title: "Final CTA", value: "finalCta", selected: true },
];

const ctaChoices = [
  { title: "waitlist", value: "waitlist" },
  { title: "kaufen", value: "kaufen" },
  { title: "demo", value: "demo" },
  { title: "kontakt", value: "kontakt" },
];

function slugifyProjectName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function askQuestions(): Promise<UserAnswers> {
  if (process.env.CREATE_PREMIUM_SITE_TEST_ANSWERS) {
    const parsed = JSON.parse(process.env.CREATE_PREMIUM_SITE_TEST_ANSWERS) as UserAnswers;
    const selectedSections = new Set<SectionChoice>(parsed.sections ?? []);
    selectedSections.add("hero");
    if (!parsed.pricingEnabled) selectedSections.delete("pricing");
    if (!parsed.faqEnabled) selectedSections.delete("faq");
    return { ...parsed, projectName: slugifyProjectName(parsed.projectName), sections: Array.from(selectedSections), overwriteExisting: false };
  }

  const answers = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: "Projektname",
        initial: "my-premium-site",
        format: slugifyProjectName,
        validate: (value: string) => slugifyProjectName(value).length > 0 || "Bitte einen gültigen Projektnamen eingeben.",
      },
      {
        type: "text",
        name: "brandName",
        message: "Markenname",
        initial: "Premium Brand",
        validate: (value: string) => value.trim().length > 0 || "Bitte einen Markennamen eingeben.",
      },
      {
        type: "text",
        name: "industry",
        message: "Branche/Nische",
        initial: "B2B SaaS",
        validate: (value: string) => value.trim().length > 0 || "Bitte eine Branche oder Nische eingeben.",
      },
      {
        type: "select",
        name: "theme",
        message: "Theme",
        choices: themeChoices,
        initial: 0,
      },
      {
        type: "multiselect",
        name: "sections",
        message: "Sections aktivieren",
        choices: sectionChoices,
        min: 1,
      },
      {
        type: "confirm",
        name: "pricingEnabled",
        message: "Pricing aktivieren?",
        initial: true,
      },
      {
        type: "confirm",
        name: "faqEnabled",
        message: "FAQ aktivieren?",
        initial: true,
      },
      {
        type: "select",
        name: "ctaType",
        message: "CTA-Art",
        choices: ctaChoices,
        initial: 2,
      },
      {
        type: "confirm",
        name: "waitlistMode",
        message: "Waitlist-Modus?",
        initial: false,
      },
      {
        type: "confirm",
        name: "generateAiContent",
        message: "AI-Inhalte generieren?",
        initial: false,
      },
    ],
    {
      onCancel: () => {
        throw new Error("CLI wurde abgebrochen.");
      },
    },
  );

  const selectedSections = new Set<SectionChoice>(answers.sections ?? []);
  selectedSections.add("hero");

  if (!answers.pricingEnabled) selectedSections.delete("pricing");
  if (!answers.faqEnabled) selectedSections.delete("faq");

  return {
    projectName: answers.projectName,
    brandName: answers.brandName.trim(),
    industry: answers.industry.trim(),
    theme: answers.theme,
    sections: Array.from(selectedSections),
    pricingEnabled: Boolean(answers.pricingEnabled),
    faqEnabled: Boolean(answers.faqEnabled),
    ctaType: answers.ctaType,
    waitlistMode: Boolean(answers.waitlistMode),
    generateAiContent: Boolean(answers.generateAiContent),
    overwriteExisting: false,
  };
}

export async function confirmOverwrite(targetPath: string): Promise<boolean> {
  const answer = await prompts({
    type: "confirm",
    name: "overwrite",
    message: `Zielverzeichnis existiert bereits (${targetPath}). Überschreiben?`,
    initial: false,
  });

  return Boolean(answer.overwrite);
}
