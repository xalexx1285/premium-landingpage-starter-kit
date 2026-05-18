export function ProgressiveBlur({ position = "top" }: { position?: "top" | "bottom" }) {
  return <div aria-hidden="true" className={`progressive-blur progressive-blur--${position}`} />;
}
