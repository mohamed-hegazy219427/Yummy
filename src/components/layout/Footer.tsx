import { Globe, Camera, Mail, Share2, X } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300">
      <nav>
        <h6 className="footer-title opacity-100 text-primary font-bold">Discover</h6>
        <Link href="/categories" className="link link-hover">Categories</Link>
        <Link href="/area" className="link link-hover">Areas</Link>
        <Link href="/ingredients" className="link link-hover">Ingredients</Link>
        <Link href="/search" className="link link-hover">Search Recipes</Link>
      </nav>
      <nav>
        <h6 className="footer-title opacity-100 text-primary font-bold">Company</h6>
        <Link href="/contact" className="link link-hover">About us</Link>
        <Link href="/contact" className="link link-hover">Contact</Link>
        <Link href="#" className="link link-hover">Privacy Policy</Link>
      </nav>
      <nav>
        <h6 className="footer-title opacity-100 text-primary font-bold">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="#" className="btn btn-ghost btn-circle btn-sm"><Share2 size={20} /></a>
          <a href="#" className="btn btn-ghost btn-circle btn-sm"><X size={20} /></a>
          <a href="#" className="btn btn-ghost btn-circle btn-sm"><Camera size={20} /></a>
          <a href="#" className="btn btn-ghost btn-circle btn-sm"><Mail size={20} /></a>
        </div>
      </nav>
      <aside className="md:col-span-3 lg:col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold">Y</div>
          <span className="text-xl font-black font-serif">Yummy</span>
        </div>
        <p className="max-w-xs opacity-60">
          Bringing the world's best recipes to your kitchen. Explore, cook, and enjoy.
        </p>
      </aside>
    </footer>
  );
}
