import { type ReactNode } from "react";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "aside";
};

export function PremiumCard({ children, className = "", as: Tag = "div" }: PremiumCardProps) {
  return <Tag className={`premium-card ${className}`}>{children}</Tag>;
}
