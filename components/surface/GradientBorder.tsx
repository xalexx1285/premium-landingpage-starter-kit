import { type ReactNode } from "react";

export function GradientBorder({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`gradient-border ${className}`}>{children}</div>;
}
