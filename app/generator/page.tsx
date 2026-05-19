import { GeneratorForm } from "@/components/generator/GeneratorForm";

export const metadata = {
  title: "AI Generator — Premium Landing Page Starter Kit",
  description: "Turn your business idea into a complete landing page configuration powered by Claude.",
};

export default function GeneratorPage() {
  return (
    <main id="generator-top">
      <section className="section generator-hero">
        <div className="container">
          <p className="eyebrow">AI Content Generator</p>
          <h1 className="headline">
            Turn Your Idea Into a<br />Landing Page
          </h1>
          <p className="lead">
            Describe your business and Claude generates a complete, conversion-ready landing page configuration — hero copy,
            story chapters, pricing, FAQ, and more.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <GeneratorForm />
        </div>
      </section>
    </main>
  );
}
