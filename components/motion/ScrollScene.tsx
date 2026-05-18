"use client";

import { createContext, type ReactNode, useMemo, useRef } from "react";
import { motionTokens } from "@/lib/motion/tokens";
import { useGSAP } from "./useGSAP";

type ScrollSceneContextValue = {
  container: HTMLElement | null;
};

export const ScrollSceneContext = createContext<ScrollSceneContextValue>({ container: null });

type ScrollSceneProps = {
  children: ReactNode;
  pinned?: boolean;
  scrub?: boolean;
  start?: string;
  end?: string;
  markers?: boolean;
  className?: string;
};

export function ScrollScene({
  children,
  pinned = false,
  scrub = true,
  start = "top top",
  end = "+=100%",
  markers = false,
  className = "",
}: ScrollSceneProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(ref, ({ element, gsap, ScrollTrigger }) => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: element,
        start,
        end,
        pin: pinned,
        scrub: scrub ? motionTokens.scrubStrength : false,
        markers: process.env.NODE_ENV === "development" && markers,
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [pinned, scrub, start, end, markers]);

  const contextValue = useMemo(() => ({ container: ref.current }), []);

  return (
    <ScrollSceneContext.Provider value={contextValue}>
      <div ref={ref} className={className}>{children}</div>
    </ScrollSceneContext.Provider>
  );
}
