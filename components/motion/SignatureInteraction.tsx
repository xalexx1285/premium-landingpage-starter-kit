"use client";

import { useEffect, useRef } from "react";
import { gsap, initGSAP } from "@/lib/motion/gsap";
import { motionTokens } from "@/lib/motion/tokens";
import { useTheme } from "@/lib/themes/ThemeProvider";
import { useReducedMotion } from "./useReducedMotion";

const SURFACE_SELECTOR = ".premium-card, .chapter, .qa-item, .proof-row li";
const MAGNETIC_SELECTOR = ".premium-button";

function supportsFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function setLocalPointerVars(element: HTMLElement, clientX: number, clientY: number) {
  const rect = element.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;

  element.style.setProperty("--signature-x", `${x.toFixed(2)}%`);
  element.style.setProperty("--signature-y", `${y.toFixed(2)}%`);
}

export function SignatureInteraction({ variant }: { variant?: string } = {}) {
  const auraRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const activeVariant = variant ?? theme.motion.signatureVariant;

  useEffect(() => {
    if (reducedMotion || !supportsFinePointer()) return;

    initGSAP();

    const aura = auraRef.current;
    const moveAuraX = aura ? gsap.quickTo(aura, "x", motionTokens.signature.aura.follow) : null;
    const moveAuraY = aura ? gsap.quickTo(aura, "y", motionTokens.signature.aura.follow) : null;
    const fadeAura = aura ? gsap.quickTo(aura, "autoAlpha", motionTokens.signature.aura.fade) : null;

    let activeSurface: HTMLElement | null = null;
    let activeMagnetic: HTMLElement | null = null;

    const resetMagnetic = (element: HTMLElement) => {
      gsap.to(element, {
        "--magnet-x": "0px",
        "--magnet-y": "0px",
        duration: motionTokens.signature.magnetic.resetDuration,
        ease: motionTokens.signature.ease,
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      moveAuraX?.(event.clientX);
      moveAuraY?.(event.clientY);
      fadeAura?.(1);

      const surface = (event.target as Element | null)?.closest(SURFACE_SELECTOR) as HTMLElement | null;
      if (surface !== activeSurface) {
        activeSurface?.classList.remove("is-signature-active");
        activeSurface = surface;
        activeSurface?.classList.add("is-signature-active");
      }
      if (activeSurface) setLocalPointerVars(activeSurface, event.clientX, event.clientY);

      const magnetic = (event.target as Element | null)?.closest(MAGNETIC_SELECTOR) as HTMLElement | null;
      if (magnetic !== activeMagnetic) {
        if (activeMagnetic) resetMagnetic(activeMagnetic);
        activeMagnetic = magnetic;
      }

      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;

        gsap.to(activeMagnetic, {
          "--magnet-x": `${offsetX * motionTokens.signature.magnetic.strength}px`,
          "--magnet-y": `${offsetY * motionTokens.signature.magnetic.strength}px`,
          duration: motionTokens.signature.magnetic.duration,
          ease: motionTokens.signature.ease,
          overwrite: true,
        });
      }
    };

    const onPointerLeave = () => {
      fadeAura?.(0);
      activeSurface?.classList.remove("is-signature-active");
      activeSurface = null;
      if (activeMagnetic) resetMagnetic(activeMagnetic);
      activeMagnetic = null;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      onPointerLeave();
      gsap.killTweensOf([aura, activeMagnetic].filter(Boolean));
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return <div ref={auraRef} className={`signature-aura signature-aura--${activeVariant}`} aria-hidden="true" />;
}
