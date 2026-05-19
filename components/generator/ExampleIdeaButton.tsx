"use client";

import { useRef } from "react";

type ExampleIdeaButtonProps = {
  onSelect: (idea: string) => void;
};

const EXAMPLE_IDEAS = [
  "Ein B2B SaaS-Tool für automatisierte Rechnungsstellung für Freelancer",
  "A premium fitness coaching app for busy executives over 40",
  "Ein KI-gestütztes Tool zur automatischen Buchhaltung für Kleinunternehmen",
  "A luxury travel concierge service for high-net-worth individuals",
  "Eine No-Code Plattform für Event-Management und Ticketing",
  "An AI-powered personal finance dashboard for millennials",
];

export function ExampleIdeaButton({ onSelect }: ExampleIdeaButtonProps) {
  const lastIndexRef = useRef<number | null>(null);

  function handleSelect() {
    const availableIndexes = EXAMPLE_IDEAS.map((_, index) => index).filter((index) => index !== lastIndexRef.current);
    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    lastIndexRef.current = randomIndex;
    onSelect(EXAMPLE_IDEAS[randomIndex]);
  }

  return (
    <button className="premium-button" type="button" onClick={handleSelect}>
      Try an example →
    </button>
  );
}
