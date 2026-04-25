import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { 
  Home, 
  Search, 
  LayoutGrid, 
  MapPin, 
  ChefHat, 
  Mail, 
  Globe,
  X,
  Menu,
  Share2
} from "lucide-react";
import ThemePicker from "../ui/ThemePicker";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (!navRef.current || !linksRef.current) return;
    const links = linksRef.current.querySelectorAll("li");

    if (isOpen) {
      gsap.to(navRef.current, { x: 0, duration: 0.6, ease: "power4.out" });
      gsap.fromTo(links, 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)", delay: 0.2 }
      );
    } else {
      gsap.to(navRef.current, { x: "-100%", duration: 0.5, ease: "power4.in" });
    }
  }, { dependencies: [isOpen], scope: navRef });

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Categories", href: "/categories", icon: LayoutGrid },
    { name: "Area", href: "/area", icon: MapPin },
    { name: "Ingredients", href: "/ingredients", icon: ChefHat },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Trigger Button - Mobile Only */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 btn btn-circle btn-primary md:hidden shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar Container */}
      <aside 
        ref={navRef}
        className="fixed top-0 left-0 h-full w-72 bg-base-200 border-r border-base-300 z-50 transform -translate-x-full md:translate-x-0 transition-none flex flex-col"
      >
        {/* Header */}
        <div className="p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-content font-bold text-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              Y
            </div>
            <span className="text-2xl font-serif font-black tracking-tight">Yummy</span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-circle btn-sm md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <ul ref={linksRef} className="menu menu-lg gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-4 transition-all duration-300 ${
                      isActive ? "active bg-primary/10 text-primary font-bold" : "hover:bg-base-300"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={22} className={isActive ? "text-primary" : "opacity-60"} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-8 space-y-6 border-t border-base-300">
          <ThemePicker />
          
          <div className="flex items-center gap-4 text-base-content/60">
            <a href="#" className="hover:text-primary transition-colors"><Share2 size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><X size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Globe size={20} /></a>
          </div>

          <p className="text-xs opacity-40 font-medium">
            &copy; 2026 Yummy Recipes.<br />
            Built with passion for food.
          </p>
        </div>
      </aside>
    </>
  );
}
