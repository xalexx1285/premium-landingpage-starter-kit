"use client";

export function GeneratorLoading() {
  return (
    <div className="generator-loading" role="status" aria-live="polite">
      <span className="generator-spinner" aria-hidden="true" />
      <div>
        <p className="generator-loading-text">Generating your site config…</p>
        <p className="generator-loading-sub">This usually takes 8–15 seconds.</p>
      </div>
    </div>
  );
}
