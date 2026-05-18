import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Story } from "@/components/sections/Story";
import { ProgressiveBlur } from "@/components/surface/ProgressiveBlur";
import { site } from "@/lib/content/site";

export default function Page() {
  return (
    <main>
      <ProgressiveBlur position="top" />
      <Hero content={site.hero} proof={site.proof} />
      <Story content={site.story} />
      <Pricing content={site.pricing} />
      <FAQ items={site.faq} />
      <FinalCTA content={site.finalCta} />
    </main>
  );
}
