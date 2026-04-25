import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Globe, Share2, Facebook, Twitter, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "react-aria-components";

gsap.registerPlugin(useGSAP);

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const { theme, setTheme, themes } = useTheme();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useGSAP(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar || !linksRef.current) return;
    const links = linksRef.current.querySelectorAll("li");

    if (isOpen) {
      gsap.to(sidebar, { left: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(links, {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.2,
      });
    } else {
      gsap.to(sidebar, { left: -250, duration: 0.5, ease: "power2.inOut" });
      gsap.to(links, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Search", href: "/search" },
    { name: "Categories", href: "/categories" },
    { name: "Area", href: "/area" },
    { name: "Ingredients", href: "/ingredients" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div
      ref={sidebarRef}
      className="fixed top-0 left-[-250px] h-full flex z-50 transition-all duration-500 ease-in-out"
      style={{ width: "320px" }}
    >
      <div className="flex flex-col justify-between h-full w-[250px] bg-zinc-950 text-white p-6 shadow-2xl border-r border-white/10">
        <div className="mt-8">
          <ul ref={linksRef} className="space-y-6">
            {navLinks.map((link) => (
              <li key={link.name} className="overflow-hidden">
                <Link
                  href={link.href}
                  className={`block text-lg font-medium hover:text-primary transition-colors ${
                    router.pathname === link.href ? "text-primary" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="dropdown dropdown-top dropdown-right">
            <label tabIndex={0} className="btn btn-ghost btn-sm flex items-center gap-2">
              <Settings size={16} />
              Themes
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-zinc-900 rounded-box w-52 h-64 overflow-y-auto">
              {themes.map((t) => (
                <li key={t}>
                  <button 
                    onClick={() => setTheme(t)}
                    className={`${theme === t ? 'active' : ''} text-white`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Facebook size={20} className="cursor-pointer hover:text-primary" />
            <Twitter size={20} className="cursor-pointer hover:text-primary" />
            <Globe size={20} className="cursor-pointer hover:text-primary" />
          </div>
          <p className="text-xs text-gray-500">
            Copyright © 2024 <br /> All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center h-full w-[70px] bg-base-100 border-r border-base-300 py-6 text-base-content">
        <Link href="/">
          <img src="/imgs/logo.png" alt="Yummy Logo" className="w-12 h-12" />
        </Link>
        
        <Button 
          onPress={toggleSidebar} 
          className="p-2 hover:bg-base-200 rounded-full transition-colors outline-none focus-visible:ring-2 ring-primary"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>

        <div className="flex flex-col gap-4">
            <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-base-200 rounded-full transition-colors"
            >
                <Globe size={20} />
            </button>
          <Share2 size={20} className="cursor-pointer hover:text-primary" />
        </div>
      </div>
    </div>
  );
}
