import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  routeKey: string;
}

export default function PageTransition({ children, routeKey }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Reset initial state
      gsap.set(containerRef.current, {
        opacity: 0,
        y: 20,
      });

      // Animate in
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all", // Clear styles after animation to avoid layout issues
      });
    },
    { dependencies: [routeKey], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  );
}
