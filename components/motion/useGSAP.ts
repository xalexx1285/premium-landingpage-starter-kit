"use client";

import { useEffect, type RefObject } from "react";
import { gsap, initGSAP, ScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotion } from "./useReducedMotion";

type GSAPContextCallback<T extends HTMLElement> = (context: {
  element: T;
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  reducedMotion: false;
}) => void | (() => void);

export function useGSAP<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: GSAPContextCallback<T>,
  dependencies: readonly unknown[] = [],
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;

    if (!element || reducedMotion || !initGSAP()) {
      return;
    }

    const before = ScrollTrigger.getAll();
    const ctx = gsap.context(() => callback({ element, gsap, ScrollTrigger, reducedMotion: false }), element);

    return () => {
      ctx.revert();
      const created = ScrollTrigger.getAll().filter((trigger) => !before.includes(trigger));
      created.forEach((trigger) => trigger.kill());
    };
  }, [ref, reducedMotion, ...dependencies]);

  return { reducedMotion };
}
