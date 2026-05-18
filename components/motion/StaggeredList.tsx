import { type ReactNode } from "react";
import { FadeUp } from "./FadeUp";

export function StaggeredList({ children, className = "" }: { children: ReactNode[]; className?: string }) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeUp key={index} delay={index * 80}>
          {child}
        </FadeUp>
      ))}
    </div>
  );
}
