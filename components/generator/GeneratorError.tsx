"use client";

import type { GeneratorError as GeneratorErrorData } from "@/types/generator";

type GeneratorErrorProps = {
  error: GeneratorErrorData;
  onRetry: () => void;
};

export function GeneratorError({ error, onRetry }: GeneratorErrorProps) {
  return (
    <div className="generator-error" role="alert" aria-live="polite">
      <h2 className="generator-error-title">{error.title}</h2>
      <p className="generator-error-message">{error.message}</p>
      {error.hint ? <p className="generator-error-hint">{error.hint}</p> : null}
      <button className="premium-button" type="button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}
