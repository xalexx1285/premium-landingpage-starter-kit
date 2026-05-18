"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initGSAP() {
  if (typeof window === "undefined") {
    return false;
  }

  if (!initialized) {
    gsap.registerPlugin(ScrollTrigger);
    initialized = true;
  }

  return true;
}

export { gsap, ScrollTrigger };
