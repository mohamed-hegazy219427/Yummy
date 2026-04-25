import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ title, highlight, subtitle, className }: PageHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      ".ph-title",
      { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.8 }
    ).fromTo(
      ".ph-subtitle",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.3"
    );
  }, { scope: headerRef });

  return (
    <div ref={headerRef} className={cn("mb-16 space-y-4", className)}>
      <h1 className="ph-title text-5xl md:text-8xl font-black font-serif tracking-tighter leading-tight">
        {title}{" "}
        {highlight && <span className="text-primary block md:inline-block italic">{highlight}</span>}
      </h1>
      {subtitle && (
        <p className="ph-subtitle text-xl md:text-2xl text-base-content/60 max-w-3xl leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
      <div className="ph-subtitle w-24 h-2 bg-primary rounded-full mt-8" />
    </div>
  );
}
