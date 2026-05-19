"use client";

import { useMemo, useState } from "react";
import type { SiteConfig } from "@/lib/content/site.schema";

type GeneratorJsonPreviewProps = {
  json: SiteConfig;
};

export function GeneratorJsonPreview({ json }: GeneratorJsonPreviewProps) {
  const [showJson, setShowJson] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy JSON");
  const formattedJson = useMemo(() => JSON.stringify(json, null, 2), [json]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopyLabel("Copied! ✓");
    } catch {
      setCopyLabel("Copy failed");
    }

    window.setTimeout(() => setCopyLabel("Copy JSON"), 2000);
  }

  return (
    <div className="generator-json-preview">
      <button className="premium-button generator-json-toggle" type="button" onClick={() => setShowJson((current) => !current)}>
        {showJson ? "Hide JSON ▲" : "Show raw JSON ▼"}
      </button>
      {showJson ? (
        <>
          <pre className="generator-json-pre">
            <code>{formattedJson}</code>
          </pre>
          <div className="generator-copy-row">
            <button className="premium-button" type="button" onClick={handleCopy}>
              {copyLabel}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
