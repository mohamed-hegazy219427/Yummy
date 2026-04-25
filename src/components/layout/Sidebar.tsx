import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  Home, Search, LayoutGrid, MapPin, ChefHat, Mail,
  Globe, X, Menu, Share2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import ThemePicker from "../ui/ThemePicker";

const menuItems = [
  { name: "Home",        href: "/",           icon: Home },
  { name: "Search",      href: "/search",      icon: Search },
  { name: "Categories",  href: "/categories",  icon: LayoutGrid },
  { name: "Area",        href: "/area",        icon: MapPin },
  { name: "Ingredients", href: "/ingredients", icon: ChefHat },
  { name: "Contact",     href: "/contact",     icon: Mail },
];

const socials = [
  { icon: Share2, label: "Facebook" },
  { icon: X,      label: "X / Twitter" },
  { icon: Globe,  label: "Website" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router        = useRouter();
  const sidebarRef    = useRef<HTMLElement>(null);
  const linksRef      = useRef<HTMLUListElement>(null);
  const hasInteracted = useRef(false);

  // Auto-close drawer on navigation
  useEffect(() => {
    const close = () => setIsOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  // ── Viewport-aware setup (runs once) ──────────────────────────────────────
  // matchMedia handles: initial sidebar position + desktop entrance + resize cleanup
  useGSAP(() => {
    if (!sidebarRef.current || !linksRef.current) return;
    const mm    = gsap.matchMedia();
    const items = linksRef.current.querySelectorAll<HTMLElement>("li");

    // Mobile: start hidden; on resize back to desktop clean up
    mm.add("(max-width: 767px)", () => {
      gsap.set(sidebarRef.current, { x: "-100%" });
      return () => gsap.set(sidebarRef.current, { clearProps: "x" });
    });

    // Desktop: ensure visible + stagger items in once on load
    mm.add("(min-width: 768px)", () => {
      gsap.set(sidebarRef.current, { clearProps: "x" });
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        gsap.fromTo(
          items,
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.25 }
        );
      }
      return () => {};
    });

    return () => mm.revert();
  }, {});

  // ── Mobile open / close animation ─────────────────────────────────────────
  useGSAP(() => {
    if (!sidebarRef.current || !linksRef.current) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const items = linksRef.current.querySelectorAll<HTMLElement>("li");

    if (isOpen) {
      hasInteracted.current = true;

      // Drawer slides in
      gsap.to(sidebarRef.current, { x: 0, duration: 0.55, ease: "power4.out" });

      // Items cascade in with a bounce
      gsap.fromTo(
        items,
        { x: -22, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.07, duration: 0.38, ease: "back.out(1.7)", delay: 0.15 }
      );
    } else if (hasInteracted.current) {
      // Items collapse quickly, then drawer slides out
      gsap.timeline()
        .to(items, {
          x: -10, opacity: 0,
          stagger: { each: 0.03, from: "end" }, // reverse stagger on close
          duration: 0.18,
          ease: "power2.in",
        })
        .to(sidebarRef.current, {
          x: "-100%",
          duration: 0.48,
          ease: "power4.in",
        }, "-=0.06");
    }
  }, { dependencies: [isOpen] });

  return (
    <>
      {/* Backdrop — always in DOM, opacity toggled via CSS */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Mobile trigger */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="fixed top-4 left-4 z-40 btn btn-circle btn-primary md:hidden shadow-lg shadow-primary/30"
      >
        <Menu size={22} />
      </button>

      {/* Sidebar — position is owned by GSAP (mobile) and CSS (desktop) */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-72 bg-base-200 border-r border-base-300 z-50 flex flex-col -translate-x-full md:translate-x-0"
      >
        {/* Accent stripe */}
        <div className="h-1 w-full bg-linear-to-r from-primary via-secondary to-accent shrink-0" />

        {/* Brand */}
        <div className="px-6 py-6 flex items-center justify-between shrink-0">
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-primary/30 group-hover:scale-110 transition-transform shrink-0">
              <Image src="/imgs/logo.png" alt="Yummy" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-black font-serif tracking-tight">Yummy</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-35">Recipes</span>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="btn btn-ghost btn-circle btn-sm md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section label */}
        <div className="px-6 pb-3 shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">Explore</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <ul ref={linksRef} className="space-y-0.5">
            {menuItems.map(({ name, href, icon: Icon }) => {
              const isActive = router.pathname === href;
              return (
                <li key={name}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "relative flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors duration-200 group",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/60 hover:bg-base-300 hover:text-base-content"
                    )}
                  >
                    {/* Active left pip */}
                    <span className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-primary transition-all duration-300",
                      isActive ? "h-5 opacity-100" : "h-0 opacity-0"
                    )} />

                    <Icon
                      size={18}
                      className={cn(
                        "transition-all duration-200 shrink-0",
                        isActive
                          ? "text-primary"
                          : "opacity-50 group-hover:opacity-100 group-hover:scale-110"
                      )}
                    />
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer strip */}
        <div className="px-6 py-6 border-t border-base-300 space-y-5 shrink-0">
          <ThemePicker />

          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-base-300 hover:bg-primary hover:text-primary-content flex items-center justify-center text-base-content/50 transition-all duration-200 hover:scale-110"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <p className="text-[11px] text-base-content/30 leading-relaxed">
            &copy; 2026 Yummy Recipes.<br />
            Built with passion for food.
          </p>
        </div>
      </aside>
    </>
  );
}
