import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Globe, Camera, Mail, Share2, X, ArrowUpRight, Heart, Utensils } from "lucide-react";

const discoverLinks = [
  { label: "Categories",      href: "/categories" },
  { label: "World Areas",     href: "/area" },
  { label: "Ingredients",     href: "/ingredients" },
  { label: "Search Recipes",  href: "/search" },
];

const companyLinks = [
  { label: "About Us",       href: "/contact" },
  { label: "Contact",        href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use",   href: "#" },
];

const socials = [
  { icon: Share2, label: "Facebook",   href: "#" },
  { icon: X,      label: "X/Twitter",  href: "#" },
  { icon: Camera, label: "Instagram",  href: "#" },
  { icon: Mail,   label: "Email",      href: "mailto:chef@yummy.com" },
  { icon: Globe,  label: "Website",    href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-col", {
      y: 24,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 92%",
      },
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-base-200 border-t border-base-300">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand column */}
        <div className="footer-col space-y-6">
          <Link href="/" className="flex items-center gap-3 group w-fit">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-110 transition-transform">
              <Utensils size={18} className="text-primary-content" />
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-black font-serif tracking-tight">Yummy</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-35">Recipes</span>
            </div>
          </Link>

          <p className="text-sm text-base-content/55 leading-relaxed max-w-[200px]">
            Bringing the world&apos;s best recipes to your kitchen. Explore, cook, and enjoy.
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-base-300 hover:bg-primary hover:text-primary-content flex items-center justify-center text-base-content/50 transition-all duration-200 hover:scale-110 hover:shadow-md hover:shadow-primary/20"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Discover */}
        <div className="footer-col space-y-5">
          <h6 className="text-[10px] font-bold tracking-widest uppercase text-primary">Discover</h6>
          <ul className="space-y-3">
            {discoverLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-1 text-sm text-base-content/55 hover:text-primary transition-colors"
                >
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col space-y-5">
          <h6 className="text-[10px] font-bold tracking-widest uppercase text-primary">Company</h6>
          <ul className="space-y-3">
            {companyLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-1 text-sm text-base-content/55 hover:text-primary transition-colors"
                >
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                  />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col space-y-5">
          <h6 className="text-[10px] font-bold tracking-widest uppercase text-primary">Stay Updated</h6>
          <p className="text-sm text-base-content/55 leading-relaxed">
            Get the latest recipes delivered to your inbox.
          </p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="input input-bordered input-sm rounded-xl bg-base-100 w-full text-sm"
            />
            <button className="btn btn-primary btn-sm btn-block rounded-xl gap-2 font-bold">
              Subscribe <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-base-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-base-content/35 flex items-center gap-1.5">
            &copy; 2026 Yummy Recipes — made with
            <Heart size={11} className="text-primary fill-primary" />
            for food lovers.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Sitemap"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs text-base-content/35 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
