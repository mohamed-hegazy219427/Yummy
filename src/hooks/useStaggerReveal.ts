import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface StaggerRevealConfig {
  selector: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  delay?: number;
  y?: number;
  x?: number;
}

/**
 * Reusable GSAP stagger reveal hook.
 * Returns a container ref to attach to the parent element.
 * All children matching `selector` will animate in with a stagger.
 */
export function useStaggerReveal({
  selector,
  duration = 0.6,
  stagger = 0.08,
  ease = "power3.out",
  delay = 0.1,
  y = 50,
  x = 0,
}: StaggerRevealConfig) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll(selector);
      if (elements.length === 0) return;

      gsap.set(elements, { opacity: 0, y, x });
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        stagger,
        ease,
        delay,
      });
    },
    { scope: containerRef, dependencies: [selector] }
  );

  return containerRef;
}
