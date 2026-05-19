"use client";

import { useState } from "react";
import type { SiteConfig } from "@/lib/content/site.schema";
import type { GenerateApiResponse, GeneratorError as GeneratorErrorData, GeneratorStatus } from "@/types/generator";
import { ExampleIdeaButton } from "./ExampleIdeaButton";
import { GeneratorError } from "./GeneratorError";
import { GeneratorJsonPreview } from "./GeneratorJsonPreview";
import { GeneratorLoading } from "./GeneratorLoading";
import { GeneratorResult } from "./GeneratorResult";
import { PremiumCard } from "@/components/surface/PremiumCard";

const VALIDATION_ERROR: GeneratorErrorData = {
  type: "VALIDATION",
  title: "Your idea is too short",
  message: "Please describe your business in at least 20 characters.",
};

const NETWORK_ERROR: GeneratorErrorData = {
  type: "NETWORK",
  title: "Connection failed",
  message: "Could not reach the server. Check your internet connection.",
};

const INVALID_RESPONSE_ERROR: GeneratorErrorData = {
  type: "INVALID_RESPONSE",
  title: "Invalid response",
  message: "The server returned an unexpected response. Please try again.",
};

function mapApiError(status: number, serverMessage?: string): GeneratorErrorData {
  if (status === 503) {
    return {
      type: "NO_API_KEY",
      title: "Generator not configured",
      message: "The AI generation API key is not set up on this server.",
      hint: "Ask the site owner to configure the server environment.",
    };
  }

  if (status === 400) {
    return VALIDATION_ERROR;
  }

  if (status === 500 && serverMessage?.toLowerCase().includes("credit")) {
    return {
      type: "INSUFFICIENT_CREDITS",
      title: "API credit balance too low",
      message: "The AI service account has insufficient credits.",
      hint: "Top up the Anthropic account at console.anthropic.com, then try again.",
    };
  }

  if (status === 500) {
    return {
      type: "SERVER_ERROR",
      title: "Generation failed",
      message: serverMessage ?? "Something went wrong on the server.",
    };
  }

  return {
    type: "SERVER_ERROR",
    title: "Unexpected error",
    message: `Server responded with status ${status}.`,
  };
}

export function GeneratorForm() {
  const [status, setStatus] = useState<GeneratorStatus>("idle");
  const [businessIdea, setBusinessIdea] = useState("");
  const [result, setResult] = useState<SiteConfig | null>(null);
  const [error, setError] = useState<GeneratorErrorData | null>(null);

  async function handleGenerate() {
    if (businessIdea.trim().length < 20) {
      setError(VALIDATION_ERROR);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessIdea: businessIdea.trim() }),
      });
      const data: GenerateApiResponse = await response.json();

      if (!response.ok) {
        setError(mapApiError(response.status, data.error));
        setStatus("error");
        return;
      }

      if (!data.siteConfig) {
        setError(INVALID_RESPONSE_ERROR);
        setStatus("error");
        return;
      }

      setResult(data.siteConfig);
      setStatus("success");
    } catch {
      setError(NETWORK_ERROR);
      setStatus("error");
    }
  }

  return (
    <div className="generator-form-wrapper">
      {status !== "success" && (
        <PremiumCard className="generator-form-card">
          <label htmlFor="business-idea-input" className="eyebrow">
            Your Business Idea
          </label>
          <textarea
            id="business-idea-input"
            className="generator-textarea"
            value={businessIdea}
            onChange={(event) => setBusinessIdea(event.target.value)}
            placeholder="Describe your business, product, or service..."
            disabled={status === "loading"}
            maxLength={4000}
            rows={5}
            aria-label="Business idea input"
          />
          <div className="generator-actions">
            <ExampleIdeaButton onSelect={setBusinessIdea} />
            <button
              className="premium-button primary"
              type="button"
              onClick={handleGenerate}
              disabled={status === "loading"}
              aria-busy={status === "loading"}
            >
              {status === "loading" ? "Generating…" : "Generate →"}
            </button>
          </div>
          <p className="generator-hint">Processed server-side · API key stays private · ~8–15 seconds</p>
        </PremiumCard>
      )}

      {status === "loading" && <GeneratorLoading />}

      {status === "error" && error && (
        <GeneratorError
          error={error}
          onRetry={() => {
            setStatus("idle");
            setError(null);
          }}
        />
      )}

      {status === "success" && result && (
        <>
          <div className="generator-success-header">
            <p className="eyebrow">Generation complete</p>
            <button
              className="premium-button"
              type="button"
              onClick={() => {
                setStatus("idle");
                setResult(null);
                setError(null);
              }}
            >
              ← Generate another idea
            </button>
          </div>
          <GeneratorResult result={result} />
          <GeneratorJsonPreview json={result} />
        </>
      )}
    </div>
  );
}
