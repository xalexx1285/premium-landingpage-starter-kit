import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Story } from "@/components/sections/Story";
import { ProgressiveBlur } from "@/components/surface/ProgressiveBlur";
import { site } from "@/lib/content/site";

export default function Page() {
  return (
    <main id="top">
      <ProgressiveBlur position="top" />
      <Hero content={site.hero} proof={site.proof} />
      <Story content={site.story} />
      <Pricing content={site.pricing} />
      <FAQ header={site.faq.header} items={site.faq.items} />
      <FinalCTA content={site.finalCta} qaChecklist={site.qaChecklist} />
    </main>
  );
}
