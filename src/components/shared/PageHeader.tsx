import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface PageHeaderProps {
  title: string;
  highlight: string;
  subtitle: string;
}

export default function PageHeader({ title, highlight, subtitle }: PageHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headerRef.current.querySelector(".page-title"),
        { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.8 }
      )
        .fromTo(
          headerRef.current.querySelector(".page-subtitle"),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    },
    { scope: headerRef }
  );

  return (
    <header ref={headerRef} className="mb-14">
      <h1 className="page-title text-4xl md:text-7xl font-black tracking-tighter mb-4 text-base-content">
        {title}{" "}
        <span className="gradient-text">{highlight}</span>
      </h1>
      <p className="page-subtitle text-base-content/50 text-lg max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    </header>
  );
}
